import { CopyButton } from "@/app/(dashboard)/u/[username]/keys/_components";
import { Input } from "@/components/ui";

type URLCardProps = {
  value: string | null;
};

export const URLCard = ({ value }: URLCardProps) => (
  <div className="rounded-xl bg-muted p-6">
    <div className="flex items-center gap-x-10">
      <p className="font-semibold shrink-0">Server URL</p>
      <div className="space-y-2 w-full">
        <div className="w-full flex items-center gap-x-2">
          <Input value={value || ""} disabled placeholder="Server URL" />
          <CopyButton value={value || ""} />
        </div>
      </div>
    </div>
  </div>
);
