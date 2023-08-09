
import { listBalance } from "@/controllers";
import { validateBody } from "@/middlewares";
import { authenticateToken } from "@/middlewares/authentication-middleware";
import { Router } from "express";

const payableRouter = Router();
payableRouter.all('*', authenticateToken)
payableRouter.get('/balance', listBalance)
export { payableRouter };