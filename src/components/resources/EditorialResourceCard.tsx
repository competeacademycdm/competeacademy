'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ExamResourceItem } from '@/data/examResources';

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

export function EditorialResourceCard({
  item,
  onSelect,
}: EditorialResourceCardProps) {
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
      className="group relative bg-[#FFFFFF] rounded-md border border-[#E8E2D5] p-5 sm:p-6 transition-colors duration-150 flex flex-col justify-between cursor-pointer select-none shadow-[0_1px_2px_rgba(11,20,43,0.03)]"
    >
      {/* -------------------------------------------------------------
          1. TOP METADATA BAR
          Clean editorial header without year tags
          ------------------------------------------------------------- */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#F0EBE0]">
        <div className="flex flex-wrap items-center gap-2 text-slate-600 font-inter text-xs">
          {/* Class Level or Exam Name Tag */}
          <span className="font-manrope font-bold uppercase tracking-wider text-[0.6875rem] text-[#7C5806]">
            {unifiedItem.classLevel || unifiedItem.examName || 'Compete Academy'}
          </span>
          <span className="text-slate-300 font-inter">&bull;</span>
          {/* Text-based document type indicator */}
          <span
            className={`font-manrope text-[0.6875rem] font-semibold tracking-wide ${
              isKey
                ? 'text-amber-800'
                : isPaper
                ? 'text-blue-900'
                : isNotes
                ? 'text-emerald-900'
                : 'text-purple-900'
            }`}
          >
            {paperType}
          </span>
          {unifiedItem.chapter && (
            <>
              <span className="text-slate-300 font-inter">&bull;</span>
              <span className="text-slate-500 font-inter text-[0.6875rem] truncate max-w-[140px]">
                {unifiedItem.chapter}
              </span>
            </>
          )}
        </div>

        {/* Minimal Official Verified Marker */}
        <div className="flex items-center gap-1 font-inter text-[0.6875rem] font-medium text-emerald-800 shrink-0">
          <span className="material-symbols-outlined text-[13px] text-emerald-700">verified</span>
          <span className="hidden sm:inline">Official Publication</span>
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. MAIN CONTENT
          Authoritative document title in Playfair Display serif
          ------------------------------------------------------------- */}
      <div className="pt-3.5 pb-4 flex flex-col gap-2">
        {/* Title */}
        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B142B] leading-snug group-hover:text-[#7C5806] transition-colors">
          {'title' in item && item.title ? item.title : item.subject}
        </h3>

        {/* Secondary Context Line: Authority, Session, Language in Inter */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 font-inter">
          <span>Authority: <strong className="text-slate-800 font-medium">{item.authority}</strong></span>
          {unifiedItem.sessionOrPhase && (
            <>
              <span className="text-slate-300">/</span>
              <span className="text-slate-700 font-medium">{unifiedItem.sessionOrPhase}</span>
            </>
          )}
          {(unifiedItem.language || unifiedItem.medium) && (
            <>
              <span className="text-slate-300">/</span>
              <span>Medium: {unifiedItem.language || unifiedItem.medium}</span>
            </>
          )}
        </div>

        {/* Optional concise academic notes in DM Sans */}
        {(unifiedItem.notes || unifiedItem.description) && (
          <p className="font-dmsans text-xs text-slate-600 line-clamp-2 leading-relaxed mt-1">
            {unifiedItem.notes || unifiedItem.description}
          </p>
        )}
      </div>

      {/* -------------------------------------------------------------
          3. FOOTER AREA
          Structured IBM Plex Sans source info & Primary Manrope Action
          ------------------------------------------------------------- */}
      <div className="pt-3.5 border-t border-[#F0EBE0] flex items-center justify-between gap-3">
        <span className="text-[0.6875rem] font-ibm text-slate-400 truncate max-w-[190px] sm:max-w-[260px]">
          Source: <span className="text-slate-600">{item.sourceType}</span>
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(item);
          }}
          className="px-4 py-2 rounded-md font-manrope text-xs font-bold bg-[#0B142B] hover:bg-[#182A59] text-white flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 border border-[#0B142B]"
        >
          <span>
            {item.isDirectDownload
              ? 'Download'
              : isPaper
              ? 'View Paper'
              : isKey
              ? 'View Answer Key'
              : isNotes
              ? 'View Study Notes'
              : 'Open Document'}
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
