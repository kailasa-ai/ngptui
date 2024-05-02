"use client";

import { useLayoutEffect, useState } from "react";

import { debounce } from "@/lib/utils";

const useDevice = (breakpoints = { tablet: 768, desktop: 1200 }) => {
  const [devices, setDevices] = useState(() => {
    const innerWidth = window.innerWidth;
    const { tablet, desktop } = breakpoints;

    return {
      isMobile: innerWidth < tablet,
      isTablet: innerWidth >= tablet && innerWidth < desktop,
      isDesktop: innerWidth >= desktop,
    };
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      const innerWidth = window.innerWidth;
      const { tablet, desktop } = breakpoints;

      setDevices({
        isMobile: innerWidth < tablet,
        isTablet: innerWidth >= tablet && innerWidth < desktop,
        isDesktop: innerWidth >= desktop,
      });
    };

    const debounced = debounce(handleResize, 100);

    window.addEventListener("resize", debounced);

    return () => {
      window.removeEventListener("resize", debounced);
    };
  }, [breakpoints]);

  return {
    ...devices,
  };
};

export default useDevice;
