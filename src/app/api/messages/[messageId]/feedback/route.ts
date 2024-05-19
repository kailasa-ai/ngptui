import { ZodError, z } from "zod";

import { auth } from "@/auth";
import { avatarModelSchema, getApiKeyfromModel } from "@/lib/schema";

const feedbackSchema = avatarModelSchema.extend({
  like: z.boolean().nullable(),
});

type Params = {
  params: {
    messageId: string;
  };
};

export const POST = async (req: Request, { params }: Params) => {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await feedbackSchema.parseAsync(await req.json());
    const { model, ...data } = body;
    const apiKey = await getApiKeyfromModel(model);
    const userId = session.user?.email!;

    const { like } = data;

    const payload = {
      rating: like === null ? like : like ? "like" : "dislike",
      user: userId,
    };

    const response = await fetch(
      `${process.env.DIFY_URL}/messages/${params.messageId}/feedbacks`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (response.ok) {
      return Response.json(await response.json());
    }

    return Response.json(
      { error: "Something went wrong" },
      { status: response.status }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.issues[0].message }, { status: 400 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
