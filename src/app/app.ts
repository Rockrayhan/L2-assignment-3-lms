import express, { Application, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();
app.use(express.json());

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: {
      type: Number,
      default: 1,
      required: true,
      min: [0, "Copies cannot be negative"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer",
      },
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

const Book = model("Book", bookSchema);

// create book
app.post("/api/books", async (req: Request, res: Response) => {
  const body = req.body;
  const data = await Book.create(body);

  res.status(201).json({
    success: true,
    message: "Book created successfully",
    data,
  });
});


// get all books
app.get("/api/books", async (req: Request, res: Response) => {
  const books = await Book.find();

  res.status(201).json({
    success: true,
    message: "Books retrieved successfully",
    data: books,
  });
});


// Get Book by ID
app.get("/api/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const book = await Book.findById(bookId);

  res.status(201).json({
    success: true,
    message: "Book retrieved successfully",
    data: book,
  });
});


// update Book
app.patch("/api/books/:bookId", async (req: Request, res: Response) => {
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
app.delete("/api/books/:bookId", async (req: Request, res: Response) => {
  const bookId = req.params.bookId;
  const book = await Book.findByIdAndDelete(bookId);

  res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
});







app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
