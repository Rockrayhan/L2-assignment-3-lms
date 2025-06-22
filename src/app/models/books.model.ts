import { Document, model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";


 interface BookDocument extends IBook, Document {
    borrowBook(quantity:number): void ;
}



const bookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: true, trim: true },
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


bookSchema.methods.borrowBook = function ( quantity:number ){
    if (this.copies < quantity ) {
        throw new Error("Not enough copies available");
    }
    this.copies -= quantity ;
    if (this.copies === 0 ){
        this.available = false ;
    }
};




export const Book = model<BookDocument>("Book", bookSchema);
