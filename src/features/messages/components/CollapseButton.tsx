import { useSidebar } from "@/hooks/useSidebar";

import { cn } from "@/lib/utils";

const CollapseButton = () => {
  const { isOpen, toggle, isCollapsed } = useSidebar();

  if (isCollapsed) {
    return null;
  }

  let transform =
    "translateX(260px) translateY(-50%) rotate(0deg) translateZ(0px)";

  if (!isOpen) {
    transform = "translateX(0px) translateY(-50%) rotate(0deg) translateZ(0px)";
  }

  return (
    <div
      className="fixed left-0 top-1/2 z-10 group"
      style={{
        transform,
      }}
    >
      <button onClick={toggle.bind(null, !isOpen)}>
        <div className="flex h-[72px] w-8 items-center justify-center">
          <div className="flex h-6 w-6 flex-col items-center">
            <div
              className={cn(
                "h-3 w-1 rounded-full bg-gray-500",
                "translate-y-[0.15rem] rotate-0 group-hover:rotate-[15deg]",
                !isOpen && "group-hover:rotate-[-15deg]"
              )}
            />
            <div
              className={cn(
                "h-3 w-1 bg-gray-500 rounded-full",
                "translate-y-[-0.15rem] rotate-0 group-hover:rotate-[-15deg]",
                !isOpen && "group-hover:rotate-[15deg]"
              )}
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default CollapseButton;
