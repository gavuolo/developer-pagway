import { AuthenticateToken } from "@/middlewares/authentication-middleware";
import { PayableBody } from "@/protocols";
import payableService from "@/services/payable-services/payable-service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

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
