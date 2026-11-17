'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { useLanguage } from '@/i18n';

const StudentPortalModal = dynamic(
  () => import('@/components/shared/StudentPortalModal').then((mod) => mod.StudentPortalModal),
  { ssr: false }
);

const AdmissionEnquiryModal = dynamic(
  () => import('@/components/shared/AdmissionEnquiryModal').then((mod) => mod.AdmissionEnquiryModal),
  { ssr: false }
);

export interface ProgrammeDestination {
  code: string;
  label: string;
  tamilLabel: string;
  href: string;
  icon: string;
  tagline: string;
  tamilTagline: string;
  badge: string;
  accent: string;
}

export const PROGRAMME_DESTINATIONS: ProgrammeDestination[] = [
  {
    code: 'neet',
    label: 'NEET',
    tamilLabel: 'நீட் (NEET)',
    href: '/neet',
    icon: 'medical_services',
    tagline: 'Your White Coat Awaits. · We pave the way.',
    tamilTagline: 'உங்கள் மருத்துவர் கனவு காத்திருக்கிறது · நாங்கள் வழிகாட்டுகிறோம்',
    badge: 'Medical',
    accent: '#0284C7',
  },
  {
    code: 'jee',
    label: 'JEE',
    tamilLabel: 'ஜே.இ.இ (JEE)',
    href: '/jee',
    icon: 'architecture',
    tagline: 'Your Engineering Future Awaits. · We pave the way.',
    tamilTagline: 'உங்கள் பொறியியல் எதிர்காலம் காத்திருக்கிறது · நாங்கள் வழிகாட்டுகிறோம்',
    badge: 'Engineering',
    accent: '#2563EB',
  },
  {
    code: 'upsc',
    label: 'UPSC',
    tamilLabel: 'யு.பி.எஸ்.சி (UPSC)',
    href: '/upsc',
    icon: 'military_tech',
    tagline: 'Your Nation Needs Your Leadership. · We pave the way.',
    tamilTagline: 'தேசத்திற்கு உங்கள் தலைமை தேவை · நாங்கள் வழிகாட்டுகிறோம்',
    badge: 'Civil Services',
    accent: '#D97706',
  },
  {
    code: 'foundation',
    label: 'Foundation Classes',
    tamilLabel: 'அடிப்படைக் கல்வி (Foundation)',
    href: '/foundation',
    icon: 'school',
    tagline: 'Great Futures Begin with Strong Foundations. · We pave the way.',
    tamilTagline: 'வலுவான அடித்தளமே சிறந்த எதிர்காலத்தின் தொடக்கம் · நாங்கள் வழிகாட்டுகிறோம்',
    badge: 'Classes 6–12',
    accent: '#059669',
  },
  {
    code: 'tnpsc',
    label: 'TNPSC',
    tamilLabel: 'டி.என்.பி.எஸ்.சி (TNPSC)',
    href: '/tnpsc',
    icon: 'account_balance',
    tagline: 'Your Public Service Journey Awaits. · We pave the way.',
    tamilTagline: 'உங்கள் பொதுப்பணிப் பயணம் காத்திருக்கிறது · நாங்கள் வழிகாட்டுகிறோம்',
    badge: 'TN Services',
    accent: '#7C3AED',
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [langToast, setLangToast] = useState(false);
  const [programmesOpen, setProgrammesOpen] = useState(false);
  const [mobileProgrammesExpanded, setMobileProgrammesExpanded] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isProgrammesActive = PROGRAMME_DESTINATIONS.some((p) =>
    pathname.startsWith(p.href)
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProgrammesOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProgrammesOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    };
  }, []);

  useEffect(() => {
    setProgrammesOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setProgrammesOpen(true);
  };

  const handleMouseLeave = () => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    dropdownTimerRef.current = setTimeout(() => {
      setProgrammesOpen(false);
    }, 180);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex flex-col w-full">

        {/* 1. TOP UTILITY INFORMATION BAR */}
        <div className="w-full bg-[#0a1026] text-slate-300 text-[0.6875rem] py-1 border-b border-slate-800/80">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-4">

            <div className="flex items-center gap-3.5 sm:gap-5">
              <a
                href="tel:+919476543210"
                className="flex items-center gap-1.5 hover:text-[#F2C66D] transition-colors"
                title="Compete Academy Helpline"
              >
                <span className="material-symbols-outlined text-[0.875rem] text-[#D6A23A]">
                  call
                </span>
                <span className="font-medium tracking-wide">+91 94765 43210</span>
              </a>

              <span className="hidden sm:inline-block text-slate-700">|</span>

              <a
                href="mailto:info@competeacademy.in"
                className="hidden sm:flex items-center gap-1.5 hover:text-[#F2C66D] transition-colors"
                title="Admissions Email"
              >
                <span className="material-symbols-outlined text-[0.875rem] text-[#D6A23A]">
                  mail
                </span>
                <span className="font-medium">info@competeacademy.in</span>
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-right">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-semibold text-slate-200">
                  {language === 'TA' ? 'புதிய சேர்க்கை நடைபெறுகிறது' : 'Academic Admissions Open'}
                </span>
                <span className="hidden md:inline text-slate-400">
                  {language === 'TA' ? '• அண்ணா சாலை, கிண்டி, சென்னை' : '• Anna Salai, Guindy, Chennai'}
                </span>
              </div>

              <span className="hidden lg:inline text-slate-700">|</span>

              <span className="hidden lg:inline text-slate-400 font-medium">
                {language === 'TA' ? 'திங்கள் – சனி: காலை 8:00 – மாலை 7:30' : 'Mon – Sat: 8:00 AM – 7:30 PM'}
              </span>
            </div>
          </div>
        </div>

        {/* 2. MAIN NAVIGATION */}
        <div className="w-full bg-[#101B35]/95 backdrop-blur-md border-b border-[#D6A23A]/25 shadow-[0_1px_8px_rgba(16,27,61,0.15)]">
          <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 lg:px-6 xl:px-10 h-14 sm:h-16 flex items-center justify-between gap-2 md:gap-4">

            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A23A] rounded"
            >
              <BrandLogo size="lg" theme="dark" />
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2">

              {/* HOME */}
              <Link
                href="/"
                className={`relative px-2.5 xl:px-3 py-1.5 font-headline text-xs xl:text-[0.8125rem] transition-all duration-200 tracking-wide flex items-center gap-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A23A] group ${
                  pathname === '/'
                    ? 'text-[#101B35] font-bold bg-[#D6A23A]'
                    : 'text-[#D6A23A] hover:text-[#F2C66D] font-semibold hover:bg-white/10'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[1rem] transition-colors ${
                    pathname === '/'
                      ? 'text-[#101B35]'
                      : 'text-[#D6A23A] group-hover:text-[#F2C66D]'
                  }`}
                >
                  home
                </span>

                <span className={language === 'TA' ? 'font-tamil' : ''}>
                  {language === 'TA' ? 'முகப்பு' : 'Home'}
                </span>

                {pathname === '/' && (
                  <span className="absolute -bottom-[9px] sm:-bottom-[11px] left-3 right-3 h-[2px] bg-[#D6A23A] rounded-full" />
                )}
              </Link>

              {/* PROGRAMMES DROPDOWN */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => setProgrammesOpen((prev) => !prev)}
                  aria-expanded={programmesOpen}
                  aria-haspopup="true"
                  className={`relative px-3 py-1.5 font-headline text-xs xl:text-[0.8125rem] transition-all duration-200 tracking-wide flex items-center gap-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A23A] cursor-pointer group ${
                    isProgrammesActive || programmesOpen
                      ? 'text-[#101B35] font-bold bg-[#D6A23A]'
                      : 'text-[#D6A23A] hover:text-[#F2C66D] font-semibold hover:bg-white/10'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[1rem] transition-colors ${
                      isProgrammesActive || programmesOpen
                        ? 'text-[#101B35]'
                        : 'text-[#D6A23A] group-hover:text-[#F2C66D]'
                    }`}
                  >
                    school
                  </span>

                  <span className={language === 'TA' ? 'font-tamil' : ''}>
                    {language === 'TA' ? 'பாடத்திட்டங்கள்' : 'Programmes'}
                  </span>

                  <span
                    className={`material-symbols-outlined text-[1.125rem] transition-transform duration-200 ${
                      isProgrammesActive || programmesOpen
                        ? 'text-[#101B35]'
                        : 'text-[#D6A23A]'
                    } ${programmesOpen ? 'rotate-180' : ''}`}
                  >
                    arrow_drop_down
                  </span>

                  {isProgrammesActive && (
                    <span className="absolute -bottom-[9px] sm:-bottom-[11px] left-3 right-3 h-[2px] bg-[#D6A23A] rounded-full" />
                  )}
                </button>

                {/* PROGRAMMES DROPDOWN MENU */}
                {programmesOpen && (
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    className="absolute top-full left-0 mt-2 w-[22rem] bg-[#101B35]/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(7,14,30,0.45)] border border-[#D4A33F]/30 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-3 pt-2 pb-2 border-b border-[#D4A33F]/20 mb-1.5 flex items-center justify-between">
                      <span className="font-mono text-[0.6875rem] text-[#D4A33F] uppercase tracking-wider font-bold">
                        {language === 'TA' ? 'தேர்வுப் பிரிவுகள்' : 'Academic Disciplines'}
                      </span>

                      <span className="text-[0.625rem] text-[#F5EBD5]/80 font-mono font-medium px-2 py-0.5 rounded-full bg-[#D4A33F]/15 border border-[#D4A33F]/30">
                        5 Active Tracks
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      {PROGRAMME_DESTINATIONS.map((dest) => {
                        const isCurrent = pathname.startsWith(dest.href);

                        return (
                          <Link
                            key={dest.href}
                            href={dest.href}
                            role="menuitem"
                            onClick={() => setProgrammesOpen(false)}
                            className={`group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-150 ${
                              isCurrent
                                ? 'bg-[#D4A33F]/20 border border-[#D4A33F]/50 shadow-sm'
                                : 'hover:bg-white/[0.08] hover:border-[#D4A33F]/30 border border-transparent'
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-150 ${
                                isCurrent
                                  ? 'bg-[#E0B44F] text-[#071126] shadow-sm'
                                  : 'bg-white/10 text-[#D4A33F] group-hover:bg-[#E0B44F] group-hover:text-[#071126]'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[1.125rem]">
                                {dest.icon}
                              </span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1.5">
                                <span
                                  className={`font-headline text-xs font-bold leading-tight truncate transition-colors ${
                                    isCurrent
                                      ? 'text-[#E0B44F]'
                                      : 'text-[#D4A33F] group-hover:text-[#E0B44F]'
                                  } ${language === 'TA' ? 'font-tamil' : ''}`}
                                >
                                  {language === 'TA' ? dest.tamilLabel : dest.label}
                                </span>

                                <span
                                  className={`shrink-0 text-[0.5625rem] px-2 py-0.5 rounded-full font-mono font-semibold transition-colors ${
                                    isCurrent
                                      ? 'bg-[#E0B44F] text-[#071126]'
                                      : 'bg-white/10 text-[#F5EBD5] border border-[#D4A33F]/25 group-hover:border-[#D4A33F]/60'
                                  }`}
                                >
                                  {dest.badge}
                                </span>
                              </div>

                              <p className="font-sans text-[0.6875rem] text-[#F5EBD5] leading-snug line-clamp-1 mt-1 opacity-90 group-hover:opacity-100">
                                {language === 'TA' ? dest.tamilTagline : dest.tagline}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* OUR RESOURCES */}
              <Link
                href="/resources"
                className={`relative px-3 py-1.5 font-headline text-xs xl:text-[0.8125rem] transition-all duration-200 tracking-wide flex items-center gap-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A23A] group whitespace-nowrap ${
                  pathname.startsWith('/resources')
                    ? 'text-[#101B35] font-bold bg-[#D6A23A]'
                    : 'text-[#D6A23A] hover:text-[#F2C66D] font-semibold hover:bg-white/10'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[0.9375rem] transition-colors ${
                    pathname.startsWith('/resources')
                      ? 'text-[#101B35]'
                      : 'text-[#D6A23A] group-hover:text-[#F2C66D]'
                  }`}
                >
                  folder_open
                </span>

                <span className={language === 'TA' ? 'font-tamil' : ''}>
                  {language === 'TA' ? 'பாட வளங்கள்' : 'Our Resources'}
                </span>

                {pathname.startsWith('/resources') && (
                  <span className="absolute -bottom-[9px] sm:-bottom-[11px] left-3 right-3 h-[2px] bg-[#D6A23A] rounded-full" />
                )}
              </Link>

              {/* ABOUT US */}
              <Link
                href="/about"
                className={`relative px-3 py-1.5 font-headline text-xs xl:text-[0.8125rem] transition-all duration-200 tracking-wide flex items-center gap-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6A23A] group whitespace-nowrap ${
                  pathname.startsWith('/about')
                    ? 'text-[#101B35] font-bold bg-[#D6A23A]'
                    : 'text-[#D6A23A] hover:text-[#F2C66D] font-semibold hover:bg-white/10'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[0.9375rem] transition-colors ${
                    pathname.startsWith('/about')
                      ? 'text-[#101B35]'
                      : 'text-[#D6A23A] group-hover:text-[#F2C66D]'
                  }`}
                >
                  account_balance
                </span>

                <span className={language === 'TA' ? 'font-tamil' : ''}>
                  {language === 'TA' ? 'எங்களைப் பற்றி' : 'About Us'}
                </span>

                {pathname.startsWith('/about') && (
                  <span className="absolute -bottom-[9px] sm:-bottom-[11px] left-3 right-3 h-[2px] bg-[#D6A23A] rounded-full" />
                )}
              </Link>
            </nav>

            {/* RIGHT SIDE ACTIONS */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">

              {/* UPGRADED BILINGUAL LANGUAGE SWITCHER */}
              <div
                className="flex items-center rounded-md bg-[#0a1026] border border-[#D6A23A]/50 p-0.5 shadow-sm"
                role="group"
                aria-label="Language selection"
              >
                <button
                  type="button"
                  onClick={() => {
                    if (language !== 'EN') {
                      setLanguage('EN');
                      setLangToast(true);
                      setTimeout(() => setLangToast(false), 2000);
                    }
                  }}
                  aria-pressed={language === 'EN'}
                  className={`h-7 sm:h-8 px-2 sm:px-2.5 flex items-center justify-center rounded text-[0.6875rem] sm:text-xs font-headline font-bold tracking-wide transition-all cursor-pointer ${
                    language === 'EN'
                      ? 'bg-[#D6A23A] text-[#101B35] shadow-xs'
                      : 'text-slate-300 hover:text-[#F2C66D] hover:bg-white/10'
                  }`}
                  title="English interface"
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (language !== 'TA') {
                      setLanguage('TA');
                      setLangToast(true);
                      setTimeout(() => setLangToast(false), 2000);
                    }
                  }}
                  aria-pressed={language === 'TA'}
                  className={`h-7 sm:h-8 px-2 sm:px-2.5 flex items-center justify-center rounded text-[0.6875rem] sm:text-xs font-tamil font-bold tracking-wide transition-all cursor-pointer ${
                    language === 'TA'
                      ? 'bg-[#D6A23A] text-[#101B35] shadow-xs'
                      : 'text-slate-300 hover:text-[#F2C66D] hover:bg-white/10'
                  }`}
                  title="தமிழ் இடைமுகம் (Tamil interface)"
                >
                  தமிழ்
                </button>
              </div>

              {/* ADMIN BUTTON */}
              <Link
                href="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 h-8 sm:h-9 px-3.5 sm:px-4 rounded-md bg-[#FFB91F] hover:bg-[#e6a517] text-[#071126] font-headline text-xs font-bold tracking-wide transition-all duration-200 shadow-sm active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#071126]"
                title="Compete Academy Admin Console"
              >
                <span className="material-symbols-outlined text-[0.9375rem] font-bold text-[#071126]">
                  lock
                </span>
                <span>Admin</span>
              </Link>

              {/* MOBILE MENU BUTTON */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open Navigation Menu"
                className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-md bg-[#101B3D] text-[#D6A23A] lg:hidden shadow-sm active:scale-95 transition-transform cursor-pointer"
                id="nav-drawer-toggle"
              >
                <span className="material-symbols-outlined text-lg">menu</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. ADMISSIONS ANNOUNCEMENT STRIP */}
        <div className="w-full bg-gradient-to-r from-[#101B3D] via-[#182A59] to-[#101B3D] text-white py-1 px-4 shadow-sm border-b border-[#C69A48]/30">
          <div className="w-full max-w-[1440px] mx-auto flex items-center justify-between text-[0.6875rem] sm:text-xs gap-3">

            <div className="flex items-center gap-2 truncate">
              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#C69A48]/20 text-[#C69A48] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-xs">campaign</span>
              </span>

              <span className="font-medium tracking-wide text-slate-100 truncate">
                {language === 'TA'
                  ? 'சேர்க்கை தீவிரமாக நடைபெறுகிறது — காம்பீட் அகாடமியில் உங்கள் எதிர்காலத்தை கட்டமைக்கவும்'
                  : 'Admissions Open — NEET · JEE · UPSC · Foundation · TNPSC Academic Batches'}
              </span>

              <span className="hidden md:inline-block text-[#C69A48] font-semibold">
                {language === 'TA'
                  ? '• அண்ணா சாலை, கிண்டி & சிதம்பரம் வளாகங்கள்'
                  : '• Anna Salai, Guindy & Chidambaram Campuses'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setEnquiryOpen(true)}
              className="shrink-0 px-3 py-0.5 rounded-full bg-[#C69A48] hover:bg-[#d8a850] text-[#101B3D] font-headline font-bold text-[0.65rem] sm:text-[0.6875rem] tracking-wider uppercase transition-all duration-200 shadow-sm active:scale-95 flex items-center gap-1 cursor-pointer"
            >
              <span className={language === 'TA' ? 'font-tamil' : ''}>
                {language === 'TA' ? 'விண்ணப்பிக்கவும்' : 'Apply Now'}
              </span>
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SLIDE-OUT NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" id="mobile-drawer">

          <div
            className="fixed inset-0 bg-[#000212]/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 w-5/6 max-w-sm bg-[#0B142B] text-white flex flex-col p-6 justify-between shadow-2xl pt-safe pb-safe z-10 animate-in slide-in-from-right duration-200 border-l border-white/10 overflow-y-auto">

            <div className="flex flex-col gap-6">

              {/* DRAWER BRANDING */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <BrandLogo size="sm" theme="dark" />

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close Drawer"
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-[#D6A23A] transition-colors rounded-lg bg-white/5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xl">close</span>
                </button>
              </div>

              {/* MAIN SITE LINKS */}
              <div className="flex flex-col gap-1">

                <span className="font-mono text-[0.625rem] text-[#D6A23A] uppercase tracking-wider px-2 font-bold">
                  {language === 'TA' ? 'முதன்மை பக்கங்கள்' : 'Main Navigation'}
                </span>

                {/* MOBILE HOME */}
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-headline text-sm transition-colors ${
                    pathname === '/'
                      ? 'bg-[#D6A23A] text-[#0B142B] font-bold shadow-sm'
                      : 'text-[#D6A23A] hover:bg-white/10 hover:text-[#F2C66D]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">home</span>
                  <span className={language === 'TA' ? 'font-tamil' : ''}>
                    {language === 'TA' ? 'முகப்பு' : 'Home'}
                  </span>
                </Link>

                {/* MOBILE PROGRAMMES */}
                <div className="flex flex-col">

                  <button
                    type="button"
                    onClick={() => setMobileProgrammesExpanded((prev) => !prev)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-headline text-sm transition-colors cursor-pointer ${
                      isProgrammesActive
                        ? 'bg-white/15 text-[#D6A23A] font-bold'
                        : 'text-[#D6A23A] hover:bg-white/10 hover:text-[#F2C66D]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-lg text-[#D6A23A]">
                        school
                      </span>
                      <span className={language === 'TA' ? 'font-tamil' : ''}>
                        {language === 'TA' ? 'பாடத்திட்டங்கள்' : 'Programmes'}
                      </span>
                    </div>

                    <span
                      className={`material-symbols-outlined text-base transition-transform ${
                        mobileProgrammesExpanded
                          ? 'rotate-180 text-[#D6A23A]'
                          : 'text-[#D6A23A]'
                      }`}
                    >
                      expand_more
                    </span>
                  </button>

                  {mobileProgrammesExpanded && (
                    <div className="flex flex-col gap-1 pl-4 pr-1 py-1.5 my-1 border-l-2 border-[#D4A33F]/40 ml-4 animate-in fade-in duration-150">

                      {PROGRAMME_DESTINATIONS.map((dest) => {
                        const isCurrent = pathname.startsWith(dest.href);

                        return (
                          <Link
                            key={dest.href}
                            href={dest.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-lg font-headline text-xs transition-colors ${
                              isCurrent
                                ? 'bg-[#D4A33F]/25 text-[#E0B44F] border border-[#D4A33F]/40 font-bold shadow-xs'
                                : 'text-[#D4A33F] hover:bg-white/10 hover:text-[#E0B44F]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">

                              <span
                                className={`material-symbols-outlined text-base ${
                                  isCurrent ? 'text-[#E0B44F]' : 'text-[#D4A33F]'
                                }`}
                              >
                                {dest.icon}
                              </span>

                              <div className="flex flex-col">
                                <span className={`${isCurrent ? 'text-[#E0B44F]' : 'text-[#D4A33F]'} ${language === 'TA' ? 'font-tamil' : ''}`}>
                                  {language === 'TA' ? dest.tamilLabel : dest.label}
                                </span>

                                <span className="text-[0.625rem] text-[#F5EBD5]/80 font-sans font-normal">
                                  {language === 'TA' ? dest.tamilTagline : dest.tagline}
                                </span>
                              </div>
                            </div>

                            <span
                              className={`text-[0.5625rem] px-1.5 py-0.5 rounded font-mono shrink-0 ml-2 ${
                                isCurrent
                                  ? 'bg-[#E0B44F] text-[#071126] font-bold'
                                  : 'bg-white/10 text-[#F5EBD5] border border-[#D4A33F]/30'
                              }`}
                            >
                              {dest.badge}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* MOBILE RESOURCES */}
                <Link
                  href="/resources"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-headline text-sm transition-colors ${
                    pathname.startsWith('/resources')
                      ? 'bg-[#D6A23A] text-[#0B142B] font-bold shadow-sm'
                      : 'text-[#D6A23A] hover:bg-white/10 hover:text-[#F2C66D]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">folder_open</span>
                  <span className={language === 'TA' ? 'font-tamil' : ''}>
                    {language === 'TA' ? 'பாட வளங்கள்' : 'Our Resources'}
                  </span>
                </Link>

                {/* MOBILE ABOUT US */}
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-headline text-sm transition-colors ${
                    pathname.startsWith('/about')
                      ? 'bg-[#D6A23A] text-[#0B142B] font-bold shadow-sm'
                      : 'text-[#D6A23A] hover:bg-white/10 hover:text-[#F2C66D]'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">account_balance</span>
                  <span className={language === 'TA' ? 'font-tamil' : ''}>
                    {language === 'TA' ? 'எங்களைப் பற்றி' : 'About Us'}
                  </span>
                </Link>
              </div>
            </div>

            {/* DRAWER BOTTOM ACTIONS */}
            <div className="flex flex-col gap-3 bg-white/5 p-4 rounded-xl border border-white/10 mt-6">

              {/* MOBILE BILINGUAL LANGUAGE SWITCHER */}
              <div className="flex items-center justify-between w-full py-2 px-3 rounded-lg bg-white/10 text-white font-headline text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#D6A23A] text-base">
                    translate
                  </span>
                  <span>{language === 'TA' ? 'மொழி / Language' : 'Language / மொழி'}</span>
                </div>

                <div className="flex items-center rounded bg-[#0B142B] border border-[#D6A23A]/40 p-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (language !== 'EN') {
                        setLanguage('EN');
                        setLangToast(true);
                        setTimeout(() => setLangToast(false), 2000);
                      }
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                      language === 'EN'
                        ? 'bg-[#D6A23A] text-[#0B142B]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (language !== 'TA') {
                        setLanguage('TA');
                        setLangToast(true);
                        setTimeout(() => setLangToast(false), 2000);
                      }
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-tamil font-bold transition-all cursor-pointer ${
                      language === 'TA'
                        ? 'bg-[#D6A23A] text-[#0B142B]'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    தமிழ்
                  </button>
                </div>
              </div>

              <a
                className="flex items-center gap-2.5 text-white font-sans text-xs hover:text-[#D6A23A] transition-colors px-1"
                href="tel:+919476543210"
              >
                <span className="material-symbols-outlined text-[#D6A23A] text-base">
                  phone_in_talk
                </span>
                <span>+91 94765 43210</span>
              </a>

              {/* ADMISSION ENQUIRY */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquiryOpen(true);
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#D6A23A] text-[#101B3D] font-headline text-xs font-bold rounded-lg shadow-sm active:scale-95 transition-transform cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">how_to_reg</span>
                <span className={language === 'TA' ? 'font-tamil' : ''}>
                  {language === 'TA' ? 'சேர்க்கை ஆலோசனை' : 'Admission Enquiry'}
                </span>
              </button>

              {/* ADMIN CONSOLE */}
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#FFB91F] text-[#071126] font-headline text-xs font-bold rounded-lg hover:bg-[#e6a517] transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-base">lock</span>
                <span>Admin Console</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* LANGUAGE TOGGLE FEEDBACK TOAST */}
      {langToast && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-[#101B3D] text-white border border-[#D6A23A]/50 font-headline text-xs shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[#D6A23A] text-base">
            translate
          </span>

          <span>
            {language === 'TA'
              ? 'தமிழ் இடைமுகம் தேர்ந்தெடுக்கப்பட்டது (Tamil Interface Selected)'
              : 'English interface selected (Standard Mode)'}
          </span>
        </div>
      )}

      {/* STUDENT PORTAL MODAL */}
      {portalOpen && (
        <StudentPortalModal
          isOpen={portalOpen}
          onClose={() => setPortalOpen(false)}
          docTitle="Compete Academy Student Portal"
        />
      )}

      {/* ADMISSION ENQUIRY MODAL */}
      {enquiryOpen && (
        <AdmissionEnquiryModal
          isOpen={enquiryOpen}
          onClose={() => setEnquiryOpen(false)}
        />
      )}
    </>
  );
}