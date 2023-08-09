import { regiterCard, signIn, signUp } from "@/controllers";
import { validateBody } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { creteCardSchema, userSchema } from "@/schemas/user-schema";
import { Router } from "express";

const userRouter = Router();
userRouter.post("/signup", validateBody(userSchema), signUp);
userRouter.post("/signin", validateBody(userSchema), signIn);
userRouter.post("/card", authenticateToken, validateBody(creteCardSchema), regiterCard);
export { userRouter };
