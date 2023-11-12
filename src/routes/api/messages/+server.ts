import { prisma } from "$lib/prisma.server";
import type { Message } from "@prisma/client";
import type { RequestEvent } from "../$types";
import { pusherServer } from "$lib/pusher";





export const POST= async (requestEvent: RequestEvent) =>{
    const session= await requestEvent.locals.getSession();
    const { request } = requestEvent;
    const { message, conversationId, image }= await request.json();

    const currentUser= await prisma.user.findUnique({
        where: {
            email: session.user?.email as string
        }
    });

    const newMessage: Message= await prisma.message.create({
        data: {
            body: message,
            image: image,
            conversation: {
                connect: {
                    id: conversationId
                }
            },
            sender: {
                connect: {
                    id: currentUser.id
                }
            },
            seen: {
                connect: {
                    id: currentUser.id
                }
            }
        },
        include: {
            seen: true,
            sender: true
        }
    });


    const updatedConversation= await prisma.conversation.update({
        where: {
            id: conversationId
        },
        data: {
            lastMessageAt: new Date(),
            messages: {
                connect: {
                    id: newMessage.id
                }
            }
        },
        include: {
            users: true,
            messages: {
                include: {
                    seen: true
                }
            }
        }
    });


    await pusherServer.trigger(conversationId, 'message:new', newMessage);

    const lastMessage= updatedConversation.messages[updatedConversation.messages.length - 1];

    await updatedConversation.users.map((user: User) =>{
        pusherServer.trigger(user.email!, 'conversation:update', {
            id: conversationId,
            messages: [lastMessage]
        })
    });

    return new Response(JSON.stringify(newMessage));
}