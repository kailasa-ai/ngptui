import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAvatarModel } from "@/hooks/useAvatarModel";

import { Message, RawMessage } from "@/types/chat";

export const useMessagesQuery = (conversationId?: string) => {
  const router = useRouter();
  const avatarModel = useAvatarModel();
  const controller = useRef(new AbortController());

  const { data, isLoading } = useQuery<Message[]>({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      if (!conversationId) {
        return [];
      }

      const params = new URLSearchParams({
        model: avatarModel,
      });
      controller.current = new AbortController();

      const response = await fetch(
        `/api/conversations/${conversationId}?${params}`,
        {
          signal: controller.current.signal,
        }
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

  useEffect(() => {
    return () => {
      controller.current.abort("Unmounted");
    };
  }, [conversationId]);

  return {
    messages: data,
    isLoading,
  };
};
