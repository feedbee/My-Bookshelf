"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = __importDefault(require("handlebars"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
handlebars_1.default.registerHelper("ratingToWidth", function (rating) { return rating * 20; });
exports.LoadView = function (template) {
    return fs_1.default.readFileSync(path_1.default.resolve(__dirname, "../templates/template.hbs"), 'utf8');
};
exports.default = handlebars_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSwwREFBb0M7QUFDcEMsMENBQW9CO0FBQ3BCLDhDQUF3QjtBQUV4QixvQkFBVSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEVBQUUsVUFBQyxNQUFNLElBQUssT0FBQSxNQUFNLEdBQUcsRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDO0FBRXpELFFBQUEsUUFBUSxHQUFHLFVBQUMsUUFBZ0I7SUFDckMsT0FBTyxZQUFFLENBQUMsWUFBWSxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLDJCQUEyQixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDdkYsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsb0JBQVUsQ0FBQyJ9