import express, { Express } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.get('/health', (_req, res) => res.send('OK!'));

export default app;