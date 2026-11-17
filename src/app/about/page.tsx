'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const CampusTourModal = dynamic(
  () => import('@/components/shared/CampusTourModal').then((mod) => mod.CampusTourModal),
  { ssr: false }
);

export default function AboutPage() {
  const [campusModalOpen, setCampusModalOpen] = useState(false);

  return (
    <div className="flex flex-col w-full bg-surface">
      {/* 1. SECTION 1: INSTITUTIONAL MANIFESTO */}
      <section className="relative w-full py-10 sm:py-14 lg:py-16 overflow-hidden bg-surface-container-low border-b border-surface-container">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-secondary" />
            <span className="font-headline text-xs font-bold uppercase tracking-wider text-secondary">
              Compete Academy Heritage
            </span>
          </div>

          <div className="flex flex-col gap-3 max-w-4xl">
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl text-primary font-bold tracking-tight uppercase leading-[1.15]">
              MORE THAN COACHING.<br />
              <span className="text-secondary">A COMMITMENT TO YOUR FUTURE.</span>
            </h1>
            <p className="font-sans text-sm md:text-base lg:text-lg text-on-surface-variant leading-relaxed max-w-3xl">
              Founded to empower aspiring doctors, engineers, civil servants, and scholars across Tamil Nadu and India with unwavering scholastic distinction.
            </p>
          </div>

          {/* Campus Architecture Hero Card */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-lg bg-surface-container-highest border border-surface-container">
            <div className="relative w-full h-72 sm:h-96 lg:h-[460px]">
              <Image
                className="w-full h-full object-cover"
                alt="Compete NEET Academy Chidambaram Campus Signboard and Entrance"
                src="/compete-academy-signboard.webp"
                fill
                priority
                sizes="(max-width: 1440px) 100vw, 1440px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101b3d] via-[#101b3d]/50 to-transparent flex flex-col justify-end p-6 sm:p-8 lg:p-12">
                <div className="flex items-center gap-2 text-secondary-fixed mb-1">
                  <span className="material-symbols-outlined text-base">verified</span>
                  <span className="font-headline text-xs font-bold uppercase tracking-wider text-secondary-fixed">
                    Accredited Pedagogy Center • Compete NEET Academy
                  </span>
                </div>
                <p className="font-display text-xl sm:text-2xl lg:text-3xl text-surface font-bold tracking-tight">
                  Academic Campus & Learning Center
                </p>
              </div>
            </div>
          </div>

          {/* Key Academic Factlets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col items-center text-center shadow-sm border border-surface-container">
              <span className="font-display text-3xl sm:text-4xl text-primary font-bold">
                14+
              </span>
              <span className="font-sans text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-semibold mt-1">
                Years of Rigour
              </span>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col items-center text-center shadow-sm border border-surface-container">
              <span className="font-display text-3xl sm:text-4xl text-secondary font-bold">
                18,500+
              </span>
              <span className="font-sans text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-semibold mt-1">
                Selections Across India
              </span>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col items-center text-center shadow-sm border border-surface-container">
              <span className="font-display text-3xl sm:text-4xl text-primary font-bold">
                98.4%
              </span>
              <span className="font-sans text-xs sm:text-sm text-on-surface-variant uppercase tracking-wider font-semibold mt-1">
                Exam Readiness Quotient
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 2: OUR STORY & MISSION */}
      <section className="w-full py-10 sm:py-14 lg:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-sm">history_edu</span>
              <span className="font-headline text-xs font-bold uppercase tracking-wider text-secondary">
                Genesis & Purpose
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl text-primary font-bold tracking-tight">
              Bridging Pure Theory and High-Stakes Mastery
            </h2>
          </div>

          {/* Narrative block */}
          <div className="bg-surface-container-lowest p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm flex flex-col gap-4 border border-surface-container">
            <p className="font-sans text-sm sm:text-base md:text-[1.0625rem] text-on-surface leading-relaxed">
              In 2011, a council of veteran medical educators and civil service scholars recognized an acute educational divide: traditional curricula encouraged rote reproduction, while competitive national exams demanded nuanced synthesis, spatial problem-solving, and deep cognitive stamina.
            </p>
            <p className="font-sans text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
              Compete Academy was constituted in Chennai as an intellectual sanctuary. We re-engineered test preparation from high-stress cramming into an organized science of foundational clarity, empathetic mentorship, and unwavering academic integrity.
            </p>
          </div>

          {/* Three Foundational Pillars */}
          <div className="flex flex-col gap-4">
            <span className="font-headline text-xs font-bold uppercase tracking-wider text-on-surface-variant">
              The Three Foundational Pillars
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <div className="bg-surface-container-low p-6 rounded-2xl flex items-start gap-4 border border-surface-container shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary-container text-secondary-fixed flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">biotech</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-headline text-base sm:text-lg text-primary font-bold">
                    1. Academic Rigour
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                    Curated syllabus models engineered by doctors and IITians that dissect complex NEET physics and UPSC analytical frameworks without shortcuts.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-surface-container-low p-6 rounded-2xl flex items-start gap-4 border border-surface-container shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-headline text-base sm:text-lg text-primary font-bold">
                    2. Empathetic Mentorship
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                    Every student is assigned a dedicated scholastic mentor. Academic anxieties are systematically demystified through personalized check-ins.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-surface-container-low p-6 rounded-2xl flex items-start gap-4 border border-surface-container shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-primary text-secondary-fixed flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">balance</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-headline text-base sm:text-lg text-primary font-bold">
                    3. Uncompromising Integrity
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                    Transparent assessment logs, verifiable result registries, and ethical scholarly coaching that respects each candidate&rsquo;s cognitive journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION 3: FOUNDER & ACADEMIC LEADERSHIP */}
      <section className="w-full py-10 sm:py-14 lg:py-16 bg-primary-container text-surface">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 flex flex-col gap-8 sm:gap-10">
          {/* Section Eyebrow & Heading */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed" />
              <span className="font-headline text-xs font-bold uppercase tracking-wider text-secondary-fixed">
                Institutional Leadership
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl text-surface font-bold tracking-tight">
              Guided by Medical Professionals, Driven by Academic Experts
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-surface-variant/90 max-w-2xl leading-relaxed">
              Meet our visionary Founder and distinguished Academic Advisors dedicated to guiding aspirants toward medical and competitive examination excellence.
            </p>
          </div>

          {/* Founder Feature Card */}
          <div className="bg-surface-container-low/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 border border-surface/15 shadow-xl">
            {/* Founder Portrait Frame: Controlled 4:5 aspect ratio, 420-460px height on desktop, never stretched or horizontal banner */}
            <div className="relative w-64 sm:w-72 lg:w-[340px] aspect-[4/5] max-h-[460px] rounded-2xl overflow-hidden shrink-0 shadow-2xl border-2 border-secondary/50 bg-[#071126] ring-1 ring-secondary/20">
              <Image
                src="/compete-founder-karthikeyan.webp?v=3"
                alt="Portrait of Er. K.S. Karthikeyan, B.E., Founder of Compete NEET Academy"
                fill
                priority
                className="object-contain object-center p-1.5"
                sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 340px"
              />
            </div>

            <div className="flex flex-col min-w-0 flex-1 text-center lg:text-left justify-center h-full my-auto">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-secondary-fixed mb-1.5">
                <span className="material-symbols-outlined text-base">verified</span>
                <span className="font-headline text-xs font-bold uppercase tracking-wider">
                  Founder & Director
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-surface font-bold tracking-tight">
                Er. K.S. Karthikeyan, B.E.
              </h3>
              <span className="font-sans text-xs sm:text-sm text-secondary-fixed mt-1 font-semibold">
                Founder — Compete NEET Academy
              </span>
              <p className="font-sans text-xs sm:text-sm md:text-base text-surface-variant/90 leading-relaxed mt-4">
                Under the strategic stewardship of Er. K.S. Karthikeyan, Compete NEET Academy was established to deliver rigorous, student-centric competitive coaching. Emphasizing conceptual mastery from first principles and disciplined test conditioning, his vision ensures every aspirant receives dedicated academic and psychological support throughout their preparation journey.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mt-6 pt-5 border-t border-surface/10">
                <span className="px-3.5 py-1.5 rounded-full bg-surface/10 text-xs font-headline font-semibold text-surface border border-surface/10">
                  Concept-First Pedagogy
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-surface/10 text-xs font-headline font-semibold text-secondary-fixed border border-secondary/30">
                  Individual Student Mentoring
                </span>
              </div>
            </div>
          </div>

          {/* Academic Advisors Grid */}
          <div className="flex flex-col gap-4">
            <span className="font-headline text-xs font-bold uppercase tracking-wider text-secondary-fixed">
              Senior Academic Advisors
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Dr. S. Sathya */}
              <div className="bg-surface-container-low/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-surface/15 shadow-md">
                <div className="relative w-full max-w-[280px] sm:max-w-none sm:w-44 md:w-48 aspect-[4/5] rounded-xl overflow-hidden shrink-0 shadow-lg border border-secondary/40 bg-[#071126] ring-1 ring-secondary/20">
                  <Image
                    src="/compete-faculty-sathya.webp?v=4"
                    alt="Portrait of Dr. S. Sathya, M.B.B.S., M.S. (O.G.), Academic Advisor"
                    fill
                    priority
                    className="object-contain object-center p-1"
                    sizes="(max-width: 640px) 280px, 192px"
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1 text-center sm:text-left justify-center my-auto">
                  <span className="font-headline text-[0.6875rem] font-bold uppercase tracking-wider text-secondary-fixed">
                    Academic Advisor
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl text-surface font-bold mt-1">
                    Dr. S. Sathya
                  </h4>
                  <span className="font-sans text-xs text-slate-300 font-medium mt-0.5">
                    M.B.B.S., M.S. (O.G.), FFM.
                  </span>
                  <span className="font-sans text-xs text-secondary-fixed/90 font-medium">
                    A4 Group of Hospitals, Chennai
                  </span>
                  <p className="font-sans text-xs text-surface-variant/80 leading-relaxed mt-3">
                    Provides medical curricular guidance, high-yield NEET biology correlation, and empathetic candidate mentorship to sustain focus and composure.
                  </p>
                </div>
              </div>

              {/* Dr. M. Shanmugasundaram */}
              <div className="bg-surface-container-low/10 backdrop-blur-md rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row items-center sm:items-start gap-6 border border-surface/15 shadow-md">
                <div className="relative w-full max-w-[280px] sm:max-w-none sm:w-44 md:w-48 aspect-[4/5] rounded-xl overflow-hidden shrink-0 shadow-lg border border-secondary/40 bg-[#071126] ring-1 ring-secondary/20">
                  <Image
                    src="/compete-faculty-shanmugasundaram.webp?v=4"
                    alt="Portrait of Dr. M. Shanmugasundaram, M.B.B.S., M.S. Ortho, Academic Advisor"
                    fill
                    priority
                    className="object-contain object-center p-1"
                    sizes="(max-width: 640px) 280px, 192px"
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1 text-center sm:text-left justify-center my-auto">
                  <span className="font-headline text-[0.6875rem] font-bold uppercase tracking-wider text-secondary-fixed">
                    Academic Advisor
                  </span>
                  <h4 className="font-display text-xl sm:text-2xl text-surface font-bold mt-1">
                    Dr. M. Shanmugasundaram
                  </h4>
                  <span className="font-sans text-xs text-slate-300 font-medium mt-0.5">
                    M.B.B.S., M.S. Ortho
                  </span>
                  <span className="font-sans text-xs text-secondary-fixed/90 font-medium">
                    Senior Assistant Professor (MMC)
                  </span>
                  <p className="font-sans text-xs text-surface-variant/80 leading-relaxed mt-3">
                    Specialist academic mentor and Senior Assistant Professor at Madras Medical College, stewarding exam strategy and empirical analytical drills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION 4: CAMPUS & LEARNING ENVIRONMENT */}
      <section className="w-full py-10 sm:py-14 lg:py-16 bg-surface">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-base">apartment</span>
              <span className="font-headline text-xs font-bold uppercase tracking-wider text-secondary">
                The Learning Atmosphere
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl text-primary font-bold tracking-tight">
              Sanctuary of Scholastic Discipline
            </h2>
            <p className="font-sans text-xs sm:text-sm md:text-base text-on-surface-variant max-w-2xl leading-relaxed">
              Immersive infrastructure configured specifically to foster uninterrupted focus and peer collaboration.
            </p>
          </div>

          {/* Campus Visual Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Photo 1: Lecture Amphitheatre / Active Batch */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col border border-surface-container">
              <div className="relative w-full h-64 sm:h-72 bg-surface-container-high">
                <Image
                  className="w-full h-full object-cover"
                  alt="Real batch lecture classroom at Compete Academy with students and faculty mentor in active session"
                  src="/compete-academy-classroom.webp"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute top-4 left-4 bg-primary-container/90 text-surface text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm font-headline">
                  Live Academic Classroom
                </span>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <h3 className="font-headline text-base sm:text-lg lg:text-xl text-primary font-bold">
                  Dedicated Interactive Classrooms
                </h3>
                <p className="font-sans text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
                  Equipped with focused classroom seating engineered for intensive NEET and competitive exam mentoring.
                </p>
              </div>
            </div>

            {/* Photo 2: Central Reference Library */}
            <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col border border-surface-container">
              <div className="relative w-full h-64 sm:h-72 bg-surface-container-high">
                <Image
                  className="w-full h-full object-cover"
                  alt="Serene institutional library at Compete Academy with bookstacks and study carrels"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtp26TeMCgre9DoOflIzwDkSMk83qVBDLPSpWCv_pJP8dhPH0fp1DMRkQy6wYGm9tOXH3-g8PWT_pAr77UdgXI57VgFhfQlZGRdw3OauawDFDnX4H7uO9E7Xz2UirnWqvULl2HZMqP6lJfsS7rUn-fVDe_2ODgBEqMS93RnCUiszSosOnex88_t9UEVUzMHu0cRFal707C48RZ90qimsdWSPj4PrfseBysHD_Khp0"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <span className="absolute top-4 left-4 bg-secondary text-on-secondary text-xs font-semibold px-3 py-1.5 rounded-md shadow-sm font-headline">
                  Academic Reading Pods
                </span>
              </div>
              <div className="p-6 flex flex-col gap-2">
                <h3 className="font-headline text-base sm:text-lg lg:text-xl text-primary font-bold">
                  The Dr. Sarvepalli Reference Library
                </h3>
                <p className="font-sans text-xs sm:text-sm md:text-base text-on-surface-variant leading-relaxed">
                  Housing over 14,000 competitive exam volumes, past 30-year national solved question repositories, and silent carrels.
                </p>
              </div>
            </div>
          </div>

          {/* Campus Facilities Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-3 border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-2xl">air</span>
              <span className="font-headline text-xs sm:text-sm font-semibold text-on-surface">
                Climate-Controlled Pods
              </span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-3 border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-2xl">wifi</span>
              <span className="font-headline text-xs sm:text-sm font-semibold text-on-surface">
                Gigabit Portal Access
              </span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-3 border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-2xl">coffee</span>
              <span className="font-headline text-xs sm:text-sm font-semibold text-on-surface">
                Nutritious Lounge
              </span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-3 border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-2xl">health_and_safety</span>
              <span className="font-headline text-xs sm:text-sm font-semibold text-on-surface">
                On-Campus Medical Desk
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION 5: INSTITUTIONAL CLOSING STATEMENT & CALL TO ACTION */}
      <section className="w-full py-12 sm:py-16 lg:py-20 bg-primary-container text-surface">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 flex flex-col items-center text-center gap-6 sm:gap-8">
          {/* Crest Icon Emblem */}
          <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center shadow-lg border border-secondary/30">
            <span className="material-symbols-outlined text-secondary-fixed text-3xl">school</span>
          </div>

          {/* Bold Institutional Motto */}
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="font-headline text-xs text-secondary-fixed tracking-wider uppercase font-bold">
              The Compete Academy Credo
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-surface font-bold tracking-tight">
              DREAM. PREPARE. BECOME.
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg text-surface-variant/90 leading-relaxed mt-2">
              Your aspirations deserve the rigorous stewardship of Tamil Nadu&rsquo;s most esteemed competitive examination faculty.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 pt-2">
            <button
              onClick={() => setCampusModalOpen(true)}
              className="py-3.5 sm:py-4 px-6 sm:px-8 bg-secondary text-on-secondary hover:bg-secondary-fixed-dim font-headline text-sm sm:text-base font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
              id="btn-schedule-visit"
            >
              <span className="material-symbols-outlined text-xl">event_seat</span>
              <span>Schedule Campus Visit</span>
            </button>
            <a
              href="tel:+919476543210"
              className="py-3.5 sm:py-4 px-6 sm:px-8 bg-surface/10 hover:bg-surface/15 text-surface font-headline text-sm sm:text-base font-bold rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-colors border border-surface/20"
            >
              <span className="material-symbols-outlined text-secondary-fixed text-xl">call</span>
              <span>Talk to Academic Dean</span>
            </a>
          </div>

          {/* Campus Address & Timing Badges */}
          <div className="w-full max-w-xl bg-surface/5 rounded-2xl p-6 flex flex-col gap-3 text-left mt-4 border border-surface/10">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary-fixed text-xl shrink-0 mt-0.5">
                location_on
              </span>
              <div className="flex flex-col">
                <span className="font-headline text-xs sm:text-sm text-surface font-bold">
                  Central Administrative Campus
                </span>
                <span className="font-sans text-xs sm:text-sm text-surface-variant/80 mt-0.5">
                  Compete Towers, 482 Anna Salai, Guindy, Chennai - 600032
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-3 border-t border-surface/10">
              <span className="material-symbols-outlined text-secondary-fixed text-xl shrink-0">
                schedule
              </span>
              <span className="font-sans text-xs sm:text-sm text-surface-variant/80">
                Admissions Desk: Mon – Sat, 8:00 AM – 7:30 PM
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Tour Modal */}
      {campusModalOpen && (
        <CampusTourModal
          isOpen={campusModalOpen}
          onClose={() => setCampusModalOpen(false)}
        />
      )}
    </div>
  );
}