import { TransactionBody } from "@/protocols"
import transactionRepository from "@/repositories/transaction-repository/transaction-repository"
import { Transaction } from "@prisma/client"

async function postTransaction(transactionData: TransactionBody, user_id: number): Promise<Transaction>{
    return await transactionRepository.createTransaction(transactionData, user_id)
}
async function getTransaction(user_id: number){
    return await transactionRepository.getTransactionById(user_id)
}
const transactionService = {
    postTransaction,
    getTransaction
}

export default transactionService