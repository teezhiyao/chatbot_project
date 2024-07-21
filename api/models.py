# models.py
from sqlalchemy import Boolean, Column, Date, ForeignKey, Integer, String, Text, TIMESTAMP, func
from sqlalchemy.orm import relationship
from .database import Base

class PolicyTier(Base):
    __tablename__ = "Policy_Tier"

    policy_tier = Column(Integer, primary_key=True)
    duration_month = Column(Integer)
    premium = Column(String(50), nullable=False)
    payout = Column(String(50), nullable=False)
    total_coverage = Column(String(50), nullable=False)

    tier = relationship("Policy", back_populates="tier")
    # name = relationship("PolicyInfo", back_populates="name")


class PolicyHolder(Base):
    __tablename__ = "Policy_Holder"

    holder_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), nullable=False)
    password = Column(String(50))

    rholder_id = relationship("Policy", back_populates="rholder_id")
    rholder_id2 = relationship("Chat", back_populates="rholder_id")


class Policy(Base):
    __tablename__ = "Policy"

    policy_id = Column(Integer, primary_key=True)
    policy_name = Column(String(50), ForeignKey("Policy_Info.policy_name"), nullable=False)
    policy_tier = Column(Integer, ForeignKey("Policy_Tier.policy_tier"), nullable=True)
    user_id = Column(Integer, ForeignKey("Policy_Holder.holder_id"), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    status = Column(Integer)
    
    rholder_id = relationship("PolicyHolder", back_populates="rholder_id")
    tier = relationship("PolicyTier", back_populates="tier")
    name = relationship("PolicyInfo", back_populates="name")


class PolicyInfo(Base):
    __tablename__ = "Policy_Info"

    policy_name = Column(String(50), primary_key=True)
    product_type = Column(String(50))
    product_category = Column(String(50))
    description = Column(String(200))

    name = relationship("Policy", back_populates="name")


class Chat(Base):
    __tablename__ = "Chat"

    chat_id = Column(Integer, primary_key=True, autoincrement=True)
    holder_id = Column(Integer, ForeignKey("Policy_Holder.holder_id"), nullable=False)
    created_at = Column(TIMESTAMP, default="CURRENT_TIMESTAMP")

    rchat_id = relationship("Messages", back_populates="rchat_id")
    rholder_id = relationship("PolicyHolder", back_populates="rholder_id2")


class Messages(Base):
    __tablename__ = "Messages"

    message_id = Column(Integer, primary_key=True, autoincrement=True)
    chat_id = Column(Integer, ForeignKey("Chat.chat_id"), nullable=False)
    sender_id = Column(Integer, ForeignKey("Policy_Holder.holder_id"), nullable=False)
    content = Column(String(200), nullable=False)
    sent_at = Column(Date)

    rchat_id = relationship("Chat", back_populates="rchat_id")
