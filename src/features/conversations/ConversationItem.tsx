import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/tooltip";
import ConversationActions from "./components/ConversationActions";
import DeleteDialog from "./components/DeleteDialog";
import RenameDialog from "./components/RenameDialog";

import { useChatDeleteMutation } from "./queries/useChatDeleteMutation";
import { useChatRenameMutation } from "./queries/useChatRenameMutation";

import { capitalize, cn } from "@/lib/utils";

import { Conversation } from "@/types/chat";

type Props = {
  conversation: Conversation;
};

const ConversationItem = (props: Props) => {
  const pathname = usePathname();
  const [action, setAction] = useState<"RENAME" | "DELETE" | null>(null);
  const { deleteChat } = useChatDeleteMutation(props.conversation.id);
  const { renameConversation } = useChatRenameMutation(props.conversation.id);

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
            {capitalize(props.conversation.name)}
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
        <ConversationActions onClick={setAction}>
          <button
            className={cn(
              "flex items-center justify-center text-gray-950  hover:text-gray-500",
              "transition data-[state=open]:text-gray-500 outline-none",
              "absolute right-0 top-0 bottom-0 gap-2 pr-2 invisible flex group-hover:visible",
              isActive && "visible",
              "data-[state=open]:visible"
            )}
            aria-label="More"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <MoreHorizontal size={20} />
                </TooltipTrigger>
                <TooltipContent>
                  <TooltipArrow />
                  <span>More</span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </button>
        </ConversationActions>
        {action === "DELETE" && (
          <DeleteDialog
            onCancel={() => setAction(null)}
            onConfirm={deleteChat}
          />
        )}
        {action === "RENAME" && (
          <RenameDialog
            onCancel={() => setAction(null)}
            onRename={renameConversation}
            name={props.conversation.name}
          />
        )}
      </div>
    </li>
  );
};

export default ConversationItem;
