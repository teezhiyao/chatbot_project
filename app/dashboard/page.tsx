import ChatBot from "@/app/ui/chatbot/chat";
import PolicyForm from "../ui/dashboard/policy_info/info_create";

export default async function Page() {
  return <PolicyForm />;
}

export const revalidate = false;
