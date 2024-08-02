import os
import re
import joblib
import torch
import requests
from transformers import BertTokenizer, BertForSequenceClassification, BertForTokenClassification, Trainer, \
    TrainingArguments
from datetime import datetime

def train_algo(model_intent, model_ner, train_dataset_intent, train_dataset_ner, test_dataset_intent, test_dataset_ner,
               tokenizer):
    training_args = TrainingArguments(
        output_dir='./results',
        num_train_epochs=50,
        per_device_train_batch_size=4,
        per_device_eval_batch_size=4,
        warmup_steps=500,
        weight_decay=0.01,
        logging_dir='./logs',
        logging_steps=10,
        evaluation_strategy="epoch"
    )

    trainer_intent = Trainer(
        model=model_intent,
        args=training_args,
        train_dataset=train_dataset_intent,
        eval_dataset=test_dataset_intent,
        tokenizer=tokenizer
    )

    trainer_ner = Trainer(
        model=model_ner,
        args=training_args,
        train_dataset=train_dataset_ner,
        eval_dataset=test_dataset_ner,
        tokenizer=tokenizer
    )

    trainer_intent.train()
    trainer_ner.train()

    # Save the models
    model_intent.save_pretrained('./intent_model')
    model_ner.save_pretrained('./ner_model')

    tokenizer.save_pretrained('./tokenizer')


def predict_intent(text, tokenizer, model, max_len,intent_label_encoder):
    # label_encoder = joblib.load('label_encoder.pkl')

    encoding = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        max_length=max_len,
        return_token_type_ids=False,
        padding='max_length',
        return_attention_mask=True,
        return_tensors='pt',
        truncation=True
    )
    input_ids = encoding['input_ids']
    attention_mask = encoding['attention_mask']

    with torch.no_grad():
        outputs = model(input_ids, attention_mask=attention_mask)
    logits = outputs.logits
    predicted_class = torch.argmax(logits, dim=1).item()

    intent = intent_label_encoder.inverse_transform([predicted_class])[0]
    return intent


def rule_based_ner(text):
    policy_name = [
    "AIA Around the World Plus (II)",
    "AIA Mortgage Reducing Term Assurance",
    "AIA Premier Disability Cover",
    "AIA Pay Protector",
    "AIA Absolute Critical Cover",
    "AIA Beyond Critical Care",
    "AIA Mum2Baby Choices",
    "AIA Platinum Health",
    "AIA Life Dividends"
]

    patterns = {
        "DURATION": r"\b(\d+ day(?:s)?)\b",
        "DATE": r"\b(\d+ day(?:s)?)\b",
        "POLICY_NAME": r"(" + "|".join(policy_name) + r")$" ,
        "POLICY_INFO_ID": r"policy info id \d",
        "POLICY_INSTANCE_ID": r"policy id \d"
        }

    entities = []
    for label, pattern in patterns.items():
        matches = re.finditer(pattern, text)
        for match in matches:
            entity = {"label": label, "text": match.group(), "start": match.start(), "end": match.end()}
            entities.append(entity)

    return entities

def format_policy_instance(policy_instance):
    status_mapping = {
        1: "Active",
        0: "Inactive",
        # Add more status codes if needed
    }
    
    def format_date(date_str):
        date_obj = datetime.strptime(date_str, '%Y-%m-%d')
        return date_obj.strftime('%B %d, %Y')
    
    policy_info_id = policy_instance.get('policy_info_id', 'N/A')
    user_id = policy_instance.get('user_id', 'N/A')
    start_date = format_date(policy_instance.get('start_date', ''))
    end_date = format_date(policy_instance.get('end_date', ''))
    status = status_mapping.get(policy_instance.get('status', 'Unknown'), 'Unknown')
    username = policy_instance.get('username', 'N/A')
    policy_id = policy_instance.get('policy_id', 'N/A')
    
    formatted_info = f"""
    Policy Instance: <br />
    - Policy ID: {policy_id} <br />
    - Policy Info ID: {policy_info_id} <br />
    - User ID: {user_id} <br />
    - Username: {username if username else 'N/A'} <br />
    - Start Date: {start_date} <br />
    - End Date: {end_date} <br />
    - Status: {status} <br />
    """
    
    return formatted_info

def format_policy_info(policy_instance):
    
    product_type = policy_instance.get('policy_info_id', 'N/A')
    product_category = policy_instance.get('product_category', 'N/A')
    description = policy_instance.get('description', 'N/A')
    policy_name = policy_instance.get('policy_name', 'N/A')
    policy_info_id = policy_instance.get('policy_info_id', 'N/A')
    # username = policy_instance.get('username', 'N/A')
    # policy_id = policy_instance.get('policy_id', 'N/A')
    
    formatted_info = f"""
    Policy Information: <br />
    - Policy Info ID: {product_type} <br />
    - User ID: {product_category} <br />
    - Username: {description if description else 'N/A'} <br />
    - Policy Name: {policy_name} <br />
    - Policy Info Id: {policy_info_id} <br />
    """
    
    return formatted_info


def generate_response(intent, entities):
    response_templates = {
        "Policy Enquiry": "Travel insurance covers medical expenses, trip cancellations, lost luggage, flight accidents, and other losses incurred while traveling.",
        "Policy Instance Enquiry": "To file a claim, please visit our claims portal and follow the instructions provided. You will need your policy number and relevant documents."
    }
    intent_labels = ["Policy Enquiry", "Policy Instance Enquiry"]

    if intent == "Policy Enquiry" and entities:
        # print(entities[0]['text'])
        # print(entities[0]['text'][-1])
        # print(get_policy_info_req(entities[0]['text'][-1]))
        # response = f"Policy Enquiry - The details about the policy {entities[0]['text']} is - \n {get_policy_info_req(entities[0]['text'][-1])}"
        response = f"Policy Enquiry - The details about the policy {entities[0]['text']} is - \n {format_policy_info(get_policy_info_req(entities[0]['text'][-1]))}"
    elif intent == "Policy Instance Enquiry" and entities:
        response = f"Policy Instance Enquiry - The details about your policy is as follow {format_policy_instance(get_policy_instance_req(entities[0]['text'][-1]))}"

    else:
        # response = response_templates.get(intent, "I'm sorry, I don't understand your question.")
        response = "I'm sorry, I don't understand your question."

    return response

def get_policy_info_req(policy_info_id):
    url = f"http://localhost:8000/api/policyInfo/{policy_info_id}"

    payload = ""
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)
    return response.json()
def get_policy_instance_req(policy_instance_id):
    url = f"http://localhost:8000/api/policyInstance/{policy_instance_id}"

    payload = ""
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)
    return response.json()

def run_prediction(user_message):
    base_dir = os.path.join(os.getcwd(),"api","algorithm") # Home directory
    # base_dir = os.path.join(os.getcwd()) # Home directory

    tokenizer = BertTokenizer.from_pretrained(os.path.join(base_dir, 'tokenizer'))
    model_intent = BertForSequenceClassification.from_pretrained(os.path.join(base_dir, 'intent_model'))

    max_len = 50
    label_encoder = joblib.load( os.path.join(base_dir,'label_encoder.pkl'))

    intent = predict_intent(user_message, tokenizer, model_intent, max_len, label_encoder)
    entities = rule_based_ner(user_message)
    response = generate_response(intent, entities)
    print(f"Predicted intent: {intent}")
    print(f"Extracted entities: {entities}")
    print(f"Response: {response}")
    return response


if __name__ == "__main__":
    # check_response('hello')
    # tokenizer = BertTokenizer.from_pretrained('./tokenizer')
    # model_intent = BertForSequenceClassification.from_pretrained('./intent_model')

    # max_len = 50
    text = "Explain benefits of policy info id 1?"
    run_prediction(text)
    # intent = predict_intent(text, tokenizer, model_intent, max_len)
    # entities = rule_based_ner(text)
    # response = generate_response(intent, entities)
    # print(f"Predicted intent: {intent}")
    # print(f"Extracted entities: {entities}")
    # print(f"Response: {response}")
