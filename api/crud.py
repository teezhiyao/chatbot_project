from sqlalchemy.orm import Session

from . import models, schemas


def get_messages(chat_id: int, db: Session):
    return db.query(models.Messages).filter(models.Messages.chat_id == chat_id).all()

def create_message(message: schemas.MessagesCreate , db: Session):
    db_message = models.Messages(chat_id=message.chat_id, sender_id=message.sender_id, content=message.content)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message


def get_policy_info(policy_name: int, db: Session):
    return db.query(models.Policy).filter(models.Policy.policy_id == policy_id).first()

# def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
#     db_item = models.Item(**item.dict(), owner_id=user_id)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item