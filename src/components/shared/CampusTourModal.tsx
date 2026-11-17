'use client';

import React, { useState } from 'react';

interface CampusTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CampusTourModal({ isOpen, onClose }: CampusTourModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [stream, setStream] = useState('NEET');
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmed(true);
    setTimeout(() => {
      setConfirmed(false);
      setName('');
      setPhone('');
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-primary/70 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Drawer / Modal Content */}
      <div className="relative w-full max-w-md bg-surface text-on-surface rounded-t-2xl sm:rounded-2xl p-space-md flex flex-col gap-space-md shadow-2xl z-10 border border-surface-container">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">
              domain_verification
            </span>
            <h3 className="font-headline-sm text-headline-sm text-primary">
              Academic Campus Tour
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Experience our lecture theatres, library, and 1-on-1 mentorship pod in person. Select your target stream:
        </p>

        {confirmed ? (
          <div className="p-4 bg-secondary-container text-on-secondary-container rounded-lg text-center font-body-sm text-body-sm flex flex-col items-center gap-1.5 animate-in zoom-in-95">
            <span className="material-symbols-outlined text-secondary text-3xl">
              check_circle
            </span>
            <span className="font-label-md text-sm font-bold">
              Appointment Received!
            </span>
            <span>
              An academic counselor will contact you via WhatsApp with gate pass and parking details.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">
                Full Student Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. S. Ananya"
                className="w-full px-3 py-2.5 bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg shadow-sm focus:outline-none focus:bg-surface-container-low border border-surface-container"
              />
            </div>
            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">
                Contact Phone
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2.5 bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg shadow-sm focus:outline-none focus:bg-surface-container-low border border-surface-container"
              />
            </div>
            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant block mb-1">
                Target Examination Stream
              </label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="w-full px-3 py-2.5 bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg shadow-sm focus:outline-none border border-surface-container"
              >
                <option value="NEET">NEET (UG Medical)</option>
                <option value="JEE">JEE (Main & Advanced)</option>
                <option value="UPSC">UPSC Civil Services</option>
                <option value="TNPSC">TN Government Exams (TNPSC)</option>
                <option value="FOUNDATION">Secondary School Foundation (Class 8-10)</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-2 bg-secondary hover:bg-secondary-fixed-dim text-on-secondary font-label-lg text-label-lg font-semibold rounded-lg shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-lg">check_circle</span>
              <span>Confirm Academic Tour</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
