import { cn } from "@/lib/utils";
import Textarea from "rc-textarea";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  value: string;
};

const ChatInput = (props: Props) => {
  return (
    <Textarea
      autoSize={{ minRows: 1, maxRows: 4 }}
      className={cn(
        "resize-none border border-gray-400 rounded-lg outline-none h-[52px]",
        "m-0 w-full resize-none border-0 bg-transparent focus:ring-0",
        "focus-visible:ring-0 dark:bg-transparent pr-10",
        "py-3.5 md:pr-12 max-h-52 h-[52px] placeholder-black/50 dark:placeholder-white/50 pl-4 md:pl-6"
      )}
      placeholder="Ask Nithyananda..."
      onChange={props.onChange}
      value={props.value}
    />
  );
};

export default ChatInput;
