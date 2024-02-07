import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  toggleHandler: () => void;
};

export const useSidebar = create<SidebarState>((set) => ({
  isOpen: true,
  toggleHandler: () => set((state) => ({ isOpen: !state.isOpen })),
}));
