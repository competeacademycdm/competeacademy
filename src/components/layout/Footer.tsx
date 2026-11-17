'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { useLanguage } from '@/i18n';

export function Footer() {
  const { tr, language } = useLanguage();

  return (
    <footer className="w-full bg-[#0B142B] text-white pt-10 sm:pt-12 pb-24 md:pb-14 border-t border-white/10">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col gap-8 sm:gap-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <BrandLogo size="lg" theme="dark" />
            <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              {tr.footer.brandDesc}
            </p>
          </div>

          {/* Dedicated Course Routes Column */}
          <div className="md:col-span-3 flex flex-col gap-2 font-sans text-xs sm:text-sm">
            <span className="font-mono font-bold text-xs text-[#E0B85C] uppercase tracking-wider mb-1">
              {tr.footer.academicProgramsTitle}
            </span>
            <div className="flex flex-col gap-2 text-slate-300">
              <Link
                href="/neet"
                className="hover:text-[#E0B85C] transition-colors flex items-center gap-1.5"
              >
                <span>› {tr.navigation.destinations.neet.label}</span>
              </Link>
              <Link
                href="/jee"
                className="hover:text-[#E0B85C] transition-colors flex items-center gap-1.5"
              >
                <span>› {tr.navigation.destinations.jee.label}</span>
              </Link>
              <Link
                href="/upsc"
                className="hover:text-[#E0B85C] transition-colors flex items-center gap-1.5"
              >
                <span>› {tr.navigation.destinations.upsc.label}</span>
              </Link>
              <Link
                href="/foundation"
                className="hover:text-[#E0B85C] transition-colors flex items-center gap-1.5"
              >
                <span>› {tr.navigation.destinations.foundation.label}</span>
              </Link>
              <Link
                href="/tnpsc"
                className="hover:text-[#E0B85C] transition-colors flex items-center gap-1.5"
              >
                <span>› {tr.navigation.destinations.tnpsc.label}</span>
              </Link>
            </div>
          </div>

          {/* Institutional Links Column */}
          <div className="md:col-span-2 flex flex-col gap-2 font-sans text-xs sm:text-sm">
            <span className="font-mono font-bold text-xs text-[#E0B85C] uppercase tracking-wider mb-1">
              {tr.footer.institutionalTitle}
            </span>
            <div className="flex flex-col gap-2 text-slate-300">
              <Link
                href="/"
                className="hover:text-[#E0B85C] transition-colors flex items-center gap-1.5"
              >
                <span>{tr.navigation.home}</span>
              </Link>
              <Link
                href="/resources"
                className="hover:text-[#E0B85C] transition-colors flex items-center gap-1.5"
              >
                <span>{tr.navigation.resources}</span>
              </Link>
              <Link
                href="/about"
                className="hover:text-[#E0B85C] transition-colors flex items-center gap-1.5"
              >
                <span>{tr.navigation.about}</span>
              </Link>
              <Link
                href="/admin"
                className="hover:text-[#E0B85C] transition-colors flex items-center gap-1.5 text-amber-300 font-semibold"
              >
                <span>{language === 'TA' ? 'நிர்வாகக் கன்சோல் (Admin)' : 'Admin Console'}</span>
              </Link>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-3 flex flex-col gap-2.5 font-sans text-xs sm:text-sm text-slate-300">
            <span className="font-mono font-bold text-xs text-[#E0B85C] uppercase tracking-wider mb-1">
              {tr.footer.campusContactTitle}
            </span>
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[#E0B85C] text-base shrink-0 mt-0.5">
                location_on
              </span>
              <span>
                {tr.footer.address}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#E0B85C] text-base shrink-0">
                mail
              </span>
              <a
                href="mailto:info@competeacademy.in"
                className="hover:text-[#E0B85C] transition-colors"
              >
                info@competeacademy.in
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#E0B85C] text-base shrink-0">
                call
              </span>
              <a
                href="tel:+919476543210"
                className="hover:text-[#E0B85C] transition-colors font-semibold"
              >
                +91 94765 43210
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <span className="material-symbols-outlined text-[#E0B85C] text-base shrink-0">
                schedule
              </span>
              <span>{tr.footer.hours}</span>
            </div>
          </div>
        </div>

        {/* Hairline divider & Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center font-sans">
          <p>© {tr.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <span className="text-[#E0B85C] font-medium">
              {language === 'TA'
                ? 'கல்வித் தூய்மை • மேன்மை • ஒழுக்கம்'
                : 'Academic Integrity • Excellence • Ethics'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
