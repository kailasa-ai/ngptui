import { ZodError, z } from "zod";

import { auth } from "@/auth";
import { avatarModelSchema, getApiKey, getApiKeyfromModel } from "@/lib/schema";

const chatSchema = avatarModelSchema.extend({
  query: z.string(),
  conversation_id: z.string().optional().default(""),
});

export const POST = async (req: Request) => {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user?.email!;

    const body = await chatSchema.parseAsync(await req.json());

    const { model, ...data } = body;

    const apiKey = await getApiKeyfromModel(model);

    const payload = {
      ...data,
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
        Authorization: `Bearer ${apiKey}`,
      },
      method: "POST",
    });

    response.body?.pipeThrough(responseStream);

    return new Response(responseStream.readable, {
      headers,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.issues[0].message }, { status: 400 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
