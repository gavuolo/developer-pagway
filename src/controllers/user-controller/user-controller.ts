import { AuthenticateToken } from "@/middlewares/authentication-middleware";
import { LogInBody } from "@/protocols";
import userService from "@/services/user-services/user-service";
import { User, User_card } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as Omit<User, "id">;
  try {
    const user = await userService.postUser(email, password);
    res.status(httpStatus.CREATED).send({ email: user.email });
  } catch (error) {
    next(error);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body as LogInBody;
  try {
    const login = await userService.sessionPost(email, password);
    return res.status(httpStatus.OK).send({token: login.token});
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function regiterCard(
  req: AuthenticateToken,
  res: Response,
  next: NextFunction
) {
  const cardInformation = req.body;
  const { user_id } = req;

  try {
    const cardCreated = await userService.postCard(cardInformation, user_id);
    res.status(httpStatus.CREATED).send(cardCreated)
  } catch (error) {
    next(error);
  }
}
