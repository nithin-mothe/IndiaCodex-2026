import type { FastifyInstance } from "fastify";

import { createSuccessResponse } from "@trustpay/utils";

export interface FeatureModuleDefinition {
  readonly name: string;
  readonly path: string;
  readonly description: string;
}

export function registerFeatureModule(app: FastifyInstance, definition: FeatureModuleDefinition) {
  app.get(definition.path, () =>
    createSuccessResponse(
      {
        name: definition.name,
        status: "ready",
        description: definition.description,
      },
      `${definition.name} module is registered.`,
    ),
  );
}
