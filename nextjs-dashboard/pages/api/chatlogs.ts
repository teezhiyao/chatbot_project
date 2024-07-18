import type { VercelRequest, VercelResponse } from "@vercel/node";
// import { fetchChatLogs } from "../../lib/fetchChatLogs";
import { fetchChatLogs } from "../../app/lib/data";

export const config = {
  runtime: "nodejs",
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  try {
    const messages = await fetchChatLogs();

    // Set headers to disable caching
    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}
