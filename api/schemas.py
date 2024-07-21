# schema.py
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, datetime


class PolicyTierBase(BaseModel):
    policy_id: int
    duration_month: Optional[int] = None
    premium: str
    payout: str
    total_coverage: str

class PolicyTierCreate(PolicyTierBase):
    pass


class PolicyTier(PolicyTierBase):
    policy_id: int

    class Config:
        orm_mode = True


class PolicyHolderBase(BaseModel):
    username: str
    password: Optional[str] = None


class PolicyHolderCreate(PolicyHolderBase):
    pass


class PolicyHolder(PolicyHolderBase):
    holder_id: int
    policies: List["Policy"] = []
    messages: List["Messages"] = []

    class Config:
        orm_mode = True


class PolicyBase(BaseModel):
    policy_name: str
    policy_tier: Optional[int] = None
    user_id: int
    start_date: date
    end_date: date
    status: Optional[int] = None


class PolicyCreate(PolicyBase):
    pass


class Policy(PolicyBase):
    policy_id: int
    holder: PolicyHolder
    tier: Optional[PolicyTier] = None

    class Config:
        orm_mode = True


class PolicyInfoBase(BaseModel):
    policy_name: str
    product_type: Optional[str] = None
    product_category: Optional[str] = None
    description: Optional[str] = None


class PolicyInfoCreate(PolicyInfoBase):
    pass


class PolicyInfo(PolicyInfoBase):
    policy_name: str

    class Config:
        orm_mode = True


class ChatBase(BaseModel):
    chat_name: str
    created_at: Optional[datetime] = None


class ChatCreate(ChatBase):
    pass


class Chat(ChatBase):
    chat_id: int
    messages: List["Messages"] = []

    class Config:
        orm_mode = True


class MessagesBase(BaseModel):
    chat_id: int
    sender_id: int
    content: str


class MessagesCreate(MessagesBase):
    pass


class Messages(MessagesBase):
    message_id: Optional[int] = None
    sent_at: Optional[date] = None

    class Config:
        orm_mode = True