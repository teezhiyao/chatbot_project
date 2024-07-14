'use client';

import dynamic from 'next/dynamic';
import { useEffect } from 'react';

// Dynamically import the Chatbox component to disable server-side rendering
const Chatbox = dynamic(() => import('../ui/chatbot/chatbox'), { ssr: false });

export default function Page() {
  useEffect(() => {
    fetch('/api/socket');
  }, []);

  return (
    <div>
      <h1>Chatbox</h1>
      {/* <Chatbox /> */}
    </div>
  );
}