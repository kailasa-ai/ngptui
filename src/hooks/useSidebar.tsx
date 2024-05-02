"use client";

import { create } from "zustand";

export const useSidebar = create<{
  isCollapsed: boolean;
  toggleCollapsed: (open: boolean) => void;
}>((set) => ({
  isCollapsed: false,
  toggleCollapsed: (open: boolean) => set(() => ({ isCollapsed: open })),
}));
