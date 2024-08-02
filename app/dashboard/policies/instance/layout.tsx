"use client";

import { Container, Box, Grid, Drawer } from "@mui/material";
// import Create, { drawerWidth } from "@/app/ui/dashboard/policy_instance/create_policy_instance_nav";
import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PolicyInstanceForm from "@/app/ui/dashboard/policy_instance/instance_create";

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
        <PolicyInstanceForm></PolicyInstanceForm>
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
