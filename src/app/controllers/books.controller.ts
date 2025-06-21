import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRouter = express.Router();


// create book
booksRouter.post("/api/books", async (req: Request, res: Response) => {
  const body = req.body;
  const data = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data,
  });
});


// get all books
booksRouter.get("/api/books", async (req: Request, res: Response) => {
  const books = await Book.find();

  res.status(201).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});


// Get Book by ID
booksRouter.get("/api/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const book = await Book.findById(bookId);

  res.status(201).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});


// update Book
booksRouter.patch("/api/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const updatedBody = req.body;
  const book = await Book.findByIdAndUpdate(bookId, updatedBody, {new: true});

  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});


// delete Book
booksRouter.delete("/api/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const book = await Book.findByIdAndDelete(bookId);

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
});

