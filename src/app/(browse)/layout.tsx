import { ReactNode, Suspense } from "react";
import {
  Container,
  Navbar,
  Sidebar,
  SidebarSkeleton,
} from "@/app/(browse)/_components";

type RootLayoutProps = {
  children: ReactNode;
};

const BrowseLayout = ({ children }: RootLayoutProps) => (
  <>
    <Navbar />
    <div className="flex h-full pt-20">
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <Container>{children}</Container>
    </div>
  </>
);

export default BrowseLayout;
