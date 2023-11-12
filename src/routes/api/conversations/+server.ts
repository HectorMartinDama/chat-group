import { error} from "@sveltejs/kit";
import type { RequestEvent } from "../../$types";
import { prisma } from "$lib/prisma.server";
import type { Conversation } from "@prisma/client";

export const POST= async (requestEvent: RequestEvent) => {
    const session= await requestEvent.locals.getSession();
    const { request }= requestEvent;
    const { userId, isGroup, members, name, description }= await request.json();

    if(!session?.user) throw error(401, 'Unathorized');

    const currentUser= await prisma.user.findUnique({
        where: {
            email: session.user?.email as string
        }
    });

    if(isGroup && (!members || members.length < 2 || !name)){
        throw error(400, 'Invalid group data');
    }

    if(isGroup){
        const newConversation= await prisma.conversation.create({
            data: {
                name,
                isGroup,
                description,
                users: {
                    connect: [
                        ...members.map((member: {  value: string}) => ({
                            id: member
                        })),
                        {
                            id: currentUser.id
                        }
                    ]
                }
            },
            include: {
                users: true 
            }
        });
        return new Response(JSON.stringify(newConversation));
    }

    const existingConversations= await prisma.conversation.findMany({
        where: {
            OR : [
                {
                    userIds: {
                        equals: [currentUser.id, userId]
                    }
                },
                {
                    userIds: {
                        equals: [userId, currentUser.id]
                    }
                }
            ]
        }
    });

    const singleConversation= existingConversations[0];

    if(singleConversation) return new Response(JSON.stringify(singleConversation));

    const newConversation: Conversation= await prisma.conversation.create({
        data: {
            users: {
                connect: [
                    {
                        id: currentUser.id
                    },
                    {
                        id: userId
                    }
                ]
            }
        },
        include: {
            users: true
        }
    });

    return new Response(JSON.stringify(newConversation));  
}

export const GET= async (requestEvent: RequestEvent) => {
    const session= await requestEvent.locals.getSession();
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

    return new Response(JSON.stringify(conversations));
}