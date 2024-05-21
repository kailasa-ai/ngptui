"use client";

import { useCallback, useRef } from "react";
import { LoaderIcon } from "lucide-react";

import ConversationItem from "./ConversationItem";
import { useConversationsQuery } from "@/features/conversations/queries/useConversationsQuery";

const ConversationsList = () => {
  const { conversations, isLoading, fetchNextPage, hasNextPage, isFetching } =
    useConversationsQuery();
  const observer = useRef<IntersectionObserver>();

  const lastElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetching) {
            fetchNextPage();
          }
        },
        { threshold: 0.5 }
      );

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching, isLoading]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  const keys = Object.keys(conversations);

  return (
    <div className="flex flex-col pb-3 gap-5 text-gray-950 text-sm select-none">
      {keys.map((key, index) => {
        return (
          <div
            className="h-auto empty:hidden first:mt-5 empty:mt-0"
            key={key}
            ref={index === keys.length - 1 ? lastElementRef : null}
          >
            <h3 className="h-9 pb-2 pt-3 px-2 text-xs font-medium text-ellipsis overflow-hidden break-all text-gray-500">
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
