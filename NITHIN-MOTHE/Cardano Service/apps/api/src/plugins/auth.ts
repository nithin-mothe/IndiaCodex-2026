import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fp from "fastify-plugin";
import { z } from "zod";

import { userRoles } from "@trustpay/types";
import type { UserRole } from "@trustpay/types";
import { createErrorResponse } from "@trustpay/utils";

import { hasRole } from "../auth/roles.js";

const authPayloadSchema = z.object({
  sub: z.string().min(1),
  roles: z.array(z.enum(userRoles)).default(["Guest"]),
});

interface AuthJwtPayload {
  readonly sub: string;
  readonly roles?: readonly UserRole[];
}

export const authPlugin = fp(function authPlugin(app: FastifyInstance) {
  app.decorateRequest("auth");

  app.addHook("preHandler", async (request) => {
    const authorization = request.headers.authorization;

    if (!authorization) {
      return;
    }

    const decoded = await request.jwtVerify<AuthJwtPayload>();
    const parsed = authPayloadSchema.safeParse(decoded);

    if (!parsed.success) {
      return replyUnauthorized();
    }

    request.auth = {
      subject: parsed.data.sub,
      roles: parsed.data.roles,
    };
  });
});

function replyUnauthorized(): never {
  const error = new Error("Invalid authentication token.");
  Object.assign(error, { statusCode: 401 });
  throw error;
}

export function requireAuthenticated(request: FastifyRequest, reply: FastifyReply) {
  if (!request.auth) {
    return reply
      .status(401)
      .send(createErrorResponse("UNAUTHENTICATED", "Authentication required."));
  }

  return undefined;
}

export function requireRoles(roles: readonly UserRole[]) {
  return (request: FastifyRequest, reply: FastifyReply) => {
    const unauthenticated = requireAuthenticated(request, reply);

    if (unauthenticated) {
      return unauthenticated;
    }

    if (!request.auth || !hasRole(request.auth.roles, roles)) {
      return reply.status(403).send(createErrorResponse("FORBIDDEN", "Insufficient permissions."));
    }

    return undefined;
  };
}
