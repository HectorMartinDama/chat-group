import { prisma } from "$lib/prisma.server";
import type { RequestEvent } from "../../$types";

export const GET = async (request: RequestEvent) => {
  const session = await request.locals.getSession();
  if(!session) return null;

  const currentUser= await prisma.user.findUnique({
    where: {
      email: session.user?.email as string
    }
  });

  return new Response(JSON.stringify(currentUser));
};
