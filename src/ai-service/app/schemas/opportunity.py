from pydantic import BaseModel, Field, HttpUrl, field_validator
from typing import Optional, List, Union
import json
from datetime import datetime

class OpportunityBase(BaseModel):
    title: str = Field(..., min_length=2, max_length=255)
    organization: str = Field(..., min_length=1, max_length=128)
    opportunity_type: str = Field(..., description="program, internship, job, event, certification")
    category: str = Field(..., max_length=64)
    description: Optional[str] = None
    location: Optional[str] = None
    location_type: Optional[str] = Field("remote", description="remote, onsite, hybrid")
    skills: List[str] = Field(default_factory=list)
    eligibility: Optional[str] = None
    deadline: Optional[str] = None
    application_url: str = Field(..., description="Direct link to apply")
    source_name: Optional[str] = "CloudLoop Indexer"
    source_url: Optional[str] = None
    verification_status: Optional[str] = "verified"

    @field_validator("skills", mode="before")
    @classmethod
    def parse_skills(cls, v: Union[str, list, None]) -> List[str]:
        if v is None:
            return []
        if isinstance(v, list):
            return [str(item).strip() for item in v if item]
        if isinstance(v, str):
            v = v.strip()
            if not v:
                return []
            if v.startswith("[") and v.endswith("]"):
                try:
                    parsed = json.loads(v)
                    if isinstance(parsed, list):
                        return [str(item).strip() for item in parsed if item]
                except Exception:
                    pass
            return [s.strip() for s in v.split(",") if s.strip()]
        return []

class OpportunityCreate(OpportunityBase):
    slug: Optional[str] = None

class OpportunityResponse(OpportunityBase):
    id: str
    slug: str
    fetched_at: Optional[str] = None
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    model_config = {"from_attributes": True}

class OpportunityListResponse(BaseModel):
    total: int
    page: int
    limit: int
    items: List[OpportunityResponse]

