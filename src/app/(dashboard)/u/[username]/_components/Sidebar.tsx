import { SidebarToggle, SidebarWrapper } from "@/components/ui";
import { Navigation } from "@/app/(dashboard)/u/[username]/_components";

export const Sidebar = () => (
  <SidebarWrapper store="creatorSidebar" contentSkeleton={null}>
    <SidebarToggle store="creatorSidebar" sidebarLabel="Dashboard" />
    <Navigation />
  </SidebarWrapper>
);
