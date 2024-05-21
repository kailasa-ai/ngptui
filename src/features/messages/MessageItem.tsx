"use client";

import Image from "next/image";
import { User } from "lucide-react";

import MessageActions from "./components/MessageActions";
import MarkdownContent from "./components/MarkdownContent";

import { useAvatarModel } from "@/hooks/useAvatarModel";

import { cn } from "@/lib/utils";

import { Message } from "@/types/chat";

import { models } from "./models";

type Props = {
  message: Message;
  isLast: boolean;
  isStreaming?: boolean;
};

const MessageItem = (props: Props) => {
  const { role, content, id } = props.message;
  const avatarModel = useAvatarModel();
  const currentModel = models.find((model) => model.id === avatarModel);
  const isAssistant = role === "assistant";

  const title = isAssistant ? currentModel?.name ?? "Ask Nithyananda" : "You";
  const icon = isAssistant ? (
    <Image
      src="/ask-nithyananda.png"
      alt="avataar"
      height={32}
      width={32}
      className="rounded-full object-center min-w-[32px] min-h-[32px] select-none"
    />
  ) : (
    <User size={32} />
  );

  return (
    <div className="w-full text-gray-900 group">
      <div className="px-4 py-2 m-auto md:gap-6 text-base">
        <div className="flex flex-1 text-base mx-auto gap-3 md:px-5 lg:px-1 xl:px-5 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
          <div
            className={cn(
              "h-8 w-8 rounded-full",
              !isAssistant && "outline outline-1"
            )}
          >
            <div className="relative p-1 flex items-center justify-center h-8 w-8">
              {icon}
            </div>
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
                  "flex items-center gap-2 empty:hidden mt-1 invisible",
                  (!isAssistant || props.isStreaming) && "invisible",
                  !props.isStreaming && "group-hover:visible",
                  props.isLast && !props.isStreaming && "visible"
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
