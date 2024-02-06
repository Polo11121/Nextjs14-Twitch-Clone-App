import { ReactNode } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
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
  <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
