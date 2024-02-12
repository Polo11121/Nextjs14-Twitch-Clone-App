import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/lib/db";

const reciver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export const POST = async (req: Request) => {
  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get("authorization");

  if (!authorization) {
    return new Response("Error occured -- no authorization header", {
      status: 400,
    });
  }

  const event = reciver.receive(body, authorization);

  if (event.event === "ingress_ended") {
    await db.stream.update({
      where: { ingressId: event.ingressInfo?.ingressId },
      data: { isLive: false },
    });
  }
  if (event.event === "ingress_started") {
    await db.stream.update({
      where: { ingressId: event.ingressInfo?.ingressId },
      data: { isLive: true },
    });
  }

  return new Response("", { status: 200 });
};
