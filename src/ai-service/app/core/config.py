from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field
from typing import Optional, List
import os


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Cloud Loop Opportunity Intelligence"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://cloudloop.dev",
        "http://web:3000",
    ]

    # Auth mode: 'demo' (zero-account instant evaluation) or 'clerk'
    AUTH_MODE: str = Field(default="demo", env="AUTH_MODE")
    DEMO_USER_ID: str = "demo-student-2026"

    # IBM Db2 Enterprise / Community
    DB2_HOST: Optional[str] = Field(default=None, env="DB2_HOST")
    DB2_HOSTNAME: Optional[str] = Field(default=None, env="DB2_HOSTNAME")
    DB2_PORT: int = Field(default=50000, env="DB2_PORT")
    DB2_DB: str = Field(default="BLUDB", env="DB2_DB")
    DB2_DATABASE: str = Field(default="BLUDB", env="DB2_DATABASE")
    DB2_USERNAME: Optional[str] = Field(default=None, env="DB2_USERNAME")
    DB2_UID: Optional[str] = Field(default=None, env="DB2_UID")
    DB2_PASSWORD: Optional[str] = Field(default=None, env="DB2_PASSWORD")
    DB2_PWD: Optional[str] = Field(default=None, env="DB2_PWD")
    DB2_SCHEMA: str = Field(default="CLOUDLOOP", env="DB2_SCHEMA")
    DB2_TABLE_KB: str = "OPPORTUNITY_KB"
    DB2_SSL: bool = True
    DB2_SSL_DSN: Optional[str] = None

    # Fallback SQLite DB for local sandbox execution when native Db2 driver is blocked by OS policy
    LOCAL_DB_PATH: str = "cloud_loop_local.db"

    # Ingestion / Admin Secret
    ADMIN_API_KEY: str = "cloudloop-admin-secret-key-2026"

    # AI & Embeddings
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"
    EMBEDDING_DIM: int = 384
    DISTANCE_METRIC: str = "COSINE"

    model_config = SettingsConfigDict(
        env_file=(".env", ".env.local", "../.env.local"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def host(self) -> Optional[str]:
        return self.DB2_HOST or self.DB2_HOSTNAME

    @property
    def database_name(self) -> str:
        return self.DB2_DB or self.DB2_DATABASE

    @property
    def username(self) -> Optional[str]:
        return self.DB2_USERNAME or self.DB2_UID

    @property
    def password(self) -> Optional[str]:
        return self.DB2_PASSWORD or self.DB2_PWD

    @property
    def is_db2_configured(self) -> bool:
        return bool(self.host and self.username and self.password) or bool(self.DB2_SSL_DSN)

    @property
    def db2_dsn(self) -> str:
        if self.DB2_SSL_DSN:
            return self.DB2_SSL_DSN
        if not self.host:
            return ""
        dsn = (
            f"DATABASE={self.database_name};"
            f"HOSTNAME={self.host};"
            f"PORT={self.DB2_PORT};"
            f"PROTOCOL=TCPIP;"
            f"UID={self.username};"
            f"PWD={self.password};"
        )
        if self.DB2_SSL:
            dsn += "SECURITY=SSL;"
        return dsn


settings = Settings()
