import { PropsWithChildren } from "react";

import Sidebar from "./_sidebar";

import { useSidebar } from "@/hooks/useSidebar";
import useDevice from "@/hooks/useDevice";

const HomeLayout = (props: PropsWithChildren) => {
  const { isCollapsed } = useSidebar();
  const { isMobile } = useDevice();

  return (
    <div className="h-full flex w-full overflow-hidden relative">
      {!isMobile && (
        <div
          style={{
            visibility: !isCollapsed ? "visible" : "hidden",
            width: !isCollapsed ? "260px" : "0",
          }}
          className="h-full transition-all duration-300"
        >
          <Sidebar />
        </div>
      )}
      {props.children}
    </div>
  );
};

export default HomeLayout;
