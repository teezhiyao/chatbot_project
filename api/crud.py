from sqlalchemy.orm import Session
from . import models, schemas

def create_policy_info(policy_info: schemas.PolicyInfoCreate, db: Session):
    db_policy_info = models.PolicyInfo(**policy_info.dict())
    db.add(db_policy_info)
    db.commit()
    db.refresh(db_policy_info)
    return db_policy_info

def get_policy_info(policy_info_id: int, db: Session):
    return db.query(models.PolicyInfo).filter(models.PolicyInfo.policy_info_id == policy_info_id).first()

def update_policy_info(policy_name: str, policy_info_update: schemas.PolicyInfoCreate, db: Session):
    db_policy_info = db.query(models.PolicyInfo).filter(models.PolicyInfo.policy_name == policy_name).first()
    if db_policy_info:
        for key, value in policy_info_update.dict().items():
            setattr(db_policy_info, key, value)
        db.commit()
        db.refresh(db_policy_info)
    return db_policy_info

def delete_policy_info(policy_info_id: int, db: Session):
    db_policy_info = db.query(models.PolicyInfo).filter(models.PolicyInfo.policy_info_id == policy_info_id).first()
    # print(db_policy_info)
    if db_policy_info:
        db.delete(db_policy_info)
        db.commit()
    return db_policy_info

def get_messages(chat_id: int, db: Session):
    return db.query(models.Messages).filter(models.Messages.chat_id == chat_id).all()

def create_message(message: schemas.MessagesCreate, db: Session):
    db_message = models.Messages(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def create_policy(policy: schemas.PolicyInstanceCreate, db: Session):
    db_policy = models.PolicyInstance(**policy.dict())
    db.add(db_policy)
    db.commit()
    db.refresh(db_policy)
    return db_policy

def get_policy(policy_id: int, db: Session):
    return db.query(models.PolicyInstance).filter(models.PolicyInstance.policy_id == policy_id).first()

def update_policy(policy_id: int, policy_update: schemas.PolicyInstanceCreate, db: Session):
    db_policy = db.query(models.PolicyInstance).filter(models.PolicyInstance.policy_id == policy_id).first()
    if db_policy:
        for key, value in policy_update.dict().items():
            setattr(db_policy, key, value)
        db.commit()
        db.refresh(db_policy)
    return db_policy

def delete_policy(policy_id: int, db: Session):
    db_policy = db.query(models.PolicyInstance).filter(models.PolicyInstance.policy_id == policy_id).first()
    if db_policy:
        db.delete(db_policy)
        db.commit()
    return db_policy

def get_user(user_id: int, db: Session):
    return db.query(models.PolicyHolder).filter(models.PolicyHolder.holder_id == user_id).first()

def create_chat(chat: schemas.ChatCreate, db: Session):
    db_chat = models.Chat(**chat.dict())
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return db_chat

def delete_chat(chat_id: int, db: Session):
    db_chat = db.query(models.Chat).filter(models.Chat.chat_id == chat_id).first()
    if db_chat:
        db.delete(db_chat)
        db.commit()
    return db_chat
