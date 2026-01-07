/**
 * Cookie Consent Module
 * Handles consent state persistence, versioning, and Google Consent Mode v2 integration.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ConsentState {
  necessary: true; // Always true, cannot be disabled
  analytics: boolean;
  marketing: boolean;
  version: number;
  updatedAt: string; // ISO date string
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

export const CONSENT_STORAGE_KEY = 'gridgpt_consent_v1';
export const CONSENT_VERSION = 1;

export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  version: CONSENT_VERSION,
  updatedAt: new Date().toISOString(),
};

// ─────────────────────────────────────────────────────────────────────────────
// Storage Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if localStorage is available and writable
 */
function isStorageAvailable(): boolean {
  try {
    const testKey = '__consent_test__';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Read consent state from localStorage.
 * Returns null if no consent exists, storage is unavailable, or data is invalid/outdated.
 */
export function readConsent(): ConsentState | null {
  if (!isStorageAvailable()) {
    console.warn('[Consent] localStorage unavailable, falling back to in-memory consent');
    return null;
  }

  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<ConsentState>;

    // Validate version - if version mismatch, treat as no consent
    if (parsed.version !== CONSENT_VERSION) {
      console.info('[Consent] Version mismatch, treating as no consent');
      return null;
    }

    // Validate required fields
    if (
      typeof parsed.analytics !== 'boolean' ||
      typeof parsed.marketing !== 'boolean' ||
      typeof parsed.updatedAt !== 'string'
    ) {
      console.warn('[Consent] Invalid consent data structure');
      return null;
    }

    return {
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      version: parsed.version,
      updatedAt: parsed.updatedAt,
    };
  } catch (error) {
    console.error('[Consent] Error reading consent:', error);
    return null;
  }
}

/**
 * Write consent state to localStorage.
 * Returns true if successful, false if storage unavailable or write failed.
 */
export function writeConsent(consent: Omit<ConsentState, 'necessary' | 'version' | 'updatedAt'>): boolean {
  const fullConsent: ConsentState = {
    necessary: true,
    analytics: consent.analytics,
    marketing: consent.marketing,
    version: CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
  };

  if (!isStorageAvailable()) {
    console.warn('[Consent] localStorage unavailable, consent will not persist');
    return false;
  }

  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(fullConsent));
    return true;
  } catch (error) {
    console.error('[Consent] Error writing consent:', error);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Google Consent Mode v2 Integration
// ─────────────────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Ensure gtag function is available (should already be defined in index.html)
 */
function ensureGtag(): void {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  }
}

/**
 * Update Google Consent Mode v2 based on current consent state.
 * This should be called:
 * 1. On app startup if consent exists in storage
 * 2. Immediately after user makes a consent decision
 */
export function updateGoogleConsent(consent: Pick<ConsentState, 'analytics' | 'marketing'>): void {
  ensureGtag();

  const consentUpdate = {
    // Analytics
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    // Marketing / Ads
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
    personalization_storage: consent.marketing ? 'granted' : 'denied',
    // Always granted (necessary)
    functionality_storage: 'granted',
    security_storage: 'granted',
  };

  window.gtag('consent', 'update', consentUpdate);
  console.info('[Consent] Google Consent Mode updated:', consentUpdate);
}

// ─────────────────────────────────────────────────────────────────────────────
// Apply Consent (orchestrates GCM + loaders)
// ─────────────────────────────────────────────────────────────────────────────

// Track if loaders have been triggered (to avoid duplicate loads)
let googleLoaded = false;
let pixelLoaded = false;

/**
 * Apply consent: update GCM and conditionally load Google/Pixel.
 * This is the main entry point after a consent decision.
 */
export async function applyConsent(
  consent: Pick<ConsentState, 'analytics' | 'marketing'>,
  loaders: {
    loadGoogle: () => Promise<void>;
    loadPixel: () => Promise<void>;
    revokePixel: () => void;
  }
): Promise<void> {
  // 1. Always update Google Consent Mode
  updateGoogleConsent(consent);

  // 2. Load Google (GTM) if analytics or marketing is granted and not already loaded
  if ((consent.analytics || consent.marketing) && !googleLoaded) {
    try {
      await loaders.loadGoogle();
      googleLoaded = true;
      // Re-apply consent after GTM loads to ensure tags respect it
      updateGoogleConsent(consent);
    } catch (error) {
      console.error('[Consent] Failed to load Google:', error);
    }
  }

  // 3. Handle Pixel based on marketing consent
  if (consent.marketing && !pixelLoaded) {
    try {
      await loaders.loadPixel();
      pixelLoaded = true;
    } catch (error) {
      console.error('[Consent] Failed to load Meta Pixel:', error);
    }
  } else if (!consent.marketing && pixelLoaded) {
    // Revoke pixel consent if previously loaded but now denied
    loaders.revokePixel();
  }
}

/**
 * Check if consent has been given (any decision made)
 */
export function hasConsentDecision(): boolean {
  return readConsent() !== null;
}

/**
 * Reset loader flags (useful for testing)
 */
export function resetLoaderFlags(): void {
  googleLoaded = false;
  pixelLoaded = false;
}

