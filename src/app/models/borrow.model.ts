import { Schema, model } from "mongoose";

const borrowSchema = new Schema(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: { type: Number, required: true },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Borrow = model("Borrow", borrowSchema);
