import { error, type RequestEvent } from "@sveltejs/kit";
import { prisma } from "$lib/prisma.server";
import type { Message } from "@prisma/client";
import type { FullConversationType } from "../../../../types";

export const POST= async (requestEvent: RequestEvent) => {
    const session= await requestEvent.locals.getSession();
    const { conversationId } = await requestEvent.request.json();
    
    const currentUser= await prisma.user.findUnique({
        where: {
            email: session.user?.email as string
        }
    });

    // find the existing conversation
    const conversation: FullConversationType= await prisma.conversation.findUnique({
        where: {
            id: conversationId
        },
        include: {
            messages: {
                include: {
                    seen: true
                }
            },
            users: true
        }
    });

    if(!conversation) throw error(404, "Conversation not found");
    
    // find the last message
    const lastMessage= conversation.messages[conversation.messages.length - 1];

    if(!lastMessage) return new Response(JSON.stringify(conversation));

    // update seen of the last message
    const updatedMessage: Message= await prisma.message.update({
        where: {
            id: lastMessage.id
        },
        include: {
            seen: true,
            sender: true
        },
        data: {
            seen: {
                connect: {
                    id: currentUser.id
                }
            }
        }
    });

    return new Response(JSON.stringify(updatedMessage));
  
}