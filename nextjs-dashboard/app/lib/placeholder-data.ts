// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:

const policyTiers = [
  { tier_name: 'Basic', tier_description: 'Basic coverage' },
  { tier_name: 'Standard', tier_description: 'Standard coverage' },
  { tier_name: 'Premium', tier_description: 'Premium coverage' },
];

const policyHolders = [
  { holder_name: 'John Doe', holder_address: '123 Elm St', holder_phone: '555-1234' },
  { holder_name: 'Jane Smith', holder_address: '456 Oak St', holder_phone: '555-5678' },
  { holder_name: 'Jim Brown', holder_address: '789 Pine St', holder_phone: '555-8765' },
];

const policies = [
  { policy_number: 'POL123', tier_id: 1, holder_id: 1, start_date: '2023-01-01', end_date: '2024-01-01' },
  { policy_number: 'POL456', tier_id: 2, holder_id: 2, start_date: '2023-06-01', end_date: '2024-06-01' },
  { policy_number: 'POL789', tier_id: 3, holder_id: 3, start_date: '2023-09-01', end_date: '2024-09-01' },
];

const policyInfos = [
  { policy_id: 1, info_details: 'Basic policy with minimal coverage' },
  { policy_id: 2, info_details: 'Standard policy with additional benefits' },
  { policy_id: 3, info_details: 'Premium policy with full coverage' },
];

const chats = [
  { chat_name: 'Customer Support', created_at: '2024-07-15 10:00:00' },
  { chat_name: 'Policy Inquiry', created_at: '2024-07-15 11:00:00' },
  { chat_name: 'Claim Support', created_at: '2024-07-15 12:00:00' },
];

const messages = [
  { chat_id: 1, sender_id: 1, content: 'Hello, I need help with my policy.', sent_at: '2024-07-15 10:01:00' },
  { chat_id: 1, sender_id: 2, content: 'Sure, I can help you with that.', sent_at: '2024-07-15 10:02:00' },
  { chat_id: 2, sender_id: 1, content: 'I have a question about my policy details.', sent_at: '2024-07-15 11:01:00' },
  { chat_id: 2, sender_id: 2, content: 'Please provide your policy number.', sent_at: '2024-07-15 11:02:00' },
  { chat_id: 3, sender_id: 1, content: 'I want to file a claim.', sent_at: '2024-07-15 12:01:00' },
  { chat_id: 3, sender_id: 2, content: 'I will guide you through the claim process.', sent_at: '2024-07-15 12:02:00' },
];

export { policyTiers, policyHolders, policies, policyInfos, chats, messages };
