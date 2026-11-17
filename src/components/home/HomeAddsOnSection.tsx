'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/i18n';

const FEATURE_MEDIA = [
  {
    imageSrc:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Medical students in authentic hospital clinical training environment',
    icon: 'local_hospital',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'High-tech scientific aerospace lab and satellite technology cleanroom',
    icon: 'rocket_launch',
  },
  {
    imageSrc:
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1200&auto=format&fit=crop&q=80',
    imageAlt: 'Engaged secondary school students collaborating in modern classroom',
    icon: 'school',
  },
];

export function HomeAddsOnSection() {
  const { tr, language } = useLanguage();

  return (
    <section className="w-full bg-[#FAF8F2] py-12 sm:py-16 lg:py-20 border-b border-[#E6DEC8] relative overflow-hidden">
      {/* Subtle architectural dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #0B142B 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-8 sm:gap-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2DDCF] pb-6 sm:pb-8">
          <div className="max-w-2xl flex flex-col items-start gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4A33F]/15 border border-[#D4A33F]/35 text-[#8C6D23] font-mono text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4A33F]" />
              <span>{tr.homepage.addsOn.badge}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B142B] tracking-tight">
              {tr.homepage.addsOn.title}
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-[#8C6D23] font-medium">
              &ldquo;{language === 'TA' ? 'வகுப்பறைகளுக்கு அப்பாற்பட்ட கற்றல். புத்தகங்களைத் தாண்டிய நேரடி அனுபவம்.' : 'Learning Beyond Classrooms. Experience Beyond Textbooks.'}&rdquo;
            </p>
          </div>

          <p className="font-sans text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
            {tr.homepage.addsOn.subtitle}
          </p>
        </div>

        {/* 3 Image-Led Feature Presentations — Horizontal Three-Column Layout on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tr.homepage.addsOn.features.map((feat, idx) => {
            const media = FEATURE_MEDIA[idx] || FEATURE_MEDIA[0];

            return (
              <div
                key={feat.number}
                className="group bg-white rounded-3xl border border-[#E2DDCF] hover:border-[#D4A33F] transition-all duration-300 shadow-[0_4px_20px_rgba(11,20,43,0.04)] hover:shadow-[0_12px_32px_rgba(11,20,43,0.08)] flex flex-col overflow-hidden"
              >
                {/* Feature Image Header with Overlay Badges */}
                <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-[#070D1E]">
                  <Image
                    src={media.imageSrc}
                    alt={media.imageAlt}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-[0.95] contrast-[1.05]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Gradient vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B142B]/85 via-[#0B142B]/20 to-transparent" />

                  {/* Top Badge: Number and Category */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-[#0B142B]/90 backdrop-blur-md text-[#D4A33F] font-mono text-[0.6875rem] font-bold tracking-wider uppercase border border-[#D4A33F]/30 shadow-sm">
                      {feat.badge}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#0B142B]/90 backdrop-blur-md text-[#D4A33F] font-mono text-xs font-bold flex items-center justify-center border border-[#D4A33F]/30 shadow-sm">
                      {feat.number}
                    </span>
                  </div>

                  {/* Bottom Icon overlay on photo */}
                  <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-white">
                    <div className="w-9 h-9 rounded-xl bg-[#D4A33F] text-[#070D1E] flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-lg">
                        {media.icon}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[#F5EBD5] font-semibold tracking-wide">
                      {feat.subtitle}
                    </span>
                  </div>
                </div>

                {/* Feature Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-start">
                  <div className="flex flex-col gap-2.5">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0B142B] group-hover:text-[#8C6D23] transition-colors leading-tight">
                      {feat.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
