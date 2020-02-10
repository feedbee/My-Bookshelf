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
var BookApi = /** @class */ (function () {
    function BookApi() {
    }
    BookApi.register = function (app) {
        app.get("/api/v1/shelf/:shelfKey/books/", BookApi.getBooksFromShelf);
        app.get("/api/v1/book/:bookId", BookApi.getBook);
        app.post("/api/v1/book/", BookApi.addBook);
        app.put("/api/v1/book/:bookId", BookApi.updateBook);
        app.delete("/api/v1/book/:bookId", BookApi.deleteBook);
        app.put("/api/v1/book-move/:bookId/new-index=:newIndex", BookApi.moveBook);
    };
    BookApi.getBooksFromShelf = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var shelf, books;
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
                        res.send(books);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookApi.getBook = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, book_1.default.findById(req.params.bookId).exec()];
                    case 1:
                        book = _a.sent();
                        if (book === null) {
                            res.status(404).send("Book '" + req.params.bookId + "' was not found");
                            return [2 /*return*/];
                        }
                        res.send(book);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookApi.updateBook = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, book_1.default.findByIdAndUpdate(req.params.bookId, req.body).exec()];
                    case 1:
                        book = _a.sent();
                        if (book === null) {
                            res.status(404).send("Shelf '" + req.params.bookId + "' was not found");
                            return [2 /*return*/];
                        }
                        res.send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookApi.addBook = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        book = new book_1.default(req.body);
                        return [4 /*yield*/, book.save()];
                    case 1:
                        _a.sent();
                        res.send(book);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookApi.deleteBook = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var book;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, book_1.default.findByIdAndDelete(req.params.bookId, req.body).exec()];
                    case 1:
                        book = _a.sent();
                        if (book === null) {
                            res.status(404).send("Shelf '" + req.params.bookId + "' was not found");
                            return [2 /*return*/];
                        }
                        res.send({});
                        return [2 /*return*/];
                }
            });
        });
    };
    BookApi.moveBook = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var book, shelf, newIndex;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, book_1.default.findOne({ key: req.params.bookId }, req.body).exec()];
                    case 1:
                        book = _a.sent();
                        if (book === null) {
                            res.status(404).send("Shelf '" + req.params.bookId + "' was not found");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, shelf_1.default.findById(book.shelf).exec()];
                    case 2:
                        shelf = _a.sent();
                        newIndex = req.params.newIndex;
                        if (newIndex > book.index) {
                            book_1.default.updateMany({ "$and": [{ shelf: shelf._id }, { index: { "$lte": newIndex } }, { index: { "$gt": book.index } }] }, { "$inc": { index: 1 } }).exec();
                        }
                        else {
                            book_1.default.updateMany({ "$and": [{ shelf: shelf._id }, { index: { "$gte": newIndex } }, { index: { "$lt": book.index } }] }, { "$inc": { index: -1 } }).exec();
                        }
                        book.index = newIndex;
                        book.save();
                        res.send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    return BookApi;
}());
exports.BookApi = BookApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va3NDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlcnMvYm9va3NDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EscUNBQWtEO0FBRWxELDREQUFrRDtBQUNsRCwwREFBK0M7QUFFL0M7SUFBQTtJQTBGQSxDQUFDO0lBekZRLGdCQUFRLEdBQWYsVUFBZ0IsR0FBZ0I7UUFDOUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUVyRSxHQUFHLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsR0FBRyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkQsR0FBRyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsRUFBRSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVZLHlCQUFpQixHQUE5QixVQUErQixHQUFZLEVBQUUsR0FBYTs7Ozs7NEJBQzdCLHFCQUFNLGVBQUssQ0FBQyxPQUFPLENBQUMsRUFBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFBOzt3QkFBN0UsS0FBSyxHQUFrQixTQUFzRDt3QkFFakYsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFOzRCQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUks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