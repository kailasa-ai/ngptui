import { Edit, Menu } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import Sidebar from "@/app/(home)/_sidebar";

import { cn } from "@/lib/utils";

const MenuButton = () => {
  return (
    <DialogPrimitive.Dialog>
      <DialogPrimitive.DialogTrigger>
        <button
          type="button"
          className={cn(
            "absolute bottom-0 left-0 top-0 inline-flex items-center justify-center rounded-md px-3",
            "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white active:opacity-50"
          )}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu />
        </button>
      </DialogPrimitive.DialogTrigger>
      <DialogPrimitive.DialogContent
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 grid w-full max-w-lg h-full",
          "gap-4 bg-transparent duration-200",
          "data-[state=closed]:slide-out-to-left-0",
          "data-[state=open]:slide-in-from-left-0"
        )}
      >
        <Drawer>
          <Sidebar />
        </Drawer>
      </DialogPrimitive.DialogContent>
    </DialogPrimitive.Dialog>
  );
};

function Drawer({ children }: any) {
  return (
    <>
      <DialogPrimitive.Close asChild>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/30  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      </DialogPrimitive.Close>
      <div className="z-[50] w-max">{children}</div>
    </>
  );
}

export const MobileHeader = () => {
  return (
    <div className="sticky top-0 py-2 z-10 flex min-h-[40px] items-center justify-center border-b pl-1">
      <MenuButton />

      <div>Ask Nithyananda</div>
      <div className="absolute bottom-0 right-0 top-0 flex items-center">
        <button type="button" className="px-3">
          <Edit size={18} />
        </button>
      </div>
    </div>
  );
};
