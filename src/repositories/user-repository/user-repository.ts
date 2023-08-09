import { Prisma } from "@prisma/client"
import prisma from "../../config/database"

async function createUser(email: string, password: string){
    return await prisma.user.create({
        data: {
            email, password
        }
    })
}
async function findUserByEmail(email: string){
    return await prisma.user.findFirst({
        where: {
            email
        }
    })
}

const userRepository = {
    createUser,
    findUserByEmail
}
export default userRepository