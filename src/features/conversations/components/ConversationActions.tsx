import { PropsWithChildren } from "react";
import { Delete, Edit } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";

type Props = {
  onClick: (action: "RENAME" | "DELETE") => void;
};

const ConversationActions = (props: PropsWithChildren<Props>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{props.children}</DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-[12rem]" side="bottom" align="start">
          <DropdownMenuItem onClick={props.onClick.bind(null, "RENAME")}>
            <Edit size={16} className="mr-2" />
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-red-600"
            onClick={props.onClick.bind(null, "DELETE")}
          >
            <Delete size={16} className="mr-2" />
            <span>Delete Chat</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default ConversationActions;
