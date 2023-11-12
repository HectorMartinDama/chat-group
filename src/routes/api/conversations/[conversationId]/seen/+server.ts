import { prisma } from "$lib/prisma.server";
import { pusherServer } from "$lib/pusher";
import type { RequestEvent } from "../$types";


export const POST= async(requestEvent: RequestEvent) =>{

    const session= await requestEvent.locals.getSession();
    const { conversationId }= await requestEvent.request.json();

    const currentUser= await prisma.user.findUnique({
        where: {
            email: session.user?.email as string
        }
    });

     // Find existing conversation
     const conversation = await prisma.conversation.findUnique({
        where: {
          id: conversationId,
        },
        include: {
          messages: {
            include: {
              seen: true
            },
          },
          users: true,
        },
      });

      const lastMessage = conversation.messages[conversation.messages.length - 1];

      if (!lastMessage) {
        return new Response(JSON.stringify(conversation));
      }

       // Update seen of last message
        const updatedMessage = await prisma.message.update({
            where: {
            id: lastMessage.id
            },
            include: {
            sender: true,
            seen: true,
            },
            data: {
            seen: {
                connect: {
                id: currentUser.id
                }
            }
            }
        });

            // Update all connections with new seen
        await pusherServer.trigger(currentUser.email, 'conversation:update', {
            id: conversationId,
            messages: [updatedMessage]
        });
    
        // If user has already seen the message, no need to go further
        if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
            return new Response(JSON.stringify(conversation))
        }
    
        // Update last message seen
        await pusherServer.trigger(conversationId!, 'message:update', updatedMessage);
    
        return new Response(JSON.stringify({ message: 'success' }));
}