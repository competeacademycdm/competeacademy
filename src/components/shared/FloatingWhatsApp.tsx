'use client';

import React, { useState } from 'react';

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '919476543210';
  const defaultMessage = encodeURIComponent(
    'Hello Compete Academy! I would like to enquire about course admissions, fee structure, and batch timings.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-3">
      {/* Tooltip badge */}
      <div
        className={`hidden sm:flex items-center gap-2 bg-white text-[#101B3D] px-3.5 py-2 rounded-full shadow-lg border border-slate-200 text-xs font-semibold tracking-wide transition-all duration-300 ${
          showTooltip ? 'opacity-100 translate-x-0' : 'opacity-90 hover:opacity-100'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Admissions Help Desk</span>
      </div>

      {/* Floating Circular Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat with Compete Academy on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_6px_20px_rgba(37,211,102,0.45)] hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all duration-200 group"
        title="Chat with Compete Academy Admissions Desk on WhatsApp"
      >
        {/* Soft Radar Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping group-hover:hidden" />

        {/* WhatsApp Official Vector Logo */}
        <svg
          className="w-7 h-7 fill-current relative z-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.676.15-.2.301-.776.979-.952 1.18-.175.2-.351.226-.652.075-.3-.151-1.267-.467-2.413-1.488-.893-.796-1.496-1.78-1.672-2.08-.175-.3-.019-.463.132-.613.136-.134.301-.351.451-.527.151-.176.201-.301.301-.502.1-.2.05-.376-.025-.526-.075-.151-.676-1.63-.927-2.234-.244-.588-.493-.509-.676-.519l-.577-.01c-.2 0-.526.075-.802.376s-1.053 1.028-1.053 2.508 1.078 2.91 1.228 3.111c.15.201 2.122 3.24 5.141 4.544.718.31 1.278.496 1.716.635.722.23 1.379.197 1.899.12.58-.087 1.78-.727 2.03-1.43.251-.703.251-1.304.175-1.43-.075-.125-.276-.201-.577-.351zM12.04 2C6.544 2 2.08 6.463 2.08 11.958c0 1.966.572 3.799 1.56 5.342L2 22l4.835-1.579c1.478.89 3.2 1.401 5.205 1.401 5.496 0 9.96-4.463 9.96-9.958C22 6.463 17.536 2 12.04 2zm0 18.232c-1.764 0-3.399-.516-4.787-1.405l-.343-.22-2.871.938.961-2.798-.24-.383A8.17 8.17 0 0 1 3.864 11.96c0-4.509 3.668-8.176 8.176-8.176 4.508 0 8.176 3.667 8.176 8.176 0 4.51-3.668 8.272-8.176 8.272z" />
        </svg>
      </a>
    </aside>
  );
}