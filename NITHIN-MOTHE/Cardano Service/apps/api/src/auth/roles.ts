import type { UserRole } from "@trustpay/types";

export const privilegedRoles = [
  "Administrator",
  "Arbitrator",
] as const satisfies readonly UserRole[];

export function hasRole(
  userRoles: readonly UserRole[],
  allowedRoles: readonly UserRole[],
): boolean {
  return userRoles.some((role) => allowedRoles.includes(role));
}
