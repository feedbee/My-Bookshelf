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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var shelf_1 = __importDefault(require("./../models/shelf"));
var book_1 = __importDefault(require("./../models/book"));
exports.allShelves = function (req, res) {
    shelf_1.default.find(function (err, shelves) {
        if (err) {
            res.status(500).send("Error!");
        }
        else {
            res.send(shelves);
        }
    });
};
exports.getShelf = function (req, res) {
    shelf_1.default.findOne({ key: req.params.shelfKey }, function (err, shelf) {
        if (err) {
            res.status(500).send(err);
        }
        else if (shelf === null) {
            res.status(404).send("Not Found");
        }
        else {
            book_1.default.find({ shelf: new mongoose_1.Types.ObjectId(shelf._id) })
                .sort({ index: -1 })
                .exec(function (err, books) {
                if (err) {
                    res.send("Error!");
                }
                else {
                    res.render("template", { layout: false, shelf: shelf.toObject(), books: books.map(function (el) { return el.toObject(); }) });
                }
            });
        }
    });
};
var ShelfApi = /** @class */ (function () {
    function ShelfApi() {
    }
    ShelfApi.register = function (app) {
        app.get("/api/v1/shelf-full/:shelfKey", ShelfApi.getShelfWithBooks);
        app.get("/api/v1/shelf/:shelfKey", ShelfApi.getShelf);
        app.post("/api/v1/shelf/", ShelfApi.addShelf);
        app.put("/api/v1/shelf/:shelfKey", ShelfApi.updateShelf);
        app.delete("/api/v1/shelf/:shelfKey", ShelfApi.deleteShelf);
    };
    /**
     * URL Params:
     * - shelfKey: string - shelf reference key
     *
     * @param req Request
     * @param res Response
     */
    ShelfApi.getShelfWithBooks = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var shelf, books, shelfAndBooks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, shelf_1.default.findOne({ key: req.params.shelfKey }).exec()];
                    case 1:
                        shelf = _a.sent();
                        if (shelf === null) {
                            res.status(404).send("Shelf '" + req.params.shelfKey + "' was not found");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, book_1.default.find({ shelf: new mongoose_1.Types.ObjectId(shelf._id) })
                                .sort({ index: -1 })
                                .exec()];
                    case 2:
                        books = _a.sent();
                        shelfAndBooks = new ShelfAndBooks(shelf, books);
                        res.send(shelfAndBooks);
                        return [2 /*return*/];
                }
            });
        });
    };
    ShelfApi.getShelf = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var shelf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, shelf_1.default.findOne({ key: req.params.shelfKey }).exec()];
                    case 1:
                        shelf = _a.sent();
                        if (shelf === null) {
                            res.status(404).send("Shelf '" + req.params.shelfKey + "' was not found");
                            return [2 /*return*/];
                        }
                        res.send(shelf);
                        return [2 /*return*/];
                }
            });
        });
    };
    ShelfApi.updateShelf = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var shelf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, shelf_1.default.findOneAndUpdate({ key: req.params.shelfKey }, req.body).exec()];
                    case 1:
                        shelf = _a.sent();
                        if (shelf === null) {
                            res.status(404).send("Shelf '" + req.params.shelfKey + "' was not found");
                            return [2 /*return*/];
                        }
                        res.send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    ShelfApi.addShelf = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var shelf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shelf = new shelf_1.default(req.body);
                        return [4 /*yield*/, shelf.save()];
                    case 1:
                        _a.sent();
                        res.send(shelf);
                        return [2 /*return*/];
                }
            });
        });
    };
    ShelfApi.deleteShelf = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var shelf;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, shelf_1.default.findOneAndDelete({ key: req.params.shelfKey }, req.body).exec()];
                    case 1:
                        shelf = _a.sent();
                        if (shelf === null) {
                            res.status(404).send("Shelf '" + req.params.shelfKey + "' was not found");
                            return [2 /*return*/];
                        }
                        res.send({});
                        return [2 /*return*/];
                }
            });
        });
    };
    return ShelfApi;
}());
exports.ShelfApi = ShelfApi;
var ShelfAndBooks = /** @class */ (function () {
    function ShelfAndBooks(shelf, books) {
        this.shelf = shelf;
        this.books = books;
    }
    return ShelfAndBooks;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGZDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlcnMvc2hlbGZDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQWtEO0FBRWxELDREQUFrRDtBQUNsRCwwREFBK0M7QUFFcEMsUUFBQSxVQUFVLEdBQUcsVUFBQyxHQUFZLEVBQUUsR0FBYTtJQUNsRCxlQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBUSxFQUFFLE9BQWlCO1FBQ3JDLElBQUksR0FBRyxFQUFFO1lBQ1AsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkI7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVTLFFBQUEsUUFBUSxHQUFHLFVBQUMsR0FBWSxFQUFFLEdBQWE7SUFDaEQsZUFBSyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBQyxFQUFFLFVBQUMsR0FBUSxFQUFFLEtBQWE7UUFDaEUsSUFBSSxHQUFHLEVBQUU7WUFDUCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQjthQUFNLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUN6QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0wsY0FBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLGdCQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFB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