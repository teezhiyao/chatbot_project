from . import crud, models, schemas

def check_common_reply(user_message, db):
    print(user_message)
    if user_message == "hi":
        # msg = models.Messages(content = "hiee", user_id = -1)
        msg = schemas.MessagesCreate(chat_id =1, content = 'hiee', sender_id = -1)
    else:
        msg = schemas.MessagesCreate(chat_id =1, content = 'Sorry, I am unable to give you an answer', sender_id = -1)
    return crud.create_message(msg, db)
    
