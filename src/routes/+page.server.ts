import { prisma } from '$lib/prisma.server';
import type { Actions } from '@sveltejs/kit';


// export const load: PageServerLoad= async (event) =>{
//     const session= await event.locals.getSession();
//     if (!session?.user) throw redirect(303, '/auth');
//     return {};
// }


export const actions: Actions= {
    getUsers: async(event) =>{
        const session= await event.locals.getSession();
        if(!session?.user?.email) return [];

        try{
            const users= await prisma.user.findMany({
                orderBy: {
                    createdAt: 'desc'
                },
                where: {
                    NOT: {
                        email: session?.user?.email
                    }
                }
            });
            return users;
        } catch(e){
            console.log(e);
        }
    }
}