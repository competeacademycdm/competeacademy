'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { HomeHeroSection } from '@/components/home/HomeHeroSection';
import { LeadershipSection } from '@/components/home/LeadershipSection';
import { HomeAddsOnSection } from '@/components/home/HomeAddsOnSection';
import { InstructionalArchitectureSection } from '@/components/home/InstructionalArchitectureSection';
import { AcademyReviewsSection } from '@/components/home/AcademyReviewsSection';
import { useLanguage } from '@/i18n';

// Dynamically import modals so their heavy code is not bundled into the critical initial render path
const AdmissionEnquiryModal = dynamic(
  () => import('@/components/shared/AdmissionEnquiryModal').then((mod) => mod.AdmissionEnquiryModal),
  { ssr: false }
);

const CampusTourModal = dynamic(
  () => import('@/components/shared/CampusTourModal').then((mod) => mod.CampusTourModal),
  { ssr: false }
);

export default function HomePage() {
  const { tr } = useLanguage();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [campusTourOpen, setCampusTourOpen] = useState(false);
  const [selectedStreamForEnquiry, setSelectedStreamForEnquiry] = useState('NEET (UG) Medical');

  const openEnquiry = (examTitle?: string) => {
    if (examTitle) setSelectedStreamForEnquiry(examTitle);
    setEnquiryOpen(true);
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. PREMIUM EDITORIAL HERO SECTION */}
      <HomeHeroSection />

      {/* 2. ADDS ON — ACADEMIC ENRICHMENT */}
      <HomeAddsOnSection />

      {/* 3. THE LEGACY OF LEADERSHIP — CINEMATIC LEADERSHIP SECTION */}
      <LeadershipSection />

      {/* 4. INSTRUCTIONAL ARCHITECTURE — Redesigned Radial Composition with Medallion */}
      <InstructionalArchitectureSection onOpenEnquiry={openEnquiry} />

      {/* 5. ACADEMY REVIEWS & TESTIMONIAL SYSTEM — Premium Cinematic Review Carousel & Trust Bar */}
      <AcademyReviewsSection />

      {/* 7. ADMISSION ENQUIRY CTA BANNER */}
      <section className="w-full bg-[#101B3D] text-white py-10 sm:py-12 lg:py-14 relative overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">
          <div className="flex flex-col gap-2 max-w-2xl text-left">
            <span className="font-headline text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#C69A48]">
              {tr.homepage.ctaBanner.badge}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-[1.15]">
              {tr.homepage.ctaBanner.title}
            </h2>
            <p className="font-sans text-slate-300 text-xs sm:text-sm leading-relaxed mt-0.5 max-w-[62ch]">
              {tr.homepage.ctaBanner.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => openEnquiry()}
              className="group h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-[#C69A48] hover:bg-[#d4a853] text-[#101B3D] font-headline font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_4px_14px_rgba(198,154,72,0.25)] hover:shadow-[0_6px_20px_rgba(198,154,72,0.35)] hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 text-center flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>{tr.homepage.ctaBanner.enquireBtn}</span>
              <span className="material-symbols-outlined text-base transition-transform duration-200 group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </button>

            <button
              onClick={() => setCampusTourOpen(true)}
              className="h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-transparent hover:bg-white/[0.08] text-white font-headline font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 border border-white/55 hover:border-white hover:-translate-y-0.5 active:translate-y-0 text-center flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base text-[#C69A48]">event_seat</span>
              <span>{tr.homepage.ctaBanner.visitBtn}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Shared Modals (Loaded only when opened) */}
      {enquiryOpen && (
        <AdmissionEnquiryModal
          isOpen={enquiryOpen}
          onClose={() => setEnquiryOpen(false)}
          initialStream={selectedStreamForEnquiry}
        />
      )}

      {campusTourOpen && (
        <CampusTourModal
          isOpen={campusTourOpen}
          onClose={() => setCampusTourOpen(false)}
        />
      )}
    </div>
  );
}
