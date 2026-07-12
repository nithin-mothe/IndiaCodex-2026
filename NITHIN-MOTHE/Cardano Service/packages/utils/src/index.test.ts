import { describe, expect, it } from "vitest";

import { createErrorResponse, createSuccessResponse } from "./index.js";

describe("API response helpers", () => {
  it("creates the standard success envelope", () => {
    expect(createSuccessResponse({ health: "ok" })).toEqual({
      success: true,
      data: { health: "ok" },
      message: "OK",
      meta: {},
    });
  });

  it("creates the standard error envelope", () => {
    expect(createErrorResponse("VALIDATION_ERROR", "Invalid input")).toEqual({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid input",
      },
    });
  });
});
