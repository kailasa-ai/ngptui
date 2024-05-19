import { ZodError } from "zod";

import { auth } from "@/auth";
import { getApiKey } from "@/lib/schema";

type Params = {
  params: {
    id: string;
  };
};

export const GET = async (req: Request, { params }: Params) => {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const searchParams = new URL(req.url).searchParams;
    const apiKey = await getApiKey(searchParams);

    const userId = session.user?.email!;

    const validParams = new URLSearchParams({
      user: userId,
      conversation_id: params.id,
      limit: "30",
    });

    const response = await fetch(
      `${process.env.DIFY_URL}/messages?${validParams}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const data = await response.json();

    if (response.status === 404) {
      return Response.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    return Response.json(data, {
      status: response.status,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.issues[0].message }, { status: 400 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: Params) => {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const searchParams = new URL(req.url).searchParams;
    const apiKey = await getApiKey(searchParams);

    const userId = session.user?.email!;

    const response = await fetch(
      `${process.env.DIFY_URL}/conversations/${params.id}`,
      {
        body: JSON.stringify({
          user: userId,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        method: "DELETE",
      }
    );

    const data =
      response.status === 204
        ? { result: "success", code: 200 }
        : { result: "failed", code: 400 };

    return Response.json(data);
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.issues[0].message }, { status: 400 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
