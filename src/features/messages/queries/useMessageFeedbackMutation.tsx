import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Message } from "@/types/chat";

type Payload = {
  conversationId: string;
  messageId: string;
  like: boolean | null;
};

type Props = {
  messageId: string;
  onSettled: () => void;
};

export const useMessageFeedbackMutation = (props: Props) => {
  const queryClient = useQueryClient();

  const { isPending, mutateAsync, data, error } = useMutation({
    mutationKey: ["messageActions", props.messageId],
    mutationFn: async (payload: Payload) => {
      const response = await fetch(
        `/api/messages/${payload.messageId}/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ like: payload.like }),
        }
      );
      const data = await response.json();

      queryClient.setQueryData(
        ["messages", payload.conversationId],
        (data: Message[]) => {
          return data.map((message) => {
            if (message.id === payload.messageId) {
              return {
                ...message,
                feedback: {
                  rating:
                    payload.like === null
                      ? null
                      : payload.like
                      ? "like"
                      : "dislike",
                },
              };
            }

            return message;
          });
        }
      );

      return data;
    },
    onSettled: props.onSettled,
  });

  return {
    isPending,
    sendFeedback: mutateAsync,
    data,
    error,
  };
};
