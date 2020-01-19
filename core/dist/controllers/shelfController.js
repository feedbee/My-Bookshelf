"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGZDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlcnMvc2hlbGZDb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EscUNBQWtEO0FBRWxELDREQUFrRDtBQUNsRCwwREFBK0M7QUFFcEMsUUFBQSxVQUFVLEdBQUcsVUFBQyxHQUFZLEVBQUUsR0FBYTtJQUNsRCxlQUFLLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBUSxFQUFFLE9BQWlCO1FBQ3JDLElBQUksR0FBRyxFQUFFO1lBQ1AsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7YUFBTTtZQUNMLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbkI7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVTLFFBQUEsUUFBUSxHQUFHLFVBQUMsR0FBWSxFQUFFLEdBQWE7SUFDaEQsZUFBSyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBQyxFQUFFLFVBQUMsR0FBUSxFQUFFLEtBQWE7UUFDaEUsSUFBSSxHQUFHLEVBQUU7WUFDUCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzQjthQUFNLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTtZQUN6QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNuQzthQUFNO1lBQ0wsY0FBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLGdCQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDO2lCQUN0RCxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQztpQkFDakIsSUFBSSxDQUFDLFVBQUMsR0FBUSxFQUFFLEtBQWM7Z0JBQzdCLElBQUksR0FBRyxFQUFFO29CQUNQLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3BCO3FCQUFNO29CQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUMsRUFBRSxJQUFNLE9BQUEsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFiLENBQWEsQ0FBQyxFQUFDLENBQUMsQ0FBQztpQkFDNUc7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==