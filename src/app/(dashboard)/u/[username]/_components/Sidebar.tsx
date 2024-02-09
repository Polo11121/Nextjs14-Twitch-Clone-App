import { SidebarToggle, SidebarWrapper } from "@/components/ui";

export const Sidebar = () => (
  <SidebarWrapper store="creatorSidebar" contentSkeleton={null}>
    <SidebarToggle store="creatorSidebar" sidebarLabel="Dashboard" />
  </SidebarWrapper>
);
