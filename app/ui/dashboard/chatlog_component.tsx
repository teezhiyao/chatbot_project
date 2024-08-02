import React, { useEffect, useRef, useState } from "react";
import { ChatMessage, PolicyInfo, PolicyInstance } from "@/app/lib/definitions"; // Adjust the import path as necessary
import Grid from "@mui/material/Unstable_Grid2";

interface ChatHistoryProps {
  messages: ChatMessage[] | undefined;
}

const ChatlogComponent: React.FC<ChatHistoryProps> = ({ messages }) => {
  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  //   console.log(newValue);
  //   fetchMessages(newValue + 1);
  // };

  const extractPolicyInstance = (messages: any): PolicyInstance => {
    const {
      policy_info_id,
      user_id,
      start_date,
      end_date,
      status,
      username,
      policy_id,
    } = messages;

    return {
      policy_info_id,
      user_id,
      start_date,
      end_date,
      status,
      username,
      policy_id,
    };
  };

  return (
    <div>
      {messages ? (
        messages.map((msg) => (
          <Grid
            key={msg.message_id}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gridTemplateRows: "auto",
              gridTemplateAreas: `"leftText x rightText"`,
            }}
          >
            <Grid
              className={`mb-4 p-3 bg-white rounded-lg shadow`}
              sx={{
                gridColumn: `${
                  msg.sender_id === -1 ? "4 / span 3" : "3 / span 3"
                }`,
              }}
            >
              <div className="text-gray-700">{msg.content}</div>
              <div className="text-right">
                <span style={{ fontSize: "12px", color: "#4a4a4a" }}>
                  {(msg.sender_id === -1 ? " AI at " : " User at ") +
                    new Date(msg.sent_at).toTimeString()}
                </span>
              </div>
            </Grid>
          </Grid>
        ))
      ) : (
        <div>No messages</div>
      )}
    </div>
  );
};

export default ChatlogComponent;
