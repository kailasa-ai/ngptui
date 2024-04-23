import { Message } from "@/types/chat";
import { create } from "zustand";

type CurrentMessage = {
  messages: Message[];
  taskId: string | null;
  addMessages: (taskId: string, message: Message[]) => void;
  updateMessage: (id: string, content: string) => void;
  clearState: () => void;
};

export const useActiveChat = create<CurrentMessage>((set) => ({
  messages: [],
  taskId: null,
  addMessages: (taskId: string, message: Message[]) => {
    set((state) => ({ messages: [...state.messages, ...message], taskId }));
  },
  updateMessage: (id: string, content: string) => {
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content: msg.content + content } : msg
      ),
    }));
  },
  clearState: () => {
    set({ messages: [], taskId: null });
  },
}));
