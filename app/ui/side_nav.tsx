"use client";
import React from "react";

import { useRouter } from "next/navigation";
import DrawerTemplate from "./drawer_base";

const drawerWidth = 240;

export default function ChatSideNav() {
  const items = [{ text: "Chatbot", path: "/chatbot" }];
  const adminItems = [
    { text: "Policy Info", path: "/dashboard/policies/info" },
    { text: "Policy Instance", path: "/dashboard/policies/instance" },
    { text: "Chat Interactions", path: "/dashboard/chathistory" },
  ];
  const router = useRouter();

  return <DrawerTemplate items={items} adminItems={adminItems} anchor="left" />;
}
