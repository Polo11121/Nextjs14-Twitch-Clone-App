import { create } from "zustand";

export enum ChatVariant {
  CHAT = "CHAT",
  COMMUNITY = "COMMUNITY",
}

type ChatSidebarState = {
  isOpen: boolean;
  variant: ChatVariant;
  expandHandler: () => void;
  collapseHandler: () => void;
  changeVariantHandler: (variant: ChatVariant) => void;
};

export const useChatSidebar = create<ChatSidebarState>((set) => ({
  isOpen: true,
  variant: ChatVariant.CHAT,
  changeVariantHandler: (variant: ChatVariant) => set({ variant }),
  expandHandler: () => set({ isOpen: true }),
  collapseHandler: () => set({ isOpen: false }),
}));
