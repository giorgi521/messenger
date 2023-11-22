import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";  
import prisma from '@/app/libs/prismadb';

interface Iparams {
    conversationId: string;
}

export async function DELETE(
    request: Request,
    {params}: {params: Iparams},
){
    try{
   const {conversationId} = params;
   const currentUser = await getCurrentUser();

   if(!currentUser){
       return new NextResponse('Unauthorized', {status: 401})
   }

    const existingConversation = await prisma?.conversation.findFirst({
        where:{
            id:conversationId
        },
        include:{
            users:true
        }
    })
    if(!existingConversation){
        return new NextResponse('Invalid ID', {status: 400})
    }
   const deleteConversation = await prisma?.conversation.delete({
        where:{
            id:conversationId,
                userIds:{
                    hasSome:[currentUser.id]
                }
        }
   })

   return NextResponse.json(deleteConversation)

    } catch(e:any){
      console.log(e, 'conversation delete')
      return new NextResponse('Internal Error', {status: 500})
    }
}