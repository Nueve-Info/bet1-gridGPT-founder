/// <reference types="vite/client" />

declare module '@gridGPT-assets/*' {
  const value: string;
  export default value;
}

// Type for fbq function (Meta Pixel)
interface FbqFunction {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: (...args: unknown[]) => void;
  loaded: boolean;
  version: string;
}

// Google Tag Manager dataLayer & Meta Pixel
interface Window {
  dataLayer: Record<string, unknown>[];
  gtag: (...args: unknown[]) => void;
  fbq?: FbqFunction;
  _fbq?: FbqFunction;
}

