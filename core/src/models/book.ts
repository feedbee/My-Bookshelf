import mongoose from "./../db";

export interface IBook extends mongoose.Document {
	name: string;
	authors: IAuthor[];
	publish: IPublish;
	cover: string;
	url: string;
	index: number;
	myReview: string;
	myRating: string;
	myStartDate: string;
	myEndDate: string;
}

interface INamedEntity {
	name: string;
	url: string;
}

export interface IAuthor extends INamedEntity {}
export interface IPublisher extends INamedEntity {}

export interface IPublish {
	publisher: IPublisher;
	year: number;
	pages: number;
}

export const BookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  authors: { type: Array, required: true }
});

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