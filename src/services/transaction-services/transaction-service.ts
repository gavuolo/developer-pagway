import { TransactionBody } from "@/protocols";
import transactionRepository from "@/repositories/transaction-repository/transaction-repository";
import { Transaction } from "@prisma/client";

async function postTransaction(
  transactionData: TransactionBody,
  user_id: number
): Promise<Transaction> {
  const { value } = transactionData;
  const valueInt = Number(value) * 100;
  return await transactionRepository.createTransaction(
    transactionData,
    user_id,
    valueInt
  );
}
async function getTransaction(user_id: number) {
  return await transactionRepository.getTransactionByUserId(user_id);
}
const transactionService = {
  postTransaction,
  getTransaction,
};

export default transactionService;
