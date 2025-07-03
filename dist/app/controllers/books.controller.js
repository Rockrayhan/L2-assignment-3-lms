"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRouter = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRouter = express_1.default.Router();
// create book
exports.booksRouter.post("/api/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (body.copies === 0) {
        body.available = false;
    }
    const data = yield books_model_1.Book.create(body);
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data,
    });
}));
// get all books with filtering
exports.booksRouter.get("/api/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterGenre = req.query.filter;
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sort || "desc";
        const limit = parseInt(req.query.limit) || 10;
        let filter = {};
        if (filterGenre) {
            filter = { genre: filterGenre };
        }
        const sortDirection = sortOrder === "asc" ? 1 : -1;
        const sortCondition = {};
        sortCondition[sortBy] = sortDirection;
        const books = yield books_model_1.Book.find(filter).sort(sortCondition).limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while retrieving books",
            error: error.message,
        });
    }
}));
// Get single Book by ID
exports.booksRouter.get("/api/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield books_model_1.Book.findById(bookId);
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
}));
// update book
exports.booksRouter.patch("/api/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updatedBody = req.body;
    if ("copies" in updatedBody) {
        const copies = Number(updatedBody.copies);
        updatedBody.available = copies > 0;
    }
    try {
        const book = yield books_model_1.Book.findByIdAndUpdate(bookId, updatedBody, { new: true });
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}));
// delete Book
exports.booksRouter.delete("/api/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield books_model_1.Book.findByIdAndDelete(bookId);
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
}));
