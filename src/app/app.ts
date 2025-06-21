import express, { Application, Request, Response } from "express";
import { booksRouter } from "./controllers/books.controller";
import { borrowRouter } from "./controllers/borrow.controller";

const app: Application = express();
app.use(express.json());

app.use(booksRouter);

app.use("/api", borrowRouter);




app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
