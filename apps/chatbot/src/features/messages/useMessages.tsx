import { useQuery } from "@tanstack/react-query";

import { Message, RawMessage } from "@/types";

export const useMessages = (conversationId: string) => {
  const { data, isLoading } = useQuery<Message[]>({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
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
          },
          {
            ...temp,
            role: "assistant",
            content: message.answer,
          },
        ];
      });
    },
  });
  console.log(data);

  return {
    messages: data,
    isLoading,
  };
};
