import ChatBot from "@/app/ui/chatbot/chat";
import { fetchChatLogs } from "@/app/lib/data";
import { ChatMessage } from "../lib/definitions";

export default async function Page() {
  // const data = await fetch("/api/chatlogs?cache-bust=" + Date.now());
  // const chatlogs: ChatMessage[] = await data.json();
  // console.log(chatlogs.length);
  return (
    <main>
      <ChatBot />
    </main>
  );
}

export const revalidate = false;
