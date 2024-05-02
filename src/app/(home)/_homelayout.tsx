import { PropsWithChildren } from "react";

import Sidebar from "./_sidebar";

import { useSidebar } from "@/hooks/useSidebar";
import useDevice from "@/hooks/useDevice";

const HomeLayout = (props: PropsWithChildren) => {
  const { isCollapsed } = useSidebar();
  const { isMobile } = useDevice();

  return (
    <div className="h-full flex w-full overflow-hidden relative">
      {!isMobile && <Sidebar isCollapsed={isCollapsed && !isMobile} />}
      {props.children}
    </div>
  );
};

export default HomeLayout;
