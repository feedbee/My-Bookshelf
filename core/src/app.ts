import express, { Request, Response } from "express";
import exphbs from "express-handlebars";
import { AddressInfo } from "net";

import Config from "./config";
import * as shelfController from "./controllers/shelfController";

// Our Express APP config
const app = express();
app.use(express.json());

// Data Endpoints
app.use('/css', express.static(__dirname + '/../../css'));
app.use('/img', express.static(__dirname + '/../../img'));
app.use('/data/covers', express.static(__dirname + '/../../data/covers'));

// API Endpoints
app.get("/shelves", shelfController.allShelves);
app.get("/shelf/:shelfKey", shelfController.getShelf);

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