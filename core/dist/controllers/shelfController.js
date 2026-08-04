"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShelfApi = exports.getShelf = exports.allShelves = void 0;
const mongoose_1 = require("mongoose");
const shelf_1 = __importDefault(require("./../models/shelf"));
const book_1 = __importDefault(require("./../models/book"));
let allShelves = async (req, res) => {
    try {
        const shelves = await shelf_1.default.find().exec();
        res.send(shelves);
    }
    catch {
        res.status(500).send("Error!");
    }
};
exports.allShelves = allShelves;
let getShelf = async (req, res) => {
    try {
        const shelf = await shelf_1.default.findOne({ key: req.params.shelfKey }).exec();
        if (shelf === null) {
            res.status(404).send("Not Found");
            return;
        }
        const books = await book_1.default.find({ shelf: new mongoose_1.Types.ObjectId(shelf._id) })
            .sort({ index: -1 })
            .exec();
        res.render("template", { layout: false, shelf: shelf.toObject(), books: books.map((el) => el.toObject()) });
    }
    catch {
        res.status(500).send("Error!");
    }
};
exports.getShelf = getShelf;
class ShelfApi {
    static register(app) {
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
    static async getShelfWithBooks(req, res) {
        const shelf = await shelf_1.default.findOne({ key: req.params.shelfKey }).exec();
        if (shelf === null) {
            res.status(404).send(`Shelf '${req.params.shelfKey}' was not found`);
            return;
        }
        const books = await book_1.default.find({ shelf: new mongoose_1.Types.ObjectId(shelf._id) })
            .sort({ index: -1 })
            .exec();
        let shelfAndBooks = new ShelfAndBooks(shelf, books);
        res.send(shelfAndBooks);
    }
    static async getShelf(req, res) {
        const shelf = await shelf_1.default.findOne({ key: req.params.shelfKey }).exec();
        if (shelf === null) {
            res.status(404).send(`Shelf '${req.params.shelfKey}' was not found`);
            return;
        }
        res.send(shelf);
    }
    static async updateShelf(req, res) {
        const shelf = await shelf_1.default.findOneAndUpdate({ key: req.params.shelfKey }, req.body).exec();
        if (shelf === null) {
            res.status(404).send(`Shelf '${req.params.shelfKey}' was not found`);
            return;
        }
        res.send(req.body);
    }
    static async addShelf(req, res) {
        let shelf = new shelf_1.default(req.body);
        await shelf.save();
        res.send(shelf);
    }
    static async deleteShelf(req, res) {
        const shelf = await shelf_1.default.findOneAndDelete({ key: req.params.shelfKey }).exec();
        if (shelf === null) {
            res.status(404).send(`Shelf '${req.params.shelfKey}' was not found`);
            return;
        }
        res.send({});
    }
}
exports.ShelfApi = ShelfApi;
class ShelfAndBooks {
    shelf;
    books;
    constructor(shelf, books) {
        this.shelf = shelf;
        this.books = books;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGZDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlcnMvc2hlbGZDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHVDQUFrRDtBQUVsRCw4REFBa0Q7QUFDbEQsNERBQStDO0FBRXhDLElBQUksVUFBVSxHQUFHLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDNUQsSUFBSSxDQUFDO1FBQ0gsTUFBTSxPQUFPLEdBQUcsTUFBTSxlQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQUMsTUFBTSxDQUFDO1FBQ1AsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQztBQUNILENBQUMsQ0FBQztBQVBTLFFBQUEsVUFBVSxHQUFWLFVBQVUsQ0FPbkI7QUFFSyxJQUFJLFFBQVEsR0FBRyxLQUFLLEVBQUUsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO0lBQzFELElBQUksQ0FBQztRQUNILE1BQU0sS0FBSyxHQUFHLE1BQU0sZUFBSyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckUsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDbkIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEMsT0FBTztRQUNULENBQUM7UUFFRCxNQUFNLEtBQUssR0FBRyxNQUFNLGNBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxnQkFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFL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