"use client";

import ConversationsList from "@/features/conversations/ConversationsList";
import NewChatButton from "@/features/conversations/NewChatButton";

const Sidebar = () => {
  return (
    <div className="sidebar w-[260px] h-full bg-[#f9f9f9] overflow-x-hidden flex flex-col transition-all">
      <nav className="h-full w-full px-3 flex-1" aria-label="Chat history">
        <div className="h-full flex-col flex flex-1 transition-opacity duration-500 -mr-2 pr-2 overflow-y-auto">
          <NewChatButton />
          <ConversationsList />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
