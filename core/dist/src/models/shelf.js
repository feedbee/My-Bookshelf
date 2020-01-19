"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./../db"));
exports.ShelfSchema = new db_1.default.Schema({
    _id: db_1.default.Schema.Types.ObjectId,
    key: { type: String, required: true },
    title: { type: String, required: true },
    intro: { type: String, required: true },
    user: { email: String, name: String }
});
var Shelf = db_1.default.model("Shelf", exports.ShelfSchema);
exports.default = Shelf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGYuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvbW9kZWxzL3NoZWxmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsK0NBQStCO0FBZWxCLFFBQUEsV0FBVyxHQUFHLElBQUksWUFBUSxDQUFDLE1BQU0sQ0FBQztJQUM3QyxHQUFHLEVBQUUsWUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUTtJQUNuQyxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDckMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3ZDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN2QyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7Q0FDdEMsQ0FBQyxDQUFDO0FBRUgsSUFBTSxLQUFLLEdBQUcsWUFBUSxDQUFDLEtBQUssQ0FBUyxPQUFPLEVBQUUsbUJBQVcsQ0FBQyxDQUFDO0FBQzNELGtCQUFlLEtBQUssQ0FBQyJ9