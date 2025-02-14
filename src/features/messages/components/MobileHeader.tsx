"use client";

import { Edit, Menu } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

import Sidebar from "@/app/(home)/_sidebar";
import { DialogPortal, DialogTrigger } from "@/components/dialog";

import { cn } from "@/lib/utils";
import React from "react";
import ModelsDropdown from "./ModelsDropdown";

const MenuButton = () => {
  return (
    <DialogPrimitive.Dialog>
      <DialogTrigger asChild={true}>
        <button
          type="button"
          className={cn(
            "absolute bottom-0 left-0 top-0 inline-flex items-center justify-center rounded-md px-3",
            "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white active:opacity-50"
          )}
        >
          <span className="sr-only">Open Conversations</span>
          <Menu />
        </button>
      </DialogTrigger>
      <DialogPrimitive.DialogContent
        className={cn(
          "fixed left-0 top-0 bottom-0 right-0 z-50 grid w-full h-full",
          "gap-4 bg-transparent duration-200",
          "data-[state=closed]:animate-slide-left data-[state=open]:animate-slide-right"
        )}
        style={{
          pointerEvents: "all",
        }}
      >
        <DialogPrimitive.Close asChild>
          <DialogPrimitive.Overlay
            className={cn(
              "fixed inset-0 z-50 bg-black/30 opacity-0",
              "data-[state=closed]:animate-fade-out data-[state=open]:animate-fade-in"
            )}
          />
        </DialogPrimitive.Close>
        <div className={cn("z-[500] w-full max-w-[20rem]")}>
          <Sidebar />
        </div>
      </DialogPrimitive.DialogContent>
    </DialogPrimitive.Dialog>
  );
};

export const MobileHeader = () => {
  const router = useRouter();

  const onNewChat = () => {
    router.push("/");
  };

  return (
    <div className="sticky top-0 py-4 z-10 flex min-h-[40px] items-center justify-center border-b pl-1">
      <MenuButton />

      <ModelsDropdown />
      <div className="absolute bottom-0 right-0 top-0 flex items-center">
        <button type="button" className="px-3" onClick={onNewChat}>
          <Edit size={18} />
        </button>
      </div>
    </div>
  );
};
