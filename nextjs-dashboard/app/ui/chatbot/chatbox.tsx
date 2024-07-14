'use client';

import { useEffect, useState } from 'react';
// import io from 'socket.io-client';

// const socket = io();

const Chatbox: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  // useEffect(() => {
  //   socket.on('message', (msg: string) => {
  //     setMessages((prevMessages) => [...prevMessages, msg]);
  //   });

  //   return () => {
  //     // socket.off('message');
  //   };
  // }, []);

  const sendMessage = () => {
    if (message.trim()) {
      // socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col p-4 border rounded shadow-md max-w-md mx-auto">
      <div className="flex-1 overflow-y-auto border-b mb-4 p-2 h-64">
        {messages.map((msg, index) => (
          <div key={index} className="p-2 border-b">{msg}</div>
        ))}
      </div>
      <div className="flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-1 p-2 border rounded mr-2"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
