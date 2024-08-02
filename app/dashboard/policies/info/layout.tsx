"use client";

import { Container, Box, Grid, Drawer } from "@mui/material";
// import CreatePolicyNav, {
//   drawerWidth,
// } from "@/app/ui/dashboard/policy_instance/instance_create";
import * as React from "react";
import { useState } from "react";
import PolicyForm from "@/app/ui/dashboard/policy_info/info_create";

export const drawerWidth = "360px";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown"
        // (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-800">
      {/* <CreatePolicyNav /> */}
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <PolicyForm></PolicyForm>
      </Drawer>
      {/* <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-gray-800"> */}
      <Box
        sx={{
          flexGrow: 1, // Allow the content to take remaining space
          p: 3, // Padding
          overflowY: "auto", // Enable vertical scrolling if needed
          bgcolor: "background.gray", // MUI background color
          marginRight: `${drawerWidth}`, // Adjust the main content to account for the drawer width
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </div>
  );
}
