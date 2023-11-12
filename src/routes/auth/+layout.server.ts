import type { PageServerLoad } from './$types';
import { prisma } from "$lib/prisma.server";
import { redirect, type Action, type Actions, fail } from "@sveltejs/kit";

 export const load: PageServerLoad= async (event) =>{
    const session= await event.locals.getSession();
    if (session?.user) throw redirect(303, '/users');
    return {};
}




