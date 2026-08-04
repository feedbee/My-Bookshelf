const assert = require("node:assert/strict");
const test = require("node:test");

const Book = require("../dist/models/book").default;
const {BookSchema} = require("../dist/models/book");
const Shelf = require("../dist/models/shelf").default;
const {ShelfSchema} = require("../dist/models/shelf");

test("book requires a shelf reference and index", () => {
  assert.equal(BookSchema.path("shelf").options.required, true);
  assert.equal(BookSchema.path("shelf").options.ref, "Shelf");
  assert.equal(BookSchema.path("index").options.required, true);
});

test("shelf key has a unique index", () => {
  assert.equal(ShelfSchema.path("key").options.unique, true);
});

test("models reject fields outside their schemas", () => {
  assert.throws(
    () => new Book({name: "Book", unexpected: true}),
    /not in schema and strict mode is set to throw/
  );
  assert.throws(
    () => new Shelf({key: "shelf", unexpected: true}),
    /not in schema and strict mode is set to throw/
  );
  assert.throws(
    () => new Book({my: {rating: 5, unexpected: true}}),
    /not in schema and strict mode is set to throw/
  );
});

test("reading details enforce the TypeScript rating and format contract", async () => {
  const book = new Book({
    shelf: "507f1f77bcf86cd799439011",
    name: "Book",
    url: "https://example.com/book",
    cover: "cover.jpg",
    index: 1,
    my: {rating: 6, type: "scroll"}
  });

  await assert.rejects(book.validate(), (validationError) => {
    assert.ok(validationError.errors["my.rating"]);
    assert.ok(validationError.errors["my.type"]);
    return true;
  });
});
