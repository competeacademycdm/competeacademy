'use client';

import React, { useState } from 'react';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  docTitle?: string;
  onSuccess?: () => void;
}

export function StudentPortalModal({
  isOpen,
  onClose,
  docTitle = 'Compete Academy Student Portal',
  onSuccess,
}: StudentPortalModalProps) {
  const [rollNo, setRollNo] = useState('');
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState<'idle' | 'verifying' | 'granted'>('idle');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('verifying');
    setTimeout(() => {
      setStatus('granted');
      setTimeout(() => {
        setStatus('idle');
        setRollNo('');
        setPin('');
        onClose();
        if (onSuccess) onSuccess();
      }, 1500);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-primary/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-surface-container-lowest rounded-xl p-space-md shadow-2xl flex flex-col gap-space-md z-10 border border-surface-container">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-base">lock</span>
            </div>
            <div className="flex flex-col">
              <h4 className="font-label-md text-label-md font-semibold text-on-surface">
                Student Portal Verification
              </h4>
              <span className="font-label-caps text-[0.625rem] text-secondary">
                Academic Credentials Required
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Target Document Box */}
        <div className="p-space-xs bg-surface-container-low rounded-lg flex flex-col gap-0.5">
          <span className="font-label-caps text-[0.625rem] text-on-surface-variant uppercase">
            Document / Resource Requested
          </span>
          <span className="font-label-md text-[0.75rem] font-semibold text-primary truncate">
            {docTitle}
          </span>
        </div>

        {status === 'granted' ? (
          <div className="p-4 bg-secondary-container/40 text-on-secondary-container rounded-lg flex flex-col items-center text-center gap-1.5 animate-in zoom-in-95">
            <span className="material-symbols-outlined text-secondary text-3xl">
              verified
            </span>
            <span className="font-label-md text-sm font-bold">
              Access Granted!
            </span>
            <span className="font-body-sm text-[0.75rem]">
              Initiating secure academic document download...
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm">
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-[0.6875rem] font-semibold text-on-surface uppercase">
                Registration / Roll No.
              </label>
              <input
                type="text"
                required
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="e.g. CA-2025-MED-1049"
                className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-high focus:ring-1 focus:ring-secondary transition-all"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-[0.6875rem] font-semibold text-on-surface uppercase">
                Registered Mobile OTP / PIN
              </label>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••••"
                className="w-full px-3 py-2 rounded-lg bg-surface-container text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-high focus:ring-1 focus:ring-secondary transition-all tracking-widest"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'verifying'}
              className="w-full py-2.5 mt-1 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-base">
                {status === 'verifying' ? 'hourglass_top' : 'verified_user'}
              </span>
              <span>
                {status === 'verifying'
                  ? 'Verifying Student Record...'
                  : 'Verify & Unlock Document'}
              </span>
            </button>
          </form>
        )}

        <div className="text-center">
          <span className="font-body-sm text-[0.6875rem] text-on-surface-variant">
            Not yet enrolled?{' '}
            <a
              href="tel:+919476543210"
              className="text-secondary font-semibold hover:underline"
            >
              Contact Admission Cell
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
