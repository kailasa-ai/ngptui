import { useRef } from "react";

import FeedbackButton, { FeedbackType } from "./actions/FeedbackButton";
import CopyToClipBoard from "./actions/CopyToClipBoard";
import SpeechButton from "./actions/SpeechButton";

import { useMessageFeedbackMutation } from "../queries/useMessageFeedbackMutation";

import { cn } from "@/lib/utils";

import { Feedbacktype } from "@/types/response";

type Props = {
  messageId: string;
  conversationId: string;
  text: string;
  isAssistant: boolean;
  isVisible: boolean;
  feedback?: Feedbacktype | null;
};

const MessageActions = ({
  isVisible,
  text,
  isAssistant,
  messageId,
  feedback,
  conversationId,
}: Props) => {
  const pendingRef = useRef<null | "like" | "dislike">(null);
  const { isPending, sendFeedback } = useMessageFeedbackMutation({
    onSettled: () => {
      pendingRef.current = null;
    },
    messageId,
  });

  return (
    <div
      className={cn(
        "text-gray-400 h-8 gap-0.5 w-full",
        "flex self-end lg:self-center items-center justify-end lg:justify-end",
        "invisible group-hover:visible",
        isVisible && "visible"
      )}
    >
      {isAssistant && (
        <>
          <SpeechButton text={text} />
          <CopyToClipBoard text={text} />
          <FeedbackButton
            isLoading={isPending && pendingRef.current === "like"}
            type={FeedbackType.GOOD}
            onClick={() => {
              pendingRef.current = "like";
              sendFeedback({
                conversationId,
                messageId,
                like: feedback?.rating === "like" ? null : true,
              });
            }}
            isActive={feedback?.rating === "like"}
          />
          <FeedbackButton
            isLoading={isPending && pendingRef.current === "dislike"}
            type={FeedbackType.BAD}
            onClick={() => {
              pendingRef.current = "dislike";
              sendFeedback({
                conversationId,
                messageId,
                like: feedback?.rating === "dislike" ? null : false,
              });
            }}
            isActive={feedback?.rating === "dislike"}
          />
        </>
      )}
    </div>
  );
};

export default MessageActions;
