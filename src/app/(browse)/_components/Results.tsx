import {
  ResultCard,
  ResultCardSkeleton,
} from "@/app/(browse)/_components/ResultCard";
import { Skeleton } from "@/components/ui";
import { getStreams } from "@/lib/feedService";

export const Results = async () => {
  const streams = await getStreams();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Streams we think you&apos;ll like
      </h2>
      {!streams.length ? (
        <div className="text-muted-foreground text-sm">No streams found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {streams.map((stream) => (
            <ResultCard key={stream.id} data={stream} />
          ))}
        </div>
      )}
    </div>
  );
};

export const ResultsSkeleton = () => (
  <div>
    <Skeleton className="h-8 w-[290px] mb-4" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {[...Array(4)].map((_, index) => (
        <ResultCardSkeleton key={index} />
      ))}
    </div>
  </div>
);
