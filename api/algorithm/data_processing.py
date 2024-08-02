from api import crud, models, schemas
from ..algorithm.training import run_prediction

insurance_faq = {
    "What is insurance?": "Insurance is a contract in which an individual or entity receives financial protection or reimbursement against losses from an insurance company.",
    "What are the different types of insurance?": "Common types of insurance include health insurance, life insurance, auto insurance, home insurance, and travel insurance.",
    "How does insurance work?": "Insurance works by pooling the risks of many policyholders to cover the financial losses of a few. You pay a premium to an insurance company, which then provides compensation in the event of covered incidents.",
    "What is a premium?": "A premium is the amount of money you pay periodically (monthly, quarterly, or annually) to keep your insurance policy active.",
    "What is a deductible?": "A deductible is the amount of money you agree to pay out-of-pocket before your insurance coverage kicks in. Higher deductibles usually result in lower premiums."
}



def check_common_reply(user_message, db):
    print(user_message)
    if user_message in insurance_faq.keys():
        # msg = models.Messages(content = "hiee", user_id = -1)
        msg = schemas.MessagesCreate(chat_id =1, content = insurance_faq[user_message], sender_id = -1)
    else:
        response = run_prediction(user_message)
        msg = schemas.MessagesCreate(chat_id =1, content = response, sender_id = -1)
    return crud.create_message(msg, db)