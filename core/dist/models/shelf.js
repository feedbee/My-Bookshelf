"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShelfSchema = void 0;
const db_1 = __importDefault(require("./../db"));
exports.ShelfSchema = new db_1.default.Schema({
    key: { type: String, required: true },
    title: { type: String, required: true },
    intro: { type: String, required: true },
    user: { email: String, name: String }
});
const Shelf = db_1.default.model("Shelf", exports.ShelfSchema);
exports.default = Shelf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hlbGYuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJtb2RlbHMvc2hlbGYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaURBQStCO0FBa0JsQixRQUFBLFdBQVcsR0FBRyxJQUFJLFlBQVEsQ0FBQyxNQUFNLENBQUM7SUFDN0MsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3JDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN2QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdkMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0NBQ3RDLENBQUMsQ0FBQztBQUVILE1BQU0sS0FBSyxHQUFHLFlBQVEsQ0FBQyxLQUFLLENBQVMsT0FBTyxFQUFFLFFBQUEsV0FBVyxDQUFDLENBQUM7a0JBQzVDLEtBQUsifQ==