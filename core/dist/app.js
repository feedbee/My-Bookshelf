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
app.use('/css', express_1.default.static(__dirname + '/../css'));
app.use('/img', express_1.default.static(__dirname + '/../img'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFxRDtBQUNyRCwwRUFBd0M7QUFHeEMsb0RBQThCO0FBQzlCLDZFQUFpRTtBQUNqRSw2RUFBaUU7QUFFakUseUJBQXlCO0FBQ3pCLElBQU0sR0FBRyxHQUFHLGlCQUFPLEVBQUUsQ0FBQztBQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUV4QixlQUFlO0FBQ2YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFFN0QsaUJBQWlCO0FBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGlCQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGlCQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBRXZELGdCQUFnQjtBQUNoQixHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDaEQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFdEQsZ0JBQWdCO0FBQ2hCLGVBQWUsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLGVBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRXRDLFlBQVk7QUFDWixHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSw0QkFBTSxDQUFDO0lBQ3ZCLE9BQU8sRUFBRSxNQUFNO0lBQ2YsYUFBYSxFQUFFLFNBQVM7SUFDeEIsVUFBVSxFQUFFLFNBQVMsR0FBRyxXQUFXO0lBQ25DLFdBQVcsRUFBRSxTQUFTLEdBQUcsWUFBWTtJQUNyQyxPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsVUFBQyxNQUFjLElBQUssT0FBQSxNQUFNLEdBQUcsRUFBRSxFQUFYLENBQVc7S0FDL0M7Q0FDRixDQUFDLENBQUMsQ0FBQztBQUNKLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzlCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsR0FBRyxZQUFZLENBQUMsQ0FBQztBQUMzQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxnQkFBTSxDQUFDO0FBRTNCLElBQU0sSUFBSSxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLGdCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUM7QUFDekUsSUFBTSxJQUFJLEdBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksZ0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUMvRCxJQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7SUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFDM0MsTUFBTSxDQUFDLE9BQU8sRUFBa0IsQ0FBQyxPQUFPLEVBQ3hDLE1BQU0sQ0FBQyxPQUFPLEVBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDLENBQUMifQ==