import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { ssePost } from "@/lib/helpers";

import { useActiveChat } from "./useActiveChat";

import { Message } from "@/types/chat";
import { useRouter } from "next/navigation";

type Payload = { query: string; conversationId?: string };

const sendMessageApi = (
  payload: Payload,
  queryClient: QueryClient,
  onNavigate: (conversationId: string) => void
) => {
  return new Promise<void>(async (resolve, reject) => {
    await ssePost(
      "/api/chat",
      {
        body: {
          query: payload.query,
          conversation_id: payload.conversationId,
        },
      },
      {
        onData: (message, isFirstMessage, moreInfo) => {
          const state = useActiveChat.getState();

          if (isFirstMessage) {
            state.addMessages(moreInfo.taskId!, [
              {
                id: moreInfo.messageId + "w",
                conversationId: moreInfo.conversationId!,
                createdAt: moreInfo.created_at,
                feedback: null,
                role: "user",
                content: payload.query,
              },
              {
                id: moreInfo.messageId,
                conversationId: moreInfo.conversationId!,
                createdAt: moreInfo.created_at,
                feedback: null,
                role: "assistant",
                content: message,
              },
            ]);
            return;
          }

          state.updateMessage(moreInfo.messageId, message);
        },
        onCompleted: () => {
          const state = useActiveChat.getState();

          if (state.messages.length === 0) {
            state.clearState();

            return;
          }

          const conversationId = state.messages[0].conversationId;

          queryClient.setQueryData(
            ["messages", conversationId],
            (oldData: Message[]) => {
              return [...(oldData || []), ...state.messages];
            }
          );

          state.clearState();

          if (!payload.conversationId) {
            queryClient.invalidateQueries({ queryKey: ["conversations"] });

            onNavigate(conversationId);
          }

          resolve();
        },
        onError: (error) => {
          reject(error);
        },
      }
    );
  });
};

export const useMessageForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const onNavigate = (conversationId: string) => {
    router.push(`/chat/${conversationId}`);
  };

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["sendQuery"],
    mutationFn: async (payload: Payload) => {
      return sendMessageApi(payload, queryClient, onNavigate);
    },
    retry: 0,
  });

  return {
    isPending,
    sendMessage: mutateAsync,
  };
};
