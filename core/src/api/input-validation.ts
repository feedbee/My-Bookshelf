import { NextFunction, Request, Response } from "express";

export const BOOK_INPUT_FIELDS = [
  "shelf",
  "name",
  "authors",
  "publish",
  "url",
  "cover",
  "my",
  "index"
] as const;

export const SHELF_INPUT_FIELDS = ["key", "title", "intro", "user"] as const;

export class InputValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InputValidationError";
  }
}

export function validateAllowedFields(
  input: unknown,
  allowedFields: readonly string[]
): Record<string, unknown> {
  if (
    input === null ||
    typeof input !== "object" ||
    Array.isArray(input) ||
    Object.getPrototypeOf(input) !== Object.prototype
  ) {
    throw new InputValidationError("Request body must be a JSON object");
  }

  const fields = Object.keys(input);
  if (fields.length === 0) {
    throw new InputValidationError("Request body must not be empty");
  }

  const unexpectedFields = fields.filter((field) => !allowedFields.includes(field));
  if (unexpectedFields.length > 0) {
    throw new InputValidationError(`Unexpected fields: ${unexpectedFields.join(", ")}`);
  }

  return input as Record<string, unknown>;
}

export function validateRequestBody(allowedFields: readonly string[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = validateAllowedFields(req.body, allowedFields);
      next();
    } catch (error) {
      next(error);
    }
  };
}
