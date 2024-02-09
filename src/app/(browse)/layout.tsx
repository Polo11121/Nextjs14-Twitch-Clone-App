import { ReactNode, Suspense } from "react";
import {
  Container,
  NavbarActions,
  Sidebar,
  SidebarSkeleton,
} from "@/app/(browse)/_components";
import { Navbar } from "@/components/ui";

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
      <Container>{children}</Container>
    </div>
  </>
);

export default BrowseLayout;
