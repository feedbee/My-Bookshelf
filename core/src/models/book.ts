import mongoose, { HydratedDocument, Types } from "mongoose";

export interface IBook {
  name: string;
  shelf: Types.ObjectId;
	authors: IAuthor[];
	publish: IPublish;
	cover: string;
	url: string;
	index: number;
	my?: IReadingDetails;
}

export type BookDocument = HydratedDocument<IBook>;

interface INamedEntity {
	name?: string;
	url?: string;
}

export interface IAuthor extends INamedEntity {}
export interface IPublisher extends INamedEntity {}

export interface IPublish {
	publisher?: IPublisher;
	year?: number;
	pages?: number;
}

export interface IReadingDetails {
	rating?: number;
	review?: string;
	start?: string;
	end?: string;
	type?: "paper" | "digital" | "audio";
}

export const BookSchema = new mongoose.Schema<IBook>({
  shelf: {type: mongoose.Schema.Types.ObjectId, ref: "Shelf", required: true, index: true},
  name: { type: String, required: true },
  authors: [
    {
      _id: false,
      name: String,
      url: String
    }
  ],
  publish: {
    publisher: { 
      name: { type: String },
      url: { type: String }
    },
    year: Number,
    pages: Number
  },
  url: { type: String, required: true },
  cover: { type: String, required: true },
  my: {
    rating: {type: Number, min: 0, max: 5},
    review: String,
    start: String,
    end: String,
    type: {type: String, enum: ["paper", "digital", "audio"]}
  },
  index: {type: Number, required: true}
}, {strict: "throw"});

const Book = mongoose.model<IBook>("Book", BookSchema);
export default Book;

/**
{
    "shelf": {
        "$oid": "5e198fa76dbbef311d7a154a"
    },
    "name": "Как работает Google",
    "authors": {
        "author": [{
            "name": "Алан Игл",
            "url": "https://www.litres.ru/alan-igl/"
        }, {
            "name": "Джонатан Розенберг",
            "url": "https://www.litres.ru/dzhonatan-rozenberg/"
        }, {
            "name": "Эрик Шмидт",
            "url": "https://www.litres.ru/erik-shmidt/"
        }]
    },
    "publish": {
        "publisher": {
            "name": "Бомбора",
            "url": "https://www.litres.ru/bombora/"
        },
        "year": "2014",
        "pages": "410"
    },
    "url": "https://www.litres.ru/alan-igl/kak-rabotaet-google-9811789/?lfrom=141525098&ref_key=7b61e2c9a008fb10cd6d56baa0a104a88d81d8a1b0131e73219547c2802ca3a2&ref_offer=1",
    "cover": "kak-rabotaet-google.jpg",
    "my": {
        "rating": "4",
        "review": "(Аудиокнига; В процессе...) Начало интересное, но четкое ощущение, что ее лучше слушать, чем читать",
        "start": "2019-12-30"
    },
    "index": {
        "$numberInt": "81"
    }
}*/
