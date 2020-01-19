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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGYuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvc2hlbGYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwrQ0FBK0I7QUFlbEIsUUFBQSxXQUFXLEdBQUcsSUFBSSxZQUFRLENBQUMsTUFBTSxDQUFDO0lBQzdDLEdBQUcsRUFBRSxZQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO0lBQ25DLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUNyQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdkMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3ZDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtDQUN0QyxDQUFDLENBQUM7QUFFSCxJQUFNLEtBQUssR0FBRyxZQUFRLENBQUMsS0FBSyxDQUFTLE9BQU8sRUFBRSxtQkFBVyxDQUFDLENBQUM7QUFDM0Qsa0JBQWUsS0FBSyxDQUFDIn0=