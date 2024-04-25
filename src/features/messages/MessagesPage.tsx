"use client";

import { useParams } from "next/navigation";

import MessagesList from "./MessagesList";
import MessageForm from "./MessageForm";
import CollapseButton from "./components/CollapseButton";

import { cn } from "@/lib/utils";
import { useAutoScroll } from "./hooks/useAutoScroll";
import Header from "./components/Header";

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
        <CollapseButton />
        <div role="presentation" className="h-full flex flex-col">
          <div className="flex-1 overflow-hidden">
            <div className="h-full w-full">
              <div
                ref={listRef}
                className="h-full overflow-auto w-full text-sm pb-9"
              >
                <Header />
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
