import Link from "next/link";
import Image from "next/image";
import { Edit } from "lucide-react";

import { cn } from "@/lib/utils";

const NewChatButton = () => {
  return (
    <div className="sticky left-0 right-0 top-0 z-20 pt-3 bg-[#f9f9f9] flex items-center justify-between select-none">
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
            <Image
              src="/ask-nithyananda-logo.png"
              alt="avataar"
              height={32}
              width={32}
              className="rounded-full object-center min-w-[32px] min-h-[32px]"
            />
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
