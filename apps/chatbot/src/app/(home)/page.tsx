"use client";

import ChatInput from "@/components/ChatInput";

import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div
      className={cn(
        "h-full w-full overflow-hidden relative",
        "flex flex-col flex-1"
      )}
    >
      <div className="relative h-full w-full flex-1 overflow-auto transition-width">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-hidden">
            <header className="px-5 py-3 sticky top-0 w-full bg-white">
              <h2>Nithyananda GPT</h2>
            </header>
            <div className="flex items-center justify-center text-xl h-full w-full flex-1 overflow-hidden">
              Start your Day with a Smile
            </div>
          </div>

          <div className="w-[calc(100%-1rem)]">
            <form className="w-full mx-2 lg:mx-auto flex flex-1 lg:max-w-2xl xl:max-w-3xl mb-3">
              <div className="w-full items-center flex">
                <ChatInput />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
