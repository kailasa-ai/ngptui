import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { ssePost } from "@/lib/helpers";

import { useActiveChat } from "./useActiveChat";

import { Message } from "@/types/chat";
import { navigate } from "@/app/actions";

type Payload = { query: string; conversationId?: string };

const sendMessageApi = (payload: Payload, queryClient: QueryClient) => {
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
        onWorkflowStarted: (data) => {
          const state = useActiveChat.getState();

          state.addMessages(data.task_id, [
            {
              id: data.message_id + "w",
              conversationId: data.conversation_id,
              createdAt: data.data.created_at,
              feedback: null,
              role: "user",
              content: payload.query,
            },
            {
              id: data.message_id,
              conversationId: data.conversation_id,
              createdAt: data.data.created_at,
              feedback: null,
              role: "assistant",
              content: "",
            },
          ]);
        },
        onData: (message, isFirstMessage, moreInfo) => {
          const state = useActiveChat.getState();

          state.updateMessage(moreInfo.messageId, message);
        },
        onCompleted: () => {
          const state = useActiveChat.getState();

          if (!payload.conversationId) {
            const conversationId = state.messages[0].conversationId;
            state.clearState();

            queryClient.invalidateQueries({ queryKey: ["conversations"] });

            navigate(`/chat/${conversationId}`);
            return;
          }

          queryClient.setQueryData(
            ["messages", payload.conversationId],
            (oldData: Message[]) => {
              return [...oldData, ...state.messages];
            }
          );

          state.clearState();

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

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["sendQuery"],
    mutationFn: async (payload: Payload) => {
      return sendMessageApi(payload, queryClient);
    },
    retry: 0,
  });

  return {
    isPending,
    sendMessage: mutateAsync,
  };
};
