import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  expandHandler: () => void;
  collapseHandler: () => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,
  expandHandler: () => set({ isOpen: true }),
  collapseHandler: () => set({ isOpen: false }),
}));
