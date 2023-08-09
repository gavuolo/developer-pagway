import { duplicatedEmailError } from "@/errors/duplicated-email-error";
import userRepository from "@/repositories/user-repository/user-repository";
import { Session, User, User_card } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export async function postUser(email: string, password: string): Promise<User>{
    await validateEmail(email)
    const hashedPassword = await bcrypt.hash(password, 12);
    return await userRepository.createUser(email, hashedPassword)
}

async function validateEmail(email: string){
    const userExist = await userRepository.findUserByEmail(email)
    if(userExist){
        throw duplicatedEmailError()
    }
}

async function sessionPost(email: string, password: string): Promise<Session> {
    const findUser = await findEmail(email)
    await validatePassword(password, findUser.password)
    const sessionCreated = await session(findUser.id)    
    return sessionCreated
}

async function findEmail(email: string){
    const emailExist = await userRepository.findEmail(email);
    if(!emailExist){
        throw new Error ("ué")
    }
    return emailExist
}

async function validatePassword(password: string, userPassword: string){
    const passwordValidation = await bcrypt.compare(password, userPassword)
    if(!passwordValidation){
        throw new Error ("num é a senmha")
    }
}

async function session(user_id: number){
    const token = jwt.sign({ user_id }, process.env.JWT_SECRET)
    const sessionCreated = await userRepository.createSession(token, user_id)
    return sessionCreated
}

export async function postCard(cardInformation: Omit<User_card, "id">, user_id: number){
    return await userRepository.createCard(cardInformation, user_id)
}


const userService = {
    postUser,
    postCard,
    sessionPost
}

export default userService