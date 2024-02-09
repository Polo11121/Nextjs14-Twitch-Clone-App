import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  label?: string;
};
const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = ({ label }: LogoProps) => (
  <Link href="/">
    <div className="flex items-center gap-x-4 hover:opacity-75 transition">
      <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink ">
        <Image src="/spooky.svg" alt="Twitch Clone" height="32" width="32" />
      </div>
      <div className={cn(font.className, "hidden lg:block")}>
        <p className="text-lg font-semibold">Twitch Clone</p>
        {label ? (
          <p className="text-xs text-muted-foreground">{label}</p>
        ) : (
          <p className="text-xs text-muted-foreground">Lets&apos;s play</p>
        )}
      </div>
    </div>
  </Link>
);
