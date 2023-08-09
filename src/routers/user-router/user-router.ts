import { newUser } from "@/controllers";
import { validateBody } from "@/middlewares";
import { createUserSchema } from "@/schemas/user-schema";
import { Router } from "express";

const userRouter = Router();
userRouter.post("", validateBody(createUserSchema), newUser);

export { userRouter };
