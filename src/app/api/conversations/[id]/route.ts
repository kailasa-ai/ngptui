import { auth } from "@/auth";

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

  const userId = session.user?.email!;

  const searchParams = new URLSearchParams({
    user: userId,
    conversation_id: params.id,
    limit: "30",
  });

  const response = await fetch(
    `${process.env.DIFY_URL}/messages?${searchParams}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
      },
    }
  );

  const data = await response.json();

  if (response.status === 404) {
    return Response.json({ error: "Conversation not found" }, { status: 404 });
  }

  return Response.json(data, {
    status: response.status,
  });
};

export const DELETE = async (_: Request, { params }: Params) => {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user?.email!;

  const response = await fetch(
    `${process.env.DIFY_URL}/conversations/${params.id}`,
    {
      body: JSON.stringify({
        user: userId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
      },
      method: "DELETE",
    }
  );

  const data =
    response.status === 204
      ? { result: "success", code: 200 }
      : { result: "failed", code: 400 };

  return Response.json(data);
};
