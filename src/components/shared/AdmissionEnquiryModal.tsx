'use client';

import React, { useState } from 'react';

interface AdmissionEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStream?: string;
}

export function AdmissionEnquiryModal({
  isOpen,
  onClose,
  initialStream = 'NEET',
}: AdmissionEnquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [stream, setStream] = useState(initialStream);
  const [grade, setGrade] = useState('Class 12 / Repeater');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#000212]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-lg bg-white text-[#101B3D] rounded-2xl shadow-2xl p-6 sm:p-8 z-10 border border-slate-200 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#101B3D] text-[#C69A48] flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-2xl">school</span>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-[#101B3D]">
                Academic Admission Enquiry
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Compete Academy • Anna Salai Campus, Chennai
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {submitted ? (
          <div className="py-8 flex flex-col items-center text-center gap-3 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h4 className="text-xl font-bold text-[#101B3D]">Enquiry Received!</h4>
            <p className="text-sm text-slate-600 max-w-sm">
              Thank you, <span className="font-semibold">{name}</span>. A senior academic counselor from our Chennai campus will contact you at <span className="font-semibold">{phone}</span> within 2 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Student Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. S. Kaviya / R. Arvind"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-[#101B3D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C69A48]/50 focus:border-[#C69A48]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-[#101B3D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C69A48]/50 focus:border-[#C69A48]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Current Academic Level
                </label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-[#101B3D] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C69A48]/50 focus:border-[#C69A48]"
                >
                  <option value="Class 11 Aspirant">Class 11 (2-Year Cohort)</option>
                  <option value="Class 12 / Repeater">Class 12 / Repeater Track</option>
                  <option value="College / Graduate">College Graduate (UPSC/TNPSC)</option>
                  <option value="Middle School Foundation">Class 8-10 Foundation</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Target Stream
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'NEET', label: 'NEET (UG)' },
                  { id: 'JEE', label: 'IIT - JEE' },
                  { id: 'TNPSC', label: 'TNPSC Group' },
                  { id: 'UPSC', label: 'UPSC Services' },
                  { id: 'FOUNDATION', label: 'School Foundation' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setStream(item.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all text-center ${
                      stream === item.id
                        ? 'bg-[#101B3D] text-[#C69A48] border-[#101B3D] shadow-sm'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[0.6875rem] text-slate-500 leading-tight">
              By submitting, you agree to receive admissions guidance and scholarship test alerts from Compete Academy. No spam, ever.
            </p>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-[#C69A48] hover:bg-[#d8a850] text-[#101B3D] font-extrabold text-sm uppercase tracking-wider transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 mt-1"
            >
              <span>Submit Admission Enquiry</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}