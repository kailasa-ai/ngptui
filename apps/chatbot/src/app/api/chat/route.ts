import { z } from "zod";

const chatSchema = z.object({
  query: z.string(),
  conversation_id: z.string().optional().default(""),
});

export const POST = async (req: Request) => {
  const body = await req.json();

  const results = chatSchema.safeParse(body);

  if (!results.success) {
    return Response.json(results.error, { status: 400 });
  }

  const payload = {
    ...body,
    response_mode: "streaming",
    auto_generate_name: true,
    user: "anandam",
    inputs: {},
  };

  const headers = new Headers();

  headers.set("Content-Type", "text/event-stream");
  headers.set("Cache-Control", "no-cache");
  headers.set("Connection", "keep-alive");

  let responseStream = new TransformStream();
  console.log(payload);

  const response = await fetch(`${process.env.DIFY_URL}/chat-messages`, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
    },
    method: "POST",
  });

  response.body?.pipeThrough(responseStream);

  return new Response(responseStream.readable, {
    headers,
  });
};
