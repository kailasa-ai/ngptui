import { cn } from "@/lib/utils";

type Props = {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  value: string;
};

const ChatInput = (props: Props) => {
  return (
    <textarea
      onKeyDown={props.onKeyDown}
      rows={1}
      tabIndex={0}
      className={cn(
        "resize-none border border-gray-400 rounded-lg outline-none h-[52px]",
        "m-0 w-full resize-none border-0 bg-transparent focus:ring-0",
        "focus-visible:ring-0 dark:bg-transparent pr-10",
        "py-3.5 md:pr-12 max-h-[25dvh] max-h-52 h-[52px] placeholder-black/50 dark:placeholder-white/50 pl-4 md:pl-6"
      )}
      placeholder="Just Ask Nithyananda..."
      onChange={props.onChange}
      value={props.value}
    ></textarea>
  );
};

export default ChatInput;
