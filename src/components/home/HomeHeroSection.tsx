'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function HomeHeroSection() {
  return (
    <section
      aria-label="Compete Academy — Excellence Through Understanding"
      className="relative w-full bg-[#070D1E] text-white overflow-hidden border-b border-[#D4A33F]/30 flex flex-col justify-between min-h-[calc(100svh-var(--header-total-height)-4rem)] lg:min-h-[calc(100dvh-var(--header-total-height))] lg:h-[calc(100dvh-var(--header-total-height))]"
    >
      {/* Full-Bleed Sharp Classroom Background Photograph — Zero Blur, Natural Lighting */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <Image
          src="/images/compete-academy-classroom-session.jpg"
          alt="Compete Academy faculty mentor teaching students in an interactive classroom session"
          fill
          priority
          quality={95}
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[18%_38%] sm:object-[25%_40%] lg:object-[center_42%] brightness-[1.04] contrast-[1.06] saturate-[1.05]"
        />

        {/* Controlled, Subtle Dark Navy Overlay — Keeps Staff Member & All Four Corners Clearly Visible */}
        <div className="absolute inset-0 bg-[#070D1E]/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070D1E]/50 via-[#070D1E]/30 to-[#070D1E]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D1E]/70 via-[#070D1E]/15 via-25% to-transparent" />
      </div>

      {/* Hero Foreground Content — Left-Aligned Editorial Composition Directly Over Sharp Photograph */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-6 pb-4 sm:pt-8 sm:pb-5 lg:pt-10 lg:pb-6 xl:pt-12 xl:pb-7 flex-1 flex flex-col justify-between">
        <div className="my-auto w-full max-w-2xl lg:max-w-3xl flex flex-col items-start text-left gap-3.5 sm:gap-4 lg:gap-5 py-2 sm:py-4">
          {/* Eyebrow */}
          <div className="hero-stagger-1 inline-flex items-center gap-2.5 sm:gap-3">
            <span className="w-6 sm:w-9 h-[2px] bg-[#D4A33F] shrink-0 shadow-[0_1px_4px_rgba(0,0,0,0.6)]" />
            <span className="font-headline font-bold text-[0.65rem] xs:text-[0.6875rem] sm:text-xs text-[#F5CD6B] tracking-[0.14em] sm:tracking-[0.2em] uppercase [text-shadow:0_2px_8px_rgba(7,13,30,0.95)]">
              COMPETE ACADEMY &nbsp;|&nbsp; EXCELLENCE THROUGH UNDERSTANDING
            </span>
          </div>

          {/* Main Headline */}
          <div className="hero-stagger-2 flex flex-col gap-3 sm:gap-4">
            <h1 className="font-display text-[1.75rem] xs:text-[2.2rem] sm:text-[2.85rem] lg:text-[3.25rem] xl:text-[3.65rem] font-bold tracking-[-0.02em] uppercase leading-[1.06] [text-shadow:0_3px_14px_rgba(7,13,30,0.9),0_1px_3px_rgba(0,0,0,0.95)]">
              <span className="block text-[#FFFFFF]">DREAM BIG.</span>
              <span className="block text-[#FFFFFF]">PREPARE SMART.</span>
              <span className="block text-[#F2C357]">BECOME EXTRAORDINARY.</span>
            </h1>

            {/* Supporting Text */}
            <p className="font-sans text-[0.875rem] sm:text-[0.975rem] lg:text-[1.0625rem] text-white/95 font-medium leading-[1.65] max-w-[52ch] [text-shadow:0_2px_10px_rgba(7,13,30,0.95),0_1px_3px_rgba(0,0,0,0.9)]">
              A seat is just the beginning. We build the knowledge, discipline and confidence that shape tomorrow&apos;s doctors, engineers and leaders.
            </p>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="hero-stagger-3 pt-1 flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 sm:gap-4 w-full xs:w-auto">
            <Link
              href="/neet"
              className="group inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-[#C69A48] hover:bg-[#d6aa56] text-[#070D1E] font-headline text-xs sm:text-sm font-extrabold tracking-wide shadow-[0_6px_22px_rgba(7,13,30,0.45)] hover:shadow-[0_8px_26px_rgba(198,154,72,0.5)] hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
            >
              <span>Explore Our Programmes</span>
              <span className="material-symbols-outlined text-base transition-transform duration-200 group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </Link>

            <Link
              href="/about"
              className="group inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-[#070D1E]/65 hover:bg-[#070D1E]/85 text-white border border-white/70 hover:border-[#D4A33F] font-headline text-xs sm:text-sm font-bold tracking-wide shadow-[0_4px_16px_rgba(7,13,30,0.4)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="material-symbols-outlined text-base text-[#F2C357] transition-transform duration-200 group-hover:scale-105">
                account_balance
              </span>
              <span>Discover Our Academy</span>
            </Link>
          </div>
        </div>

        {/* Bottom Institutional Trust Indicators */}
        <div className="w-full border-t border-[#D4A33F]/40 pt-3.5 sm:pt-4 mt-auto pr-0 lg:pr-56 xl:pr-64">
          <div className="hero-stagger-4 flex flex-wrap lg:flex-nowrap items-center justify-start lg:justify-between gap-x-4 xl:gap-x-6 gap-y-2.5 text-[0.6875rem] sm:text-xs font-semibold [text-shadow:0_2px_8px_rgba(7,13,30,0.95)]">
            <div className="flex items-center gap-2 shrink-0">
              <span className="material-symbols-outlined text-[#F2C357] text-base sm:text-lg shrink-0">
                workspace_premium
              </span>
              <span className="text-[#FCF9F1] tracking-wide">
                15 YEARS OF PROFESSIONAL EXPERIENCE
              </span>
            </div>

            <span className="hidden lg:inline text-[#D4A33F]/60 font-light select-none">|</span>

            <div className="flex items-center gap-2 shrink-0">
              <span className="material-symbols-outlined text-[#F2C357] text-base sm:text-lg shrink-0">
                location_on
              </span>
              <span className="text-[#FCF9F1] tracking-wide">
                CHIDAMBARAM&apos;S EDUCATIONAL HOTSPOT
              </span>
            </div>

            <span className="hidden lg:inline text-[#D4A33F]/60 font-light select-none">|</span>

            <div className="flex items-center gap-2 shrink-0">
              <span className="material-symbols-outlined text-[#F2C357] text-base sm:text-lg shrink-0">
                school
              </span>
              <span className="text-[#FCF9F1] tracking-wide">
                REAL-TIME, HANDS-ON EXPERIENCE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
