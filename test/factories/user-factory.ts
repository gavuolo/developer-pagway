import prisma from "../../src/config/database";
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export async function createUser(email: string , password: string){
    const hashedPassword = await bcrypt.hash(password, 10)
    return await prisma.user.create({
        data:{
            email: email || faker.internet.email(),
            password: hashedPassword,
        }
    });
}
export async function createLogin(user_id: number, token: string){
    return await prisma.session.create({
        data:{
            user_id,
            token
        }
    })
}

export async function createCard(user_id: number){
    return await prisma.user_card.create({
        data: {
            card_name: faker.lorem.words(),
            card_number: "1234",
            card_expiring_date: "02/21",
            card_cvv: "123",
            user_id
        }
        
    })
}