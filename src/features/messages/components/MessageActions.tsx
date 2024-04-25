import { Clipboard, ThumbsUp, ThumbsDown } from "lucide-react";

import { cn } from "@/lib/utils";

const MessageActions = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={cn(
        "text-gray-400 h-8 gap-0.5 w-full",
        "flex self-end lg:self-center items-center justify-end lg:justify-end",
        "invisible group-hover:visible",
        isVisible && "visible"
      )}
    >
      <button className="rounded-md p-1 text-xs text-gray-400 hover:text-gray-900">
        <Clipboard size={18} />
      </button>
      <button className="rounded-md p-1 text-xs text-gray-400 hover:text-gray-900">
        <ThumbsUp size={18} />
      </button>
      <button className="rounded-md p-1 text-xs text-gray-400 hover:text-gray-900">
        <ThumbsDown size={18} />
      </button>
    </div>
  );
};

export default MessageActions;
