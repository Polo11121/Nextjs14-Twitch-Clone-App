import { ContentContainer, Navbar } from "@/components/ui";
import { getCurrentDbUserByUsername } from "@/lib/authService";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import {
  NavbarActions,
  Sidebar,
} from "@/app/(dashboard)/u/[username]/_components";

type CreatorLayoutProps = {
  params: {
    username: string;
  };
  children: ReactNode;
};

const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
  const currentDbUser = await getCurrentDbUserByUsername(params.username);

  if (!currentDbUser) {
    redirect("/");
  }
  return (
    <>
      <Navbar showSearch={false} logoLabel="Creator dashboard">
        <NavbarActions />
      </Navbar>
      <div className="flex h-full pt-20">
        <Sidebar />
        <ContentContainer store="creatorSidebar">{children}</ContentContainer>
      </div>
    </>
  );
};

export default CreatorLayout;
