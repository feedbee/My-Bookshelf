import express, { Request, Response } from "express";
import exphbs from "express-handlebars";
import { AddressInfo } from "net";

import Config from "./config";
import * as shelfController from "./controllers/shelfController";
import * as booksController from "./controllers/booksController";

// Our Express APP config
const app = express();
app.use(express.json());

// UI Endpoints
app.use('/public', express.static(__dirname + '/../public'));

// Data Endpoints
app.use('/css', express.static(__dirname + '/../public/css'));
app.use('/img', express.static(__dirname + '/../public/img'));

// App Endpoints
app.get("/shelves", shelfController.allShelves);
app.get("/shelf/:shelfKey", shelfController.getShelf);

// API Endpoints
shelfController.ShelfApi.register(app);
booksController.BookApi.register(app);

// Rendering
app.engine('hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'default',
  layoutsDir: __dirname + '/layouts/',
  partialsDir: __dirname + '/partials/',
  helpers: {
    ratingToWidth: (rating: number) => rating * 20
  }
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/../views/');
app.locals.config = Config;

const host: string = process.env.HOST || Config.http.host || "localhost";
const port: any = process.env.PORT || Config.http.port || 3000;
const server = app.listen(port, host, () => {
  console.log("App is running on http://%s:%d",
  (server.address() as AddressInfo).address,
  (server.address() as AddressInfo).port);
});