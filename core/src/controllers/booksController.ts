import { Application, Request, Response } from "express";
import { Types as MongooseTypes } from "mongoose";

import { BOOK_INPUT_FIELDS, validateRequestBody } from "../api/input-validation";
import Shelf, { IShelf } from "./../models/shelf";
import Book, { IBook } from "./../models/book";

export class BookApi {
  static register(app: Application) {
    app.get("/api/v1/shelf/:shelfKey/books/", BookApi.getBooksFromShelf);
    
    app.get("/api/v1/book/:bookId", BookApi.getBook);
    app.post("/api/v1/book/", validateRequestBody(BOOK_INPUT_FIELDS), BookApi.addBook);
    app.put("/api/v1/book/:bookId", validateRequestBody(BOOK_INPUT_FIELDS), BookApi.updateBook);
    app.delete("/api/v1/book/:bookId", BookApi.deleteBook);
    app.put("/api/v1/book-move/:bookId/new-index=:newIndex", BookApi.moveBook);
  }

  static async getBooksFromShelf(req: Request, res: Response) {
    const shelf = await Shelf.findOne({key: req.params.shelfKey}).exec();

    if (shelf === null) {
      res.status(404).send(`Shelf '${req.params.shelfKey}' was not found`);
      return;
    }

    const books = await Book.find({shelf: new MongooseTypes.ObjectId(shelf._id)})
      .sort({index: -1})
      .exec();
    
    res.send(books);
  }

  static async getBook(req: Request, res: Response) {
    const book = await Book.findById(req.params.bookId).exec();

    if (book === null) {
      res.status(404).send(`Book '${req.params.bookId}' was not found`);
      return;
    }

    res.send(book);
  }

  static async updateBook(req: Request, res: Response) {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, {
      new: true,
      runValidators: true
    }).exec();

    if (book === null) {
      res.status(404).send(`Shelf '${req.params.bookId}' was not found`);
      return;
    }

    res.send(book);
  }

  static async addBook(req: Request, res: Response) {
    let book = new Book(req.body);

    await book.save();

    res.send(book);
  }

  static async deleteBook(req: Request, res: Response) {
    const book = await Book.findByIdAndDelete(req.params.bookId).exec();

    if (book === null) {
      res.status(404).send(`Shelf '${req.params.bookId}' was not found`);
      return;
    }

    res.send({});
  }

  static async moveBook(req: Request, res: Response) {
    const book = await Book.findById(req.params.bookId).exec();

    if (book === null) {
      res.status(404).send(`Shelf '${req.params.bookId}' was not found`);
      return;
    }

    let shelf = await Shelf.findById(book.shelf).exec() as IShelf;

    let newIndex = req.params.newIndex as unknown as number;
    if (newIndex > book.index) {
      Book.updateMany({"$and": [{shelf: shelf._id}, {index: {"$lte": newIndex}}, {index: {"$gt": book.index}}]},
        {"$inc": {index: 1}}).exec();
    } else {
      Book.updateMany({"$and": [{shelf: shelf._id}, {index: {"$gte": newIndex}}, {index: {"$lt": book.index}}]},
        {"$inc": {index: -1}}).exec();
    }
    book.index = newIndex;
    book.save();

    res.send(req.body);
  }
}
