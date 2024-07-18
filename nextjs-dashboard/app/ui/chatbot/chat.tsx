"use client";

import { ChatLogs, ChatMessage } from "@/app/lib/definitions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { sendMessage } from "@/app/lib/data";

export default function ChatBot() {
  const [message, setMessage] = useState<string>("");
  const [sent_messages, setSentMessages] = useState<ChatMessage[]>();
  // const [messages, setMessages] = useState("")

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch("/api/chatlogs?cache-bust=" + Date.now());
      const data: ChatMessage[] = await res.json();
      setSentMessages(data);
    }

    fetchMessages();
  }, []);

  const handleSend = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    console.log("Button clicked");
    if (message.trim()) {
      console.log("Sending message:", message);

      const msg: ChatMessage = {
        message_id: -1,
        chat_id: 1,
        sender_id: 1,
        content: message,
        sent_at: new Date(),
      };

      sendMessage(msg);

      setSentMessages((currentMessages) =>
        currentMessages ? [...currentMessages, msg] : [msg]
      );

      setMessage("");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      {sent_messages ? (
        sent_messages.map((msg) => (
          <div
            key={msg.message_id}
            className={`mb-4 p-3 bg-white rounded-lg shadow ${
              msg.sender_id === 2 ? "text-right" : "text-left"
            }`}
          >
            <div>
              <span className="text-sm text-gray-800">
                {new Date(msg.sent_at).toTimeString()}
              </span>
              <span className="font-semibold text-gray-800">
                {msg.sender_id === 2 ? " AI:" : " User:"}
              </span>
            </div>
            <div className="text-gray-700">{msg.content}</div>
          </div>
        ))
      ) : (
        <div></div>
      )}

      <Box
        sx={{
          position: "sticky",
          width: "100%",
        }}
      >
        <TextField
          label="Type a message"
          onChange={handleChange}
          variant="outlined"
          value={message}
        />
        <Button
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-700 text-white"
        >
          Sends
        </Button>
      </Box>
    </Container>
  );
}
