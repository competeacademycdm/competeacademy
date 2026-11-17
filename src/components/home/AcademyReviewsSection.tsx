'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/i18n';

interface ReviewItem {
  id: string;
  quote: string;
  reviewer: string;
  role: 'Student' | 'Parent';
  program: string;
  avatarUrl: string;
  avatarAlt: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    quote:
      'The academy has provided excellent guidance and a structured learning environment. The faculty are supportive and encourage students to achieve their best.',
    reviewer: 'Priya Sharma',
    role: 'Parent',
    program: 'JEE Program',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPPNGT3DS2uBijW7eaRznwne8EyOM2EgKSYoJ6J6Uqz3ipytFp2UOOLIafWVG2xfUXxMnmYTYVPWevx5xOw-T3FEjFckuhSkqOneuc2z855fsZhY9xJxRk25df8zA51kZlrzl7uWe5b3inAdDKEUvqVF90u8W9mqQeH5f8Zax-PiPLvuKic1cUOMfejxDIkqz6lJW5K0sdfU-BSJZYpyK0OqX7dYZFJbxFisdvie8',
    avatarAlt: 'Portrait of Priya Sharma, parent of JEE student',
  },
  {
    id: 'rev-2',
    quote:
      'The faculty explain difficult concepts clearly. The study materials and regular guidance have helped me improve my understanding and confidence.',
    reviewer: 'Arjun Kumar',
    role: 'Student',
    program: 'NEET Program',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0BOGYywc-Ae8wf3yEB7GfZ1u_Y2Xzxn5zZQ49DxNJaIsB9uFdY_s1WUeCmSoR3uW5EXWkZ9TsaOn1bFmXgMQtCUCDEoKLjQMGYYOpDUkqTDXmRXfLMo-6Jl0qjuem_ASXUjJecWeS-QuvuKAVh2msv21C-AvTfWc6o1M8QgpYSJoqHZuQcroVgWuJCVtuwRjs-YaNA41JPF8sLixcz0sW2DB71KqbwdLjYEtmLYI',
    avatarAlt: 'Portrait of Arjun Kumar, NEET scholar',
  },
  {
    id: 'rev-3',
    quote:
      'A wonderful learning environment with dedicated teachers. The personal attention and academic support have made a positive difference.',
    reviewer: 'Ramesh Babu',
    role: 'Parent',
    program: 'JEE Program',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDtp26TeMCgre9DoOflIzwDkSMk83qVBDLPSpWCv_pJP8dhPH0fp1DMRkQy6wYGm9tOXH3-g8PWT_pAr77UdgXI57VgFhfQlZGRdw3OauawDFDnX4H7uO9E7Xz2UirnWqvULl2HZMqP6lJfsS7rUn-fVDe_2ODgBEqMS93RnCUiszSosOnex88_t9UEVUzMHu0cRFal707C48RZ90qimsdWSPj4PrfseBysHD_Khp0',
    avatarAlt: 'Portrait of Ramesh Babu, parent of JEE student',
  },
];

export function AcademyReviewsSection() {
  const { tr, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(1); // Start with center card (Arjun Kumar)
  const [isPaused, setIsPaused] = useState(false);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingFromDot = useRef(false);

  const reviews = REVIEWS.map((rev, index) => {
    const loc = tr.homepage.reviews.items[index];
    return {
      ...rev,
      quote: loc ? loc.quote : rev.quote,
      reviewer: loc ? loc.reviewer : rev.reviewer,
      role: loc ? (loc.role as 'Student' | 'Parent') : rev.role,
      program: loc ? loc.program : rev.program,
    };
  });

  const prevReview = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  }, [reviews.length]);

  const nextReview = useCallback(() => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  }, [reviews.length]);

  // Sync mobile scroll container when activeIndex changes from dot or arrow
  useEffect(() => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const card = container.children[activeIndex] as HTMLElement;
    if (card && isScrollingFromDot.current) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      isScrollingFromDot.current = false;
    }
  }, [activeIndex]);

  // Handle mobile scroll snap update for pagination dots
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current || isScrollingFromDot.current) return;
    const container = mobileScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0]?.clientWidth || 300;
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < REVIEWS.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const selectIndex = (index: number) => {
    isScrollingFromDot.current = true;
    setActiveIndex(index);
    if (mobileScrollRef.current) {
      const card = mobileScrollRef.current.children[index] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  // 5-second desktop auto-rotation (paused on hover or when prefers-reduced-motion is enabled)
  useEffect(() => {
    if (isPaused) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const timer = setInterval(() => {
      nextReview();
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, nextReview]);

  return (
    <section
      className="relative w-full bg-[#071126] text-white py-12 sm:py-16 lg:py-20 overflow-hidden border-b border-[#C69A48]/25"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Student and Parent Testimonials"
    >
      {/* 2. AUTHENTIC CAMPUS BACKGROUND IMAGE (Full-bleed, 82% Deep Navy Overlay, Gradient Layering) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYbq9gCUvAcgiKFOF4nkTcSjIffeqApk1AKgM9Nxo-Z3vo4wq2RK5FBkQX6e881LJpQfQiV2JiSRKNNltXW3omPpPuCRVUmT2dQ7X32CdrUm_FoiYVXeFPR6tWYvgrESzFt2oQuk0FD0n351KOAXIvO6TeCx9cTqp062Z_twIHNO-OC9HaPdInRlaenoXh_FlHW0k76qt1DF9dK_MJtR3P09XFn1jq94DhrzDpqn0"
          alt="Compete Academy campus classroom academic environment"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Navy Overlay (78–84% depth) */}
        <div className="absolute inset-0 bg-[#071126]/82" />
        {/* Subtle Radial & Linear Gradients for Cinematic Richness */}
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-[#071126]/60 to-[#071126]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071126] via-transparent to-[#071126]/90" />
      </div>

      {/* Decorative Gold Corner Accents */}
      <div className="absolute top-3 left-3 sm:top-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#FFB91F]/40 pointer-events-none" />
      <div className="absolute top-3 right-3 sm:top-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#FFB91F]/40 pointer-events-none" />
      <div className="absolute bottom-3 left-3 sm:bottom-8 sm:left-8 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#FFB91F]/40 pointer-events-none" />
      <div className="absolute bottom-3 right-3 sm:bottom-8 sm:right-8 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#FFB91F]/40 pointer-events-none" />

      {/* Container Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col items-center gap-6 sm:gap-8 lg:gap-10">
        
        {/* 3. SECTION HEADER (Compacted for mobile, spacious on desktop) */}
        <div className="flex flex-col items-center text-center max-w-3xl gap-2.5 sm:gap-3.5">
          {/* Small Badge with Horizontal Gold Flanking Lines */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#FFB91F]" />
            <span className="font-headline text-[0.625rem] sm:text-xs font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#FFB91F] px-2.5 py-1 rounded-full bg-[#FFB91F]/10 border border-[#FFB91F]/30">
              ★ {tr.homepage.reviews.badge}
            </span>
            <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#FFB91F]" />
          </div>

          {/* Main Heading with Gold Gradient Accent */}
          <h2 className="font-display text-xl sm:text-3xl lg:text-[2.65rem] font-bold text-white tracking-tight leading-[1.18]">
            {language === 'TA' ? (
              <span>மாணவர்கள் & பெற்றோர்களின் <span className="bg-gradient-to-r from-[#FFB91F] via-[#FFE299] to-[#FFB91F] bg-clip-text text-transparent">கருத்துகள்</span></span>
            ) : (
              <span>
                What They Say About{' '}
                <span className="bg-gradient-to-r from-[#FFB91F] via-[#FFE299] to-[#FFB91F] bg-clip-text text-transparent">
                  Compete Academy
                </span>
              </span>
            )}
          </h2>

          {/* Subtitle */}
          <p className="font-sans text-xs sm:text-sm lg:text-[0.9375rem] text-slate-300 max-w-[62ch] leading-relaxed">
            {tr.homepage.reviews.subtitle}
          </p>

          {/* Graduation Cap Divider */}
          <div className="flex items-center gap-3 pt-0.5 sm:pt-1 text-[#FFB91F]">
            <span className="w-8 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-[#FFB91F]/60" />
            <span className="material-symbols-outlined text-base sm:text-lg">school</span>
            <span className="w-8 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-[#FFB91F]/60" />
          </div>
        </div>

        {/* 4 & 5. REVIEW CARDS AREA */}
        
        {/* DESKTOP VIEW: Existing 3-card horizontal layout with center prominence & arrows */}
        <div className="relative w-full hidden md:flex items-center justify-center">
          {/* Navigation Arrow — Left */}
          <button
            type="button"
            onClick={prevReview}
            aria-label="Previous review"
            className="absolute left-0 sm:left-2 lg:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#071126]/80 hover:bg-[#FFB91F] text-[#FFB91F] hover:text-[#071126] border border-[#FFB91F]/60 hover:border-[#FFB91F] transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FFB91F]"
          >
            <span className="material-symbols-outlined text-xl sm:text-2xl">chevron_left</span>
          </button>

          {/* Desktop 3-Card Grid */}
          <div className="w-full max-w-[1200px] px-8 sm:px-12 grid grid-cols-3 gap-5 lg:gap-7 items-center transition-all duration-300">
            {reviews.map((rev, index) => {
              const isCenter = index === activeIndex;

              return (
                <div
                  key={rev.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative p-6 sm:p-7 rounded-[20px] transition-all duration-300 flex flex-col justify-between gap-6 cursor-pointer select-none backdrop-blur-[12px] bg-[rgba(11,23,53,0.72)] ${
                    isCenter
                      ? 'border-2 border-[#FFB91F] shadow-[0_12px_36px_rgba(255,185,31,0.28),0_4px_20px_rgba(0,0,0,0.5)] scale-105 z-10'
                      : 'border border-[rgba(255,185,31,0.45)] shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:border-[#FFB91F] hover:shadow-[0_10px_28px_rgba(255,185,31,0.18)]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-4 right-5 font-serif text-5xl sm:text-6xl text-[rgba(255,185,31,0.45)] select-none pointer-events-none leading-none"
                  >
                    &ldquo;
                  </span>

                  <div className="flex items-center gap-1 text-[#FFB91F]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-lg sm:text-xl fill-1">
                        star
                      </span>
                    ))}
                  </div>

                  <p className="font-sans text-sm sm:text-base font-normal sm:font-medium text-white leading-[1.7] min-h-[5.5rem] italic">
                    &ldquo;{rev.quote}&rdquo;
                  </p>

                  <div className="flex items-center gap-3.5 pt-4 border-t border-white/15">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#FFB91F] shrink-0 shadow-sm">
                      <Image
                        src={rev.avatarUrl}
                        alt={rev.avatarAlt}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h3 className="font-headline font-bold text-base sm:text-lg text-white leading-tight truncate">
                        {rev.reviewer}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium mt-0.5">
                        <span className="text-[#E2E8F0]">{rev.role}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-[#FFB91F] font-semibold truncate">{rev.program}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrow — Right */}
          <button
            type="button"
            onClick={nextReview}
            aria-label="Next review"
            className="absolute right-0 sm:right-2 lg:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#071126]/80 hover:bg-[#FFB91F] text-[#FFB91F] hover:text-[#071126] border border-[#FFB91F]/60 hover:border-[#FFB91F] transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#FFB91F]"
          >
            <span className="material-symbols-outlined text-xl sm:text-2xl">chevron_right</span>
          </button>
        </div>

        {/* MOBILE VIEW: Horizontal Swipeable Snap Carousel */}
        <div className="w-full md:hidden">
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="w-full flex flex-row overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-3.5 px-4 pb-2"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {reviews.map((rev, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={rev.id}
                  onClick={() => selectIndex(index)}
                  className={`relative shrink-0 w-[88vw] max-w-[360px] snap-center p-5 rounded-[18px] flex flex-col justify-between gap-4 select-none backdrop-blur-[12px] bg-[rgba(11,23,53,0.78)] transition-all duration-200 min-h-[250px] max-h-[300px] ${
                    isActive
                      ? 'border-2 border-[#FFB91F] shadow-[0_8px_24px_rgba(255,185,31,0.22)]'
                      : 'border border-[rgba(255,185,31,0.35)] shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  {/* Subtle Quotation Watermark */}
                  <span
                    aria-hidden="true"
                    className="absolute top-3.5 right-4 font-serif text-4xl text-[rgba(255,185,31,0.35)] select-none pointer-events-none leading-none"
                  >
                    &ldquo;
                  </span>

                  {/* 5 Stars */}
                  <div className="flex items-center gap-0.5 text-[#FFB91F]">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-base fill-1">
                        star
                      </span>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="font-sans text-xs sm:text-sm font-normal text-white leading-[1.65] italic line-clamp-4">
                    &ldquo;{rev.quote}&rdquo;
                  </p>

                  {/* Reviewer Details */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/15 mt-auto">
                    <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#FFB91F] shrink-0 shadow-xs">
                      <Image
                        src={rev.avatarUrl}
                        alt={rev.avatarAlt}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h3 className="font-headline font-bold text-sm text-white leading-tight truncate">
                        {rev.reviewer}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs font-medium mt-0.5">
                        <span className="text-[#E2E8F0]">{rev.role}</span>
                        <span className="text-white/40">•</span>
                        <span className="text-[#FFB91F] font-semibold truncate">{rev.program}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gold Pagination Dots (Synchronized across mobile & desktop) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {reviews.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => selectIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-200 focus:outline-none cursor-pointer ${
                activeIndex === i ? 'w-6 sm:w-8 bg-[#FFB91F]' : 'w-2 sm:w-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* 6. TRUST STATISTICS BAR */}
        <div className="w-full max-w-[1100px] bg-[#071126]/75 backdrop-blur-md rounded-2xl border border-[#FFB91F]/30 p-4 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.35)] mt-1 sm:mt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-0 md:divide-x md:divide-[#FFB91F]/20 text-center">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 px-2 sm:px-3">
              <span className="material-symbols-outlined text-xl sm:text-3xl text-[#FFB91F]">
                emoji_events
              </span>
              <span className="font-display text-base sm:text-xl font-bold text-white tracking-tight">
                98.4%
              </span>
              <span className="font-headline text-[0.625rem] sm:text-xs text-slate-300 font-medium uppercase tracking-wider">
                {language === 'TA' ? 'மாணவர் திருப்தி விகிதம்' : 'Student Satisfaction'}
              </span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 px-2 sm:px-3">
              <span className="material-symbols-outlined text-xl sm:text-3xl text-[#FFB91F]">
                groups
              </span>
              <span className="font-display text-base sm:text-xl font-bold text-white tracking-tight">
                18,500+
              </span>
              <span className="font-headline text-[0.625rem] sm:text-xs text-slate-300 font-medium uppercase tracking-wider">
                {language === 'TA' ? 'வெற்றி பெற்ற மாணவர்கள்' : 'Happy Students'}
              </span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 px-2 sm:px-3">
              <span className="material-symbols-outlined text-xl sm:text-3xl text-[#FFB91F]">
                trending_up
              </span>
              <span className="font-display text-base sm:text-xl font-bold text-white tracking-tight">
                95%+
              </span>
              <span className="font-headline text-[0.625rem] sm:text-xs text-slate-300 font-medium uppercase tracking-wider">
                {language === 'TA' ? 'கல்வித் தேர்ச்சி விகிதம்' : 'Academic Success Rate'}
              </span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center gap-1 sm:gap-1.5 px-2 sm:px-3">
              <span className="material-symbols-outlined text-xl sm:text-3xl text-[#FFB91F]">
                star
              </span>
              <span className="font-display text-base sm:text-xl font-bold text-white tracking-tight">
                4.9 / 5.0
              </span>
              <span className="font-headline text-[0.625rem] sm:text-xs text-slate-300 font-medium uppercase tracking-wider">
                {language === 'TA' ? 'பெற்றோர் மதிப்பீடு' : 'Parent Rating'}
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
