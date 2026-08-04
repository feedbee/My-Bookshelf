const assert = require("node:assert/strict");
const test = require("node:test");
const mongoose = require("mongoose");

const {describeApiError} = require("../dist/api/error-handler");
const {InputValidationError} = require("../dist/api/input-validation");

test("invalid request bodies produce a safe 400 response", () => {
  assert.deepEqual(describeApiError(new InputValidationError("Unexpected fields: $set")), {
    status: 400,
    body: {
      error: {
        code: "INVALID_REQUEST",
        message: "Unexpected fields: $set"
      }
    }
  });
});

test("duplicate keys produce a conflict without database details", () => {
  assert.deepEqual(describeApiError({code: 11000, keyValue: {key: "duplicate"}}), {
    status: 409,
    body: {
      error: {
        code: "CONFLICT",
        message: "A resource with that value already exists"
      }
    }
  });
});

test("unknown errors do not expose their details", () => {
  assert.deepEqual(describeApiError(new Error("database host and password")), {
    status: 500,
    body: {
      error: {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred"
      }
    }
  });
});

test("invalid MongoDB identifiers produce a safe validation response", () => {
  const error = new mongoose.Error.CastError("ObjectId", "not-an-id", "_id");

  assert.deepEqual(describeApiError(error), {
    status: 422,
    body: {
      error: {
        code: "VALIDATION_ERROR",
        message: "Request data is invalid"
      }
    }
  });
});
