import ChatBot from "@/app/ui/chatbot/chat";

export default async function Page() {
  return <ChatBot />;
}

export const revalidate = false;
