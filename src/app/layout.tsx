import { ReactNode } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import "./globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitch Clone",
  description: "A clone of the popular streaming platform Twitch.",
};

const RootLayout = ({ children }: Readonly<RootLayoutProps>) => (
  <ClerkProvider
    appearance={{
      baseTheme: dark,
    }}
  >
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          storageKey="twitch-clone-theme"
        >
          <Toaster theme="light" position="bottom-center" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
