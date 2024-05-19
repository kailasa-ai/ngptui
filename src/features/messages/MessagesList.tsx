"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { LoaderIcon } from "lucide-react";

import EmptyMessages from "./EmptyMessages";
import MessageItem from "./MessageItem";

import { useMessagesQuery } from "./queries/useMessagesQuery";
import { useActiveChat } from "./hooks/useActiveChat";

const ActiveMessages = () => {
  const messages = useActiveChat((state) => state.messages);

  return messages.map((message) => {
    const isAvatar = message.role === "assistant";
    const isThiking = isAvatar && message.content === "";

    return (
      <MessageItem
        key={message.id}
        message={{
          ...message,
          content: isThiking ? "Avatar Thinking..." : message.content,
        }}
        isLast={messages[messages.length - 1].id === message.id}
        isStreaming={true}
      />
    );
  });
};

const MessagesList = () => {
  const params = useParams<{ id: string }>();
  const { messages, isLoading } = useMessagesQuery(params.id);

  useEffect(() => {
    return () => {
      useActiveChat.getState().clearState();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh] w-full">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      {messages?.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isLast={messages[messages.length - 1].id === message.id}
        />
      ))}
      <EmptyMessages conversationId={params.id} />
      <ActiveMessages />
    </>
  );
};

export default MessagesList;
