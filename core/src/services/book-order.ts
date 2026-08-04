import { PipelineStage, Types } from "mongoose";

import { InputValidationError } from "../api/input-validation";

export function parseBookIndex(value: unknown): number {
  if (typeof value !== "string") {
    throw new InputValidationError("Book index must be a non-negative integer");
  }
  const index = Number(value);
  if (value.trim() === "" || !Number.isSafeInteger(index) || index < 0) {
    throw new InputValidationError("Book index must be a non-negative integer");
  }
  return index;
}

export function buildBookMoveUpdate(
  bookId: Types.ObjectId,
  shelfId: Types.ObjectId,
  currentIndex: number,
  newIndex: number
) {
  const indexChange = newIndex > currentIndex ? -1 : 1;

  const pipeline: PipelineStage[] = [{
    $set: {
      index: {
        $cond: [
          {$eq: ["$_id", bookId]},
          newIndex,
          {$add: ["$index", indexChange]}
        ]
      }
    }
  }];

  return {
    filter: {
      shelf: shelfId,
      index: {$gte: Math.min(currentIndex, newIndex), $lte: Math.max(currentIndex, newIndex)}
    },
    pipeline
  };
}
