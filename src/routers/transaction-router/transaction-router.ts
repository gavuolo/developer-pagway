import { listTransaction, newTransaction } from "@/controllers";
import { validateBody } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { transactionSchema } from "@/schemas/transaction-schema";
import { Router } from "express";

const transactionRouter = Router();
transactionRouter.all('*', authenticateToken)
transactionRouter.post('/', newTransaction);
transactionRouter.get('/', listTransaction)
export { transactionRouter };