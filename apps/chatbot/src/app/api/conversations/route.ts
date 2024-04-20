export const GET = async (req: Request) => {
  const userId = "madhu";
  const url = new URL(req.url);
  const lastId = url.searchParams.get("lastId") || undefined;

  const params = new URLSearchParams({
    limit: "20",
    user: userId,
  });

  if (lastId) {
    params.append("last_id", lastId);
  }

  const response = await fetch(
    `${process.env.DIFY_URL}/conversations?${params}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
      },
    }
  );

  return Response.json(await response.json());
};
