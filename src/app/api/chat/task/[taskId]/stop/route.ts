import { auth } from "@/auth";

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
        Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
      },
      method: "POST",
    }
  );

  return Response.json(await response.json());
};
