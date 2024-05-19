import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAvatarModel } from "@/hooks/useAvatarModel";

import { Message, RawMessage } from "@/types/chat";

export const useMessagesQuery = (conversationId?: string) => {
  const router = useRouter();
  const avatarModel = useAvatarModel();

  const { data, isLoading } = useQuery<Message[]>({
    queryKey: ["messages", conversationId, avatarModel],
    queryFn: async () => {
      if (!conversationId) {
        return [];
      }

      const params = new URLSearchParams({
        model: avatarModel,
      });

      const response = await fetch(
        `/api/conversations/${conversationId}?${params}`
      );
      const json = await response.json();
      const data = json.data as RawMessage[];

      if (response.status !== 200) {
        toast.error("Failed to fetch messages", {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
        router.replace("/");
        return [];
      }

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
    throwOnError(error, _query) {
      console.log(error);
      toast.error("Failed to fetch messages");
      return false;
    },
  });

  return {
    messages: data,
    isLoading,
  };
};
