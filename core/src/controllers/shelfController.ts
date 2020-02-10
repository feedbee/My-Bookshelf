import { Application, Request, Response } from "express";
import { Types as MongooseTypes } from "mongoose";

import Shelf, { IShelf } from "./../models/shelf";
import Book, { IBook } from "./../models/book";

export let allShelves = (req: Request, res: Response) => {
  Shelf.find((err: any, shelves: IShelf[]) => {
    if (err) {
      res.status(500).send("Error!");
    } else {
      res.send(shelves);
    }
  });
};

export let getShelf = (req: Request, res: Response) => {
  Shelf.findOne({key: req.params.shelfKey}, (err: any, shelf: IShelf) => {
    if (err) {
      res.status(500).send(err);
    } else if (shelf === null) {
      res.status(404).send("Not Found");
    } else {
      Book.find({shelf: new MongooseTypes.ObjectId(shelf._id)})
        .sort({index: -1})
        .exec((err: any, books: IBook[]) => {
          if (err) {
            res.send("Error!");
          } else {
            res.render("template", {layout: false, shelf: shelf.toObject(), books: books.map((el) =>  el.toObject())});
          }
      });
    }
  });
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
    let shelf: IShelf | null = await Shelf.findOne({key: req.params.shelfKey}).exec();

    if (shelf === null) {
      res.status(404).send(`Shelf '${req.params.shelfKey}' was not found`);
      return;
    }

    let books: IBook[] = await Book.find({shelf: new MongooseTypes.ObjectId(shelf._id)})
      .sort({index: -1})
      .exec();
    
    let shelfAndBooks = new ShelfAndBooks(shelf, books);
    res.send(shelfAndBooks);
  }

  static async getShelf(req: Request, res: Response) {
    let shelf: IShelf | null = await Shelf.findOne({key: req.params.shelfKey}).exec();

    if (shelf === null) {
      res.status(404).send(`Shelf '${req.params.shelfKey}' was not found`);
      return;
    }

    res.send(shelf);
  }

  static async updateShelf(req: Request, res: Response) {
    let shelf: IShelf | null = await Shelf.findOneAndUpdate({key: req.params.shelfKey}, req.body).exec();

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
    let shelf: IShelf | null = await Shelf.findOneAndDelete({key: req.params.shelfKey}, req.body).exec();

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