import { prisma } from "$lib/prisma.server";
import type { PageServerLoad } from "../$types";




export const load: PageServerLoad= async (event) =>{
    const session= await event.locals.getSession();
    if(!session?.user?.email) return [];

    const users= await prisma.user.findMany({
        where: {
            NOT: {
                email: session.user.email
            }
        }
    });
    return { users };
}




