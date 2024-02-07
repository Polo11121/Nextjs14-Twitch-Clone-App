import { ReactNode } from "react";
import { Container, Navbar, Sidebar } from "@/app/(browse)/_components";

type RootLayoutProps = {
  children: ReactNode;
};

const BrowseLayout = ({ children }: RootLayoutProps) => (
  <>
    <Navbar />
    <div className="flex h-full pt-20">
      <Sidebar />
      <Container>{children}</Container>
    </div>
  </>
);

export default BrowseLayout;
