import { ZodError } from "zod";

import { auth } from "@/auth";
import { getApiKeyfromModel } from "@/lib/schema";

type Params = {
  params: {
    taskId: string;
  };
};

export const POST = async (req: Request, { params }: Params) => {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const apiKey = await getApiKeyfromModel(body.model);

    const userId = session.user?.email!;

    const data = {
      user: userId,
    };

    const response = await fetch(
      `${process.env.DIFY_URL}/chat-messages/${params.taskId}/stop`,
      {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        method: "POST",
      }
    );

    return Response.json(await response.json());
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.issues[0].message }, { status: 400 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
