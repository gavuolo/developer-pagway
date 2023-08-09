import express, { Express } from "express";
import cors from "cors";
import { payableRouter, transactionRouter, userRouter } from "./routers";
import { handleApplicationErrors } from "./middlewares/error-handling-middleware";


const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => res.send('OK!'));
app.use('/user', userRouter)
app.use('/transaction', transactionRouter)
app.use('/payable', payableRouter)
app.use(handleApplicationErrors)

export default app;