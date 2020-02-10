"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var config_1 = __importDefault(require("./config"));
var shelfController = __importStar(require("./controllers/shelfController"));
var booksController = __importStar(require("./controllers/booksController"));
// Our Express APP config
var app = express_1.default();
app.use(express_1.default.json());
// UI Endpoints
app.use('/public', express_1.default.static(__dirname + '/../public'));
// Data Endpoints
app.use('/css', express_1.default.static(__dirname + '/../../css'));
app.use('/img', express_1.default.static(__dirname + '/../../img'));
app.use('/data/covers', express_1.default.static(__dirname + '/../../data/covers'));
// App Endpoints
app.get("/shelves", shelfController.allShelves);
app.get("/shelf/:shelfKey", shelfController.getShelf);
// API Endpoints
shelfController.ShelfApi.register(app);
booksController.BookApi.register(app);
// Rendering
app.engine('hbs', express_handlebars_1.default({
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir: __dirname + '/layouts/',
    partialsDir: __dirname + '/partials/',
    helpers: {
        ratingToWidth: function (rating) { return rating * 20; }
    }
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/../views/');
app.locals.config = config_1.default;
var host = process.env.HOST || config_1.default.http.host || "localhost";
var port = process.env.PORT || config_1.default.http.port || 3000;
var server = app.listen(port, host, function () {
    console.log("App is running on http://%s:%d", server.address().address, server.address().port);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFxRDtBQUNyRCwwRUFBd0M7QUFHeEMsb0RBQThCO0FBQzlCLDZFQUFpRTtBQUNqRSw2RUFBaUU7QUFFakUseUJBQXlCO0FBQ3pCLElBQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUV4QixlQUFlO0FBQ2YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFFN0QsaUJBQWlCO0FBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGlCQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQzFELEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGlCQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQzFELEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLGlCQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7QUFFMUUsZ0JBQWdCO0FBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNoRCxHQUFHLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUV0RCxnQkFBZ0I7QUFDaEIsZUFBZSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFdEMsWUFBWTtBQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLDRCQUFNLENBQUM7SUFDdkIsT0FBTyxFQUFFLE1BQU07SUFDZixhQUFhLEVBQUUsU0FBUztJQUN4QixVQUFVLEVBQUUsU0FBUyxHQUFHLFdBQVc7SUFDbkMsV0FBVyxFQUFFLFNBQVMsR0FBRyxZQUFZO0lBQ3JDLE9BQU8sRUFBRTtRQUNQLGFBQWEsRUFBRSxVQUFDLE1BQWMsSUFBSyxPQUFBLE1BQU0sR0FBRyxFQUFFLEVBQVgsQ0FBVztLQUMvQztDQUNGLENBQUMsQ0FBQyxDQUFDO0FBQ0osR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDO0FBQzNDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLGdCQUFNLENBQUM7QUFFM0IsSUFBTSxJQUFJLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksZ0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQztBQUN6RSxJQUFNLElBQUksR0FBUSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxnQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQy9ELElBQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtJQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUMzQyxNQUFNLENBQUMsT0FBTyxFQUFrQixDQUFDLE9BQU8sRUFDeEMsTUFBTSxDQUFDLE9BQU8sRUFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUMsQ0FBQyJ9