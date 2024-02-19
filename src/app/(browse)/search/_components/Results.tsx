import {
  ResultCard,
  ResultCardSkeleton,
} from "@/app/(browse)/search/_components";
import { getSearch } from "@/lib/searchService";
import { Skeleton } from "@/components/ui";

type ResultsProps = {
  term?: string;
};

export const Results = async ({ term }: ResultsProps) => {
  const data = await getSearch(term);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Results for term &quot;{term}&quot;
      </h2>
      {!data.length && (
        <p className="text-muted-foreground text-sm">
          No results found. try Searching for something else
        </p>
      )}
      <div className="flex flex-cil gap-y-4">
        {data.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => (
  <div>
    <Skeleton className="h-7 w-[290px] mb-4" />
    <div className="flex flex-col gap-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <ResultCardSkeleton key={index} />
      ))}
    </div>
  </div>
);
