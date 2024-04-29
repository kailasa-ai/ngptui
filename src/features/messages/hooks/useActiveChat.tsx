import { Message } from "@/types/chat";
import { create } from "zustand";

type CurrentMessage = {
  messages: Message[];
  taskId: string | null;
  setMessages: (taskId: string, messages: Message[]) => void;
  updateMessage: (id: string, content: string) => void;
  clearState: () => void;
};

export const useActiveChat = create<CurrentMessage>((set) => ({
  messages: [],
  taskId: null,
  updateMessage: (id: string, content: string) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content: msg.content + content } : msg
      ),
    }));
  },
  setMessages: (taskId: string, messages: Message[]) => {
    set({ messages, taskId });
  },
  clearState: () => {
    set({ messages: [], taskId: null });
  },
}));
