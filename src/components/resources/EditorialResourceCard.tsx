'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ExamResourceItem } from '@/data/examResources';
import { useLanguage } from '@/i18n';
import {
  localizeCategory,
  localizeSubject,
  localizeMedium,
  localizeClassLevel,
} from '@/i18n/dynamicContentLocalization';

export interface UnifiedResourceCardItem {
  id: string;
  title: string;
  subject: string;
  paperType: string;
  authority: string;
  sourceType: string;
  officialSourceUrl?: string;
  isDirectDownload?: boolean;
  notes?: string | null;
  description?: string | null;
  medium?: string | null;
  sessionOrPhase?: string | null;
  language?: string | null;
  examName?: string;
  classLevel?: string | null;
  chapter?: string | null;
  academicYear?: string | null;
  category?: string;
}

interface EditorialResourceCardProps {
  item: UnifiedResourceCardItem | ExamResourceItem;
  onSelect: (item: UnifiedResourceCardItem | ExamResourceItem) => void;
}

const localizeAuthority = (auth: string | undefined, isTa: boolean): string => {
  if (!auth) return '';
  if (!isTa) return auth;
  if (auth.includes('NTA') || auth.includes('National Testing Agency')) {
    if (auth.includes('IIT')) return 'தேசியத் தேர்வு முகமை (NTA) & ஐ.ஐ.டி (IITs)';
    if (auth.includes('NMC') || auth.includes('Medical')) return 'தேசியத் தேர்வு முகமை (NTA) & NMC';
    return 'தேசியத் தேர்வு முகமை (NTA)';
  }
  if (auth.includes('NMC') || auth.includes('Medical Commission')) return 'தேசிய மருத்துவ ஆணையம் (NMC)';
  if (auth.includes('UPSC') || auth.includes('Union Public Service')) return 'மத்திய அரசுப் பணியாளர் தேர்வாணையம் (UPSC)';
  if (auth.includes('TNPSC') || auth.includes('Tamil Nadu Public Service')) return 'தமிழ்நாடு அரசுப் பணியாளர் தேர்வாணையம் (TNPSC)';
  if (auth.includes('NCERT') || auth.includes('CBSE') || auth.includes('Foundation') || auth.includes('State Board')) return 'என்.சி.இ.ஆர்.டி & மாநிலக் கல்வி வாரியம்';
  return auth;
};

export function EditorialResourceCard({
  item,
  onSelect,
}: EditorialResourceCardProps) {
  const { language, isTamil } = useLanguage();
  const cardRef = useRef<HTMLElement>(null);
  const arrowIconRef = useRef<HTMLSpanElement>(null);

  const paperType = item.paperType;
  const isKey = paperType === 'Final Answer Key' || paperType === 'Official Answer Key' || paperType === 'Answer Keys';
  const isPaper = paperType === 'Question Paper' || paperType === 'Question Papers';
  const isNotes = paperType === 'Study Materials' || paperType === 'PDF Notes';

  const unifiedItem = item as UnifiedResourceCardItem;

  // Subdued, highly professional micro-interactions
  useEffect(() => {
    const card = cardRef.current;
    const arrow = arrowIconRef.current;
    if (!card) return;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const onMouseEnter = () => {
      gsap.to(card, {
        y: -3,
        borderColor: '#C69A3A',
        boxShadow: '0 10px 24px -6px rgba(11, 20, 43, 0.08), 0 2px 6px -1px rgba(11, 20, 43, 0.04)',
        duration: 0.22,
        ease: 'power2.out',
      });
      if (arrow) {
        gsap.to(arrow, {
          x: 2.5,
          y: -1.5,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        borderColor: '#E8E2D5',
        boxShadow: '0 1px 2px rgba(11, 20, 43, 0.03)',
        duration: 0.22,
        ease: 'power2.out',
      });
      if (arrow) {
        gsap.to(arrow, {
          x: 0,
          y: 0,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    };

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mouseleave', onMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', onMouseEnter);
      card.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      onClick={() => onSelect(item)}
      className="group relative bg-[#FFFFFF] rounded-xl border border-[#E8E2D5] p-5 sm:p-6 transition-all duration-150 flex flex-col justify-between cursor-pointer select-none shadow-[0_1px_2px_rgba(11,20,43,0.03)] hover:shadow-md hover:border-[#C69A3A] w-full min-w-0 h-full"
    >
      {/* -------------------------------------------------------------
          1. TOP METADATA BAR
          Clean editorial header without year tags
          ------------------------------------------------------------- */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#F0EBE0] w-full min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-slate-600 font-inter text-xs min-w-0">
          {/* Class Level or Exam Name Tag */}
          <span className="font-manrope font-bold uppercase tracking-wider text-[0.6875rem] text-[#7C5806] shrink-0">
            {unifiedItem.classLevel
              ? localizeClassLevel(unifiedItem.classLevel, language)
              : unifiedItem.examName || 'Compete Academy'}
          </span>
          <span className="text-slate-300 font-inter shrink-0">&bull;</span>
          {/* Text-based document type indicator */}
          <span
            className={`font-manrope text-[0.6875rem] font-semibold tracking-wide shrink-0 ${
              isKey
                ? 'text-amber-800'
                : isPaper
                ? 'text-blue-900'
                : isNotes
                ? 'text-emerald-900'
                : 'text-purple-900'
            }`}
          >
            {localizeCategory(paperType, language)}
          </span>
          {unifiedItem.chapter && (
            <>
              <span className="text-slate-300 font-inter shrink-0">&bull;</span>
              <span className="text-slate-500 font-inter text-[0.6875rem] truncate max-w-[140px]">
                {unifiedItem.chapter}
              </span>
            </>
          )}
        </div>

        {/* Minimal Official Verified Marker */}
        <div className="flex items-center gap-1 font-inter text-[0.6875rem] font-medium text-emerald-800 shrink-0">
          <span className="material-symbols-outlined text-[13px] text-emerald-700">verified</span>
          <span className="hidden sm:inline">
            {isTamil ? 'அங்கீகரிக்கப்பட்ட ஆவணம்' : 'Official Publication'}
          </span>
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. MAIN CONTENT
          Authoritative document title in Playfair Display serif
          Structured flexible area to keep footer perfectly pinned
          ------------------------------------------------------------- */}
      <div className="pt-3.5 pb-4 flex-1 flex flex-col justify-between gap-3 w-full min-w-0">
        <div className="flex flex-col gap-2 min-w-0">
          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#0B142B] leading-snug group-hover:text-[#7C5806] transition-colors break-words line-clamp-2">
            {'title' in item && item.title ? item.title : localizeSubject(item.subject, language)}
          </h3>

          {/* Secondary Context Line: Authority, Session, Language in Inter */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 font-inter">
            <span>
              {isTamil ? 'ஆணையம்: ' : 'Authority: '}
              <strong className="text-slate-800 font-medium">{localizeAuthority(item.authority, isTamil)}</strong>
            </span>
            {unifiedItem.sessionOrPhase && (
              <>
                <span className="text-slate-300">/</span>
                <span className="text-slate-700 font-medium">{unifiedItem.sessionOrPhase}</span>
              </>
            )}
            {(unifiedItem.language || unifiedItem.medium) && (
              <>
                <span className="text-slate-300">/</span>
                <span>
                  {isTamil ? 'மொழி: ' : 'Medium: '}
                  {localizeMedium(unifiedItem.language || unifiedItem.medium, language)}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Optional concise academic notes in DM Sans */}
        {(unifiedItem.notes || unifiedItem.description) && (
          <p className="font-dmsans text-xs text-slate-600 line-clamp-2 leading-relaxed mt-auto pt-1">
            {unifiedItem.notes || unifiedItem.description}
          </p>
        )}
      </div>

      {/* -------------------------------------------------------------
          3. FOOTER AREA
          Structured IBM Plex Sans source info & Primary Manrope Action
          Pinned to bottom across all sibling cards
          ------------------------------------------------------------- */}
      <div className="mt-auto pt-3.5 border-t border-[#F0EBE0] flex items-center justify-between gap-3 w-full min-w-0">
        <span className="text-[0.6875rem] font-ibm text-slate-400 truncate max-w-[180px] sm:max-w-[240px]">
          {isTamil ? 'மூலம்: ' : 'Source: '}
          <span className="text-slate-600">{item.sourceType}</span>
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
          className="px-4 py-2 rounded-md font-manrope text-xs font-bold bg-[#0B142B] hover:bg-[#182A59] text-white flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 border border-[#0B142B] shadow-xs"
        >
          <span>
            {item.isDirectDownload
              ? isTamil ? 'பதிவிறக்கு' : 'Download'
              : isPaper
              ? isTamil ? 'வினாத்தாளைக் காண்க' : 'View Paper'
              : isKey
              ? isTamil ? 'விடைக்குறிப்பைக் காண்க' : 'View Answer Key'
              : isNotes
              ? isTamil ? 'பாடக் குறிப்பைக் காண்க' : 'View Study Notes'
              : isTamil ? 'ஆவணத்தைத் திற' : 'Open Document'}
          </span>
          <span
            ref={arrowIconRef}
            className="material-symbols-outlined text-[13px] text-[#C69A3A] transition-transform"
          >
            {item.isDirectDownload ? 'download' : 'arrow_outward'}
          </span>
        </button>
      </div>
    </article>
  );
}
