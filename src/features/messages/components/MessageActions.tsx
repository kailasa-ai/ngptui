import CopyToClipBoard from "./actions/CopyToClipBoard";
import FeedbackButton, { FeedbackType } from "./actions/FeedbackButton";

import { cn } from "@/lib/utils";

type Props = {
  isAssistant: boolean;
  isVisible: boolean;
  text: string;
};

const MessageActions = ({ isVisible, text, isAssistant }: Props) => {
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
          <CopyToClipBoard text={text} />
          <FeedbackButton
            type={FeedbackType.GOOD}
            onClick={() => {
              console.log("Good Response");
            }}
          />
          <FeedbackButton
            type={FeedbackType.BAD}
            onClick={() => {
              console.log("Bad Response");
            }}
          />
        </>
      )}
    </div>
  );
};

export default MessageActions;
