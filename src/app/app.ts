import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";
import { Book } from "./models/books.model";
import { booksRouter } from "./controllers/books.controller";

const app: Application = express();
app.use(express.json());

app.use(booksRouter);




app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
