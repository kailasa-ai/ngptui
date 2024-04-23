"use client";

import { useParams } from "next/navigation";
import { LoaderIcon } from "lucide-react";

import MessageItem from "./MessageItem";

import { useMessages } from "./hooks/useMessages";
import { useActiveChat } from "./hooks/useActiveChat";

const ActiveMessages = () => {
  const messages = useActiveChat((state) => state.messages);

  return messages.map((message) => (
    <MessageItem key={message.id} message={message} />
  ));
};

const MessagesList = () => {
  const params = useParams<{ id: string }>();
  const { messages, isLoading } = useMessages(params.id);

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
        <MessageItem key={message.id} message={message} />
      ))}
      <ActiveMessages />
    </>
  );
};

export default MessagesList;
