const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

test("book editor selects a newly created book by its MongoDB id", () => {
  const editor = fs.readFileSync(path.join(__dirname, "../public/book.html"), "utf8");

  assert.match(editor, /\$\("#resource-url"\)\.val\(data\._id\)/);
  assert.doesNotMatch(editor, /\$\("#resource-url"\)\.val\(data\.key\)/);
});
