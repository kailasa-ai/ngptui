import { z } from "zod";

import { auth } from "@/auth";

const feedbackSchema = z.object({
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

  const body = feedbackSchema.safeParse(await req.json());

  if (!body.success) {
    return Response.json(body.error, { status: 400 });
  }

  const userId = session.user?.email!;

  const { like } = body.data;

  const payload = {
    rating: like === null ? like : like ? "like" : "dislike",
    user: userId,
  };

  try {
    const response = await fetch(
      `${process.env.DIFY_URL}/messages/${params.messageId}/feedbacks`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
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
  } catch (e) {
    console.log(e);
    return Response.json({ error: e }, { status: 500 });
  }
};
