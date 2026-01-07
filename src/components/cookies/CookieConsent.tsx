/**
 * Cookie Consent Banner and Settings Modal
 * Implements GDPR-compliant cookie consent with categories:
 * - Necessary (always on)
 * - Analytics (toggle)
 * - Marketing (toggle)
 */

import { useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  readConsent,
  writeConsent,
  applyConsent,
  type ConsentState,
} from '../../lib/consent';
import { loadGoogleTagManager } from '../../lib/googleTags';
import { loadMetaPixel, revokePixelConsent, grantPixelConsent, isPixelLoaded } from '../../lib/metaPixel';

// Custom event name for opening settings from anywhere (e.g., footer)
export const COOKIE_SETTINGS_EVENT = 'cookie:open-settings';

interface ConsentPreferences {
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  // UI state
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Consent preferences (for modal toggles)
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    analytics: false,
    marketing: false,
  });

  // Apply consent and trigger loaders
  const handleApplyConsent = useCallback(async (consent: ConsentPreferences) => {
    // Write to storage
    writeConsent(consent);

    // Apply consent (GCM update + conditional loaders)
    await applyConsent(consent, {
      loadGoogle: loadGoogleTagManager,
      loadPixel: loadMetaPixel,
      revokePixel: revokePixelConsent,
    });

    // If marketing was re-enabled and pixel is already loaded, re-grant
    if (consent.marketing && isPixelLoaded()) {
      grantPixelConsent();
    }
  }, []);

  // Initialize on mount
  useEffect(() => {
    const existingConsent = readConsent();

    if (existingConsent) {
      // Consent exists - apply it immediately and hide banner
      setPreferences({
        analytics: existingConsent.analytics,
        marketing: existingConsent.marketing,
      });
      setShowBanner(false);

      // Apply saved consent
      handleApplyConsent({
        analytics: existingConsent.analytics,
        marketing: existingConsent.marketing,
      });
    } else {
      // No consent - show banner
      setShowBanner(true);
    }
  }, [handleApplyConsent]);

  // Listen for custom event to open settings modal
  useEffect(() => {
    const handleOpenSettings = () => {
      // Load current consent into modal
      const current = readConsent();
      if (current) {
        setPreferences({
          analytics: current.analytics,
          marketing: current.marketing,
        });
      }
      setShowModal(true);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => {
      window.removeEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
    };
  }, []);

  // Handler: Accept All
  const handleAcceptAll = async () => {
    const consent = { analytics: true, marketing: true };
    setPreferences(consent);
    await handleApplyConsent(consent);
    setShowBanner(false);
    setShowModal(false);
  };

  // Handler: Reject (only necessary)
  const handleReject = async () => {
    const consent = { analytics: false, marketing: false };
    setPreferences(consent);
    await handleApplyConsent(consent);
    setShowBanner(false);
    setShowModal(false);
  };

  // Handler: Save preferences from modal
  const handleSavePreferences = async () => {
    await handleApplyConsent(preferences);
    setShowBanner(false);
    setShowModal(false);
  };

  // Handler: Open manage modal
  const handleOpenManage = () => {
    setShowModal(true);
  };

  // Don't render anything if banner is hidden and modal is closed
  if (!showBanner && !showModal) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && !showModal && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-gray-200 shadow-lg"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Text */}
              <div className="flex-1">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                  We use cookies
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We use cookies to improve your experience, analyze site traffic, and show you
                  personalized content. You can accept all cookies, reject non-essential ones,
                  or customize your preferences.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:flex-shrink-0">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleOpenManage}
                  className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm"
                >
                  Manage
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReject}
                  className="text-xs sm:text-sm"
                >
                  Reject non-essential
                </Button>
                <Button
                  size="sm"
                  onClick={handleAcceptAll}
                  className="bg-[#111111] text-white hover:bg-black/90 text-xs sm:text-sm"
                >
                  Accept all
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Cookie Preferences
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Manage your cookie preferences. You can enable or disable different types of
              cookies below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Necessary Cookies */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 pr-4">
                <h4 className="text-sm font-medium text-gray-900">Necessary</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Essential for the website to function. Cannot be disabled.
                </p>
              </div>
              <Switch checked={true} disabled className="opacity-70" />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 pr-4">
                <h4 className="text-sm font-medium text-gray-900">Analytics</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked }))
                }
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1 pr-4">
                <h4 className="text-sm font-medium text-gray-900">Marketing</h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Used to track visitors and display relevant ads.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleReject}
              className="w-full sm:w-auto text-sm"
            >
              Reject all
            </Button>
            <Button
              variant="outline"
              onClick={handleAcceptAll}
              className="w-full sm:w-auto text-sm"
            >
              Accept all
            </Button>
            <Button
              onClick={handleSavePreferences}
              className="w-full sm:w-auto bg-[#111111] text-white hover:bg-black/90 text-sm"
            >
              Save preferences
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/**
 * Dispatch custom event to open cookie settings modal.
 * Can be called from anywhere (e.g., footer link).
 */
export function openCookieSettings(): void {
  window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT));
}

