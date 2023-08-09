import { TransactionBody } from "@/protocols";
import prisma from "../../config/database";

async function createTransaction(transactionData: TransactionBody, user_id: number, valueInt: number){
    return await prisma.transaction.create({
        data:{
            user_id,
            value: valueInt,
            description: transactionData.description,
            user_card_id: transactionData.user_card_id
            
        }
    })
}

async function getTransactionByUserId(user_id: number){
    return await prisma.transaction.findFirst({
        where: {
            user_id
        }
    })
}

async function getTransactionById(user_id: number, transaction_id:number){
    return await prisma.transaction.findFirst({
        where:{
            user_id,
            id: transaction_id
        }
    })

}
async function findCardById(user_card_id: number, user_id: number){
    return await prisma.user_card.findFirst({
        where:{
            id: user_card_id,
            user_id
        }
    })
}
const transactionRepository = {
    createTransaction,
    getTransactionByUserId,
    getTransactionById,
    findCardById
}

export default transactionRepository;