import prisma from "../../src/config/database";
import { faker } from '@faker-js/faker';

export async function createTransaction(user_id: number, user_card_id: number) {
    return await prisma.transaction.create({
        data: {
            user_id,
            value: faker.number.int({ min: 0, max: 999 }),
            description: faker.lorem.words(),
            user_card_id
        }
    })
}
export async function createPayable(user_id: number, transaction_id: number) {
    return await prisma.payable.create({
        data: {
            user_id,
            transaction_id,
            rate: faker.number.float({ min: 0, max: 100, precision: 2 }),
            net_value: faker.number.int({ min: 0, max: 999 }),
            status: 'Pendente',
            payment_date: faker.date.birthdate().toString()
        }
    })
}