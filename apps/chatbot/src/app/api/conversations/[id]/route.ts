type Params = {
  params: {
    id: string;
  };
};

export const GET = async (_: Request, { params }: Params) => {
  const userId = "anandam";

  const searchParams = new URLSearchParams({
    user: userId,
    conversation_id: params.id,
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

  return Response.json(data);
};

export const DELETE = async (_: Request, { params }: Params) => {
  const userId = "anandam";

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

  return Response.json(await response.json());
};
