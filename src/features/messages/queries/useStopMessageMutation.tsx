import { useAvatarModel } from "@/hooks/useAvatarModel";
import { useMutation } from "@tanstack/react-query";

type Payload = {
  taskId: string;
};

export const useStopMessageMutation = (props: { conversationId?: string }) => {
  const avatarModel = useAvatarModel();
  const { isPending, mutateAsync, data, error } = useMutation({
    mutationKey: ["stopMessage", props.conversationId, avatarModel],
    mutationFn: async (payload: Payload) => {
      const response = await fetch(`/api/chat/task/${payload.taskId}/stop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: avatarModel }),
      });
      const data = await response.json();

      return data;
    },
  });

  return {
    isStopping: isPending,
    data,
    error,
    stopMessage: mutateAsync,
  };
};
