const assert = require("node:assert/strict");
const test = require("node:test");

const {InputValidationError} = require("../dist/api/input-validation");
const {buildBookMoveUpdate, parseBookIndex} = require("../dist/services/book-order");

test("moving a book to a higher index decrements books in between", () => {
  assert.deepEqual(buildBookMoveUpdate("book-id", "shelf-id", 5, 7), {
    filter: {shelf: "shelf-id", index: {$gte: 5, $lte: 7}},
    pipeline: [{
      $set: {
        index: {
          $cond: [
            {$eq: ["$_id", "book-id"]},
            7,
            {$add: ["$index", -1]}
          ]
        }
      }
    }]
  });
});

test("moving a book to a lower index increments books in between", () => {
  const update = buildBookMoveUpdate("book-id", "shelf-id", 7, 5);

  assert.deepEqual(update.filter, {shelf: "shelf-id", index: {$gte: 5, $lte: 7}});
  assert.deepEqual(update.pipeline[0].$set.index.$cond[2], {$add: ["$index", 1]});
});

test("book indexes must be non-negative integers", () => {
  assert.equal(parseBookIndex("12"), 12);
  for (const value of ["", "2.5", "2books", "-1", "NaN"]) {
    assert.throws(() => parseBookIndex(value), InputValidationError);
  }
});
