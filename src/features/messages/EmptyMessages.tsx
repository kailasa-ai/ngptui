import { useParams } from "next/navigation";

import { useActiveChat } from "./hooks/useActiveChat";
import { useMessagesQuery } from "./queries/useMessagesQuery";

const EmptyMessages = (props: { conversationId?: string }) => {
  const { messages } = useMessagesQuery(props.conversationId);
  const activeMessages = useActiveChat((state) => state.messages);
  const params = useParams<{ id: string }>();

  if (messages?.length === 0 && activeMessages.length === 0 && !params.id) {
    return (
      <div className="flex items-center justify-center h-3/4 text-xl">
        Start Chatting
      </div>
    );
  }

  return null;
};

export default EmptyMessages;
