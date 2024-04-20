import ConversationsList from "./ConversationsList";
import NewChatButton from "./NewChatButton";

const Sidebar = () => {
  return (
    <div className="w-[260px] h-full bg-[#f9f9f9] overflow-x-hidden flex flex-col">
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
