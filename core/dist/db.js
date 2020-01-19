"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var uri = "mongodb+srv://mybookshelf:sjHj3jldwn5gd@mybookshelfcluster-uavwe.mongodb.net/my-bookshelf";
mongoose_1.default.connect(uri, function (err) {
    if (err) {
        console.log(err.message);
        process.exit(1);
    }
    else {
        console.log("Successfully Connected!");
    }
});
exports.default = mongoose_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJkYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUFnQztBQUVoQyxJQUFNLEdBQUcsR0FBVywyRkFBMkYsQ0FBQztBQUVoSCxrQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsVUFBQyxHQUFRO0lBQzdCLElBQUksR0FBRyxFQUFFO1FBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNqQjtTQUFNO1FBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0tBQ3hDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxrQkFBZSxrQkFBUSxDQUFDIn0=