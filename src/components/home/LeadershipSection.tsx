'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FOUNDER_DATA, ACADEMIC_ADVISORS_DATA, LeaderProfile } from '@/data/leadership';
import { useLanguage } from '@/i18n';

interface LeadershipImageFrameProps {
  leader: LeaderProfile;
  priority?: boolean;
}

function LeadershipImageFrame({ leader, priority = false }: LeadershipImageFrameProps) {
  const { language } = useLanguage();
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="relative w-full max-w-[340px] aspect-[4/5] mx-auto overflow-hidden rounded-xl bg-[#071126] border-2 border-[#C7A66A]/50 shadow-[0_8px_30px_rgba(11,20,36,0.18)] ring-1 ring-[#C7A66A]/20 group transition-all duration-300"
    >
      {leader.image && !imageError ? (
        <Image
          src={leader.image}
          alt={`Portrait of ${leader.name}, ${leader.designation}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 280px, 340px"
          className="object-contain object-center p-1.5 transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          onError={() => setImageError(true)}
        />
      ) : (
        /* Cinematic Editorial Placeholder */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-b from-[#ECE7DC] via-[#E8E2D6] to-[#DFD8CA]">
          {/* Subtle Ambient Radial Tone */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C7A66A]/15 via-transparent to-transparent pointer-events-none" />

          {/* Editorial Monogram Crest */}
          <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#C7A66A]/50 flex items-center justify-center bg-[#F4F0E8] shadow-[0_2px_12px_rgba(199,166,106,0.2)] mb-3">
            <span className="font-display font-bold text-xl sm:text-2xl text-[#8E703B] tracking-wider">
              {leader.initials}
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-1 max-w-md">
            <span className="text-[0.625rem] sm:text-xs font-headline font-bold uppercase tracking-[0.2em] text-[#8E703B]">
              {language === 'TA' ? 'அதிகாரப்பூர்வ திருவுருவப்படம்' : 'Official Portrait'}
            </span>
            <span className="text-sm sm:text-base font-display font-bold text-[#0B1424]">
              {leader.name}
            </span>
            <span className="text-xs text-[#4A5568] font-sans">
              {leader.designation} • Compete Academy
            </span>
          </div>
        </div>
      )}

      {/* Subtle Frame Edge Definition */}
      <div className="absolute inset-0 border border-[#C7A66A]/25 pointer-events-none rounded-xl" />
    </div>
  );
}

export function LeadershipSection() {
  const { language } = useLanguage();

  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="relative w-full bg-[#F4F0E8] text-[#0B1424] py-12 sm:py-16 lg:py-20 overflow-hidden border-b border-[#D5CDBD]"
    >
      <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-8 sm:gap-10 lg:gap-12">
        
        {/* ======================================================== */}
        {/* 1. SECTION INTRODUCTION AND HEADLINE                     */}
        {/* ======================================================== */}
        <div className="flex flex-col items-start max-w-3xl gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-[2px] bg-[#C7A66A]" />
            <span className="font-headline font-bold text-xs sm:text-[0.8125rem] text-[#8E703B] tracking-[0.2em] uppercase">
              {language === 'TA' ? 'காம்பீட் நிறுவனத்தின் வழிகாட்டிகள்' : 'The People Behind Compete'}
            </span>
          </div>

          <h2
            id="leadership-heading"
            className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-[#0B1424] tracking-tight leading-[1.12]"
          >
            {language === 'TA'
              ? 'சிறந்த கல்வி நிறுவனங்கள் சிறந்த தலைமைத்துவத்தால் கட்டமைக்கப்படுகின்றன.'
              : 'Great Institutions Are Built on Great Leadership.'}
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#4A5568] leading-relaxed max-w-2xl">
            {language === 'TA'
              ? 'தொலைநோக்குடன் வழிநடத்தி, ஆழ்ந்த அறிவுடன் நெறிப்படுத்தி, அடுத்த தலைமுறை சாதனையாளர்களை உருவாக்கும் அர்ப்பணிப்பு.'
              : 'Driven by vision. Strengthened by knowledge. Committed to shaping the next generation of achievers.'}
          </p>
        </div>

        {/* ======================================================== */}
        {/* 2 & 3. FOUNDER — HERO PROFILE (ELEGANT PORTRAIT CARD)    */}
        {/* ======================================================== */}
        <div className="w-full bg-[#ECE7DC]/40 border border-[#D5CDBD] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12">
          {/* Portrait Frame (approx 340px wide x 425px tall, 4:5 aspect ratio) */}
          <div className="shrink-0 w-full max-w-[320px] sm:max-w-[340px]">
            <LeadershipImageFrame
              leader={FOUNDER_DATA}
              priority={true}
            />
          </div>

          {/* Founder Information */}
          <div className="flex flex-col flex-1 text-center lg:text-left justify-center gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="font-headline font-bold text-xs sm:text-xs uppercase tracking-[0.22em] text-[#8E703B]">
                {language === 'TA' ? 'நிறுவனர் & கல்விக் குழும இயக்குநர்' : FOUNDER_DATA.designation}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0B1424] tracking-tight">
                {FOUNDER_DATA.name}
              </h3>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm sm:text-base font-headline pt-1">
                <span className="text-[#8E703B] font-semibold">{language === 'TA' ? 'கல்வித் தகுதி:' : 'Qualification:'}</span>
                <span className="text-[#0B1424] font-bold">{FOUNDER_DATA.qualification}</span>
                <span className="text-[#4A5568] font-sans">
                  ({language === 'TA' ? 'நிறுவனர், காம்பீட் அகாடமி' : FOUNDER_DATA.affiliation})
                </span>
              </div>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#4A5568] leading-relaxed max-w-2xl">
              {language === 'TA'
                ? 'பொறியாளர் கே.எஸ். கார்த்திகேயன் அவர்களின் வழிகாட்டலில், காம்பீட் அகாடமி கருத்துப் புலமை, தனிநபர் வழிகாட்டல் மற்றும் ஒழுக்கமான தேர்வு உத்திகள் மூலம் ஒவ்வொரு மாணவரையும் மருத்துவ மற்றும் கல்விசார் சாதனைகளை நோக்கி வழிநடத்துகிறது.'
                : 'Under the strategic leadership of Er. K.S. Karthikeyan, Compete Academy provides rigorous conceptual mastery, individual mentoring, and disciplined exam strategy to guide every aspirant toward competitive and academic excellence.'}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2 border-t border-[#D5CDBD]/60">
              <span className="px-3.5 py-1.5 rounded-full bg-white text-xs font-headline font-semibold text-[#0B1424] border border-[#D5CDBD]">
                {language === 'TA' ? 'கருத்துக்கே முதலிடம்' : 'Concept-First Pedagogy'}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white text-xs font-headline font-semibold text-[#8E703B] border border-[#C7A66A]/40">
                {language === 'TA' ? 'தனிநபர் மாணவர் வழிகாட்டல்' : 'Individual Student Mentoring'}
              </span>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. ACADEMIC ADVISORS — SECTION DIVIDER & HEADING         */}
        {/* ======================================================== */}
        <div className="w-full flex flex-col gap-8 sm:gap-10 pt-2 sm:pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 border-b border-[#D5CDBD] pb-4">
            <div className="flex flex-col gap-1.5">
              <span className="font-headline font-bold text-xs sm:text-xs text-[#8E703B] tracking-[0.2em] uppercase">
                {language === 'TA' ? 'கல்வி ஆலோசனைக் குழுமம்' : 'Scholastic Council'}
              </span>
              <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B1424] tracking-tight">
                {language === 'TA' ? 'கல்வி ஆலோசகர்கள்' : 'Academic Advisors'}
              </h3>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#4A5568] max-w-md">
              {language === 'TA' ? 'கல்விப் புலமையும் தொழில்முறை அனுபவமும் கொண்ட வழிகாட்டிகள்.' : 'Guided by academic knowledge and professional experience.'}
            </p>
          </div>

          {/* ======================================================== */}
          {/* 5 & 6. TWO-PERSON EQUAL-WIDTH COMPOSITION (SIDE-BY-SIDE) */}
          {/* ======================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {ACADEMIC_ADVISORS_DATA.map((advisor) => (
              <div key={advisor.id} className="bg-[#ECE7DC]/40 border border-[#D5CDBD] rounded-2xl p-6 sm:p-7 flex flex-col items-center text-center gap-5 group shadow-sm">
                {/* Advisor Portrait Photo Frame (approx 280-320px wide, 4:5 aspect ratio) */}
                <div className="shrink-0 w-full max-w-[280px] sm:max-w-[300px]">
                  <LeadershipImageFrame
                    leader={advisor}
                  />
                </div>

                {/* Advisor Details — Directly Beneath Photograph */}
                <div className="flex flex-col items-center gap-1.5 pt-1 w-full">
                  <span className="font-headline font-bold text-[0.6875rem] uppercase tracking-[0.2em] text-[#8E703B]">
                    {language === 'TA' ? 'கல்வி ஆலோசகர்' : advisor.designation}
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl font-bold text-[#0B1424] tracking-tight">
                    {advisor.name}
                  </h4>
                  <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs sm:text-sm font-headline pt-0.5">
                    <span className="text-[#8E703B] font-semibold">{language === 'TA' ? 'கல்வித் தகுதி:' : 'Qualifications:'}</span>
                    <span className="text-[#0B1424] font-medium">{advisor.qualification}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-[#4A5568] font-sans">
                    {advisor.affiliation}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
