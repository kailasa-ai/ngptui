import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { useAvatarModel } from "@/hooks/useAvatarModel";

import { groupedConversationsBydate } from "../utils";

import { Conversation } from "@/types/chat";

type GroupConversationType = ReturnType<typeof groupedConversationsBydate>;

export interface Page {
  data: Conversation[];
  hasMore: boolean;
  previousCursor?: string;
  nextCursor?: string;
}

const fetchConversations = async ({
  lastId,
  avatarModel,
}: {
  lastId?: string;
  avatarModel: string;
}) => {
  const params = new URLSearchParams();
  params.append("model", avatarModel);

  if (lastId) {
    params.append("lastId", lastId);
  }

  const response = await fetch(`/api/conversations?${params}`);
  const data = await response.json();

  return {
    data: data.data,
    previousCursor: data.previousCursor,
    nextCursor: data.data[data.data.length - 1]?.id,
    hasMore: data.has_more,
  };
};

export const useConversationsQuery = () => {
  const avatarModel = useAvatarModel();

  const { data, isLoading, fetchNextPage, isFetching } = useInfiniteQuery<
    Page,
    Error
  >({
    queryKey: ["conversations", avatarModel],
    queryFn: ({ pageParam }) =>
      fetchConversations({
        lastId: pageParam as string | undefined,
        avatarModel,
      }),
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage: Page, pages: Page[]) => lastPage.nextCursor,
    initialPageParam: undefined,
    retry: 0,
  });

  const conversations = useMemo(() => {
    if (!data) {
      return {} as GroupConversationType;
    }

    return groupedConversationsBydate(data.pages.flatMap((page) => page.data));
  }, [data]);

  return {
    conversations,
    isLoading,
    fetchNextPage,
    hasNextPage: data?.pages[data.pages.length - 1].hasMore,
    isFetching,
  };
};
