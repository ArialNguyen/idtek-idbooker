import { db } from "@/lib/db"
import UserType from "@/types/user";

export const getUserByEmail = async (email: string) => {
    try{
        const user = await db.user.findUnique({
            where: {
                 email
            }
        })
        return user;
    }catch(e){
        return null
    }
}

export const getUserById = async (id: string) => {
    try{
        const user = await db.user.findUnique({
            where: {
                id
            }
        })
        return user;
    }catch(e){
        return null
    }
}