export const escrowStatuses = [
  "Draft",
  "PendingSeller",
  "AwaitingDeposit",
  "Locked",
  "InProgress",
  "MilestonePending",
  "Completed",
  "Cancelled",
  "Refunded",
  "Disputed",
  "Expired",
] as const;

export type EscrowStatus = (typeof escrowStatuses)[number];

export const userRoles = [
  "Guest",
  "Buyer",
  "Seller",
  "Developer",
  "Arbitrator",
  "Administrator",
] as const;

export type UserRole = (typeof userRoles)[number];

export interface ApiSuccessResponse<TData, TMeta extends object = Record<string, never>> {
  readonly success: true;
  readonly data: TData;
  readonly message: string;
  readonly meta: TMeta;
}

export interface ApiErrorResponse {
  readonly success: false;
  readonly error: {
    readonly code: string;
    readonly message: string;
  };
}

export type ApiResponse<TData, TMeta extends object = Record<string, never>> =
  ApiSuccessResponse<TData, TMeta> | ApiErrorResponse;
