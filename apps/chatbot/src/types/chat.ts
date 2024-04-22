import { Feedbacktype } from "./response";

export type Conversation = {
  id: string;
  name: string;
  status: "normal";
  created_at: number;
};

export type RawMessage = {
  id: string;
  conversation_id: string;
  query: string;
  answer: string;
  created_at: number;
  agent_thoughts: [];
  error: null;
  inputs: {};
  message_files: [];
  retriever_resources: [];
  status: "normal";
};

export type Message = {
  id: string;
  conversationId: string;
  content: string;
  createdAt: number;
  role: "user" | "assistant";
  feedback: Feedbacktype | null;
};
