"use client";
import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const drawerWidth = 240;

export default function ChatSideNav() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // const toggleDrawer = () => {
  //   setOpen(!open);
  // };

  return (
    <Box>
      <IconButton
        // edge="start"
        // color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        sx={{
          // display: { xs: "block", md: "none" },
          color: "white",
          backgroundColor: "primary.main",
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <IconButton onClick={toggleDrawer} sx={{ margin: 2 }}>
          <CloseIcon />
        </IconButton>
        <Divider />
        <List>
          <ListItem>
            <Button onClick={toggleDrawer}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="New Chat" />
            </Button>
          </ListItem>
          {/* <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem> */}
        </List>
      </Drawer>
      {/* Content can be placed here or adjusted to move when drawer opens */}
    </Box>
  );
}
