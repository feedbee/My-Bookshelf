const assert = require("node:assert/strict");
const test = require("node:test");

const Book = require("../dist/models/book").default;
const Shelf = require("../dist/models/shelf").default;
const {ShelfApi} = require("../dist/controllers/shelfController");

function responseStub() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    send(body) {
      this.body = body;
      return this;
    }
  };
}

test("deleting a shelf deletes its books before the shelf", async () => {
  const originalFindOne = Shelf.findOne;
  const originalDeleteMany = Book.deleteMany;
  const operations = [];
  const shelf = {
    _id: "507f1f77bcf86cd799439011",
    async deleteOne() {
      operations.push("delete shelf");
      return {acknowledged: true, deletedCount: 1};
    }
  };

  Shelf.findOne = () => ({
    async exec() {
      operations.push("find shelf");
      return shelf;
    }
  });
  Book.deleteMany = () => ({
    async exec() {
      operations.push("delete books");
      return {acknowledged: true, deletedCount: 3};
    }
  });

  try {
    const response = responseStub();
    await ShelfApi.deleteShelf({params: {shelfKey: "example"}}, response);

    assert.deepEqual(operations, ["find shelf", "delete books", "delete shelf"]);
    assert.deepEqual(response.body, {});
  } finally {
    Shelf.findOne = originalFindOne;
    Book.deleteMany = originalDeleteMany;
  }
});

test("a book deletion error stops before deleting the shelf", async () => {
  const originalFindOne = Shelf.findOne;
  const originalDeleteMany = Book.deleteMany;
  const databaseError = new Error("book deletion failed");
  let shelfWasDeleted = false;

  Shelf.findOne = () => ({
    async exec() {
      return {
        _id: "507f1f77bcf86cd799439011",
        async deleteOne() {
          shelfWasDeleted = true;
        }
      };
    }
  });
  Book.deleteMany = () => ({
    async exec() {
      throw databaseError;
    }
  });

  try {
    await assert.rejects(
      ShelfApi.deleteShelf({params: {shelfKey: "example"}}, responseStub()),
      databaseError
    );
    assert.equal(shelfWasDeleted, false);
  } finally {
    Shelf.findOne = originalFindOne;
    Book.deleteMany = originalDeleteMany;
  }
});
