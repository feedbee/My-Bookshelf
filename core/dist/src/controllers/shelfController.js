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
            res.header("Content-Type", "application/json").send("Error!");
        }
        else {
            res.send(shelves);
        }
    });
};
exports.getShelf = function (req, res) {
    book_1.default.find({ shelf: new mongoose_1.Types.ObjectId("5e198fa76dbbef311d7a154a") }, function (err, books) {
        if (err) {
            res.header("Content-Type", "application/json").send("Error!");
        }
        else {
            res.send(books);
        }
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGZDb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsic3JjL2NvbnRyb2xsZXJzL3NoZWxmQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLHFDQUFrRDtBQUVsRCw0REFBa0Q7QUFDbEQsMERBQStDO0FBRXBDLFFBQUEsVUFBVSxHQUFHLFVBQUMsR0FBWSxFQUFFLEdBQWE7SUFDbEQsZUFBSyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQVEsRUFBRSxPQUFpQjtRQUNyQyxJQUFJLEdBQUcsRUFBRTtZQUNQLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9EO2FBQU07WUFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ25CO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFUyxRQUFBLFFBQVEsR0FBRyxVQUFDLEdBQVksRUFBRSxHQUFhO0lBQ2hELGNBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxLQUFLLEVBQUUsSUFBSSxnQkFBYSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxFQUFDLEVBQUUsVUFBQyxHQUFRLEVBQUUsS0FBYztRQUNsRyxJQUFJLEdBQUcsRUFBRTtZQUNQLEdBQUcsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQy9EO2FBQU07WUFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMifQ==