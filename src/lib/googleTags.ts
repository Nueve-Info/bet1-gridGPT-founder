/**
 * Google Tag Manager Dynamic Loader
 * Loads GTM only after user consent is granted.
 */

// GTM Container ID - hardcoded from original index.html, can be moved to env if needed
const GTM_ID = 'GTM-N3DS6GTF';

let gtmLoaded = false;
let gtmLoading: Promise<void> | null = null;

/**
 * Dynamically load Google Tag Manager script.
 * Returns a promise that resolves when GTM is loaded.
 */
export function loadGoogleTagManager(): Promise<void> {
  // Already loaded
  if (gtmLoaded) {
    return Promise.resolve();
  }

  // Loading in progress, return existing promise
  if (gtmLoading) {
    return gtmLoading;
  }

  gtmLoading = new Promise((resolve, reject) => {
    try {
      // Ensure dataLayer exists
      window.dataLayer = window.dataLayer || [];

      // Push GTM start event
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });

      // Create and inject script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;

      script.onload = () => {
        gtmLoaded = true;
        console.info('[GoogleTags] GTM loaded successfully');
        resolve();
      };

      script.onerror = () => {
        gtmLoading = null;
        reject(new Error('[GoogleTags] Failed to load GTM script'));
      };

      // Insert as first script
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript?.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    } catch (error) {
      gtmLoading = null;
      reject(error);
    }
  });

  return gtmLoading;
}

/**
 * Check if GTM has been loaded
 */
export function isGTMLoaded(): boolean {
  return gtmLoaded;
}

/**
 * Push event to dataLayer (safe wrapper)
 */
export function pushToDataLayer(event: Record<string, unknown>): void {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

// Type augmentation for dataLayer
declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

