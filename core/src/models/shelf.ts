import mongoose from "./../db";

export interface IShelf extends mongoose.Document {
  _id: string;
  key: string;
  title: string;
  intro: string;
  user: IUser;
}

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