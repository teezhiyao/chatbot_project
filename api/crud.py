from sqlalchemy.orm import Session

from . import models, schemas

def create_policy_info(policy_info: schemas.PolicyInfoCreate, db: Session):
    db_message = models.PolicyInfo(policy_name=policy_info.policy_name, 
                                   product_type=policy_info.product_type, 
                                   product_category=policy_info.product_category, 
                                   description=policy_info.description)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

def get_policy_info(policy_name: int, db: Session):
    return db.query(models.PolicyInstance).filter(models.PolicyInstance.policy_id == policy_id).first()

def get_messages(chat_id: int, db: Session):
    return db.query(models.Messages).filter(models.Messages.chat_id == chat_id).all()

def create_message(message: schemas.MessagesCreate , db: Session):
    db_message = models.Messages(chat_id=message.chat_id, sender_id=message.sender_id, content=message.content)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

# def delete_message(message: schemas.MessagesCreate , db: Session):
#     db_message = models.Messages(chat_id=message.chat_id, sender_id=message.sender_id, content=message.content)
#     db.add(db_message)
#     db.commit()
#     db.refresh(db_message)
#     return db_message