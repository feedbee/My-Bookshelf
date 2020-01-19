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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJzcmMvZGIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBZ0M7QUFFaEMsSUFBTSxHQUFHLEdBQVcsMkZBQTJGLENBQUM7QUFFaEgsa0JBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBUTtJQUM3QixJQUFJLEdBQUcsRUFBRTtRQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakI7U0FBTTtRQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztLQUN4QztBQUNILENBQUMsQ0FBQyxDQUFDO0FBRUgsa0JBQWUsa0JBQVEsQ0FBQyJ9