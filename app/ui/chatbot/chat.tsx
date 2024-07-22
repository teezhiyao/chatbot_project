"use client";

import { ChatMessage } from "@/app/lib/definitions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import React, { useState, ChangeEvent, MouseEvent, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import ChatHistory from "./chathistory"; // Adjust the import path as necessary

export default function ChatBot() {
  const [message, setMessage] = useState<string>("");
  const [sent_messages, setSentMessages] = useState<ChatMessage[]>();
  // const [messages, setMessages] = useState("")

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch("/api/chat/1");
      const data: ChatMessage[] = await res.json();
      setSentMessages(data);
    }

    fetchMessages();
  }, []);

  const handleSend = async (
    event: MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    event.preventDefault();
    // console.log("Button clicked");
    if (message.trim()) {
      // console.log("Sending message:", message);
      const msg: ChatMessage = {
        message_id: -1,
        chat_id: 1,
        sender_id: 1,
        content: message,
        sent_at: new Date(),
      };

      async function sendMessage(msg: ChatMessage): Promise<ChatMessage> {
        const res = await fetch("/api/messages/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(msg),
        });
        const data = await res.json();
        return data as ChatMessage;
      }

      const reply: ChatMessage = await sendMessage(msg);

      setSentMessages((currentMessages) =>
        currentMessages ? [...currentMessages, msg, reply] : [msg, reply]
      );

      setMessage("");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      handleSend;
    }
  };

  return (
    <Box>
      <Box
        sx={{
          width: "100%", // Full width of the parent
          height: "90vh", // Fixed height for scrollable area
          overflowY: "auto", // Enable vertical scrolling
          // border: "1px solid #ccc", // Optional: border for better visibility
          padding: "16px", // Optional: padding inside the container
        }}
      >
        <ChatHistory messages={sent_messages} />s
      </Box>
      <Grid container sx={{ flexGrow: 1 }} component="form">
        <Grid xs={10}>
          <TextField
            label="Type a message"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            variant="outlined"
            value={message}
            fullWidth
          />
        </Grid>
        <Grid xs={2}>
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-700 text-white"
            type="submit"
          >
            Sends
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
