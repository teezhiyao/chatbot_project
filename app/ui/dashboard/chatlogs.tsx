"use client";

import { ChatMessage } from "@/app/lib/definitions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import React, {
  useState,
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import ChatlogComponent from "./chatlog_component"; // Adjust the import path as necessary
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ChatLogs() {
  const [message, setMessage] = useState<string>("");
  const [sent_messages, setSentMessages] = useState<ChatMessage[]>();
  // const [messages, setMessages] = useState("")
  // const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(newValue);
    fetchMessages(newValue + 1);
  };

  async function fetchMessages(chat_id: number) {
    const res = await fetch(`/api/chat/${chat_id}`);
    const data: ChatMessage[] = await res.json();
    setSentMessages(data);
  }

  useEffect(() => {
    fetchMessages(1);
  }, []);

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTab-root": {
              color: "white", // Change text color
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "red", // Change indicator color
            },
          }}
        >
          <Tab label="Chat One" {...a11yProps(0)} />
          <Tab label="Chat Two" {...a11yProps(1)} />
          <Tab label="Chat Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ChatlogComponent messages={sent_messages} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ChatlogComponent messages={sent_messages} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ChatlogComponent messages={sent_messages} />
      </CustomTabPanel>
    </Box>
  );
}
