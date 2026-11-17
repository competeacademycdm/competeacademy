'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AcademicProgramIntelligence, SubjectCurriculum } from '@/data/academicIntelligence';

const AdmissionEnquiryModal = dynamic(
  () => import('@/components/shared/AdmissionEnquiryModal').then((mod) => mod.AdmissionEnquiryModal),
  { ssr: false }
);

export interface DedicatedCourseTemplateProps {
  data: AcademicProgramIntelligence;
  heroImage: {
    src: string;
    alt: string;
    caption: string;
    objectPosition?: string;
  };
  secondaryHeroImage?: {
    src: string;
    alt: string;
    caption: string;
  };
  accentBadgeColor?: string;
}

export function DedicatedCourseTemplate({
  data,
  heroImage,
  secondaryHeroImage,
}: DedicatedCourseTemplateProps) {
  const [activeCurriculumTab, setActiveCurriculumTab] = useState<number>(0);
  const [selectedFoundationGradeGroup, setSelectedFoundationGradeGroup] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full bg-[#F8F6EF] text-[#0B142B] min-h-screen selection:bg-[#C69A3A]/20">
      {/* -------------------------------------------------------------------- */}
      {/* 1. CINEMATIC FULL-BLEED HERO SECTION (Centered Editorial Composition)*/}
      {/* -------------------------------------------------------------------- */}
      <section
        aria-label={`${data.title} Academic Programme Hero`}
        className="relative w-full bg-[#070D1E] text-white border-b border-[#C69A3A]/30 overflow-hidden min-h-[520px] sm:min-h-[560px] lg:min-h-[calc(100dvh-var(--header-total-height))] flex flex-col items-center justify-center py-8 sm:py-10 lg:py-12"
      >
        {/* Full-Bleed Sharp Background Photograph — Zero Blur, Sharp Photographic Contrast */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            quality={92}
            sizes="100vw"
            style={heroImage.objectPosition ? { objectPosition: heroImage.objectPosition } : undefined}
            className="object-cover object-center brightness-[1.03] contrast-[1.04] saturate-[1.04]"
          />

          {/* Balanced Optical Scrim — 35% Higher Visibility, Zero Blur, Full Subject Preservation with Strong Text Contrast */}
          {/* 1. Base ambient tint to harmonise photograph with academy navy palette */}
          <div className="absolute inset-0 bg-[#070D1E]/25 sm:bg-[#070D1E]/20" />
          {/* 2. Symmetrical vertical gradient for header anchor and section transition */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070D1E]/50 via-[#070D1E]/20 via-45% to-[#070D1E]/60" />
          {/* 3. Radial center scrim dedicated to text readability without obscuring photograph corners or subjects */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,13,30,0.50)_0%,rgba(7,13,30,0.22)_60%,rgba(7,13,30,0.55)_100%)]" />
        </div>

        {/* Hero Foreground Content — Elegant Perfectly Centred Single-Column Composition */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center justify-center my-auto">
          <div className="flex flex-col items-center text-center gap-3.5 sm:gap-4.5 max-w-3xl lg:max-w-4xl mx-auto">
            {/* 1. Regulatory & Institutional Authority Badges (Centered) */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-center">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C69A3A]/25 border border-[#C69A3A]/50 text-[#F5CD6B] text-[0.6875rem] sm:text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm">
                <span className="material-symbols-outlined text-sm text-[#FFB91F]">verified</span>
                <span>{data.badge}</span>
              </span>
              <span className="text-[0.6875rem] sm:text-xs text-slate-300 font-mono tracking-wide [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
                Official Statutory Track · Updated {data.examination.verifiedDate}
              </span>
              {heroImage.caption && (
                <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[0.6875rem] text-[#F5EBD5] font-sans font-medium backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C69A3A]" />
                  <span>{heroImage.caption}</span>
                </span>
              )}
              {secondaryHeroImage && (
                <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[0.6875rem] text-[#F5EBD5] font-sans font-medium backdrop-blur-sm">
                  <span className="material-symbols-outlined text-xs text-[#FFB91F]">school</span>
                  <span>{secondaryHeroImage.caption}</span>
                </span>
              )}
            </div>

            {/* 2. Main Course Headline (Centered) */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-[3rem] font-bold tracking-tight text-white leading-[1.15] text-center [text-shadow:0_2px_12px_rgba(7,13,30,0.9),0_1px_3px_rgba(0,0,0,0.9)] max-w-[28ch] mx-auto">
              {data.title}
            </h1>

            {/* 3. Career-Specific Slogan & Supporting Brand Line (Centered) */}
            <div className="flex flex-col items-center text-center gap-1 py-0.5 mx-auto max-w-3xl">
              <p className="font-serif text-lg sm:text-xl lg:text-2xl font-bold text-[#FFB91F] leading-snug tracking-tight text-center [text-shadow:0_2px_8px_rgba(7,13,30,0.9)]">
                {data.heroBranding.primarySlogan}{' '}
                <span className="font-serif italic font-semibold text-white/95">
                  {data.heroBranding.supportingLine}
                </span>
              </p>
              <p className="font-sans text-xs sm:text-sm font-semibold text-[#F5EBD5] tracking-wide text-center [text-shadow:0_1px_6px_rgba(7,13,30,0.9)] max-w-2xl mx-auto">
                {data.heroBranding.supportingDescription}
              </p>
            </div>

            {/* 4. Programme Description (Centered) */}
            <p className="font-sans text-xs sm:text-sm lg:text-[0.9375rem] text-slate-200/95 leading-relaxed max-w-[65ch] text-center mx-auto [text-shadow:0_1px_6px_rgba(7,13,30,0.9)]">
              {data.introduction.heroStatement}
            </p>

            {/* 5. Key Vital Metric Cards (Centered as a Group, Consistent Single-Line Cadence) */}
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3 pt-0.5 text-xs font-sans w-full max-w-2xl mx-auto">
              <div className="bg-[#070D1E]/80 backdrop-blur-md border border-white/15 py-2 px-3 sm:py-2.5 sm:px-3.5 rounded-xl shadow-md flex flex-col items-center justify-center text-center gap-0.5">
                <span className="text-slate-400 text-[0.625rem] sm:text-[0.6875rem] font-mono uppercase tracking-wider text-center">Conducting Authority</span>
                <span className="font-bold text-white text-xs sm:text-[0.8125rem] leading-snug text-center">
                  {data.examination.conductingAuthority.length > 36
                    ? data.examination.conductingAuthority.split('/')[0].trim() + (data.examination.conductingAuthority.includes('/') ? ' & Boards' : '')
                    : data.examination.conductingAuthority}
                </span>
              </div>
              <div className="bg-[#070D1E]/80 backdrop-blur-md border border-[#C69A3A]/35 py-2 px-3 sm:py-2.5 sm:px-3.5 rounded-xl shadow-md flex flex-col items-center justify-center text-center gap-0.5">
                <span className="text-slate-400 text-[0.625rem] sm:text-[0.6875rem] font-mono uppercase tracking-wider text-center">Examination Score Scale</span>
                <span className="font-mono font-bold text-[#FFB91F] text-xs sm:text-[0.875rem] leading-snug text-center">{data.examination.totalMarks} Marks</span>
              </div>
              <div className="bg-[#070D1E]/80 backdrop-blur-md border border-white/15 py-2 px-3 sm:py-2.5 sm:px-3.5 rounded-xl shadow-md flex flex-col items-center justify-center text-center gap-0.5">
                <span className="text-slate-400 text-[0.625rem] sm:text-[0.6875rem] font-mono uppercase tracking-wider text-center">Delivery Mode</span>
                <span className="font-bold text-white text-xs sm:text-[0.8125rem] leading-snug text-center">
                  {data.examination.examMode.includes('(')
                    ? data.examination.examMode.split('(')[0].trim()
                    : data.examination.examMode}
                </span>
              </div>
            </div>

            {/* 6. Primary & Secondary Action CTAs (Centered as a Group) */}
            <div className="flex flex-col xs:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1 w-full xs:w-auto mx-auto">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="group w-full xs:w-auto px-6 sm:px-7 py-3.5 rounded-xl bg-[#C69A3A] hover:bg-[#d6a947] text-[#070D1E] font-sans font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-[0_4px_16px_rgba(198,154,72,0.3)] hover:shadow-[0_6px_22px_rgba(198,154,72,0.45)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base transition-transform group-hover:scale-110">how_to_reg</span>
                <span>Apply for Upcoming Cohort</span>
              </button>
              <a
                href="#materials-vault"
                className="w-full xs:w-auto px-5 sm:px-6 py-3.5 rounded-xl bg-[#070D1E]/70 hover:bg-[#070D1E]/90 border border-white/25 hover:border-[#C69A3A]/70 text-white font-sans font-semibold text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 backdrop-blur-sm"
              >
                <span className="material-symbols-outlined text-base text-[#FFB91F]">folder_open</span>
                <span>Verified Question Papers</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------- */}
      {/* 2. MAIN CONTENT BODY                                                 */}
      {/* -------------------------------------------------------------------- */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10 lg:py-12 flex flex-col gap-10 sm:gap-12 lg:gap-14 min-w-0 overflow-x-hidden">
        {/* ================================================================== */}
        {/* SECTION 1: COURSE OVERVIEW & ACADEMIC PHILOSOPHY                   */}
        {/* ================================================================== */}
        <section className="flex flex-col gap-6 w-full min-w-0 max-w-full">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#C69A3A] font-mono text-xs uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-sm">flag</span>
              <span>Academic Purpose &amp; Methodology</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B142B]">
              Course Overview &amp; Preparation Reality
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start w-full min-w-0 max-w-full">
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 lg:p-7 border border-[#E2DDCF] shadow-sm flex flex-col gap-4 sm:gap-5 w-full min-w-0 max-w-full">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0B142B]">
                  Academic Purpose
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed mt-1.5">
                  {data.introduction.purpose}
                </p>
              </div>

              <div className="pt-3.5 border-t border-[#EFECE3]">
                <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-rose-800 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  <span>The Ground Reality &amp; Competition Bottleneck</span>
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                  {data.introduction.examinationReality}
                </p>
              </div>

              <div className="pt-3.5 border-t border-[#EFECE3]">
                <h4 className="font-sans text-xs uppercase tracking-wider font-bold text-[#0B142B] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#C69A3A]">verified</span>
                  <span>The Strategic Imperative</span>
                </h4>
                <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
                  {data.introduction.strategicImperative}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F4F1E6] border border-[#DDD6C5] flex flex-col gap-2 min-w-0 max-w-full">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#0B142B] uppercase tracking-wider break-words">
                    The Compete Academy Philosophy · A Seat Is Just The Beginning. True Excellence Begins With Understanding.
                  </span>
                  <span className="text-[0.6875rem] font-serif italic font-bold text-[#8C6D23] shrink-0">
                    Not Just Qualified. Truly Capable.
                  </span>
                </div>
                <p className="font-sans text-xs text-slate-700 leading-relaxed">
                  We don&apos;t just prepare students to clear examinations. We develop the knowledge, reasoning and confidence that make them capable of succeeding beyond examinations.
                </p>
                <p className="font-sans text-xs sm:text-sm text-slate-800 leading-relaxed pt-1 border-t border-[#E2DDCF]">
                  {data.introduction.competeAcademyPhilosophy}
                </p>
              </div>
            </div>

            {/* Target Audience & Official Portal Card (Naturally Sized, No Artificial Stretch or Empty Space) */}
            <div className="bg-[#0B142B] text-white rounded-2xl p-5 sm:p-6 border border-white/10 shadow-lg flex flex-col gap-4 self-start w-full min-w-0 max-w-full">
              <div>
                <span className="text-xs font-mono text-[#C69A3A] uppercase tracking-wider block">
                  Target Student Profile
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-white mt-1 leading-snug">
                  {data.targetAudience}
                </h3>
              </div>

              <div className="space-y-2 pt-3 border-t border-white/10 text-xs w-full min-w-0">
                <div className="flex justify-between items-center py-1 border-b border-white/5 gap-2">
                  <span className="text-slate-400 shrink-0">Exam Frequency:</span>
                  <span className="font-semibold text-slate-200 text-right">{data.examination.annualCadence}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5 gap-2">
                  <span className="text-slate-400 shrink-0">Total Questions:</span>
                  <span className="font-semibold text-slate-200 text-right">{data.examination.totalQuestions} Questions</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5 gap-2">
                  <span className="text-slate-400 shrink-0">Test Duration:</span>
                  <span className="font-semibold text-slate-200 text-right">{data.examination.durationMinutes} Minutes</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-white/5 gap-2">
                  <span className="text-slate-400 shrink-0">Marking Rule:</span>
                  <span className="font-semibold text-[#E0B85C] text-right">{data.examination.negativeMarkingRule}</span>
                </div>
              </div>

              <div className="pt-1">
                <a
                  href={data.examination.officialSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-[#C69A3A]/40 text-xs text-white font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm text-[#C69A3A]">open_in_new</span>
                  <span>Official Authority Portal</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 2: EXAMINATION STAGES & MARKS DISTRIBUTION                 */}
        {/* ================================================================== */}
        <section className="flex flex-col gap-6 w-full min-w-0 max-w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#C69A3A] font-mono text-xs uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-sm">analytics</span>
              <span>Examination Stages &amp; Marks Distribution</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B142B]">
              Statutory Examination Architecture
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-600">
              {data.marksDistribution.overview}
            </p>
          </div>

          {/* Stages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full min-w-0 max-w-full">
            {data.examination.stages.map((stage) => (
              <div
                key={stage.stageNumber}
                className="bg-white rounded-2xl p-5 border border-[#E2DDCF] shadow-sm flex flex-col justify-between gap-3 min-w-0"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#0B142B]/5 text-[#0B142B] font-mono text-[0.6875rem] font-bold">
                      Stage {stage.stageNumber} · {stage.shortCode}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[0.625rem] font-bold">
                      {stage.nature}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#0B142B] mt-2">
                    {stage.name}
                  </h3>
                  <p className="font-sans text-xs text-slate-600 leading-relaxed mt-1.5">
                    {stage.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#EFECE3] text-xs">
                  <div className="bg-[#FAF8F2] p-2 rounded-lg border border-[#ECE6D7]">
                    <span className="text-[0.625rem] text-slate-500 block uppercase font-mono">Format</span>
                    <span className="font-sans font-bold text-slate-800 text-xs truncate block">{stage.type}</span>
                  </div>
                  <div className="bg-[#FAF8F2] p-2 rounded-lg border border-[#ECE6D7]">
                    <span className="text-[0.625rem] text-slate-500 block uppercase font-mono">Total Weight</span>
                    <span className="font-sans font-bold text-[#8C6D23] text-xs block">{stage.totalMarks} Marks</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Marks Distribution Table */}
          <div className="w-full min-w-0 max-w-full bg-white rounded-2xl border border-[#E2DDCF] shadow-sm overflow-hidden mt-2">
            <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain">
              <table className="w-full min-w-[540px] text-left text-xs font-sans">
                <thead className="bg-[#0B142B] text-white font-mono text-[0.6875rem] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Subject / Section</th>
                    <th className="py-3 px-4">Questions Asked / Attempt</th>
                    <th className="py-3 px-4">Marking Scheme</th>
                    <th className="py-3 px-4 text-right">Max Marks</th>
                    <th className="py-3 px-4">High-Yield Focus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE3]">
                  {data.marksDistribution.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF8F2] transition-colors">
                      <td className="py-3 px-4 font-bold text-[#0B142B]">
                        <div>{row.subject}</div>
                        {row.section && <div className="text-[0.6875rem] text-slate-500 font-normal">{row.section}</div>}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        <span className="font-mono font-medium">{row.questionsAsked}</span>
                        {row.questionsToAttempt && <span className="text-slate-500 block text-[0.6875rem]">Attempt: {row.questionsToAttempt}</span>}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-mono text-slate-800">+{row.marksPerQuestion} correct</div>
                        <div className="text-[0.6875rem] text-rose-700 font-mono">{row.negativeMark}</div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-[#8C6D23] text-base">
                        {row.totalMarks}
                      </td>
                      <td className="py-3 px-4 text-slate-600 leading-snug max-w-xs">
                        {row.highYieldWeightage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 3: CATEGORY-WISE ELIGIBILITY, RESERVATION & CUTOFFS        */}
        {/* ================================================================== */}
        <section className="flex flex-col gap-6 w-full min-w-0 max-w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#C69A3A] font-mono text-xs uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>Statutory Criteria &amp; Admission Safe Scores</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B142B]">
              Category-Wise Reservation, Eligibility &amp; Admission Cutoffs
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-600">
              {data.eligibilityAndCutoffs.cutoffsDistinctionExplanation}
            </p>
          </div>

          <div className="w-full min-w-0 max-w-full bg-white rounded-2xl border border-[#E2DDCF] shadow-sm overflow-hidden">
            <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain">
              <table className="w-full min-w-[540px] text-left text-xs font-sans">
                <thead className="bg-[#0B142B] text-white font-mono text-[0.6875rem] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Community Category</th>
                    <th className="py-3 px-4">Statutory Quota</th>
                    <th className="py-3 px-4">Qualifying Cutoff</th>
                    <th className="py-3 px-4 text-[#E0B85C]">Seat Allotment Safe Score</th>
                    <th className="py-3 px-4">Age / Attempt Bounds</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE3]">
                  {data.eligibilityAndCutoffs.categories.map((cat, cidx) => (
                    <tr key={cidx} className="hover:bg-[#FAF8F2] transition-colors">
                      <td className="py-3 px-4 font-bold text-[#0B142B]">
                        <div>{cat.categoryName}</div>
                        <span className="text-[0.6875rem] text-slate-500 font-mono font-normal">{cat.code}</span>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-700">{cat.reservationPercentage}</td>
                      <td className="py-3 px-4 text-slate-600">
                        <div>{cat.qualifyingCriteria}</div>
                        <span className="text-[0.625rem] text-slate-500 font-mono block">Recent: {cat.recentQualifyingCutoff}</span>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#8C6D23] font-mono">{cat.typicalAllotmentSafeScore}</td>
                      <td className="py-3 px-4 text-slate-700 text-xs">{cat.maxAttemptsOrAge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-[#FAF8F2] border-t border-[#EFECE3] text-[0.6875rem] text-slate-500 font-mono text-center">
              {data.eligibilityAndCutoffs.officialStatutoryNote}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 4: COMPLETE BEGINNER-TO-ADVANCED CURRICULUM                */}
        {/* ================================================================== */}
        <section className="flex flex-col gap-6 w-full min-w-0 max-w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#C69A3A] font-mono text-xs uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-sm">menu_book</span>
              <span>Syllabus Breakdown</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B142B]">
              Comprehensive Subject Modules &amp; Chapters
            </h2>
          </div>

          {/* Grade Cohort picker for Foundation */}
          {data.foundationClassesData && (
            <div className="flex flex-col gap-2 bg-[#FAF8F2] p-4 rounded-2xl border border-[#ECE6D7]">
              <span className="font-mono text-xs uppercase font-bold text-[#0B142B]">Select Grade Cohort:</span>
              <div className="flex flex-wrap gap-2">
                {data.foundationClassesData.classGroups.map((grp, gidx) => (
                  <button
                    key={gidx}
                    onClick={() => setSelectedFoundationGradeGroup(gidx)}
                    className={`px-4 py-2 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
                      selectedFoundationGradeGroup === gidx
                        ? 'bg-[#0B142B] text-white shadow-sm'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-[#E2DDCF]'
                    }`}
                  >
                    {grp.groupLabel} ({grp.grades})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Subject Modules */}
          {(() => {
            const activeSubjects: SubjectCurriculum[] =
              data.foundationClassesData
                ? data.foundationClassesData.classGroups[selectedFoundationGradeGroup].subjects
                : data.curriculum;

            const safeTabIndex = Math.min(activeCurriculumTab, activeSubjects.length - 1);
            const currentSubject = activeSubjects[safeTabIndex] || activeSubjects[0];

            return (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-[#E2DDCF] pb-2">
                  {activeSubjects.map((sub, sidx) => (
                    <button
                      key={sidx}
                      onClick={() => setActiveCurriculumTab(sidx)}
                      className={`flex-shrink-0 px-4 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                        safeTabIndex === sidx
                          ? 'bg-[#0B142B] text-white shadow-md'
                          : 'bg-white hover:bg-slate-50 text-slate-600 border border-[#E2DDCF]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base text-[#C69A3A]">{sub.icon}</span>
                      <span>{sub.subjectName}</span>
                      <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/10 text-[0.625rem] font-mono">
                        {sub.totalHours} hrs
                      </span>
                    </button>
                  ))}
                </div>

                {currentSubject && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentSubject.chapters.map((chap, cidx) => (
                      <div
                        key={cidx}
                        className="bg-white rounded-2xl p-5 border border-[#E2DDCF] shadow-sm flex flex-col justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded text-[0.625rem] font-bold bg-rose-100 text-rose-800">
                              {chap.weightageLevel}
                            </span>
                            <span className="font-mono text-xs text-slate-500">~{chap.estimatedHours} Hours</span>
                          </div>
                          <h4 className="font-serif text-base font-bold text-[#0B142B] mt-2">
                            {chap.title}
                          </h4>
                        </div>
                        <div className="pt-2 border-t border-[#EFECE3]">
                          <ul className="space-y-1 text-xs text-slate-700">
                            {chap.subtopics.map((topic, tidx) => (
                              <li key={tidx} className="flex items-start gap-1.5">
                                <span className="text-[#C69A3A] font-bold">›</span>
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}
        </section>

        {/* ================================================================== */}
        {/* SECTION 5: STUDY MATERIALS & ARCHIVES REDIRECTION BANNER           */}
        {/* ================================================================== */}
        <section id="materials-vault" className="w-full min-w-0 max-w-full rounded-3xl bg-gradient-to-r from-[#101B35] via-[#162447] to-[#101B35] border border-[#D4A33F]/30 p-6 sm:p-8 lg:p-10 shadow-lg text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5 max-w-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#D4A33F]/20 border border-[#D4A33F]/40 flex items-center justify-center shrink-0 text-[#E0B44F]">
                <span className="material-symbols-outlined text-2xl">folder_open</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-[#D4A33F] font-mono text-xs uppercase tracking-wider font-bold">
                  <span>Centralized Academic Archive</span>
                  <span className="text-slate-400">•</span>
                  <span>Our Resources</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Looking for {data.shortName} Study Materials &amp; Previous Year Papers?
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#F5EBD5]/90 leading-relaxed">
                  All official question papers, verified answer keys, chapter formulas, and syllabus digests are maintained centrally in the <strong>Our Resources</strong> library with instant mobile OTP verification.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <Link
                href={`/resources?category=${data.connectedResourceFilter}`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D4A33F] hover:bg-[#e0b44f] text-[#071126] font-headline text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <span>Access Study Materials</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 6: PROGRAM-SPECIFIC FAQS                                   */}
        {/* ================================================================== */}
        <section className="flex flex-col gap-6 w-full min-w-0 max-w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-[#C69A3A] font-mono text-xs uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-sm">quiz</span>
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B142B]">
              Common Inquiries for {data.shortName}
            </h2>
          </div>

          <div className="space-y-3">
            {data.faqs.map((faq, fidx) => {
              const isOpen = openFaqIndex === fidx;
              return (
                <div
                  key={fidx}
                  className="bg-white rounded-2xl border border-[#E2DDCF] shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : fidx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F2] transition-colors"
                  >
                    <span className="font-serif text-sm sm:text-base font-bold text-[#0B142B]">
                      {faq.question}
                    </span>
                    <span className="material-symbols-outlined text-slate-400 text-xl flex-shrink-0">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-700 font-sans leading-relaxed border-t border-[#EFECE3] pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================== */}
        {/* SECTION 7: ADMISSION ENQUIRY CTA BANNER                            */}
        {/* ================================================================== */}
        <section className="w-full min-w-0 max-w-full bg-[#0B142B] text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#C69A3A]/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl flex flex-col gap-4 sm:gap-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C69A3A]/20 text-[#E0B85C] text-xs font-mono font-semibold">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              <span>Admissions Active for 2025–2026 Academic Batches</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              Begin Your Preparation for {data.shortName} With Compete Academy.
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
              Schedule an in-person academic diagnostic consultation to evaluate your preparation timeline, review examination cutoffs, and reserve a seat in our small focused cohorts.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setEnquiryModalOpen(true)}
                className="px-8 py-4 rounded-xl bg-[#C69A3A] hover:bg-[#d6a947] text-[#0B142B] font-sans font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">contact_mail</span>
                <span>Request {data.shortName} Admission Consultation</span>
              </button>
              <Link
                href="/about"
                className="px-6 py-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-sans font-semibold text-xs sm:text-sm transition-all"
              >
                About Our Chennai Campuses
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Shared Admission Enquiry Modal */}
      <AdmissionEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialStream={data.title}
      />
    </div>
  );
}
