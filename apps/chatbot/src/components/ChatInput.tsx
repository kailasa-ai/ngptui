import { cn } from "@/lib/utils";

const ChatInput = () => {
  return (
    <textarea
      className={cn(
        "h-[50px] w-full",
        "pl-4 pr-12 py-3",
        "resize-none border border-gray-400 rounded-lg outline-none"
      )}
      placeholder="Chat with Swamiji..."
    ></textarea>
  );
};

export default ChatInput;
