"use client";

import { Button } from "@/components/ui";
import Link from "next/link";

export const ErrorPage = () => (
  <div className="h-ful flex flex-col space-y-4 items-center justify-center text-muted-foreground">
    <p>Something went wrong</p>
    <Button variant="secondary" asChild>
      <Link href="/">Go back home</Link>
    </Button>
  </div>
);

export default ErrorPage;
