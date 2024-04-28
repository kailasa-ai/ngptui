"use client";

import { useEffect } from "react";

import Sidebar from "./_sidebar";

import { useSidebar } from "@/hooks/useSidebar";

const HomePageLayout = ({ children }: React.PropsWithChildren) => {
  const { isCollapsed, toggleCollapsed } = useSidebar();

  useEffect(() => {
    let observer = new ResizeObserver((entries) => {
      const entry = entries[0];

      if (entry.contentRect.width <= 768) {
        if (!isCollapsed) toggleCollapsed(true);
      } else {
        if (isCollapsed) toggleCollapsed(false);
      }
    });

    observer.observe(document.body, { box: "border-box" });

    return () => {
      observer.disconnect();
    };
  }, [isCollapsed]);

  return (
    <div className="h-full flex w-full overflow-hidden relative">
      {!isCollapsed && <Sidebar />}
      {children}
    </div>
  );
};

export default HomePageLayout;
