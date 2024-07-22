from pydantic import BaseModel
from typing import List, Optional
from datetime import date, datetime

class PolicyHolderBase(BaseModel):
    username: str
    password: Optional[str] = None


class PolicyHolderCreate(PolicyHolderBase):
    pass


class PolicyHolder(PolicyHolderBase):
    user_id: int
    policies: List["PolicyInstance"] = []
    messages: List["Messages"] = []

    class Config:
        orm_mode = True


class PolicyInstanceBase(BaseModel):
    policy_info_id: int
    user_id: int
    start_date: date
    end_date: date
    status: Optional[int] = None


class PolicyInstanceCreate(PolicyInstanceBase):
    pass


class PolicyInstance(PolicyInstanceBase):
    policy_id: int
    holder: PolicyHolder
    info: "PolicyInfo"

    class Config:
        orm_mode = True


class PolicyInfoBase(BaseModel):
    product_type: Optional[str] = None
    product_category: Optional[str] = None
    description: Optional[str] = None


class PolicyInfoCreate(PolicyInfoBase):
    policy_name: str


class PolicyInfo(PolicyInfoBase):
    policy_info_id: int
    instances: List[PolicyInstance] = []

    class Config:
        orm_mode = True


class ChatBase(BaseModel):
    user_id: int


class ChatCreate(ChatBase):
    pass


class Chat(ChatBase):
    chat_id: int
    # messages: List["Messages"] = []
    created_at: Optional[datetime] = None

    class Config:
        orm_mode = True


class MessagesBase(BaseModel):
    chat_id: int
    sender_id: int
    content: str


class MessagesCreate(MessagesBase):
    pass


class Messages(MessagesBase):
    message_id: int
    sent_at: Optional[datetime] = None

    class Config:
        orm_mode = True
