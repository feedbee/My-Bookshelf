const assert = require("node:assert/strict");
const test = require("node:test");

const {
  BOOK_INPUT_FIELDS,
  InputValidationError,
  SHELF_INPUT_FIELDS,
  validateAllowedFields
} = require("../dist/api/input-validation");

test("book input accepts only the public book fields", () => {
  const input = {
    shelf: "507f1f77bcf86cd799439011",
    name: "A book",
    authors: [],
    publish: {},
    url: "https://example.com/book",
    cover: "cover.jpg",
    my: {rating: 5},
    index: 1
  };

  assert.deepEqual(validateAllowedFields(input, BOOK_INPUT_FIELDS), input);
});

test("shelf input accepts only the public shelf fields", () => {
  const input = {
    key: "example",
    title: "Example shelf",
    intro: "Intro",
    user: {name: "Reader", email: "reader@example.com"}
  };

  assert.deepEqual(validateAllowedFields(input, SHELF_INPUT_FIELDS), input);
});

test("input rejects MongoDB operators and server-managed fields", () => {
  assert.throws(
    () => validateAllowedFields({name: "Changed", $set: {index: 100}}, BOOK_INPUT_FIELDS),
    InputValidationError
  );
  assert.throws(
    () => validateAllowedFields({key: "changed", _id: "server-owned"}, SHELF_INPUT_FIELDS),
    InputValidationError
  );
});

test("input must be a non-empty plain JSON object", () => {
  for (const input of [null, [], "book", {}, new Date()]) {
    assert.throws(
      () => validateAllowedFields(input, BOOK_INPUT_FIELDS),
      InputValidationError
    );
  }
});
