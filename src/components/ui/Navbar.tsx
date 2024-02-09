import { ReactNode } from "react";
import { Logo, Search } from "@/components/ui";

type NavbarProps = {
  showSearch?: boolean;
  logoLabel?: string;
  children?: ReactNode;
};

export const Navbar = ({
  logoLabel,
  children,
  showSearch = true,
}: NavbarProps) => (
  <div className="fixed top-0 w-full h-20 z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
    <Logo label={logoLabel} />
    {showSearch && <Search />}
    {children}
  </div>
);
