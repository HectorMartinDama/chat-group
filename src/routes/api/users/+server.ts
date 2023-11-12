import { prisma } from "$lib/prisma.server";
import type { RequestEvent } from "@sveltejs/kit";



export const GET= async (requestEvent: RequestEvent) => {
    const session= await requestEvent.locals.getSession();
    const users= await prisma.user.findMany({
        where: {
            NOT: {
                email: session.user.email
            }
        }
    });
   
    return new Response(JSON.stringify(users));
}
