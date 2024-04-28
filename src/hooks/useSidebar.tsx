"use client";

import { create } from "zustand";

export const useSidebar = create<{
  isOpen: boolean;
  toggle: (open: boolean) => void;
  isCollapsed: boolean;
  toggleCollapsed: (open: boolean) => void;
}>((set) => ({
  isOpen: true,
  isCollapsed: typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  toggle: (open: boolean) => set((state) => ({ isOpen: open })),
  toggleCollapsed: (open: boolean) => set(() => ({ isCollapsed: open })),
}));
