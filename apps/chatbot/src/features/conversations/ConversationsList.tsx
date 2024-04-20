"use client";

import { LoaderIcon } from "lucide-react";
import ConversationItem from "./ConversationItem";

import { useConversations } from "@/features/conversations/useConversations";

const ConversationsList = () => {
  const { conversations, isLoading } = useConversations();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-3 gap-5 text-gray-950">
      {Object.keys(conversations!).map((key) => {
        return (
          <div className="h-auto empty:hidden first:mt-5 empty:mt-0" key={key}>
            <h3 className="h-9 pb-2 pt-3 px-2 text-xs font-medium text-ellipsis overflow-hidden break-all text-gray-400">
              {key}
            </h3>
            <ol>
              {conversations![key]!.map((conversation: any) => {
                return (
                  <ConversationItem
                    key={conversation.id}
                    conversation={conversation}
                  />
                );
              })}
            </ol>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationsList;
