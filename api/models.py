# models.py
from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String, Text, TIMESTAMP, func
from sqlalchemy.orm import relationship
from .database import Base

class PolicyHolder(Base):
    __tablename__ = "PolicyHolder"

    holder_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), nullable=False)
    password = Column(String(50))

    rholder_id = relationship("PolicyInstance", back_populates="rholder_id")
    rholder_id2 = relationship("Chat", back_populates="rholder_id")


class PolicyInstance(Base):
    __tablename__ = "PolicyInstance"

    policy_id = Column(Integer, primary_key=True)
    policy_info = Column(Integer, ForeignKey("PolicyInfo.policy_info_id"), nullable=False)
    user_id = Column(Integer, ForeignKey("PolicyHolder.holder_id"), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    status = Column(Integer)
    
    rholder_id = relationship("PolicyHolder", back_populates="rholder_id")
    info_id = relationship("PolicyInfo", back_populates="info_id")


class PolicyInfo(Base):
    __tablename__ = "PolicyInfo"

    policy_info_id = Column(Integer, primary_key=True, autoincrement=True)
    policy_name = Column(String(50))
    product_type = Column(String(50))
    product_category = Column(String(50))
    description = Column(String(200))

    info_id = relationship("PolicyInstance", back_populates="info_id")

class Chat(Base):
    __tablename__ = "Chat"

    chat_id = Column(Integer, primary_key=True, autoincrement=True)
    holder_id = Column(Integer, ForeignKey("PolicyHolder.holder_id"), nullable=False)
    created_at = Column(TIMESTAMP, default="CURRENT_TIMESTAMP")

    rchat_id = relationship("Messages", back_populates="rchat_id")
    rholder_id = relationship("PolicyHolder", back_populates="rholder_id2")


class Messages(Base):
    __tablename__ = "Messages"

    message_id = Column(Integer, primary_key=True, autoincrement=True)
    chat_id = Column(Integer, ForeignKey("Chat.chat_id"), nullable=False)
    sender_id = Column(Integer, ForeignKey("PolicyHolder.holder_id"), nullable=False)
    content = Column(String(200), nullable=False)
    sent_at = Column(Date)

    rchat_id = relationship("Chat", back_populates="rchat_id")