import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb";

export async function POST (
    request:Request
) {
    try{
      const currentUser = await getCurrentUser();
      const body = await request.json();

      const {
        message,
        conversationId,
        image,

      } = body

      if (!currentUser?.id || !currentUser?.email) {
        return new NextResponse('Unauthorized', { status: 401 });
      }

      const newMessage = await prisma.message.create({
        include: {
          seen: true,
          sender: true
        },
        data: {
          body: message,
          image: image,
          conversation: {
            connect: { id: conversationId }
          },
          sender: {
            connect: { id: currentUser.id }
          },
          seen: {
            connect: {
              id: currentUser.id
            }
          },
        }
      });

      const updatedConversation = await prisma.conversation.update({
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
      
      const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

      return NextResponse.json(newMessage)
    
    }catch(e:any){
       console.log(e,'ERROR_MESSAGES');
       return new NextResponse('InternalError', { status : 500})
    }
}