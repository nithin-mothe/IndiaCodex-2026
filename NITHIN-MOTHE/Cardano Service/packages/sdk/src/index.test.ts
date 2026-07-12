import { describe, expect, it } from "vitest";

import { createTrustPaySdk } from "./index.js";

describe("createTrustPaySdk", () => {
  it("records whether an API key is configured", () => {
    const sdk = createTrustPaySdk({
      baseUrl: new URL("https://api.trustpay.example"),
      apiKey: "test-key",
    });

    expect(sdk.apiKeyConfigured).toBe(true);
  });
});
