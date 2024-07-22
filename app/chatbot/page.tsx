import ChatBot from "@/app/ui/chatbot/chat";

export default async function Page() {
  // const data = await fetch("/api/chatlogs?cache-bust=" + Date.now());
  // const chatlogs: ChatMessage[] = await data.json();
  // console.log(chatlogs.length);
  return <ChatBot />;
}

export const revalidate = false;
