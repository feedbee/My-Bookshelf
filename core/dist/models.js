"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Shelf = /** @class */ (function () {
    function Shelf() {
    }
    return Shelf;
}());
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
var Book = /** @class */ (function () {
    function Book() {
    }
    return Book;
}());
var NamedEntity = /** @class */ (function () {
    function NamedEntity() {
    }
    return NamedEntity;
}());
var Author = /** @class */ (function (_super) {
    __extends(Author, _super);
    function Author() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Author;
}(NamedEntity));
var Publisher = /** @class */ (function (_super) {
    __extends(Publisher, _super);
    function Publisher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Publisher;
}(NamedEntity));
var Publish = /** @class */ (function () {
    function Publish() {
    }
    return Publish;
}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsibW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFBQTtJQU1BLENBQUM7SUFBRCxZQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFFRDtJQUFBO0lBR0EsQ0FBQztJQUFELFdBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUVEO0lBQUE7SUFXQSxDQUFDO0lBQUQsV0FBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBRUQ7SUFBQTtJQUdBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBRUQ7SUFBcUIsMEJBQVc7SUFBaEM7O0lBQWtDLENBQUM7SUFBRCxhQUFDO0FBQUQsQ0FBQyxBQUFuQyxDQUFxQixXQUFXLEdBQUc7QUFDbkM7SUFBd0IsNkJBQVc7SUFBbkM7O0lBQXFDLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBdEMsQ0FBd0IsV0FBVyxHQUFHO0FBRXRDO0lBQUE7SUFJQSxDQUFDO0lBQUQsY0FBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9DRyJ9