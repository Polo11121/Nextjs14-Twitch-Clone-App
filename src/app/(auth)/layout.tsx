import { ReactNode } from "react";
import { Logo } from "@/app/(auth)/_components";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="h-full flex flex-col items-center justify-center space-y-6">
    <Logo />
    {children}
  </div>
);

export default AuthLayout;
