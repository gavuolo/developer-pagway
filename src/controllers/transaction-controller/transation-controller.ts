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
    const { rate, net_value, payment_date, status } = await payableService.postPayable(response.id, user_id)
    const realNetValue = net_value / 100
    return res.status(httpStatus.CREATED).send({
      rate, net_value: realNetValue, payment_date, status, value: transactionData.value
    });
  } catch (error) {
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
    return res.status(httpStatus.OK).send(response)
  } catch (error) {
    next(error);
  }
}
