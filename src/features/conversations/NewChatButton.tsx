import { Edit, Atom } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

const NewChatButton = () => {
  return (
    <div className="sticky left-0 right-0 top-0 z-20 pt-3 bg-[#f9f9f9] flex items-center justify-between">
      <Link
        href="/"
        className={cn(
          "group w-full h-10 px-2",
          "flex items-center gap-2",
          "font-medium hover:bg-[#ececec]",
          "rounded-lg transition-colors duration-200 ease-in-out"
        )}
      >
        <div className="h-7 w-7 flex-shrink-0">
          <div className="relative flex h-full items-center justify-center rounded-full">
            <Atom />
          </div>
        </div>
        <div className="grow overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          New Chat
        </div>
        <div className="flex">
          <Edit size={16} />
        </div>
      </Link>
    </div>
  );
};

export default NewChatButton;
