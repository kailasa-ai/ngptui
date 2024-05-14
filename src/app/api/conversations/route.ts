import { auth } from "@/auth";

export const GET = async (req: Request) => {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user?.email!;

  const url = new URL(req.url);
  const lastId = url.searchParams.get("lastId") || undefined;
  const limit = url.searchParams.get("limit") || "30";

  const params = new URLSearchParams({
    limit: limit,
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
        Authorization: `Bearer ${process.env.DIFY_NITHYNANDAM_API_KEY}`,
      },
    }
  );

  return Response.json(await response.json());
};
