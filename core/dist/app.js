"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_handlebars_1 = require("express-handlebars");
const config_1 = __importDefault(require("./config"));
const shelfController = __importStar(require("./controllers/shelfController"));
const booksController = __importStar(require("./controllers/booksController"));
// Our Express APP config
const app = (0, express_1.default)();
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
app.engine('hbs', (0, express_handlebars_1.engine)({
    extname: '.hbs',
    defaultLayout: 'default',
    layoutsDir: __dirname + '/layouts/',
    partialsDir: __dirname + '/partials/',
    helpers: {
        ratingToWidth: (rating) => rating * 20
    }
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/../views/');
app.locals.config = config_1.default;
const host = process.env.HOST || config_1.default.http.host || "localhost";
const port = process.env.PORT || config_1.default.http.port || 3000;
const server = app.listen(port, host, () => {
    console.log("App is running on http://%s:%d", server.address().address, server.address().port);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0RBQXFEO0FBQ3JELDJEQUE0QztBQUc1QyxzREFBOEI7QUFDOUIsTUFBWSxlQUFlLDBEQUFzQztBQUNqRSxNQUFZLGVBQWUsMERBQXNDO0FBRWpFLHlCQUF5QjtBQUN6QixNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztBQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUV4QixlQUFlO0FBQ2YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFFN0QsaUJBQWlCO0FBQ2pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGlCQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7QUFDOUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQztBQUU5RCxnQkFBZ0I7QUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2hELEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRXRELGdCQUFnQjtBQUNoQixlQUFlLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QyxlQUFlLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUV0QyxZQUFZO0FBQ1osR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsSUFBQSwyQkFBTSxFQUFDO0lBQ3ZCLE9BQU8sRUFBRSxNQUFNO0lBQ2YsYUFBYSxFQUFFLFNBQVM7SUFDeEIsVUFBVSxFQUFFLFNBQVMsR0FBRyxXQUFXO0lBQ25DLFdBQVcsRUFBRSxTQUFTLEdBQUcsWUFBWTtJQUNyQyxPQUFPLEVBQUU7UUFDUCxhQUFhLEVBQUUsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFO0tBQy9DO0NBQ0YsQ0FBQyxDQUFDLENBQUM7QUFDSixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUM7QUFDM0MsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsZ0JBQU0sQ0FBQztBQUUzQixNQUFNLElBQUksR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxnQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDO0FBQ3pFLE1BQU0sSUFBSSxHQUFRLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLGdCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDL0QsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUMzQyxNQUFNLENBQUMsT0FBTyxFQUFrQixDQUFDLE9BQU8sRUFDeEMsTUFBTSxDQUFDLE9BQU8sRUFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUMsQ0FBQyJ9