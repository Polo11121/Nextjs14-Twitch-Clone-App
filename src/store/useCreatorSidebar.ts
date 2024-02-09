import { create } from "zustand";

type CreatorSidebarState = {
  isOpen: boolean;
  expandHandler: () => void;
  collapseHandler: () => void;
};

export const useCreatorSidebar = create<CreatorSidebarState>((set) => ({
  isOpen: true,
  expandHandler: () => set({ isOpen: true }),
  collapseHandler: () => set({ isOpen: false }),
}));
