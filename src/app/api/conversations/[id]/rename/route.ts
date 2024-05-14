import { auth } from "@/auth";

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

  const userId = session.user?.email!;
  const body = await req.json();

  const payload = {
    ...body,
    user: userId,
  };

  const response = await fetch(
    `${process.env.DIFY_URL}/conversations/${params.id}/name`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIFY_NITHYNANDAM_API_KEY}`,
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
};
