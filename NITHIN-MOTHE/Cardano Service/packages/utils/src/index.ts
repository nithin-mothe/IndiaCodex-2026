import type { ApiErrorResponse, ApiSuccessResponse } from "@trustpay/types";

/**
 * Creates the canonical successful API response envelope.
 */
export function createSuccessResponse<TData, TMeta extends object = Record<string, never>>(
  data: TData,
  message = "OK",
  meta = {} as TMeta,
): ApiSuccessResponse<TData, TMeta> {
  return {
    success: true,
    data,
    message,
    meta,
  };
}

/**
 * Creates the canonical failed API response envelope.
 */
export function createErrorResponse(code: string, message: string): ApiErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
    },
  };
}
