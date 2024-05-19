import { ZodError, z } from "zod";

import { auth } from "@/auth";
import { getApiKey } from "@/lib/schema";

const paramsSchema = z.object({
  limit: z
    .string()
    .nullish()
    .transform((s) => s ?? "30"),
  lastId: z.string().optional().nullable(),
});

export const GET = async (req: Request) => {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user?.email!;

  try {
    const searchParams = new URL(req.url).searchParams;
    const apiKey = await getApiKey(searchParams);

    const validParams = await paramsSchema.parseAsync({
      limit: searchParams.get("lastId"),
      lastId: searchParams.get("limit"),
    });

    const params = new URLSearchParams({
      limit: validParams.limit!,
      user: userId,
    });

    if (validParams.lastId) {
      params.append("last_id", validParams.lastId);
    }

    const response = await fetch(
      `${process.env.DIFY_URL}/conversations?${params}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (response.status === 401) {
      return Response.json(
        { error: "Unauthorised request. Please check the api key" },
        { status: 401 }
      );
    }

    return Response.json(await response.json());
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ error: error.issues[0].message }, { status: 400 });
    }

    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
