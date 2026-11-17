'use client';

import React, { useState } from 'react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStream?: string;
}

export function EnquiryModal({
  isOpen,
  onClose,
  defaultStream = 'NEET (UG) Medical',
}: EnquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [stream, setStream] = useState(defaultStream);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative bg-surface-container-lowest text-on-surface rounded-xl p-space-lg w-full max-w-sm shadow-2xl flex flex-col gap-space-md z-10 border border-surface-container">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-secondary uppercase font-bold">
              Fast-Track Form
            </span>
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
              Enquire for Admissions
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="p-4 bg-secondary-container/40 text-on-secondary-container rounded-lg flex flex-col items-center text-center gap-2 animate-in zoom-in-95">
            <span className="material-symbols-outlined text-secondary text-3xl">
              check_circle
            </span>
            <span className="font-label-md text-sm font-bold">
              Enquiry Received!
            </span>
            <p className="font-body-sm text-[0.75rem] text-on-surface-variant">
              Thank you, {name || 'Aspirant'}. Our Academic Dean counseling team will contact you within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm">
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-[0.7rem] text-on-surface-variant font-semibold">
                Student Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. S. Arvind"
                className="w-full px-3 py-2 rounded bg-surface-container font-body-sm text-body-sm text-on-surface outline-none focus:ring-1 focus:ring-secondary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-[0.7rem] text-on-surface-variant font-semibold">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 rounded bg-surface-container font-body-sm text-body-sm text-on-surface outline-none focus:ring-1 focus:ring-secondary"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-md text-[0.7rem] text-on-surface-variant font-semibold">
                Target Competitive Exam *
              </label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="w-full px-3 py-2 rounded bg-surface-container font-body-sm text-body-sm text-on-surface outline-none focus:ring-1 focus:ring-secondary"
              >
                <option value="NEET (UG) Medical">NEET (UG) Medical</option>
                <option value="IIT - JEE (Mains & Advanced)">IIT - JEE (Mains & Advanced)</option>
                <option value="TNPSC State Services">TNPSC State Services</option>
                <option value="UPSC Civil Services (IAS)">UPSC Civil Services (IAS)</option>
                <option value="School Foundation (Class 8-12)">School Foundation (Class 8-12)</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full mt-space-xs py-3 bg-secondary hover:bg-secondary-fixed-dim text-on-secondary font-label-lg text-label-lg font-bold rounded-lg shadow-sm active:scale-95 transition-all"
            >
              Submit Enquiry
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
