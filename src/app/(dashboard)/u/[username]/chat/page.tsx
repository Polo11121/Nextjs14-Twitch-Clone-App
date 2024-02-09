import { getCurrentDbUser } from "@/lib/authService";
import { getStreamByUserId } from "@/lib/streamService";
import { ToggleCard } from "@/app/(dashboard)/u/[username]/chat/_components";

const ChatPage = async () => {
  const currentDbUser = await getCurrentDbUser();
  const stream = await getStreamByUserId(currentDbUser.id);

  if (!stream) {
    throw new Error("Stream not found");
  }

  const options = [
    {
      label: "Enable chat",
      value: stream.isChatEnabled,
      field: "isChatEnable" as const,
    },
    {
      label: "Enable delayed chat",
      value: stream.isChatDelayed,
      field: "isChatDelayed" as const,
    },
    {
      label: "Enable followers-only chat",
      value: stream.isChatFollowersOnly,
      field: "isChatFollowersOnly" as const,
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Chat settings</h1>
      </div>
      <div className="space-y-4">
        {options.map((option) => (
          <ToggleCard
            key={option.field}
            field={option.field}
            label={option.label}
            value={option.value}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatPage;
