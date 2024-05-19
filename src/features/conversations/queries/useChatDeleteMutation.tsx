import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Page } from "./useConversationsQuery";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAvatarModel } from "@/hooks/useAvatarModel";

type Payload = {
  coversationId: string;
  avatarModel: string;
};

const deleteCoversationApi = async ({
  coversationId,
  avatarModel,
}: Payload) => {
  const params = new URLSearchParams({
    model: avatarModel,
  });

  const response = await fetch(
    `/api/conversations/${coversationId}?${params}`,
    {
      method: "DELETE",
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to delete conversation");
  }

  const data = await response.json();

  return data;
};

export const useChatDeleteMutation = (coversationId: string) => {
  const queryClient = useQueryClient();
  const avatarModel = useAvatarModel();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["deletechat", coversationId, avatarModel],
    mutationFn: async () => {
      try {
        await deleteCoversationApi({ coversationId, avatarModel });

        toast.success("Conversation deleted successfully");

        queryClient.setQueryData(
          ["conversations", avatarModel],
          (old: { pages: Page[] }) => {
            return {
              ...old,
              pages: old.pages.map((page) => {
                return {
                  ...page,
                  data: page.data.filter((item) => item.id !== coversationId),
                };
              }),
            };
          }
        );

        // need to navigate only if the conversation is same as one in the url
        router.replace("/");
      } catch (e) {
        toast.error("Failed to delete conversation");
      }
    },
  });

  return {
    deleteChat: mutate,
    isPending,
  };
};
