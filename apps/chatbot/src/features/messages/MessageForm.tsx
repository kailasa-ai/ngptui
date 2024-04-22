import React, { useState } from "react";
import { ArrowUp, Send } from "lucide-react";

import ChatInput from "@/features/messages/components/ChatInput";

import { useMessageForm } from "./hooks/useMessageForm";

import { cn } from "@/lib/utils";

type Props = {
  conversationId?: string;
};

const MessageForm = (props: Props) => {
  const { sendMessage } = useMessageForm();

  const [query, setQuery] = useState("");

  return (
    <form
      className={cn(
        "stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
      )}
    >
      <div
        className={cn(
          "overflow-hidden [&:has(textarea:focus)]:border-token-border-xheavy",
          "[&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col",
          "w-full flex-grow relative border dark:text-white rounded-2xl bg-token-main-surface-primary border-token-border-medium"
        )}
      >
        <ChatInput
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (query) {
                sendMessage({
                  query,
                  conversationId: props.conversationId,
                });

                setQuery("");
              }
            }
          }}
        />
        <button
          disabled={!query}
          className={cn(
            "absolute bottom-2 right-2 rounded-lg border border-black bg-black p-2 ",
            "text-white transition-colors enabled:bg-black disabled:text-gray-400",
            "disabled:opacity-10 dark:border-white dark:bg-white dark:hover:bg-white md:right-3"
          )}
        >
          <Send size={18} />
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
