import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Page } from "./useConversationsQuery";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Payload = {
  coversationId: string;
};

const deleteCoversationApi = async ({ coversationId }: Payload) => {
  const response = await fetch(`/api/conversations/${coversationId}`, {
    method: "DELETE",
  });
  const data = await response.json();

  return data;
};

export const useChatDeleteQuery = (coversationId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationKey: ["deletechat", coversationId],
    mutationFn: async () => {
      const response = await deleteCoversationApi({ coversationId });

      if (response.result === "failed") {
        toast.error("Failed to delete conversation");
        return;
      }

      toast.success("Conversation deleted successfully");

      queryClient.setQueryData(["conversations"], (old: { pages: Page[] }) => {
        return {
          ...old,
          pages: old.pages.map((page) => {
            return {
              ...page,
              data: page.data.filter((item) => item.id !== coversationId),
            };
          }),
        };
      });

      // need to navigate only if the conversation is same as one in the url
      router.replace("/");
    },
  });

  return {
    deleteChat: mutate,
    isPending,
  };
};
