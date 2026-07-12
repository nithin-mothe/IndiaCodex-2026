export interface TrustPaySdkOptions {
  readonly baseUrl: URL;
  readonly apiKey?: string;
}

export interface TrustPaySdk {
  readonly baseUrl: URL;
  readonly apiKeyConfigured: boolean;
}

/**
 * Creates a typed TrustPay SDK client configuration for API consumers.
 */
export function createTrustPaySdk(options: TrustPaySdkOptions): TrustPaySdk {
  return {
    baseUrl: options.baseUrl,
    apiKeyConfigured: Boolean(options.apiKey),
  };
}
