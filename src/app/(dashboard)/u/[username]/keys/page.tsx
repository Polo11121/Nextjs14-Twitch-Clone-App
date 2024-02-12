import {
  ConnectModal,
  KeyCard,
  URLCard,
} from "@/app/(dashboard)/u/[username]/keys/_components";
import { getCurrentDbUser } from "@/lib/authService";
import { getStreamByUserId } from "@/lib/streamService";

const KeysPage = async () => {
  const currentDbUser = await getCurrentDbUser();
  const stream = await getStreamByUserId(currentDbUser.id);

  if (!stream) {
    throw new Error("Stream not found");
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <URLCard value={stream.serverUrl} />
        <KeyCard value={stream.streamKey} />
      </div>
    </div>
  );
};

export default KeysPage;
