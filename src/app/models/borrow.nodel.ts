import { Schema } from "mongoose";



const borrowSchema = new Schema(
    {
        book: {type:Schema.Types.ObjectId, ref: "Book", required: true } ,
        quantity: { type: }
    }
)