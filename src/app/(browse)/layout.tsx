import { ReactNode, Suspense } from "react";
import {
  NavbarActions,
  Sidebar,
  SidebarSkeleton,
} from "@/app/(browse)/_components";
import { ContentContainer, Navbar } from "@/components/ui";

type RootLayoutProps = {
  children: ReactNode;
};

const BrowseLayout = ({ children }: RootLayoutProps) => (
  <>
    <Navbar>
      <NavbarActions />
    </Navbar>
    <div className="flex h-full pt-20">
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <ContentContainer store="sidebar">{children}</ContentContainer>
    </div>
  </>
);

export default BrowseLayout;
