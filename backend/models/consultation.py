from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional
from datetime import datetime
import uuid


class ConsultationCreate(BaseModel):
    """Schema for creating a new consultation request"""
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr = Field(..., max_length=255)
    company: Optional[str] = Field(None, max_length=100)
    message: str = Field(..., min_length=10, max_length=1000)

    @validator('name')
    def name_must_not_be_empty(cls, v):
        if not v or v.strip() == '':
            raise ValueError('Name cannot be empty')
        return v.strip()

    @validator('message')
    def message_must_not_be_empty(cls, v):
        if not v or v.strip() == '':
            raise ValueError('Message cannot be empty')
        return v.strip()

    @validator('company')
    def company_cleanup(cls, v):
        if v:
            return v.strip()
        return v


class Consultation(BaseModel):
    """Schema for consultation document in database"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    company: Optional[str] = None
    message: str
    status: str = Field(default='new')
    createdAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }
