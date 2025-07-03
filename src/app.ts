import express, { Application, Request, Response } from "express";
import { booksRouter } from "./app/controllers/books.controller";
import { borrowRouter } from "./app/controllers/borrow.controller";
import cors from 'cors';

const app: Application = express();
app.use(express.json());


app.use(
  cors({
    origin: ['http://localhost:5173', 'https://lms-frontend-gray-iota.vercel.app/']
   })
);

app.use(booksRouter);

app.use("/api", borrowRouter);




app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
