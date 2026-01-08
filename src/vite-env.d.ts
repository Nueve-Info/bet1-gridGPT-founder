/// <reference types="vite/client" />

declare module '@gridGPT-assets/*' {
  const value: string;
  export default value;
}

// Google Tag Manager dataLayer
interface Window {
  dataLayer?: Array<Record<string, any>>;
  fbq?: (action: string, event: string, params?: Record<string, any>) => void;
}


