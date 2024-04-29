import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

import { ssePost } from "@/lib/helpers";

import { useActiveChat } from "../hooks/useActiveChat";

import { Message } from "@/types/chat";

type Payload = { query: string; conversationId?: string };

const sendMessageApi = async ({
  payload,
  onNavigate,
  queryClient,
  onCompleted,
}: {
  payload: Payload;
  queryClient: QueryClient;
  onNavigate: (conversationId: string) => void;
  onCompleted: () => void;
}) => {
  const state = useActiveChat.getState();

  state.setMessages("", [
    {
      id: nanoid(),
      conversationId: "",
      createdAt: Date.now() / 1000,
      feedback: null,
      role: "user",
      content: payload.query,
    },
  ]);

  return await ssePost(
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
          state.setMessages(moreInfo.taskId!, [
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

        if (!payload.conversationId) {
          queryClient.invalidateQueries({ queryKey: ["conversations"] });

          onNavigate(conversationId);
          // clear state after 100ms
          setTimeout(() => {
            state.clearState();
          }, 100);
        } else {
          state.clearState();
        }

        onCompleted();
      },
      onError: (error) => {},
    }
  );
};

export const useMessageFormMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const onNavigate = (conversationId: string) => {
    router.push(`/chat/${conversationId}`);
  };

  const { isPending, mutateAsync, isSuccess, status, reset } = useMutation({
    mutationKey: ["sendQuery"],
    mutationFn: async (payload: Payload) => {
      return sendMessageApi({
        payload,
        queryClient,
        onNavigate,
        onCompleted: () => {
          reset();
        },
      });
    },
    retry: 0,
  });

  return {
    isPending,
    sendMessage: mutateAsync,
    isSuccess,
  };
};
