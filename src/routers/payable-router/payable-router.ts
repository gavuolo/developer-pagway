
import { listBalance, newPayable } from "@/controllers";
import { validateBody } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { Router } from "express";

const payableRouter = Router();
payableRouter.all('*', authenticateToken)
payableRouter.post('/', newPayable);
payableRouter.get('/', listBalance)
export { payableRouter };