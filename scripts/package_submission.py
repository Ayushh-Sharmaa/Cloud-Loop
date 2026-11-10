#!/usr/bin/env python3
"""
Submission Packaging & Secret Scanning Script
IBM Db2 TechX Summit 2026

Copies allowable artifacts into dist/submissions/cloud-loop/,
executes exhaustive secret scanning, and ensures conformance
with validate_submission.py rules.
"""
import sys
import os
import re
import shutil
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent
DIST_DIR = ROOT_DIR / "dist" / "submissions" / "cloud-loop"

ALLOW_LIST = [
    "README.md",
    "architecture.md",
    "submission.json",
    ".env.example",
    "LICENSE",
    "docker-compose.yml",
    "docs",
    "src",
]

IGNORE_PATTERNS = shutil.ignore_patterns(
    "node_modules",
    ".next",
    ".venv",
    "__pycache__",
    "*.pyc",
    ".git",
    ".DS_Store",
    "*.log",
    "cloud_loop_local.db*",
)

SECRET_PATTERNS = [
    (re.compile(r"sk_live_[0-9a-zA-Z]{20,}"), "Live Secret Key (sk_live)"),
    (re.compile(r"pk_live_[0-9a-zA-Z]{20,}"), "Live Publishable Key (pk_live)"),
    (re.compile(r"AKIA[0-9A-Z]{16}"), "AWS Access Key"),
    (re.compile(r"ghp_[0-9a-zA-Z]{36}"), "GitHub Personal Access Token"),
    (re.compile(r"password\s*=\s*['\"][^'\"]{8,}['\"]", re.IGNORECASE), "Plaintext Password assignment"),
]

FORBIDDEN_FILES = [".env", ".env.local", ".env.development", ".env.production", "id_rsa", "id_ed25519", "submitter.txt"]
FORBIDDEN_EXTENSIONS = [".pem", ".pfx", ".p12", ".key"]

def scan_file_for_secrets(file_path: Path) -> list:
    hits = []
    if file_path.suffix.lower() in [".png", ".jpg", ".jpeg", ".ico", ".webp", ".avif", ".woff", ".woff2"]:
        return hits

    try:
        content = file_path.read_text(encoding="utf-8", errors="ignore")
        for regex, desc in SECRET_PATTERNS:
            match = regex.search(content)
            if match:
                val = match.group(0)
                if "placeholder" in val.lower() or "your_" in val.lower() or "dummy" in val.lower():
                    continue
                hits.append((desc, val[:20] + "..."))
    except Exception as e:
        hits.append(("File read error during secret scan", str(e)))

    return hits

def package_submission():
    print("=" * 60)
    print("Cloud-Loop Submission Packager & Secret Scanner")
    print("=" * 60)

    if DIST_DIR.exists():
        print(f"Cleaning existing target at: {DIST_DIR}")
        shutil.rmtree(DIST_DIR)
    DIST_DIR.mkdir(parents=True, exist_ok=True)

    for item_name in ALLOW_LIST:
        src_item = ROOT_DIR / item_name
        dest_item = DIST_DIR / item_name
        if not src_item.exists():
            print(f"⚠️ Warning: Allowed item '{item_name}' does not exist in root.")
            continue

        if src_item.is_dir():
            shutil.copytree(src_item, dest_item, ignore=IGNORE_PATTERNS)
        else:
            shutil.copy2(src_item, dest_item)
        print(f"✓ Copied: {item_name}")

    print("\nRunning security audit and secret scan...")
    violations = []

    for root, _, files in os.walk(DIST_DIR):
        for f in files:
            f_path = Path(root, f)
            f_lower = f.lower()

            if f_lower in FORBIDDEN_FILES or any(f_lower.endswith(ext) for ext in FORBIDDEN_EXTENSIONS):
                rel = f_path.relative_to(DIST_DIR)
                violations.append(f"Forbidden file pattern detected: {rel.as_posix()}")

            hits = scan_file_for_secrets(f_path)
            for desc, sample in hits:
                rel = f_path.relative_to(DIST_DIR)
                violations.append(f"Secret detected in {rel.as_posix()}: {desc} ({sample})")

    if violations:
        print("\n❌ SECURITY AUDIT FAILED! Refusing to package submission:")
        for v in violations:
            print(f"   - {v}")
        sys.exit(1)

    print("✓ Zero secrets detected. Security scan passed clean.")
    print(f"\n✅ Packaged submission ready at: {DIST_DIR}")
    print("=" * 60)

if __name__ == "__main__":
    package_submission()
