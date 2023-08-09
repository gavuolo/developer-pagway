import { duplicatedEmailError } from "@/errors/duplicated-email-error";
import userRepository from "@/repositories/user-repository/user-repository";

export async function postUser(email: string, password: string){
    await verificationUser(email)
    return await userRepository.createUser(email, password)
}
async function verificationUser(email: string){
    const userExist = await userRepository.findUserByEmail(email)
    if(userExist){
        throw duplicatedEmailError()
    }
}

const userService = {
    postUser
}

export default userService