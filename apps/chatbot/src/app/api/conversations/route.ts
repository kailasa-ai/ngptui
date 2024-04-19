export const GET = async () => {
  const userId = "anandam";

  const params = new URLSearchParams({
    limit: "20",
    user: userId,
  });

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
