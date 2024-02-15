import { Suspense } from "react";
import { Results, ResultsSkeleton } from "@/app/(browse)/_components";

const HomePage = () => (
  <div className="h-full p-8 max-w-screen-2xl mx-auto">
    <Suspense fallback={<ResultsSkeleton />}>
      <Results />
    </Suspense>
  </div>
);

export default HomePage;
