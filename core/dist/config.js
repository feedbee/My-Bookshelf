"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
exports.Config = JSON.parse(fs_1.default.readFileSync(__dirname + "/../config/config.json", "utf8"));
exports.default = exports.Config;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsMENBQW9CO0FBRVQsUUFBQSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLFNBQVMsR0FBRyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzlGLGtCQUFlLGNBQU0sQ0FBQyJ9