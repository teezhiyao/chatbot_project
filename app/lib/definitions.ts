// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

// export type ChatMessage = {
//   message_id: number;
//   chat_id: number;
//   sender_id: number;
//   content: string;
//   sent_at: Date;
// }

// PolicyTier interface
export interface PolicyTier {
  policy_tier: number;
  duration_month: number;
  premium: string;
  payout: string;
  total_coverage: string;
}

// PolicyHolder interface
export interface PolicyHolder {
  holder_id: number;
  username: string;
  password: string;
  policies?: PolicyInstance[];
  messages?: ChatMessage[];
}

// Policy interface
export interface PolicyInstance {
  policy_id: number;
  policy_info_id: number;
  user_id: number;
  start_date: string; // Using string to represent date in ISO format
  end_date: string; // Using string to represent date in ISO format
  status: number;
  username: number;
  holder?: PolicyHolder;
  info?: PolicyInfo;
}

// PolicyInfo interface
export interface PolicyInfo {
  policy_info_id: number;
  policy_name: string;
  product_type: string;
  product_category: string;
  description: string;
  policies?: PolicyInstance[];
}

// Chat interface
export interface Chat {
  chat_id: number;
  chat_name: string;
  created_at: string; // Using string to represent timestamp in ISO format
  messages?: ChatMessage[];
}

// Message interface
export interface ChatMessage {
  message_id: number;
  chat_id: number;
  sender_id: number;
  content: string;
  sent_at: Date; // Using string to represent timestamp in ISO format
  chat?: Chat;
  sender?: PolicyHolder;
}
