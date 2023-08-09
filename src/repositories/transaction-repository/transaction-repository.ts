import { TransactionBody } from "@/protocols";
import prisma from "../../config/database";

async function createTransaction(transactionData: TransactionBody, user_id: number){
    return await prisma.transaction.create({
        data:{
            user_id,
            ...transactionData
        }
    })
}

async function getTransactionById(user_id: number){
    return await prisma.transaction.findFirst({
        where: {
            user_id
        }
    })
}

const transactionRepository = {
    createTransaction,
    getTransactionById
}

export default transactionRepository;