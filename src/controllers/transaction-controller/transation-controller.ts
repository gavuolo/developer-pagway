import { AuthenticateToken } from "@/middlewares/authentication-middleware";
import { TransactionBody } from "@/protocols";
import payableService from "@/services/payable-services/payable-service";
import transactionService from "@/services/transaction-services/transaction-service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function newTransaction(
  req: AuthenticateToken,
  res: Response,
  next: NextFunction
) {
  const transactionData = req.body as TransactionBody;
  const { user_id } = req;
  try {
    const response = await transactionService.postTransaction(
      transactionData,
      user_id
    );
    const payable = await payableService.postPayable(response.id, user_id)
    console.log(payable)
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    console.log(error)
    next(error);
  }
}

export async function listTransaction(
  req: AuthenticateToken,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req;
  try {
    const response = await transactionService.getTransaction(user_id)
    console.log(response)
    return res.status(httpStatus.OK).send(response)
  } catch (error) {
    next(error);
  }
}
