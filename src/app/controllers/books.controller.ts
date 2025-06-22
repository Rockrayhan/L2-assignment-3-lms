import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import mongoose from "mongoose";

export const booksRouter = express.Router();

// create book
booksRouter.post("/api/books", async (req: Request, res: Response) => {
  const body = req.body;

  if (body.copies === 0) {
    body.available = false;
  }

  const data = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data,
  });
});


// get all books with filtering
booksRouter.get("/api/books", async (req: Request, res: Response) => {
  try {
    const filterGenre = req.query.filter as string;
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sort as string) || "desc";
    const limit = parseInt(req.query.limit as string) || 10;

    let filter = {};
    if (filterGenre) {
      filter = { genre: filterGenre };
    }

    const sortDirection = sortOrder === "asc" ? 1 : -1;
    const sortCondition: any = {};
    sortCondition[sortBy] = sortDirection;

    const books = await Book.find(filter).sort(sortCondition).limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while retrieving books",
      error: (error as Error).message,
    });
  }
});




// Get single Book by ID

booksRouter.get("/api/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;

  const book = await Book.findById(bookId);


  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
      data: null,
    });
  }


  res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});



// update Book
booksRouter.patch("/api/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const updatedBody = req.body;

  if (updatedBody.copies === 0) {
    updatedBody.available = false;
  } else if (updatedBody.copies >= 1) {
    updatedBody.available = true;
  }

  const book = await Book.findByIdAndUpdate(bookId, updatedBody, { new: true });

    if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
      data: null,
    });
  }


  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});



// delete Book
booksRouter.delete(
  "/api/books/:bookId",
  async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    
    const book = await Book.findByIdAndDelete(bookId);

        if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  }
);
