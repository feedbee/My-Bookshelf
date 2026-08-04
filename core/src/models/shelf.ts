import mongoose from "./../db";
import { HydratedDocument, Types } from "mongoose";

export interface IShelf {
  _id: Types.ObjectId;
  key: string;
  title: string;
  intro: string;
  user: IUser;
}

export type ShelfDocument = HydratedDocument<IShelf>;

export interface IUser {
  email: string;
	name: string;
}

export const ShelfSchema = new mongoose.Schema({
  key: { type: String, required: true },
  title: { type: String, required: true },
  intro: { type: String, required: true },
  user: { email: String, name: String }
});

const Shelf = mongoose.model<IShelf>("Shelf", ShelfSchema);
export default Shelf;
