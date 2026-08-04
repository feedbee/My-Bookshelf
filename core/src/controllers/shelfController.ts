import { Application, Request, Response } from "express";
import { Types as MongooseTypes } from "mongoose";

import Shelf, { IShelf } from "./../models/shelf";
import Book, { IBook } from "./../models/book";

export let allShelves = async (req: Request, res: Response) => {
  try {
    const shelves = await Shelf.find().exec();
    res.send(shelves);
  } catch {
    res.status(500).send("Error!");
  }
};

export let getShelf = async (req: Request, res: Response) => {
  try {
    const shelf = await Shelf.findOne({key: req.params.shelfKey}).exec();
    if (shelf === null) {
      res.status(404).send("Not Found");
      return;
    }

    const books = await Book.find({shelf: new MongooseTypes.ObjectId(shelf._id)})
      .sort({index: -1})
      .exec();
    res.render("template", {layout: false, shelf: shelf.toObject(), books: books.map((el) => el.toObject())});
  } catch {
    res.status(500).send("Error!");
  }
};

export class ShelfApi {
  static register(app: Application) {
    app.get("/api/v1/shelf-full/:shelfKey", ShelfApi.getShelfWithBooks);
    
    app.get("/api/v1/shelf/:shelfKey", ShelfApi.getShelf);
    app.post("/api/v1/shelf/", ShelfApi.addShelf);
    app.put("/api/v1/shelf/:shelfKey", ShelfApi.updateShelf);
    app.delete("/api/v1/shelf/:shelfKey", ShelfApi.deleteShelf);
  }

  /**
   * URL Params:
   * - shelfKey: string - shelf reference key
   * 
   * @param req Request
   * @param res Response
   */
  static async getShelfWithBooks(req: Request, res: Response) {
    const shelf = await Shelf.findOne({key: req.params.shelfKey}).exec();

    if (shelf === null) {
      res.status(404).send(`Shelf '${req.params.shelfKey}' was not found`);
      return;
    }

    const books = await Book.find({shelf: new MongooseTypes.ObjectId(shelf._id)})
      .sort({index: -1})
      .exec();
    
    let shelfAndBooks = new ShelfAndBooks(shelf, books);
    res.send(shelfAndBooks);
  }

  static async getShelf(req: Request, res: Response) {
    const shelf = await Shelf.findOne({key: req.params.shelfKey}).exec();

    if (shelf === null) {
      res.status(404).send(`Shelf '${req.params.shelfKey}' was not found`);
      return;
    }

    res.send(shelf);
  }

  static async updateShelf(req: Request, res: Response) {
    const shelf = await Shelf.findOneAndUpdate({key: req.params.shelfKey}, req.body).exec();

    if (shelf === null) {
      res.status(404).send(`Shelf '${req.params.shelfKey}' was not found`);
      return;
    }

    res.send(req.body);
  }

  static async addShelf(req: Request, res: Response) {
    let shelf = new Shelf(req.body);

    await shelf.save();

    res.send(shelf);
  }

  static async deleteShelf(req: Request, res: Response) {
    const shelf = await Shelf.findOneAndDelete({key: req.params.shelfKey}).exec();

    if (shelf === null) {
      res.status(404).send(`Shelf '${req.params.shelfKey}' was not found`);
      return;
    }

    res.send({});
  }
}

class ShelfAndBooks {
  constructor(public shelf: IShelf, public books: IBook[]) {}
}
