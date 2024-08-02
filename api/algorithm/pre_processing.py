import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from transformers import BertTokenizerFast, BertForSequenceClassification, BertForTokenClassification, Trainer, \
    TrainingArguments
import torch
from api.algorithm.CustomDataset import CustomDataset
from training import train_algo
from sklearn.preprocessing import LabelEncoder
import torch.utils.data
from test_data import data


def prepare_data():
    df = pd.DataFrame(data)
    train_df, test_df = train_test_split(df, test_size=0.2, random_state=42)

    return train_df, test_df


def encode_data(df, tokenizer, max_len, ner_encoder):
    input_ids = []
    attention_masks = []
    intent_labels = []
    ner_labels_list = []
    intent_encoder = LabelEncoder()
    df['intent'] = intent_encoder.fit_transform(df['intent'])
    joblib.dump(intent_encoder, 'label_encoder.pkl')

    for _, row in df.iterrows():
        # print('new row')
        text = row['text']
        intent = row['intent']
        entities = row['entities']

        encoded_dict = tokenizer.encode_plus(
            text,
            add_special_tokens=True,
            max_length=max_len,
            padding='max_length',
            return_attention_mask=True,
            return_offsets_mapping=True,
            truncation=True
        )


        # NER labels encoding
        ner_labels_inner = [ner_encoder['O']] * max_len  # default to 'O' for outside
        # print(ner_labels_inner)

        offset_mapping = encoded_dict['offset_mapping']
        for entity in entities:
            start_char = entity['start']
            end_char = entity['end']
            label = entity['label']

            for idx, (start, end) in enumerate(offset_mapping):
                if start is None or end is None:
                    continue

                if start >= start_char and end <= end_char:
                    ner_labels_inner[idx] = ner_encoder[label]

        input_ids.append(encoded_dict['input_ids'])
        attention_masks.append(encoded_dict['attention_mask'])
        intent_labels.append(intent)
        ner_labels_list.append(ner_labels_inner)

    return (
        torch.tensor(input_ids),
        torch.tensor(attention_masks),
        torch.tensor(intent_labels),
        torch.tensor(ner_labels_list)
    )


if __name__ == "__main__":
    max_len = 50
    intent_labels = ["Policy Enquiry", " Policy Instance Enquiry"]
    ner_labels = ['O', 'DURATION', 'DATE', 'POLICY_NAME', 'POLICY_INFO_ID', "POLICY_INSTANCE_ID"]
    tokenizer = BertTokenizerFast.from_pretrained('bert-base-uncased')

    model_intent = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=len(intent_labels))
    model_ner = BertForTokenClassification.from_pretrained('bert-base-uncased', num_labels=len(ner_labels))
    ner_encoder = {label: i for i, label in enumerate(ner_labels)}
    train_df, test_df = prepare_data()
    train_input_ids, train_attention_masks, train_intent_labels, train_ner_labels = encode_data(train_df, tokenizer,
                                                                                                max_len, ner_encoder)
    test_input_ids, test_attention_masks, test_intent_labels, test_ner_labels = encode_data(test_df, tokenizer, max_len,
                                                                                            ner_encoder)

    train_dataset_intent = CustomDataset(train_input_ids, train_attention_masks, train_intent_labels, 'intent train')
    train_dataset_ner = CustomDataset(train_input_ids, train_attention_masks, train_ner_labels, 'ner train')

    test_dataset_intent = CustomDataset(test_input_ids, test_attention_masks, test_intent_labels, 'intent test')
    test_dataset_ner = CustomDataset(test_input_ids, test_attention_masks, test_ner_labels, 'ner test')

    train_algo(model_intent, model_ner, train_dataset_intent, train_dataset_ner, test_dataset_intent, test_dataset_ner, tokenizer)
