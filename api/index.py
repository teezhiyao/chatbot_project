from fastapi import Depends, FastAPI, HTTPException
from . import models, schemas, crud
from .database import SessionLocal, engine
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

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
def create_policy_info(policy_info: schemas.PolicyInfoCreate ,db: Session = Depends(get_db)):
    return crud.create_policy_info(policy_info, db)

@app.get("/api/policyInfo")
def read_policy_info(policy_name: str, db: Session = Depends(get_db)):
    return db.query(models.PolicyInfo).filter(models.PolicyInfo.policy_name == policy_name).all()


@app.put("/api/policyInfo")
def update_policy_info(db: Session = Depends(get_db)):
    return {"message": "Update Policy Info"}

@app.delete("/api/policyInfo")
def delete_policy_info(db: Session = Depends(get_db)):
    return {"message": "Delete Policy Info"}

@app.post("/api/policy")
def create_policy(db: Session = Depends(get_db)):
    return {"message": "Create Policy"}

@app.get("/api/policy")
def read_policy(db: Session = Depends(get_db)):
    return {"message": "Read Policy"}

@app.put("/api/policy")
def update_policy(db: Session = Depends(get_db)):
    return {"message": "Update Policy"}

@app.delete("/api/policy")
def delete_policy(db: Session = Depends(get_db)):
    return {"message": "Delete Policy"}

@app.get("/api/user")
def read_user(db: Session = Depends(get_db)):
    return {"message": "Read User"}

@app.post("/api/chat")
def create_chat(db: Session = Depends(get_db)):
    return {"message": "Create Chat"}

@app.get("/api/chat/{chat_id}")
def read_chatlogs(chat_id: str, db: Session = Depends(get_db)):
    return crud.get_messages(chat_id, db)

@app.delete("/api/chat/{chat_id}")
def delete_chat(chat_id: str, db: Session = Depends(get_db)):
    return {"message": f"Delete Chat {chat_id}"}

@app.post("/api/messages/", response_model=schemas.Messages)
def create_message(message: schemas.MessagesCreate, db: Session = Depends(get_db)):
    db_message = crud.create_message(message,db)
    return db_message

