"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("./../db"));
exports.BookSchema = new db_1.default.Schema({
    _id: db_1.default.Schema.Types.ObjectId,
    key: { type: String, required: true },
    title: { type: String, required: true },
    intro: { type: String, required: true },
    user: { email: String, name: String }
});
var Book = db_1.default.model("Book", exports.BookSchema);
exports.default = Book;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vay5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbInNyYy9tb2RlbHMvYm9vay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLCtDQUErQjtBQTZCbEIsUUFBQSxVQUFVLEdBQUcsSUFBSSxZQUFRLENBQUMsTUFBTSxDQUFDO0lBQzVDLEdBQUcsRUFBRSxZQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRO0lBQ25DLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUNyQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDdkMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3ZDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtDQUN0QyxDQUFDLENBQUM7QUFFSCxJQUFNLElBQUksR0FBRyxZQUFRLENBQUMsS0FBSyxDQUFRLE1BQU0sRUFBRSxrQkFBVSxDQUFDLENBQUM7QUFDdkQsa0JBQWUsSUFBSSxDQUFDO0FBRXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0cifQ==