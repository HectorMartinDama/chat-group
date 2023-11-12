import { prisma } from "$lib/prisma.server";
import  type { PageServerLoad } from '../$types';

export const load: PageServerLoad=async (event) => {
    const session= await event.locals.getSession();
    const currentUser= await prisma.user.findUnique({
        where: {
            email: session.user?.email as string
        }
    });

    const conversations= await prisma.conversation.findMany({
        orderBy: {
            lastMessageAt: 'desc'
        },
        where: {
            userIds: {
                has: currentUser.id
            }
        },
        include: {
            users: true,
            messages: {
                include: {
                    sender: true,
                    seen: true
                }
            }
        }
    });

    const users= await prisma.user.findMany({
        where: {
            email: {
                not: currentUser.email
            }
        }
    });

    


    return { conversations, users }
}