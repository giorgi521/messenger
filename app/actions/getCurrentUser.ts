import getSession from "./getSession"
import prisma from "@/app/libs/prismadb"


const getCurrentUser = async () => {
    try{
        const session = await getSession()

        if(!session?.user?.email){
            return null
        }

        const currentUser =await prisma?.user.findUnique({
            where:{
                email: session.user.email
            },
        })

        if(!currentUser) return null

        return currentUser
      
    } catch(e:any){
        return null
    }
}

export default getCurrentUser;