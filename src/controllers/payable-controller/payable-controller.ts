import { AuthenticateToken } from "@/middlewares/authentication-middleware";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function newPayable(
  req: AuthenticateToken,
  res: Response,
  next: NextFunction
) {
  const { user_id } = req;
  try {
    
  } catch (error) {
    next(error);
  }
}
