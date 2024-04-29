"use client";

import Image from "next/image";

import MessageActions from "./components/MessageActions";
import MarkdownContent from "./components/MarkdownContent";

import { cn } from "@/lib/utils";

import { Message } from "@/types/chat";

type Props = {
  message: Message;
  isLast: boolean;
};

const MessageItem = (props: Props) => {
  const { role, content, id } = props.message;

  const isAssistant = role === "assistant";
  const title = isAssistant ? "Ask Nithyananda" : "You";

  return (
    <div className="w-full text-gray-900 group">
      <div className="px-4 py-2 m-auto md:gap-6 text-base">
        <div className="flex flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          <div className="h-8 w-8">
            <Image
              alt="logo"
              src="/ai.png"
              width={28}
              height={28}
              className="object-cove rounded-full"
            />
          </div>
          <div className="relative flex w-full flex-col">
            <div className="font-semibold select-none">{title}</div>
            <div className="flex-col gap-1 md:gap-3">
              <div className="flex flex-col max-w-full flex-grow">
                <div
                  className={cn(
                    "min-h-5 flex flex-col items-start gap-3",
                    "whitespace-pre-wrap break-words overflow-x-auto"
                  )}
                  data-author-role="assistant"
                  data-message-id={id}
                >
                  <MarkdownContent>{content}</MarkdownContent>
                </div>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 empty:hidden mt-1",
                  !isAssistant && "invisible"
                )}
              >
                <MessageActions
                  messageId={id}
                  text={content}
                  isAssistant={isAssistant}
                  isVisible={props.isLast}
                  feedback={props.message.feedback}
                  conversationId={props.message.conversationId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
