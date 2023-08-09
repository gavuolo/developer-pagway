import { AuthenticateToken } from "@/middlewares/authentication-middleware";
import { PayableBody } from "@/protocols";
import payableService from "@/services/payable-services/payable-service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function newPayable(
  req: AuthenticateToken,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req;
  const payableData = req.body as PayableBody;
  try {
    await payableService.postPayable(payableData, user_id);
    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function listBalance(
  req: AuthenticateToken,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req;

  try {
    const response = await payableService.getPayable(user_id)
    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    next(error)
  }
}
