"use client";

import ConversationsList from "@/features/conversations/ConversationsList";
import NewChatButton from "@/features/conversations/NewChatButton";
import Links from "./Links";

const Sidebar = () => {
  return (
    <div className="sidebar w-full h-full bg-sidebar-surface overflow-x-hidden z-[2000] flex flex-col transition-all">
      <nav className="h-full w-full px-3 flex-1" aria-label="Chat history">
        <div className="h-full transition-opacity duration-500 -mr-2 pr-2 overflow-y-auto grid grid-rows-[auto_1fr_auto]">
          <NewChatButton />
          <ConversationsList />
          <Links />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
