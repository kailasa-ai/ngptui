import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Page } from "./useConversationsQuery";
import { useAvatarModel } from "@/hooks/useAvatarModel";

type Payload = {
  coversationId: string;
  name: string;
  avatarModel: string;
};

const renameCoversationApi = async ({
  coversationId,
  name,
  avatarModel,
}: Payload) => {
  const response = await fetch(`/api/conversations/${coversationId}/rename`, {
    method: "PATCH",
    body: JSON.stringify({ name, model: avatarModel }),
  });

  if (response.status !== 200) {
    throw new Error("Failed to rename conversation");
  }

  const data = await response.json();

  return data;
};

export const useChatRenameMutation = (coversationId: string) => {
  const queryClient = useQueryClient();
  const avatarModel = useAvatarModel();
  const { mutate, isPending } = useMutation({
    mutationKey: ["renamechat", coversationId, avatarModel],
    mutationFn: async (name: string) => {
      try {
        const response = await renameCoversationApi({
          coversationId,
          name,
          avatarModel,
        });

        toast.success("Conversation renamed successfully");

        queryClient.setQueryData(
          ["conversations", avatarModel],
          (old: { pages: Page[] }) => {
            return {
              ...old,
              pages: old.pages.map((page) => {
                return {
                  ...page,
                  data: page.data.map((conversation) => {
                    if (conversation.id === coversationId) {
                      return {
                        ...conversation,
                        name,
                      };
                    }

                    return conversation;
                  }),
                };
              }),
            };
          }
        );
      } catch (e) {
        toast.error("Failed to rename conversation");
      }
    },
  });

  return {
    renameConversation: mutate,
    isPending,
  };
};
