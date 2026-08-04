import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

import { InputValidationError } from "./input-validation";

interface ApiErrorResponse {
  status: number;
  body: {
    error: {
      code: string;
      message: string;
    };
  };
}

export function describeApiError(error: unknown): ApiErrorResponse {
  if (error instanceof InputValidationError) {
    return apiError(400, "INVALID_REQUEST", error.message);
  }

  if (isDuplicateKeyError(error)) {
    return apiError(409, "CONFLICT", "A resource with that value already exists");
  }

  if (
    error instanceof mongoose.Error.ValidationError ||
    error instanceof mongoose.Error.CastError ||
    error instanceof mongoose.Error.StrictModeError
  ) {
    return apiError(422, "VALIDATION_ERROR", "Request data is invalid");
  }

  return apiError(500, "INTERNAL_ERROR", "An unexpected error occurred");
}

export const apiErrorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  const response = describeApiError(error);
  if (response.status === 500) {
    console.error(error);
  }
  res.status(response.status).send(response.body);
};

function apiError(status: number, code: string, message: string): ApiErrorResponse {
  return {status, body: {error: {code, message}}};
}

function isDuplicateKeyError(error: unknown): error is {code: number} {
  return typeof error === "object" && error !== null && "code" in error && error.code === 11000;
}
