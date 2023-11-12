import { prisma } from "$lib/prisma.server";
import { error, redirect, type Actions, type RequestEvent, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";



export const load: PageServerLoad=async ({ params }) => {

    try {
        const conversation= await prisma.conversation.findUnique({
            where: {
                id: params.id
            },
            include: {
                users: true
            }
        });
    
        const messages= await prisma.message.findMany({
            where: {
                conversationId: params.id
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });
        
        return { conversation, messages, params }
        
    } catch (errorMessage) {
        throw error(404, { message: 'Conversation not found' })
    }  
}