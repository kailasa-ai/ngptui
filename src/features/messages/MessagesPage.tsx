"use client";

import { useParams } from "next/navigation";

import MessagesList from "./MessagesList";
import MessageForm from "./MessageForm";

import { cn } from "@/lib/utils";
import { useAutoScroll } from "./hooks/useAutoScroll";

const MessagesPage = () => {
  const params = useParams<{ id?: string }>();

  const { listRef } = useAutoScroll();

  return (
    <div
      className={cn(
        "h-full w-full overflow-hidden relative",
        "flex flex-col flex-1"
      )}
    >
      <main className="relative h-full w-full flex-1 overflow-auto transition-width">
        <div role="presentation" className="h-full flex flex-col">
          <div className="flex-1 overflow-hidden">
            <div className="h-full w-full">
              <div
                ref={listRef}
                className="h-full overflow-auto w-full text-sm pb-9"
              >
                <header className="sticky top-0 mb-1.5 flex items-center justify-between z-10 h-14 p-2 font-semibold bg-white">
                  <h2>Nithyananda GPT</h2>
                </header>
                <MessagesList />
              </div>
              <div className="scroll-to-bottom"></div>
            </div>
          </div>
          <div
            className={cn(
              "w-full pt-2 md:pt-0 dark:border-white/20",
              "md:border-transparent md:dark:border-transparent md:w-[calc(100%-1rem)]"
            )}
          >
            <MessageForm conversationId={params.id} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MessagesPage;
