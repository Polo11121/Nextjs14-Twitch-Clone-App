import { Skeleton } from "@/components/ui";

const ChatLoading = () => (
  <div className="p-6 space-y-4">
    <Skeleton className="h-10 w-[200px]" />
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="rounded-xl p-6 w-full" />
      ))}
    </div>
  </div>
);

export default ChatLoading;
