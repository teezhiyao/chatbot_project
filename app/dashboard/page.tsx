import ChatLog from '@/app/ui/dashboard/chatLog';
// import { lusitana } from '@/app/ui/fonts';
import { fetchChatLogs } from '@/app/lib/data';

export default async function Page() {
  const chatlogs = await fetchChatLogs();
  console.log(chatlogs)
  return (
    <main>
      <ChatLog chatlogs={chatlogs}  />
    </main>
  );
}