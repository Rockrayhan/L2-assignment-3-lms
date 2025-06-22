import express, { Application, Request, Response } from "express";
import { booksRouter } from "./app/controllers/books.controller";
import { borrowRouter } from "./app/controllers/borrow.controller";


const app: Application = express();
app.use(express.json());

app.use(booksRouter);

app.use("/api", borrowRouter);




app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
