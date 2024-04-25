import { debounce } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { useActiveChat } from "./useActiveChat";

export const useAutoScroll = () => {
  const listRef = useRef<HTMLDivElement>(null);

  const debouncedScroll = useRef(
    debounce(() => {
      const element = listRef.current;

      if (!element) return;

      if (
        element.scrollHeight - element.scrollTop < element.clientHeight ||
        element.scrollHeight < element.clientHeight
      ) {
        return;
      }

      listRef.current?.scrollBy({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100)
  );

  useEffect(() => {
    const unsubscribe = useActiveChat.subscribe(() => {
      debouncedScroll.current();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    listRef,
  };
};
