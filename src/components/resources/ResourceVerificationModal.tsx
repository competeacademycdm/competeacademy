'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface ResourceVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: {
    id: string;
    title: string;
    format?: string;
    size?: string;
    type?: string;
    examCategory?: string;
    accessMethod?: 'academy_download' | 'external_link';
    destinationUrl?: string;
    authority?: string;
  } | null;
  onVerifiedAccess: (result: {
    accessMethod: 'academy_download' | 'external_link';
    url: string;
  }) => void;
}

export function ResourceVerificationModal({
  isOpen,
  onClose,
  resource,
  onVerifiedAccess,
}: ResourceVerificationModalProps) {
  // Step 1: 'details' (Name & Mobile), Step 2: 'otp' (6-digit code), Step 3: 'success'
  const [step, setStep] = useState<'details' | 'otp' | 'success'>('details');

  // Form Fields
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [consent, setConsent] = useState(true);

  // OTP Fields (Array of 6 strings for 6 input boxes)
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // States
  const [maskedMobile, setMaskedMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  // Success state link for popup-blocker safety
  const [unlockedResult, setUnlockedResult] = useState<{
    accessMethod: 'academy_download' | 'external_link';
    url: string;
  } | null>(null);

  // Cooldown countdown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep('details');
      setOtpDigits(['', '', '', '', '', '']);
      setErrorMessage(null);
      setLoading(false);
      setUnlockedResult(null);
    }
  }, [isOpen, resource]);

  if (!isOpen || !resource) return null;

  const isExternal = resource.accessMethod === 'external_link' || !!resource.destinationUrl;

  // Handle Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanName = name.trim();
    if (cleanName.length < 2) {
      setErrorMessage('Please enter your full name (at least 2 letters).');
      return;
    }

    const cleanMobile = mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10 || !/^[6-9]/.test(cleanMobile)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      return;
    }

    if (!consent) {
      setErrorMessage('Please agree to verification and download record terms.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/resources/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          mobile: cleanMobile,
          resourceId: resource.id,
          resourceTitle: resource.title,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send verification SMS.');
      }

      setMaskedMobile(data.maskedMobile || `+91 ${cleanMobile}`);
      setCooldown(data.resendCooldownSeconds || 60);
      setStep('otp');
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error sending OTP';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const newDigits = [...otpDigits];
    newDigits[index] = digit;
    setOtpDigits(newDigits);
    setErrorMessage(null);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newDigits = [...otpDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || '';
    }
    setOtpDigits(newDigits);
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  // Handle Step 2: Verify OTP
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);

    const fullOtp = otpDigits.join('');
    if (fullOtp.length !== 6) {
      setErrorMessage('Please enter all 6 digits of your verification code.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/resources/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mobile: mobile.replace(/\D/g, ''),
          otp: fullOtp,
          resourceId: resource.id,
          resourceTitle: resource.title,
          downloadType: resource.type || 'paper',
          examCategory: resource.examCategory || 'neet',
          accessMethod: resource.accessMethod || (resource.destinationUrl ? 'external_link' : 'academy_download'),
          destinationUrl: resource.destinationUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Verification failed.');
      }

      setStep('success');

      const accessResult: {
        accessMethod: 'academy_download' | 'external_link';
        url: string;
      } = {
        accessMethod: data.accessMethod === 'external_link' ? 'external_link' : 'academy_download',
        url: data.destinationUrl || data.downloadUrl,
      };

      setUnlockedResult(accessResult);

      // Automatically trigger action after short delay
      setTimeout(() => {
        onVerifiedAccess(accessResult);
      }, 700);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error verifying code';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (cooldown > 0 || loading) return;
    setLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/resources/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          mobile: mobile.replace(/\D/g, ''),
          resourceId: resource.id,
          resourceTitle: resource.title,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to resend OTP.');
      }
      setCooldown(data.resendCooldownSeconds || 60);
      setOtpDigits(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error resending OTP';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#071126]/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0A1226] text-surface rounded-2xl max-w-lg w-full p-6 sm:p-8 flex flex-col gap-5 border border-secondary/30 shadow-2xl relative overflow-hidden">
        {/* Subtle Brand Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C69A48]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-surface-variant hover:text-surface p-1.5 rounded-full hover:bg-surface/10 transition-colors"
          aria-label="Close dialog"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Selected Resource Preview Card */}
        <div className="bg-surface/5 rounded-xl p-3.5 border border-surface/10 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#C69A48]/20 text-[#C69A48] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">
              {isExternal ? 'open_in_new' : resource.type === 'zip' ? 'folder_zip' : 'description'}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[0.6875rem] font-headline font-bold uppercase tracking-wider text-[#C69A48]">
                {isExternal ? 'Official Government Portal' : 'Academy Learning Resource'}
              </span>
              {resource.authority && (
                <span className="text-[0.6875rem] font-headline text-surface-variant font-semibold">
                  • {resource.authority}
                </span>
              )}
            </div>
            <h4 className="font-headline text-sm font-bold text-surface truncate mt-0.5">
              {resource.title}
            </h4>
            <span className="text-xs text-surface-variant mt-0.5">
              {isExternal ? 'Verified Official Source' : resource.format || 'PDF Document'}
            </span>
          </div>
        </div>

        {/* STEP 1: Student Information Form */}
        {step === 'details' && (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#C69A48] mb-1">
                <span className="material-symbols-outlined text-base">verified_user</span>
                <span className="font-headline font-bold text-xs uppercase tracking-wider">
                  Student Verification Required
                </span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-surface">
                Verify to Access Resource
              </h3>
              <p className="font-sans text-xs sm:text-sm text-surface-variant mt-1 leading-relaxed">
                {isExternal
                  ? 'Enter your name and mobile number to receive a secure SMS OTP. Once verified, you will be directed straight to the official government document.'
                  : 'Enter your details to receive an instant verification code and unlock your authorized academic download.'}
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-200 text-xs font-sans flex items-start gap-2">
                <span className="material-symbols-outlined text-base shrink-0 text-red-400">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col gap-3.5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-headline text-xs font-semibold text-surface-variant uppercase tracking-wider">
                  Full Name <span className="text-[#C69A48]">*</span>
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant/70 text-lg">
                    person
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. S. Karthikeyan"
                    maxLength={70}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface/10 text-surface placeholder:text-surface-variant/50 border border-surface/15 focus:border-[#C69A48] focus:outline-none font-sans text-sm transition-colors"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col gap-1.5">
                <label className="font-headline text-xs font-semibold text-surface-variant uppercase tracking-wider">
                  Indian Mobile Number <span className="text-[#C69A48]">*</span>
                </label>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-2.5 rounded-lg bg-surface/10 border border-surface/15 text-surface font-headline text-sm font-bold shrink-0">
                    +91
                  </div>
                  <div className="relative flex-1">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-surface-variant/70 text-lg">
                      phone_iphone
                    </span>
                    <input
                      type="tel"
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-surface/10 text-surface placeholder:text-surface-variant/50 border border-surface/15 focus:border-[#C69A48] focus:outline-none font-sans text-sm tracking-wider transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Consent Note */}
              <label className="flex items-start gap-2.5 text-xs text-surface-variant/80 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-surface/20 text-[#C69A48] focus:ring-0"
                />
                <span className="leading-relaxed">
                  I consent to verify my identity via SMS OTP and register my session for Compete Academy competitive examination resources.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3 rounded-lg bg-[#C69A48] hover:bg-[#B69A62] text-[#0A1226] font-headline text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0A1226] border-t-transparent rounded-full animate-spin" />
                  <span>Sending Verification Code...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">send_to_mobile</span>
                  <span>Send OTP via SMS</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: Six-Digit OTP Input & Verification */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#C69A48] mb-1">
                <span className="material-symbols-outlined text-base">sms</span>
                <span className="font-headline font-bold text-xs uppercase tracking-wider">
                  SMS Code Sent
                </span>
              </div>
              <h3 className="font-headline text-2xl font-bold text-surface">
                Enter 6-Digit OTP
              </h3>
              <p className="font-sans text-xs sm:text-sm text-surface-variant mt-1 leading-relaxed">
                We sent a 6-digit verification code to{' '}
                <strong className="text-surface font-semibold">{maskedMobile}</strong>. Valid for 5 minutes.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-red-200 text-xs font-sans flex items-start gap-2">
                <span className="material-symbols-outlined text-base shrink-0 text-red-400">error</span>
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 6 Digit Input Boxes */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 py-2" onPaste={handlePaste}>
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold font-mono rounded-lg bg-surface/10 border border-surface/20 text-surface focus:border-[#C69A48] focus:bg-surface/15 focus:outline-none transition-all shadow-inner"
                />
              ))}
            </div>

            {/* Resend & Edit Details Options */}
            <div className="flex items-center justify-between text-xs font-headline pt-1 border-t border-surface/10">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-surface-variant hover:text-surface flex items-center gap-1 font-semibold"
              >
                <span className="material-symbols-outlined text-sm">edit</span>
                <span>Change Mobile</span>
              </button>

              <button
                type="button"
                disabled={cooldown > 0 || loading}
                onClick={handleResend}
                className="text-[#C69A48] hover:text-[#FFB91F] font-bold flex items-center gap-1 disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-sm">replay</span>
                <span>
                  {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend OTP'}
                </span>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || otpDigits.join('').length !== 6}
              className="mt-2 w-full py-3 rounded-lg bg-[#C69A48] hover:bg-[#B69A62] text-[#0A1226] font-headline text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0A1226] border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Code on Server...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>{isExternal ? 'Verify & Open Official Document' : 'Verify & Unlock Download'}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 3: Verification Success */}
        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-6 text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center animate-bounce">
              <span className="material-symbols-outlined text-3xl">
                {isExternal ? 'open_in_new' : 'download_done'}
              </span>
            </div>
            <h3 className="font-headline text-xl font-bold text-surface">
              Verification Successful!
            </h3>
            <p className="font-sans text-xs sm:text-sm text-surface-variant max-w-sm">
              {isExternal
                ? `Your identity has been verified. Redirecting you to the official ${resource.authority || 'Government'} destination...`
                : 'Your identity has been verified. Your requested resource download is starting immediately...'}
            </p>

            {/* Popup blocker fallback */}
            {unlockedResult && (
              <div className="mt-3 flex flex-col items-center gap-2">
                <a
                  href={unlockedResult.url}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  download={!isExternal ? '' : undefined}
                  className="px-4 py-2 rounded-lg bg-[#C69A48] hover:bg-[#B69A62] text-[#0A1226] font-headline text-xs font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <span>
                    {isExternal ? 'Click Here If Tab Did Not Open' : 'Click Here To Download Again'}
                  </span>
                  <span className="material-symbols-outlined text-sm">
                    {isExternal ? 'arrow_forward' : 'download'}
                  </span>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
