import { useQuery } from "@tanstack/react-query";

import { Message, RawMessage } from "@/types/chat";

export const useMessagesQuery = (conversationId?: string) => {
  const { data, isLoading } = useQuery<Message[]>({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      if (!conversationId) {
        return [];
      }

      const response = await fetch(`/api/conversations/${conversationId}`);
      const { data } = (await response.json()) as {
        data: RawMessage[];
      };

      return data.flatMap((message) => {
        const temp = {
          id: message.id,
          conversationId: message.conversation_id,
          createdAt: message.created_at,
          feedback: null,
        };

        return [
          {
            ...temp,
            role: "user",
            content: message.query,
            id: message.id + "w",
          },
          {
            ...temp,
            role: "assistant",
            content: message.answer,
            feedback: message.feedback,
          },
        ];
      });
    },
    retry: 0,
  });

  return {
    messages: data,
    isLoading,
  };
};
