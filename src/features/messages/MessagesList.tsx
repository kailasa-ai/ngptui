"use client";

import { useParams } from "next/navigation";
import { LoaderIcon } from "lucide-react";

import MessageItem from "./MessageItem";

import { useMessages } from "./hooks/useMessages";
import { useActiveChat } from "./hooks/useActiveChat";

const ActiveMessages = () => {
  const messages = useActiveChat((state) => state.messages);

  return messages.map((message) => (
    <MessageItem
      key={message.id}
      message={message}
      isLast={messages[messages.length - 1].id === message.id}
    />
  ));
};

const MessagesList = () => {
  const params = useParams<{ id: string }>();
  const { messages, isLoading } = useMessages(params.id);
  const taskId = useActiveChat((state) => state.taskId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh] w-full">
        <LoaderIcon className="animate-spin" />
      </div>
    );
  }

  if (!params.id && !taskId && messages?.length === 0) {
    return (
      <div className="flex items-center justify-center h-1/2 text-xl">
        Start Chatting
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
      <ActiveMessages />
    </>
  );
};

export default MessagesList;
