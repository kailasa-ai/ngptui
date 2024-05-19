import { ZodError } from "zod";

import { auth } from "@/auth";
import { getApiKeyfromModel } from "@/lib/schema";

type Params = {
  params: {
    id: string;
  };
};

export const PATCH = async (req: Request, { params }: Params) => {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session.user?.email!;
    const body = await req.json();
    const { model, ...data } = body;

    const apiKey = await getApiKeyfromModel(body.model);

    const payload = {
      ...data,
      user: userId,
    };

    const response = await fetch(
      `${process.env.DIFY_URL}/conversations/${params.id}/name`,
      {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (response.status !== 200) {
      return Response.json(
        { error: await response.json() },
        { status: response.status }
      );
    }

    return Response.json(await response.json(), {
      status: response.status,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.issues[0].message }, { status: 400 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
