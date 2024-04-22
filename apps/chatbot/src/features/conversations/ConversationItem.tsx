import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

import { Conversation } from "@/types/chat";
import { usePathname } from "next/navigation";

type Props = {
  conversation: Conversation;
};

const ConversationItem = (props: Props) => {
  const pathname = usePathname();

  const link = `/chat/${props.conversation.id}`;
  const isActive = pathname === link;

  return (
    <li className="relative h-auto">
      <div
        className={cn(
          "group relative rounded-lg active:opacity-90 hover:bg-[#ececec]",
          "transition-all duration-300",
          isActive && "bg-[#ececec]"
        )}
      >
        <Link href={link} className={cn("flex items-center gap-2 p-2")}>
          <div className="relative grow overflow-hidden whitespace-nowrap">
            {props.conversation.name}
            <div
              className={cn(
                "absolute bottom-0 right-0 top-0",
                "bg-gradient-to-l to-transparent from-sidebar-primary group-hover:from-sidebar-secondary",
                "w-8 from-0% group-hover:w-20 group-hover:from-60%",
                isActive && "from-sidebar-secondary from-60% w-20"
              )}
            ></div>
          </div>
        </Link>
        <div
          className={cn(
            "absolute right-0 top-0 bottom-0 gap-2 pr-2 hidden group-hover:flex",
            isActive && "flex"
          )}
        >
          <button
            className={cn(
              "flex items-center justify-center text-gray-950  hover:text-gray-500",
              "transition radix-state-open:text-gray-500"
            )}
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ConversationItem;
