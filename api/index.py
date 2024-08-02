from fastapi import Depends, FastAPI, HTTPException
from . import models, schemas, crud
from .algorithm.data_processing import check_common_reply
from .database import SessionLocal, engine
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import List

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this if your frontend runs on a different port
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/policyInfo", response_model=schemas.PolicyInfo)
def create_policy_info(policy_info: schemas.PolicyInfoCreate, db: Session = Depends(get_db)):
    return crud.create_policy_info(policy_info, db)

@app.get("/api/policyInfo/{policy_info_id}", response_model=schemas.PolicyInfo)
def read_policy_info(policy_info_id: int, db: Session = Depends(get_db)):
    db_policy_info = crud.get_policy_info(policy_info_id, db)
    if db_policy_info is None:
        raise HTTPException(status_code=404, detail="PolicyInfo not found")
    return db_policy_info

@app.get("/api/policyInfo", response_model=list[schemas.PolicyInfo])
def read_all_policy_info(db: Session = Depends(get_db)):
    db_policy_info = crud.get_all_policy_info(db)
    # if db_policy_info is None:
    #     raise HTTPException(status_code=404, detail="PolicyInfo not found")
    return db_policy_info

# @app.put("/api/policyInfo", response_model=schemas.PolicyInfo)
# def update_policy_info(policy_name: str, policy_info_update: schemas.PolicyInfoCreate, db: Session = Depends(get_db)):
#     db_policy_info = crud.get_policy_info(policy_name, db)
#     if db_policy_info is None:
#         raise HTTPException(status_code=404, detail="PolicyInfo not found")
#     return crud.update_policy_info(policy_name, policy_info_update, db)

# @app.delete("/api/policyInfo", response_model=schemas.PolicyInfo)
# def delete_policy_info(policy_info: schemas.PolicyInfo, db: Session = Depends(get_db)):
#     db_policy_info = crud.get_policy_info(policy_info.policy_info_id, db)
#     if db_policy_info is None:
#         raise HTTPException(status_code=404, detail="PolicyInfo not found")
#     return crud.delete_policy_info(policy_info.policy_info_id, db)

@app.post("/api/policyInstance", response_model=schemas.PolicyInstance)
def create_policy(policy: schemas.PolicyInstanceCreate, db: Session = Depends(get_db)):
    return crud.create_policy(policy, db)


# @app.get("/api/policyInstance/", response_model=list[schemas.PolicyInstance])
@app.get("/api/policyInstance")
def read_all_policy_instance(db: Session = Depends(get_db)):
    db_policy = crud.get_all_policy_instance(db)
    if db_policy is None:
        raise HTTPException(status_code=404, detail="Policy not found")
    return db_policy


@app.get("/api/policyInstance/{policy_id}", response_model=schemas.PolicyInstance)
def read_policy(policy_id: int, db: Session = Depends(get_db)):
    # print(policy_id)
    db_policy = crud.get_policy(policy_id, db)
    # print('hello after db policy')
    # print(db_policy)
    if db_policy is None:
        raise HTTPException(status_code=404, detail="Policy not found")
    return db_policy

# @app.put("/api/policyInstance", response_model=schemas.PolicyInstance)
# def update_policy(policy_id: int, policy_update: schemas.PolicyInstanceCreate, db: Session = Depends(get_db)):
#     db_policy = crud.get_policy(policy_id, db)
#     if db_policy is None:
#         raise HTTPException(status_code=404, detail="Policy not found")
#     return crud.update_policy(policy_id, policy_update, db)

# @app.delete("/api/policyInstance", response_model=schemas.PolicyInstance)
# def delete_policy(policy_id: int, db: Session = Depends(get_db)):
#     db_policy = crud.get_policy(policy_id, db)
#     if db_policy is None:
#         raise HTTPException(status_code=404, detail="Policy not found")
#     return crud.delete_policy(policy_id, db)

@app.get("/api/user/{user_id}", response_model=schemas.PolicyHolder)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_with_id(user_id, db)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# @app.post("/api/chat", response_model=schemas.Chat)
# def create_chat(chat: schemas.ChatCreate, db: Session = Depends(get_db)):
#     return crud.create_chat(chat, db)

@app.get("/api/chat/{chat_id}", response_model=List[schemas.Messages])
def read_chatlogs(chat_id: int, db: Session = Depends(get_db)):
    return crud.get_messages(chat_id, db)

# @app.delete("/api/chat/{chat_id}", response_model=schemas.Chat)
# def delete_chat(chat_id: int, db: Session = Depends(get_db)):
#     db_chat = crud.delete_chat(chat_id, db)
#     if db_chat is None:
#         raise HTTPException(status_code=404, detail="Chat not found")
#     return db_chat

@app.post("/api/messages", response_model=schemas.Messages)
def create_message(message: schemas.MessagesCreate, db: Session = Depends(get_db)):
    crud.create_message(message, db)
    reply = check_common_reply(message.content, db)
    return reply