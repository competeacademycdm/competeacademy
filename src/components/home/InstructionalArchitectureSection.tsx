'use client';

import React from 'react';
import Image from 'next/image';

interface ArchitectureTier {
  number: string;
  title: string;
  badge: string;
  icon: string;
  description: string;
  coreMessage: string;
}

const TIERS: ArchitectureTier[] = [
  {
    number: '01',
    title: 'Concept-Synchronized Timetable',
    badge: 'SUBJECT-ALIGNED TIMETABLE',
    icon: 'calendar_clock',
    description:
      'Every class timetable is planned around the subject and topic being taught. For example, if students learn Kinetics in Physics during the first period, the next period connects the same Kinetics topic with Chemistry, helping students understand concepts across subjects.',
    coreMessage: 'One concept. Multiple subject perspectives.',
  },
  {
    number: '02',
    title: 'Transparent Academic Roadmap',
    badge: 'TRANSPARENT EXAM SYLLABUS',
    icon: 'map',
    description:
      'Students clearly understand what they are learning today and what they will study in the coming academic years. Every standard follows a structured lesson plan with progressively advanced features, and faculty explain the learning objectives at every stage.',
    coreMessage: 'Know what you learn today. Know what comes next.',
  },
  {
    number: '03',
    title: 'Hybrid Learning Ecosystem',
    badge: 'ONLINE & OFFLINE MODES',
    icon: 'devices',
    description:
      'Students can learn through both online and offline modes. Access recorded video lessons and online textbooks, attend classroom sessions, and participate in live mock tests through the Compete Academy mobile application available on the Google Play Store.',
    coreMessage: 'Learn anywhere. Practise anytime.',
  },
  {
    number: '04',
    title: 'Gamified & Personalized Learning',
    badge: 'INDIVIDUAL PROGRESS PACING',
    icon: 'military_tech',
    description:
      "Learning becomes engaging through a gamified system where students earn points, progress through levels and achieve learning milestones. Faculty adapt their teaching approach to each student's individual learning pace and needs.",
    coreMessage: 'Every student progresses. Every achievement counts.',
  },
];

interface InstructionalArchitectureSectionProps {
  onOpenEnquiry?: (topic?: string) => void;
}

export function InstructionalArchitectureSection({
  onOpenEnquiry,
}: InstructionalArchitectureSectionProps) {
  const leftTiers = [TIERS[0], TIERS[2]]; // Tier 01 & Tier 03
  const rightTiers = [TIERS[1], TIERS[3]]; // Tier 02 & Tier 04

  return (
    <section
      className="relative w-full bg-[#FCF9F1] py-12 sm:py-16 lg:py-20 overflow-hidden border-b border-[#E6DEC8]"
      aria-label="Our Four-Tier Learning Architecture"
    >
      {/* 5. BACKGROUND DESIGN: Cream academic background with sweeping navy corners & gold curves */}
      
      {/* Top-Left Dark Navy Corner Accent with Sweeping Gold Trim */}
      <div className="absolute top-0 left-0 w-[240px] sm:w-[380px] lg:w-[480px] h-[180px] sm:h-[260px] lg:h-[320px] pointer-events-none select-none z-0">
        <svg
          viewBox="0 0 480 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Deep Navy Curved Corner */}
          <path
            d="M0 0 L420 0 C300 90 180 200 0 310 Z"
            fill="url(#navyGradTL)"
          />
          {/* Elegant Gold Sweeping Curves */}
          <path
            d="M0 310 C180 200 300 90 420 0"
            stroke="url(#goldGradTL)"
            strokeWidth="4"
          />
          <path
            d="M0 295 C170 190 280 85 390 0"
            stroke="url(#goldGradTL2)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="navyGradTL" x1="0" y1="0" x2="300" y2="250" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0B1735" />
              <stop offset="0.6" stopColor="#101D40" />
              <stop offset="1" stopColor="#071126" />
            </linearGradient>
            <linearGradient id="goldGradTL" x1="0" y1="310" x2="420" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFE082" />
              <stop offset="0.5" stopColor="#C69A48" />
              <stop offset="1" stopColor="#E6B800" />
            </linearGradient>
            <linearGradient id="goldGradTL2" x1="0" y1="295" x2="390" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D4AF37" />
              <stop offset="1" stopColor="#FFF2A3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom-Right Navy Corner Accent with Sweeping Gold Trim */}
      <div className="absolute bottom-0 right-0 w-[240px] sm:w-[380px] lg:w-[460px] h-[160px] sm:h-[220px] lg:h-[270px] pointer-events-none select-none z-0">
        <svg
          viewBox="0 0 460 270"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Deep Navy Curved Corner */}
          <path
            d="M460 270 L60 270 C160 190 290 100 460 0 Z"
            fill="url(#navyGradBR)"
          />
          {/* Sweeping Gold Curve */}
          <path
            d="M60 270 C160 190 290 100 460 0"
            stroke="url(#goldGradBR)"
            strokeWidth="4"
          />
          <path
            d="M80 270 C175 195 300 110 460 20"
            stroke="url(#goldGradBR2)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          <defs>
            <linearGradient id="navyGradBR" x1="460" y1="270" x2="160" y2="50" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0B1735" />
              <stop offset="0.7" stopColor="#101D40" />
              <stop offset="1" stopColor="#071126" />
            </linearGradient>
            <linearGradient id="goldGradBR" x1="60" y1="270" x2="460" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFE082" />
              <stop offset="0.5" stopColor="#C69A48" />
              <stop offset="1" stopColor="#D4AF37" />
            </linearGradient>
            <linearGradient id="goldGradBR2" x1="80" y1="270" x2="460" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#D4AF37" />
              <stop offset="1" stopColor="#FFF2A3" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Bottom-Left Authentic Compete Academy Campus Facade Silhouette with soft fade */}
      <div className="absolute bottom-0 left-0 w-[280px] sm:w-[380px] lg:w-[460px] h-[140px] sm:h-[180px] lg:h-[220px] pointer-events-none select-none z-0 opacity-45 mix-blend-multiply">
        <Image
          src="/images/compete-academy-campus-facade.png"
          alt="Compete Academy campus architectural facade"
          fill
          className="object-contain object-bottom-left"
          sizes="(max-width: 768px) 280px, 460px"
        />
        {/* Soft atmospheric gradient masks across campus facade */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#FCF9F1]/40 to-[#FCF9F1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FCF9F1]/30 to-[#FCF9F1]" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col items-center gap-8 sm:gap-10 lg:gap-12">
        
        {/* 1. SECTION HEADER */}
        <div className="flex flex-col items-center text-center max-w-3xl gap-3">
          {/* Badge: INSTRUCTIONAL ARCHITECTURE with gold flanking lines */}
          <div className="flex items-center gap-3">
            <span className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent to-[#C69A48]" />
            <span className="px-4 py-1.5 rounded-full bg-[#0B1735] text-[#FFE299] font-headline font-bold text-[0.6875rem] sm:text-xs uppercase tracking-[0.18em] shadow-sm border border-[#C69A48]/50">
              INSTRUCTIONAL ARCHITECTURE
            </span>
            <span className="w-8 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent to-[#C69A48]" />
          </div>

          {/* Main Heading: "Our Four-Tier Learning Architecture" (Serif with Gold Gradient) */}
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-[#0B1735] tracking-tight leading-[1.18]">
            Our Four-Tier{' '}
            <span className="bg-gradient-to-r from-[#C69A48] via-[#E2A740] to-[#B3832B] bg-clip-text text-transparent">
              Learning Architecture
            </span>
          </h2>

          {/* Description */}
          <p className="font-sans text-xs sm:text-sm md:text-base text-slate-600 max-w-[68ch] leading-relaxed">
            Engineered to eliminate cognitive fatigue, pinpoint thematic weaknesses, and foster calm examination composure under pressure.
          </p>
        </div>

        {/* 2 & 4. COMPOSITION: Left (01, 03) — Center Medallion Logo — Right (02, 04) */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 xl:gap-10">
          
          {/* Left Column: Tier 01 & Tier 03 */}
          <div className="w-full lg:w-[40%] flex flex-col gap-5 sm:gap-6">
            {leftTiers.map((tier) => (
              <div
                key={tier.number}
                className="group relative bg-[#FCFBF8]/95 hover:bg-white rounded-[20px] border border-[#C69A48]/40 hover:border-[#C69A48] p-4.5 sm:p-5 lg:p-5.5 shadow-[0_4px_16px_rgba(198,154,72,0.12)] hover:shadow-[0_8px_28px_rgba(198,154,72,0.22)] transition-all duration-300 hover:-translate-y-1 flex items-start sm:items-center justify-between gap-3.5 sm:gap-4.5 cursor-pointer"
                onClick={() => onOpenEnquiry && onOpenEnquiry(`Methodology Phase ${tier.number} - ${tier.title}`)}
              >
                {/* Number & Icon Badge (Dark Navy with Gold Number & Icon) */}
                <div className="w-13 h-16 sm:w-14 sm:h-17 rounded-2xl bg-[#0B1735] text-[#FFB91F] border border-[#FFB91F]/30 shadow-md flex flex-col items-center justify-center shrink-0 gap-0.5">
                  <span className="material-symbols-outlined text-base text-[#D4A33F]">
                    {tier.icon}
                  </span>
                  <span className="font-display text-sm sm:text-base font-bold leading-none">
                    {tier.number}
                  </span>
                  <span className="w-3.5 h-[1.5px] bg-[#FFB91F] rounded-full opacity-80" />
                </div>

                {/* Content: Title, Description & Core Message */}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.625rem] font-mono font-bold text-[#8C6D23] uppercase tracking-wider">
                      {tier.badge}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-sm sm:text-[0.9375rem] lg:text-base text-[#0B1735] leading-snug">
                    {tier.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-[0.8125rem] text-slate-600 leading-relaxed">
                    {tier.description}
                  </p>
                  <div className="pt-1 flex items-center gap-1.5 text-[0.6875rem] font-headline font-bold text-[#8C6D23]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A33F]" />
                    <span>{tier.coreMessage}</span>
                  </div>
                </div>

                {/* Right Arrow Button Circle */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FCF9F1] group-hover:bg-[#0B1735] border border-[#C69A48]/50 group-hover:border-[#0B1735] text-[#0B1735] group-hover:text-[#FFB91F] transition-all duration-200 flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-0.5 self-center">
                  <span className="material-symbols-outlined text-base sm:text-lg">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Center Medallion: Compete Academy Logo with Single Clean Gold Edge */}
          <div className="w-full lg:w-[22%] flex flex-col items-center justify-center shrink-0 py-2 lg:py-0">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-b from-[#FFF0C2] via-[#FFB91F] to-[#D9A441] p-[2px] shadow-[0_8px_30px_rgba(217,164,65,0.25)] flex items-center justify-center select-none">
              {/* Single Clean Warm Ivory Pedestal Disk */}
              <div className="w-full h-full rounded-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF6ED] to-[#F5EED9] p-5 sm:p-6 lg:p-7 flex flex-col items-center justify-center relative overflow-hidden">
                
                {/* Enlarged Authentic Compete Academy Crest Logo */}
                <div className="relative w-36 h-20 sm:w-44 sm:h-24 lg:w-52 lg:h-28">
                  <Image
                    src="/logo/compete-academy-crest.png"
                    alt="Compete Academy Authentic Crest Emblem"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 208px"
                    priority
                  />
                </div>

                {/* Wordmark Typography matching Reference */}
                <div className="flex flex-col items-center mt-1 text-center">
                  <span className="font-display font-extrabold text-[0.875rem] sm:text-base lg:text-[1.0625rem] text-[#0B1735] tracking-wide uppercase leading-tight">
                    COMPETE
                  </span>
                  <span className="font-display font-bold text-[0.75rem] sm:text-[0.8125rem] lg:text-[0.875rem] text-[#C69A48] tracking-widest uppercase leading-none">
                    ACADEMY
                  </span>
                  <span className="font-sans text-[0.5625rem] sm:text-[0.625rem] text-slate-500 tracking-wider mt-0.5">
                    Dream • Prepare • Become
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tier 02 & Tier 04 */}
          <div className="w-full lg:w-[40%] flex flex-col gap-5 sm:gap-6">
            {rightTiers.map((tier) => (
              <div
                key={tier.number}
                className="group relative bg-[#FCFBF8]/95 hover:bg-white rounded-[20px] border border-[#C69A48]/40 hover:border-[#C69A48] p-4.5 sm:p-5 lg:p-5.5 shadow-[0_4px_16px_rgba(198,154,72,0.12)] hover:shadow-[0_8px_28px_rgba(198,154,72,0.22)] transition-all duration-300 hover:-translate-y-1 flex items-start sm:items-center justify-between gap-3.5 sm:gap-4.5 cursor-pointer"
                onClick={() => onOpenEnquiry && onOpenEnquiry(`Methodology Phase ${tier.number} - ${tier.title}`)}
              >
                {/* Number & Icon Badge (Dark Navy with Gold Number & Icon) */}
                <div className="w-13 h-16 sm:w-14 sm:h-17 rounded-2xl bg-[#0B1735] text-[#FFB91F] border border-[#FFB91F]/30 shadow-md flex flex-col items-center justify-center shrink-0 gap-0.5">
                  <span className="material-symbols-outlined text-base text-[#D4A33F]">
                    {tier.icon}
                  </span>
                  <span className="font-display text-sm sm:text-base font-bold leading-none">
                    {tier.number}
                  </span>
                  <span className="w-3.5 h-[1.5px] bg-[#FFB91F] rounded-full opacity-80" />
                </div>

                {/* Content: Title, Description & Core Message */}
                <div className="flex-1 min-w-0 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.625rem] font-mono font-bold text-[#8C6D23] uppercase tracking-wider">
                      {tier.badge}
                    </span>
                  </div>
                  <h3 className="font-headline font-bold text-sm sm:text-[0.9375rem] lg:text-base text-[#0B1735] leading-snug">
                    {tier.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-[0.8125rem] text-slate-600 leading-relaxed">
                    {tier.description}
                  </p>
                  <div className="pt-1 flex items-center gap-1.5 text-[0.6875rem] font-headline font-bold text-[#8C6D23]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4A33F]" />
                    <span>{tier.coreMessage}</span>
                  </div>
                </div>

                {/* Right Arrow Button Circle */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FCF9F1] group-hover:bg-[#0B1735] border border-[#C69A48]/50 group-hover:border-[#0B1735] text-[#0B1735] group-hover:text-[#FFB91F] transition-all duration-200 flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-0.5 self-center">
                  <span className="material-symbols-outlined text-base sm:text-lg">
                    arrow_forward
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* 6. CENTERED CTA: Explore Our Methodology */}
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => onOpenEnquiry && onOpenEnquiry('Pedagogy & Methodology Syllabus')}
            className="group h-11 sm:h-12 px-7 sm:px-8 rounded-full bg-[#0B1735] hover:bg-[#12234f] text-[#FFE8A3] hover:text-white font-headline font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 border border-[#C69A48]/70 hover:border-[#FFB91F] shadow-[0_4px_16px_rgba(11,23,53,0.35)] hover:shadow-[0_6px_22px_rgba(198,154,72,0.3)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Explore Our Methodology</span>
            <span className="material-symbols-outlined text-base sm:text-lg text-[#FFB91F] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
