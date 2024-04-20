import { cn } from "@/lib/utils";
import { Conversation } from "@/types";
import { MoreHorizontal } from "lucide-react";

type Props = {
  conversation: Conversation;
};

const ConversationItem = (props: Props) => {
  return (
    <li className="relative h-auto">
      <div className="group relative rounded-lg active:opacity-90 hover:bg-[#ececec]">
        <a
          href={`/chat/${props.conversation.id}`}
          className="flex items-center gap-2 p-2"
        >
          <div className="relative grow overflow-hidden whitespace-nowrap">
            {props.conversation.name}
            <div
              className={cn(
                "absolute bottom-0 right-0 top-0",
                "bg-gradient-to-l to-transparent from-sidebar-primary group-hover:from-sidebar-secondary",
                "w-8 from-0% group-hover:w-20 group-hover:from-60%"
              )}
            ></div>
          </div>
        </a>
        <div className="absolute right-0 top-0 bottom-0 gap-2 pr-2 hidden group-hover:flex">
          <button className="flex items-center justify-center text-gray-950 transition hover:text-gray-500 radix-state-open:text-gray-500">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ConversationItem;
