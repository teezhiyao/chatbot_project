import ChatSideNav from "@/app/ui/chatbot/chatbot_sidenav";
import { Container, Box } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-800">
      <ChatSideNav />

      {/* <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-gray-800"> */}
      <Box
        sx={{
          flexGrow: 1, // Allow the content to take remaining space
          p: 3, // Padding
          overflowY: "auto", // Enable vertical scrolling if needed
          bgcolor: "background.gray", // MUI background color
        }}
      >
        {/* <Container>{children}</Container> */}
        {children}
        {/* <Box>{children}</Box> */}
      </Box>
    </div>
  );
}
