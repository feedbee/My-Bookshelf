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
app.use('/css', express_1.default.static(__dirname + '/../public/css'));
app.use('/img', express_1.default.static(__dirname + '/../public/img'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFxRDtBQUNyRCwwRUFBd0M7QUFHeEMsb0RBQThCO0FBQzlCLDZFQUFpRTtBQUNqRSw2RUFBaUU7QUFFakUseUJBQXlCO0FBQ3pCLElBQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUV4QixlQUFlO0FBQ2YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFFN0QsaUJBQWlCO0FBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGlCQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7QUFDOUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQUU5RCxnQkFBZ0I7QUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2hELEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRXRELGdCQUFnQjtBQUNoQixlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QyxlQUFlLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUV0QyxZQUFZO0FBQ1osR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsNEJBQU0sQ0FBQztJQUN2QixPQUFPLEVBQUUsTUFBTTtJQUNmLGFBQWEsRUFBRSxTQUFTO0lBQ3hCLFVBQVUsRUFBRSxTQUFTLEdBQUcsV0FBVztJQUNuQyxXQUFXLEVBQUUsU0FBUyxHQUFHLFlBQVk7SUFDckMsT0FBTyxFQUFFO1FBQ1AsYUFBYSxFQUFFLFVBQUMsTUFBYyxJQUFLLE9BQUEsTUFBTSxHQUFHLEVBQUUsRUFBWCxDQUFXO0tBQy9DO0NBQ0YsQ0FBQyxDQUFDLENBQUM7QUFDSixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUM7QUFDM0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsZ0JBQU0sQ0FBQztBQUUzQixJQUFNLElBQUksR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxnQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO0FBQ3pFLElBQU0sSUFBSSxHQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLGdCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDL0QsSUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQzNDLE1BQU0sQ0FBQyxPQUFPLEVBQWtCLENBQUMsT0FBTyxFQUN4QyxNQUFNLENBQUMsT0FBTyxFQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQyxDQUFDIn0=