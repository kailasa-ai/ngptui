"use client";

import React, { useState } from "react";
import { Square, ArrowUp, Loader } from "lucide-react";

import IconButton from "./components/IconButton";
import ChatInput from "./components/ChatInput";

import { useMessageFormMutation } from "./queries/useMessageFormMutation";
import { useStopMessageMutation } from "./queries/useStopMessageMutation";
import { useActiveChat } from "./hooks/useActiveChat";

import { cn } from "@/lib/utils";

type Props = {
  conversationId?: string;
};

const MessageForm = (props: Props) => {
  const { sendMessage, isPending, isSuccess } = useMessageFormMutation();
  const { stopMessage } = useStopMessageMutation({
    conversationId: props.conversationId,
  });

  const [query, setQuery] = useState("");

  return (
    <form
      className={cn(
        "stretch mx-2 flex flex-col gap-3 last:mb-2 md:mx-4 lg:mx-auto",
        "lg:max-w-2xl xl:max-w-3xl"
      )}
    >
      <div
        className={cn(
          "overflow-hidden [&:has(textarea:focus)]:border-token-border-xheavy",
          "[&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col",
          "w-full flex-grow relative border dark:text-white rounded-2xl border-token-border-medium"
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
        {/* success means streaing has started */}
        {isSuccess && (
          <IconButton
            disabled={!query && !isPending && !isSuccess}
            rounded={true}
            onClick={() => {
              const taskId = useActiveChat.getState().taskId;
              if (taskId) {
                stopMessage({
                  taskId,
                });
              }
            }}
            ariaLabel="Stop message"
          >
            <Square size={16} />
          </IconButton>
        )}
        {isPending && (
          <IconButton className="cursor-default">
            <Loader className="animate-spin" size={16} />
          </IconButton>
        )}
        {!isPending && !isSuccess && (
          <IconButton
            disabled={!query || isPending}
            onClick={() => {
              if (query) {
                sendMessage({
                  query,
                  conversationId: props.conversationId,
                });

                setQuery("");
              }
            }}
            ariaLabel="Send message"
          >
            <ArrowUp size={18} />
          </IconButton>
        )}
      </div>
      <div className="text-gray-500 text-xs text-center">
        Ask Nithyananda provides AI-generated guidance; consult experts for
        critical advice.
      </div>
    </form>
  );
};

export default MessageForm;
