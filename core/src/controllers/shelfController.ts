import { Request, Response } from "express";
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