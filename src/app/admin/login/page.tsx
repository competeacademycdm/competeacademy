'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { BrandLogo } from '@/components/layout/BrandLogo';

function sanitizeRedirectClient(redirectParam: string | null): string {
  if (!redirectParam) return '/admin';
  const trimmed = redirectParam.trim();
  if (
    !trimmed.startsWith('/admin') ||
    trimmed.startsWith('//') ||
    trimmed.startsWith('/\\') ||
    trimmed.includes('://') ||
    trimmed.startsWith('/admin/login')
  ) {
    return '/admin';
  }
  return trimmed;
}

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Password Recovery & Reset Modal State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [recoveryMode, setRecoveryMode] = useState<'request' | 'reset'>('request');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  const [recoveryError, setRecoveryError] = useState<string | null>(null);
  const [recoveryNotice, setRecoveryNotice] = useState<string | null>(null);
  const [deliveryDetails, setDeliveryDetails] = useState<string | null>(null);

  // Reset Token Consumption State
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    const urlToken = searchParams.get('resetToken');
    if (urlToken) {
      setResetToken(urlToken);
      setRecoveryMode('reset');
      setShowForgotModal(true);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError(null);
    setSuccessBanner(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Authentication failed. Please check your credentials.');
        setLoading(false);
        return;
      }

      const targetPath = sanitizeRedirectClient(searchParams.get('redirect'));
      router.push(targetPath);
      router.refresh();
    } catch {
      setError('Network error connecting to authentication service.');
      setLoading(false);
    }
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryLoading) return;

    setRecoveryError(null);
    setRecoveryNotice(null);
    setDeliveryDetails(null);
    setRecoveryLoading(true);

    try {
      const res = await fetch('/api/admin/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recoveryEmail.trim().toLowerCase() }),
      });

      const data = await res.json();
      if (!res.ok) {
        setRecoveryError(data.error || 'Unable to process recovery request.');
      } else {
        setRecoveryNotice(data.message);
        if (data.deliveryNotice) {
          setDeliveryDetails(data.deliveryNotice);
        }
      }
    } catch {
      setRecoveryError('Network error while requesting password recovery.');
    } finally {
      setRecoveryLoading(false);
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryLoading) return;

    setRecoveryError(null);
    setRecoveryNotice(null);

    if (newPassword !== confirmPassword) {
      setRecoveryError('New password and confirmation password do not match.');
      return;
    }

    setRecoveryLoading(true);

    try {
      const res = await fetch('/api/admin/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: resetToken.trim(),
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setRecoveryError(data.error || 'Failed to reset password.');
      } else {
        setShowForgotModal(false);
        setResetToken('');
        setNewPassword('');
        setConfirmPassword('');
        setPassword('');
        setSuccessBanner(
          data.message ||
            'Password reset complete. All prior sessions have been invalidated. Please sign in with your new password.'
        );
      }
    } catch {
      setRecoveryError('Network error while resetting password.');
    } finally {
      setRecoveryLoading(false);
    }
  };

  const openRecoveryModal = () => {
    setRecoveryEmail(email.trim());
    setRecoveryError(null);
    setRecoveryNotice(null);
    setDeliveryDetails(null);
    setRecoveryMode('request');
    setShowForgotModal(true);
  };

  return (
    <div className="min-h-screen bg-[#071126] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Subtle Background Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#FFB91F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#FFB91F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#0B1735]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-10 relative z-10">
        {/* Top Identity */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="mb-4 inline-block">
            <BrandLogo size="lg" theme="dark" />
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB91F]/15 border border-[#FFB91F]/30 text-[#FFB91F] text-xs font-headline font-bold uppercase tracking-widest mb-2">
            <span className="material-symbols-outlined text-sm">shield_person</span>
            <span>Institutional Admin Portal</span>
          </div>
          <h1 className="font-headline text-xl sm:text-2xl font-bold text-white tracking-tight">
            Sign in to Command Console
          </h1>
          <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
            Manage learning materials, question banks, and academic tracks.
          </p>
        </div>

        {/* Success Alert */}
        {successBanner && (
          <div
            role="status"
            className="mb-6 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-sans flex items-start gap-2.5"
          >
            <span className="material-symbols-outlined text-emerald-400 text-base shrink-0 mt-0.5">
              check_circle
            </span>
            <span>{successBanner}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div
            role="alert"
            className="mb-6 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs font-sans flex items-center gap-2.5"
          >
            <span className="material-symbols-outlined text-rose-400 text-base shrink-0">
              error
            </span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5" noValidate>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="admin-email"
              className="font-headline text-xs font-bold uppercase tracking-wider text-slate-300"
            >
              Institutional Email
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                mail
              </span>
              <input
                id="admin-email"
                name="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@competeacademy.in"
                className="w-full pl-11 pr-4 py-3 bg-[#071126]/90 border border-white/15 focus:border-[#FFB91F] rounded-xl text-white text-sm font-sans placeholder:text-slate-500 focus-visible:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="admin-password"
                className="font-headline text-xs font-bold uppercase tracking-wider text-slate-300"
              >
                Security Password
              </label>
              <button
                type="button"
                onClick={openRecoveryModal}
                className="text-[0.6875rem] font-headline font-semibold text-[#FFB91F] hover:underline transition-all cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                lock
              </span>
              <input
                id="admin-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 bg-[#071126]/90 border border-white/15 focus:border-[#FFB91F] rounded-xl text-white text-sm font-sans placeholder:text-slate-500 focus-visible:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !email.trim() || !password}
            className="mt-2 w-full py-3.5 px-6 rounded-xl bg-[#FFB91F] hover:bg-[#e6a517] disabled:opacity-50 text-[#071126] font-headline text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#FFB91F]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-[#071126] border-t-transparent rounded-full animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Authorize &amp; Enter Console</span>
                <span className="material-symbols-outlined text-base font-bold">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </form>

        {/* Security Notice Footer (No Exposed Credentials) */}
        <div className="mt-6 pt-5 border-t border-white/10 text-center">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[0.6875rem] text-slate-400 font-sans leading-relaxed flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm text-[#FFB91F] shrink-0">
              verified_user
            </span>
            <span>
              Protected by cryptographic session tokens &amp; brute-force rate limiting.
            </span>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mt-4 font-headline font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-sm">west</span>
            <span>Return to Compete Academy Website</span>
          </Link>
        </div>
      </div>

      {/* Password Recovery & Token Reset Modal */}
      {showForgotModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="recovery-modal-title"
        >
          <div className="bg-[#0B1735] border border-white/15 rounded-2xl max-w-md w-full p-6 shadow-2xl text-white flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FFB91F]/15 border border-[#FFB91F]/30 text-[#FFB91F] flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">lock_reset</span>
                </div>
                <div>
                  <h3 id="recovery-modal-title" className="font-headline text-base font-bold">
                    Admin Password Recovery
                  </h3>
                  <span className="text-[0.6875rem] text-slate-400 block">
                    Time-limited SHA-256 token verification
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                aria-label="Close recovery modal"
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {/* Mode Switch Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#071126] rounded-xl border border-white/10 text-xs font-headline font-bold">
              <button
                type="button"
                onClick={() => {
                  setRecoveryMode('request');
                  setRecoveryError(null);
                }}
                className={`py-2 rounded-lg transition-colors cursor-pointer ${
                  recoveryMode === 'request'
                    ? 'bg-[#FFB91F] text-[#071126]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. Request Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  setRecoveryMode('reset');
                  setRecoveryError(null);
                }}
                className={`py-2 rounded-lg transition-colors cursor-pointer ${
                  recoveryMode === 'reset'
                    ? 'bg-[#FFB91F] text-[#071126]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Enter Reset Token
              </button>
            </div>

            {recoveryError && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs font-sans flex items-start gap-2"
              >
                <span className="material-symbols-outlined text-rose-400 text-base shrink-0">
                  error
                </span>
                <span>{recoveryError}</span>
              </div>
            )}

            {recoveryNotice && (
              <div
                role="status"
                className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-sans flex flex-col gap-2"
              >
                <div className="flex items-start gap-2 font-semibold">
                  <span className="material-symbols-outlined text-emerald-400 text-base shrink-0">
                    check_circle
                  </span>
                  <span>{recoveryNotice}</span>
                </div>
                {deliveryDetails && (
                  <p className="text-[0.6875rem] text-slate-300 leading-relaxed pl-6">
                    {deliveryDetails}
                  </p>
                )}
              </div>
            )}

            {recoveryMode === 'request' ? (
              <form onSubmit={handleRequestReset} className="flex flex-col gap-4">
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  Enter your institutional administrator email address to generate a single-use, 15-minute password reset token.
                </p>
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="recovery-email"
                    className="font-headline text-xs font-bold uppercase tracking-wider text-slate-300"
                  >
                    Administrator Email
                  </label>
                  <input
                    id="recovery-email"
                    type="email"
                    required
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    placeholder="admin@competeacademy.in"
                    className="w-full px-3.5 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white text-xs font-sans placeholder:text-slate-500 focus-visible:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-headline text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={recoveryLoading || !recoveryEmail.trim()}
                    className="px-4 py-2 rounded-xl bg-[#FFB91F] hover:bg-[#e6a517] disabled:opacity-50 text-[#071126] font-headline text-xs font-bold cursor-pointer"
                  >
                    {recoveryLoading ? 'Generating...' : 'Request Reset Token'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleConfirmReset} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="reset-token-input"
                    className="font-headline text-xs font-bold uppercase tracking-wider text-slate-300"
                  >
                    64-Character Reset Token
                  </label>
                  <input
                    id="reset-token-input"
                    type="text"
                    required
                    value={resetToken}
                    onChange={(e) => setResetToken(e.target.value)}
                    placeholder="Paste single-use reset token..."
                    className="w-full px-3.5 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white text-xs font-mono placeholder:text-slate-500 focus-visible:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="reset-new-password"
                    className="font-headline text-xs font-bold uppercase tracking-wider text-slate-300"
                  >
                    New Administrator Password
                  </label>
                  <div className="relative">
                    <input
                      id="reset-new-password"
                      type={showNewPassword ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Min 10 chars, upper, lower, digit & symbol"
                      className="w-full pl-3.5 pr-10 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white text-xs font-sans placeholder:text-slate-500 focus-visible:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword((p) => !p)}
                      aria-label={showNewPassword ? 'Hide new password' : 'Show new password'}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-base">
                        {showNewPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="reset-confirm-password"
                    className="font-headline text-xs font-bold uppercase tracking-wider text-slate-300"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="reset-confirm-password"
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-3.5 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white text-xs font-sans placeholder:text-slate-500 focus-visible:outline-none"
                  />
                </div>

                <div className="p-2.5 rounded-lg bg-[#071126] border border-white/10 text-[0.6875rem] text-slate-400 leading-relaxed">
                  Policy: Minimum 10 characters including uppercase, lowercase, number, and special character. Reusing compromised passwords is blocked.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-headline text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={
                      recoveryLoading ||
                      !resetToken.trim() ||
                      !newPassword ||
                      !confirmPassword
                    }
                    className="px-4 py-2 rounded-xl bg-[#FFB91F] hover:bg-[#e6a517] disabled:opacity-50 text-[#071126] font-headline text-xs font-bold cursor-pointer"
                  >
                    {recoveryLoading ? 'Resetting...' : 'Verify Token & Reset Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#071126] flex items-center justify-center text-white">
          <div className="w-8 h-8 border-2 border-[#FFB91F] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}
