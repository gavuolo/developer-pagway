import userService from "@/services/user-services/user-service";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function newUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body as Omit<User, "id">;
  try {
    const user = await userService.postUser(email, password)
    //e-mail unico 
    res.status(httpStatus.CREATED).send(user)
  } catch (error) {
    next(error)
  }
}
