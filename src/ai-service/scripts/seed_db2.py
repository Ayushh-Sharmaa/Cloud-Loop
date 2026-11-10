#!/usr/bin/env python3
"""
Seed Script for IBM Db2 & Haystack Vector Store
Idempotent data loading pipeline for Cloud Loop.
"""
import sys
import os
import json
import logging
from datetime import datetime

# Add parent directory to path so app modules can be imported
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

from app.core.config import settings
from app.database.migrations import run_migrations
from app.database.session import db_session
from app.repositories.opportunity_repository import opportunity_repo
from app.services.haystack_service import haystack_db2_service

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("seed_db2")


def seed_database():
    logger.info("======================================================")
    logger.info("Starting Cloud Loop IBM Db2 & Haystack Seeding Pipeline")
    logger.info("======================================================")

    # 1. Run Schema Migrations
    logger.info("Step 1: Applying idempotent DDL schema migrations...")
    run_migrations()

    # 2. Locate Seed Data
    seed_path = os.path.join(parent_dir, "data", "seed", "opportunities.json")
    if not os.path.exists(seed_path):
        logger.error(f"Seed file not found at {seed_path}!")
        sys.exit(1)

    with open(seed_path, "r", encoding="utf-8") as f:
        opportunities = json.load(f)

    logger.info(f"Loaded {len(opportunities)} opportunities from seed file.")

    # 3. Insert into Relational Tables
    logger.info("Step 2: Upserting opportunities into relational storage...")
    inserted_relational = 0
    updated_relational = 0

    for opp in opportunities:
        opp_id = opp.get("id")
        existing = opportunity_repo.get_by_id(opp_id)
        if existing:
            opportunity_repo.update(opp_id, opp)
            updated_relational += 1
        else:
            opportunity_repo.create(opp)
            inserted_relational += 1

    logger.info(
        f"Relational storage synchronized: {inserted_relational} inserted, "
        f"{updated_relational} updated (Total: {opportunity_repo.count()})."
    )

    # 4. Prepare Haystack Documents for OPPORTUNITY_KB
    logger.info("Step 3: Indexing into Haystack IBMDb2DocumentStore (384-dim COSINE)...")
    store = haystack_db2_service.get_document_store()

    # Build Haystack Document representations
    haystack_docs = []
    for opp in opportunities[:250]:  # Seed top curated entries for fast startup
        skills_str = ", ".join(opp.get("skills", []))
        content = (
            f"{opp.get('title')} at {opp.get('organization')}. "
            f"Category: {opp.get('category')}. Location: {opp.get('location')} ({opp.get('location_type')}). "
            f"{opp.get('description', '')} "
            f"Required Skills: {skills_str}. "
            f"Eligibility: {opp.get('eligibility', 'Open to all students')}."
        )

        doc_meta = {
            "slug": opp.get("slug"),
            "title": opp.get("title"),
            "organization": opp.get("organization"),
            "opportunity_type": opp.get("opportunity_type"),
            "category": opp.get("category"),
            "location": opp.get("location"),
            "location_type": opp.get("location_type"),
            "deadline": opp.get("deadline"),
            "source": opp.get("source_name"),
            "application_url": opp.get("application_url"),
        }

        # Try to import Haystack Document if available
        try:
            from haystack import Document
            doc = Document(id=opp.get("id"), content=content, meta=doc_meta)
        except ImportError:
            doc = {"id": opp.get("id"), "content": content, "meta": doc_meta}

        haystack_docs.append(doc)

    indexed_count = haystack_db2_service.write_documents(haystack_docs)
    logger.info(f"Successfully indexed {indexed_count} documents in OPPORTUNITY_KB vector store.")

    # 5. Seed Demo Student Profile
    logger.info("Step 4: Ensuring demo student profile exists...")
    from app.repositories.profile_repository import profile_repo
    demo_profile = profile_repo.get_by_user_id(settings.DEMO_USER_ID)
    if not demo_profile:
        profile_repo.create({
            "user_id": settings.DEMO_USER_ID,
            "education": "GL Bajaj Institute of Technology and Management",
            "degree": "B.Tech Computer Science",
            "study_year": 3,
            "graduation_batch": "2026",
            "skills": ["Python", "TypeScript", "React", "IBM Db2", "Machine Learning", "Cloud Computing"],
            "interests": ["Full Stack Development", "Database Architecture", "AI/ML Systems"],
            "preferred_domains": ["Cloud", "AI/ML", "Enterprise Software"],
            "preferred_locations": ["Remote", "India", "Noida", "Bangalore"]
        })
        logger.info(f"Demo student profile created for user: {settings.DEMO_USER_ID}")

    logger.info("======================================================")
    logger.info("Seeding completed successfully!")
    logger.info("======================================================")


if __name__ == "__main__":
    seed_database()
