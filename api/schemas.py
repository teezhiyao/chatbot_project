# schema.py
from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import date, datetime

class PolicyHolderBase(BaseModel):
    username: str
    password: Optional[str] = None


class PolicyHolderCreate(PolicyHolderBase):
    pass


class PolicyHolder(PolicyHolderBase):
    holder_id: int
    policies: List["PolicyInstance"] = []
    messages: List["Messages"] = []

    class Config:
        orm_mode = True


class PolicyInstanceBase(BaseModel):
    policy_name: str
    user_id: int
    start_date: date
    end_date: date
    status: Optional[int] = None


class PolicyInstanceCreate(PolicyInstanceBase):
    pass


class PolicyInstance(PolicyInstanceBase):
    policy_id: int
    holder: PolicyHolder

    class Config:
        orm_mode = True


class PolicyInfoBase(BaseModel):
    policy_name: str
    product_type: str = None
    product_category: str = None
    description: str = None


class PolicyInfoCreate(PolicyInfoBase):
    pass


class PolicyInfo(PolicyInfoBase):
    policy_info_id: Optional[int] = None

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