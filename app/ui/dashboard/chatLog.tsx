import { ChatMessage } from "@/app/lib/definitions";

export default async function ChatLog({
  chatlogs,
}: {
  chatlogs: ChatMessage[];
}) {
  // NOTE: Uncomment this code in Chapter 7

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md max-w-2xl mx-auto">
      {chatlogs.map((msg) => (
        <div
          key={msg.chat_id}
          className={`mb-4 p-3 bg-white rounded-lg shadow ${
            msg.sender_id === 1 ? "text-right" : "text-left"
          }`}
        >
          <span className="font-semibold text-gray-800">
            {(msg.sender_id === 1 ? "AI" : "User") +
              " sent at " +
              new Date(msg.sent_at).toLocaleString()}
          </span>
          <div className="text-gray-700">{msg.content}</div>
        </div>
      ))}
    </div>
  );
}
