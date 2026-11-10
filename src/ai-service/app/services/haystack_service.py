"""
Haystack Integration for IBM Db2
Implements IBMDb2DocumentStore and IBMDb2EmbeddingRetriever for semantic
opportunity matching with COSINE distance and 384-dimensional dense vectors.
Gracefully provides a local vector store fallback for environments where
native C-extension drivers are restricted by operating system policy.
"""
import os
import json
import logging
from typing import List, Dict, Any, Optional

from app.core.config import settings

logger = logging.getLogger("cloud_loop.haystack")


class HaystackDb2Service:
    def __init__(self):
        self._store = None
        self._is_native = False
        self._fallback_docs: List[Dict[str, Any]] = []

    def get_document_store(self, recreate_table: bool = False):
        """
        Initializes and returns the IBMDb2DocumentStore if credentials and driver are available.
        Otherwise initializes the fallback semantic memory store.
        """
        if self._store is not None and not recreate_table:
            return self._store

        if settings.is_db2_configured:
            try:
                from haystack.utils import Secret
                from haystack_integrations.document_stores.ibm_db import IBMDb2DocumentStore

                logger.info(
                    f"Initializing IBMDb2DocumentStore on {settings.host}:{settings.DB2_PORT}/{settings.database_name} "
                    f"table={settings.DB2_TABLE_KB} dim={settings.EMBEDDING_DIM}"
                )
                self._store = IBMDb2DocumentStore(
                    database=settings.database_name,
                    hostname=settings.host,
                    port=settings.DB2_PORT,
                    username=Secret.from_token(settings.username),
                    password=Secret.from_token(settings.password),
                    schema=settings.DB2_SCHEMA,
                    table_name=settings.DB2_TABLE_KB,
                    embedding_dim=settings.EMBEDDING_DIM,
                    distance_metric=settings.DISTANCE_METRIC,
                    recreate_table=recreate_table,
                )
                self._is_native = True
                logger.info("IBMDb2DocumentStore successfully connected.")
                return self._store
            except Exception as e:
                logger.warning(
                    f"IBMDb2DocumentStore native connection unavailable ({e}). "
                    "Switching to resilient fallback vector store."
                )

        self._is_native = False
        return self

    def write_documents(self, documents: List[Any], policy: str = "OVERWRITE") -> int:
        """
        Writes Haystack Document objects to IBM Db2 or fallback store.
        """
        if self._is_native and self._store is not None:
            return self._store.write_documents(documents, policy=policy)

        # Fallback in-memory index
        written = 0
        for doc in documents:
            # Handle both Haystack Document objects and dicts
            doc_id = getattr(doc, "id", None) or doc.get("id")
            content = getattr(doc, "content", None) or doc.get("content", "")
            meta = getattr(doc, "meta", None) or doc.get("meta", {})
            embedding = getattr(doc, "embedding", None) or doc.get("embedding", None)

            # Store in fallback
            self._fallback_docs = [d for d in self._fallback_docs if d["id"] != doc_id]
            self._fallback_docs.append({
                "id": doc_id,
                "content": content,
                "meta": meta,
                "embedding": embedding
            })
            written += 1
        return written

    def count_documents(self) -> int:
        if self._is_native and self._store is not None:
            return self._store.count_documents()
        return len(self._fallback_docs)

    def search(
        self,
        query: str,
        query_embedding: Optional[List[float]] = None,
        filters: Optional[Dict[str, Any]] = None,
        top_k: int = 10
    ) -> List[Dict[str, Any]]:
        """
        Performs semantic vector search with optional metadata filtering.
        """
        if self._is_native and self._store is not None:
            try:
                from haystack import Pipeline
                from haystack_integrations.components.retrievers.ibm_db import IBMDb2EmbeddingRetriever

                retriever = IBMDb2EmbeddingRetriever(document_store=self._store, top_k=top_k)
                if query_embedding:
                    res = retriever.run(query_embedding=query_embedding, filters=filters)
                    docs = res.get("documents", [])
                    return [
                        {
                            "id": d.id,
                            "content": d.content,
                            "score": getattr(d, "score", 0.0),
                            "meta": d.meta
                        }
                        for d in docs
                    ]
            except Exception as e:
                logger.error(f"Native IBM Db2 vector search failed: {e}. Using fallback.")

        # Resilient fallback search
        results = []
        q_tokens = set(query.lower().split())

        for d in self._fallback_docs:
            meta = d.get("meta", {})
            # Check filters
            if filters:
                field = filters.get("field", "")
                val = filters.get("value")
                if field.startswith("meta."):
                    k = field[5:]
                    if meta.get(k) != val:
                        continue

            content = d.get("content", "").lower()
            overlap = sum(1 for t in q_tokens if t in content)
            score = 0.5 + (overlap / max(1, len(q_tokens))) * 0.5
            results.append({
                "id": d["id"],
                "content": d["content"],
                "score": round(score, 4),
                "meta": meta
            })

        results.sort(key=lambda x: x["score"], reverse=True)
        return results[:top_k]


haystack_db2_service = HaystackDb2Service()
