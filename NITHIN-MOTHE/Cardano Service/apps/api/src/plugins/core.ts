import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

import { createErrorResponse } from "@trustpay/utils";

export const corePlugin = fp(async function corePlugin(app: FastifyInstance) {
  const corsOrigins = app.config.API_CORS_ORIGINS.split(",").map((origin) => origin.trim());

  await app.register(helmet);
  await app.register(cors, {
    origin: corsOrigins,
    credentials: true,
  });
  await app.register(jwt, {
    secret: app.config.JWT_SECRET,
  });
  await app.register(swagger, {
    openapi: {
      info: {
        title: "TrustPay Protocol API",
        description: "Backend API for Cardano-native decentralized escrow infrastructure.",
        version: "0.1.0",
      },
      servers: [
        {
          url: "http://localhost:4000",
          description: "Local development",
        },
      ],
    },
  });
  await app.register(swaggerUi, {
    routePrefix: "/docs",
  });

  app.setNotFoundHandler((_request, reply) => {
    return reply.status(404).send(createErrorResponse("NOT_FOUND", "Route not found."));
  });

  app.setErrorHandler((error, request, reply) => {
    request.log.error({ error }, "Unhandled API error");

    const statusCode = error.statusCode && error.statusCode >= 400 ? error.statusCode : 500;
    const code = statusCode >= 500 ? "INTERNAL_SERVER_ERROR" : "REQUEST_ERROR";
    const message = statusCode >= 500 ? "An unexpected error occurred." : error.message;

    return reply.status(statusCode).send(createErrorResponse(code, message));
  });
});
