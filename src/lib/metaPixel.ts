/**
 * Meta Pixel Dynamic Loader
 * Loads Meta Pixel only after marketing consent is granted.
 */

// Pixel ID - hardcoded from original index.html
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '2312331245956042';

let pixelLoaded = false;
let pixelLoading: Promise<void> | null = null;
let pixelRevoked = false;

/**
 * Bootstrap the fbq function (without loading the actual script yet)
 */
function bootstrapFbq(): void {
  if (window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if ((fbq as FbqFunction).callMethod) {
      (fbq as FbqFunction).callMethod!(...args);
    } else {
      (fbq as FbqFunction).queue.push(args);
    }
  } as FbqFunction;

  fbq.push = fbq;
  fbq.loaded = false;
  fbq.version = '2.0';
  fbq.queue = [];

  window.fbq = fbq;
  if (!window._fbq) {
    window._fbq = fbq;
  }
}

/**
 * Dynamically load Meta Pixel script and initialize.
 * Returns a promise that resolves when Pixel is loaded and initialized.
 */
export function loadMetaPixel(): Promise<void> {
  // Already loaded
  if (pixelLoaded) {
    return Promise.resolve();
  }

  // Loading in progress
  if (pixelLoading) {
    return pixelLoading;
  }

  pixelLoading = new Promise((resolve, reject) => {
    try {
      // Bootstrap fbq first
      bootstrapFbq();

      // Create and inject script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';

      script.onload = () => {
        pixelLoaded = true;
        pixelRevoked = false;

        // Grant consent, init, and track PageView
        if (window.fbq) {
          window.fbq('consent', 'grant');
          window.fbq('init', PIXEL_ID);
          window.fbq('track', 'PageView');
        }

        console.info('[MetaPixel] Pixel loaded and initialized');
        resolve();
      };

      script.onerror = () => {
        pixelLoading = null;
        reject(new Error('[MetaPixel] Failed to load Pixel script'));
      };

      // Insert script
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript?.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        document.head.appendChild(script);
      }
    } catch (error) {
      pixelLoading = null;
      reject(error);
    }
  });

  return pixelLoading;
}

/**
 * Revoke pixel consent (stops future tracking).
 * Note: Cannot fully unload the script, but prevents future events.
 */
export function revokePixelConsent(): void {
  if (window.fbq && !pixelRevoked) {
    try {
      window.fbq('consent', 'revoke');
      pixelRevoked = true;
      console.info('[MetaPixel] Consent revoked');
    } catch (error) {
      console.warn('[MetaPixel] Error revoking consent:', error);
    }
  }
}

/**
 * Re-grant pixel consent (if previously revoked)
 */
export function grantPixelConsent(): void {
  if (window.fbq && pixelRevoked) {
    try {
      window.fbq('consent', 'grant');
      pixelRevoked = false;
      console.info('[MetaPixel] Consent re-granted');
    } catch (error) {
      console.warn('[MetaPixel] Error granting consent:', error);
    }
  }
}

/**
 * Track a custom event (only if pixel is loaded and not revoked)
 */
export function trackPixelEvent(eventName: string, params?: Record<string, unknown>): void {
  if (!pixelLoaded || pixelRevoked) {
    console.debug('[MetaPixel] Event not tracked (pixel not loaded or revoked):', eventName);
    return;
  }

  if (window.fbq) {
    if (params) {
      window.fbq('track', eventName, params);
    } else {
      window.fbq('track', eventName);
    }
  }
}

/**
 * Track PageView (useful for SPA route changes)
 */
export function trackPageView(): void {
  trackPixelEvent('PageView');
}

/**
 * Check if Pixel has been loaded
 */
export function isPixelLoaded(): boolean {
  return pixelLoaded;
}

/**
 * Check if Pixel consent is currently revoked
 */
export function isPixelRevoked(): boolean {
  return pixelRevoked;
}

