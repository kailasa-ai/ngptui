import { z } from "zod";

import { auth } from "@/auth";

const chatSchema = z.object({
  query: z.string(),
  conversation_id: z.string().optional().default(""),
});

export const POST = async (req: Request) => {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user?.email!;

  const body = chatSchema.safeParse(await req.json());

  if (!body.success) {
    return Response.json(body.error, { status: 400 });
  }

  const payload = {
    ...body.data,
    response_mode: "streaming",
    auto_generate_name: true,
    user: userId,
    inputs: {},
  };

  const headers = new Headers();

  headers.set("Content-Type", "text/event-stream");
  headers.set("Cache-Control", "no-cache");
  headers.set("Connection", "keep-alive");

  let responseStream = new TransformStream();

  const response = await fetch(`${process.env.DIFY_URL}/chat-messages`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DIFY_NITHYNANDAM_API_KEY}`,
    },
    method: "POST",
  });

  response.body?.pipeThrough(responseStream);

  return new Response(responseStream.readable, {
    headers,
  });
};
