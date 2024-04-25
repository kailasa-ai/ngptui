import { useEffect, useRef } from "react";

import { useActiveChat } from "./useActiveChat";

import { debounce } from "@/lib/utils";

export const useAutoScroll = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const visibilityRef = useRef<HTMLDivElement>(null);
  const cancelScrollRef = useRef<() => void>();
  // const lastScrollTopRef = useRef(0);

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

      visibilityRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 100)
  );

  useEffect(() => {
    // const element = listRef.current;
    debouncedScroll.current();

    cancelScrollRef.current = useActiveChat.subscribe(() => {
      debouncedScroll.current();
    });

    // const handleScroll = () => {
    //   const element = listRef.current;
    //   if (!element) return;

    //   const currentScrollTop = element.scrollTop;

    //   // if (currentScrollTop < lastScrollTopRef.current) {
    //   //   cancelScrollRef.current?.();
    //   //   listRef.current?.removeEventListener("scroll", handleScroll);
    //   // }

    //   lastScrollTopRef.current = currentScrollTop;
    // };

    // listRef.current?.addEventListener("scroll", handleScroll, {
    //   passive: true,
    // });

    return () => {
      cancelScrollRef.current?.();
      // element?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    listRef,
    visibilityRef,
  };
};
