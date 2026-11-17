'use client';

import React, { useState, useMemo, useRef, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ExamCategory,
  EXAM_AUTHORITIES,
  ExamResourceItem,
} from '@/data/examResources';
import {
  FoundationClassLevel,
  FOUNDATION_SUBJECT_MATRIX,
} from '@/data/foundationResources';
import { ResourceVerificationModal } from '@/components/resources/ResourceVerificationModal';
import { EditorialResourceCard, UnifiedResourceCardItem } from '@/components/resources/EditorialResourceCard';
import { useLanguage } from '@/i18n';
import {
  localizeSubject,
  localizeClassLevel,
} from '@/i18n/dynamicContentLocalization';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORY_TABS: Record<
  ExamCategory,
  {
    title: string;
    authorityName: string;
    subTitle: string;
    code: string;
  }
> = {
  neet: {
    title: 'NEET UG',
    authorityName: 'NTA & NMC',
    subTitle: 'Undergraduate Medical Sciences',
    code: 'MED',
  },
  jee: {
    title: 'JEE Main & Advanced',
    authorityName: 'NTA & IIT JAB',
    subTitle: 'Joint Entrance Engineering',
    code: 'ENG',
  },
  upsc: {
    title: 'UPSC Civil Services',
    authorityName: 'Union Public Service Commission',
    subTitle: 'National Executive & Administrative',
    code: 'CSE',
  },
  tnpsc: {
    title: 'TNPSC Group Services',
    authorityName: 'Tamil Nadu Public Service Commission',
    subTitle: 'State Administrative Cadres',
    code: 'STA',
  },
  foundation: {
    title: 'Foundation Classes',
    authorityName: 'NCERT, CBSE & State Board',
    subTitle: 'Classes 6th to 12th Academic Mastery',
    code: 'FND',
  },
};

const CLASS_LIST: FoundationClassLevel[] = [
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

const LOCALIZED_AUTHORITIES_TA: Record<
  ExamCategory,
  { name: string; body: string; description: string }
> = {
  neet: {
    name: 'நீட் (NEET UG)',
    body: 'தேசியத் தேர்வு முகமை (NTA) & தேசிய மருத்துவ ஆணையம் (NMC)',
    description:
      'இளநிலை மருத்துவப் படிப்பு (MBBS/BDS) சேர்க்கைக்கான அகில இந்திய நுழைவுத் தேர்வு வினாத்தாள்கள், அதிகாரப்பூர்வ விடைக் குறிப்புகள் மற்றும் பாடத்திட்ட ஆவணக் காப்பகம்.',
  },
  jee: {
    name: 'ஜே.இ.இ முதன்மை & மேம்பட்ட தேர்வு (JEE Main & Advanced)',
    body: 'தேசியத் தேர்வு முகமை (NTA), ஐ.ஐ.டி கூட்டு சேர்க்கை வாரியம் (JAB) & JoSAA',
    description:
      'ஐ.ஐ.டி (IIT), என்.ஐ.டி (NIT) மற்றும் முதன்மைப் பொறியியல் கல்வி நிறுவனங்களின் சேர்க்கைக்கான அதிகாரப்பூர்வ கணினி வழித் தேர்வு வினாத்தாள்கள் மற்றும் விடைக் குறிப்புகள்.',
  },
  upsc: {
    name: 'குடிமைப் பணிகள் தேர்வு (UPSC Civil Services)',
    body: 'மத்திய அரசுப் பணியாளர் தேர்வாணையம் (UPSC)',
    description:
      'ஐ.ஏ.எஸ் (IAS), ஐ.பி.எஸ் (IPS), ஐ.எஃப்.எஸ் (IFS) உள்ளிட்ட உயரிய தேசியப் பணிகளுக்கான முதல்நிலை மற்றும் முதன்மைத் தேர்வு அதிகாரப்பூர்வ வினாத்தாள்கள்.',
  },
  tnpsc: {
    name: 'குரூப் பணிகள் தேர்வு (TNPSC Group I, II, IV & VAO)',
    body: 'தமிழ்நாடு அரசுப் பணியாளர் தேர்வாணையம் (TNPSC)',
    description:
      'துணை ஆட்சியர், டி.எஸ்.பி, வி.ஏ.ஓ உள்ளிட்ட தமிழ்நாடு அரசு நிர்வாகப் பணிகளுக்கான சமச்சீர் கல்வி பொதுத் தமிழ் மற்றும் பொது அறிவு வினாத்தாள்கள்.',
  },
  foundation: {
    name: 'பள்ளி அடிப்படைக் கல்வி (Classes 6th to 12th)',
    body: 'என்.சி.இ.ஆர்.டி (NCERT), சி.பி.எஸ்.இ (CBSE) & தமிழ்நாடு அரசுப் பள்ளிக் கல்வித்துறை',
    description:
      '6 முதல் 12-ஆம் வகுப்பு மாணவர்களுக்கான சமச்சீர் கல்வி மற்றும் சி.பி.எஸ்.இ வாரியத் தேர்வு வினா வங்கிகள், பாடக் குறிப்புகள் மற்றும் ஒலிம்பியாட் வழிகாட்டிகள்.',
  },
};

interface DbMaterialItem {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  course: string;
  category: string;
  material_type: string;
  class_level?: string | null;
  chapter?: string | null;
  academic_year?: string | null;
  medium?: string | null;
  file_url: string | null;
  file_name: string | null;
}

function ExamResourcesHubContent() {
  const { tr, isTamil, language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);
  const resourceGridRef = useRef<HTMLDivElement>(null);

  // Active examination category
  const [activeCategory, setActiveCategory] = useState<ExamCategory>(() => {
    const cat = searchParams.get('category') || searchParams.get('stream');
    if (cat === 'neet' || cat === 'jee' || cat === 'upsc' || cat === 'tnpsc' || cat === 'foundation') {
      return cat as ExamCategory;
    }
    return 'neet';
  });

  // Foundation-specific states
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Generic filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedSection, setSelectedSection] = useState<string>('all'); // 'all', 'notes', 'qp', 'keys', 'syllabus'
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  // Admin database materials
  const [dbMaterials, setDbMaterials] = useState<DbMaterialItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Centralized OTP Verification Modal
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [pendingResource, setPendingResource] = useState<{
    id: string;
    title: string;
    format?: string;
    size?: string;
    type?: string;
    examCategory?: string;
    accessMethod?: 'academy_download' | 'external_link';
    destinationUrl?: string;
    authority?: string;
  } | null>(null);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (text: string) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Fetch published materials from authoritative SQLite database
  useEffect(() => {
    let isMounted = true;
    async function loadMaterials() {
      setLoading(true);
      try {
        // Primary: Dedicated public materials endpoint (no admin middleware or adblocker issues)
        let res = await fetch('/api/resources/materials', { cache: 'no-store' });
        if (!res.ok) {
          // Secondary fallback: Admin public endpoint
          res = await fetch('/api/admin/materials?public=true', { cache: 'no-store' });
        }
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.success && Array.isArray(data.materials)) {
            setDbMaterials(data.materials);
          }
        }
      } catch (err) {
        console.error('Failed to load published materials:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadMaterials();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectCategory = (cat: ExamCategory) => {
    setActiveCategory(cat);
    setSelectedYear('all');
    setSelectedSection('all');
    setSelectedClass('all');
    setSelectedSubject('all');
    setSelectedLanguage('all');
    setSearchQuery('');
    router.replace(`/resources?category=${cat}`, { scroll: false });
  };

  const authority = EXAM_AUTHORITIES[activeCategory];

  // Dynamic available subjects based on selected class in Foundation Classes
  const availableFoundationSubjects = useMemo(() => {
    if (selectedClass !== 'all') {
      return FOUNDATION_SUBJECT_MATRIX[selectedClass as FoundationClassLevel] || [];
    }
    // All unique subjects across all classes
    const set = new Set<string>();
    Object.values(FOUNDATION_SUBJECT_MATRIX).forEach((subjects) => {
      subjects.forEach((s) => set.add(s));
    });
    return Array.from(set).sort();
  }, [selectedClass]);

  // Unified pool of resources loaded exclusively from the database
  const activeResourcePool = useMemo(() => {
    let targetCourse = '';
    if (activeCategory === 'foundation') targetCourse = 'Foundation Classes';
    else if (activeCategory === 'neet') targetCourse = 'NEET Medical';
    else if (activeCategory === 'jee') targetCourse = 'JEE Main & Advanced';
    else if (activeCategory === 'upsc') targetCourse = 'UPSC Civil Services';
    else if (activeCategory === 'tnpsc') targetCourse = 'TNPSC State Services';

    return dbMaterials
      .filter((m) => {
        if (activeCategory === 'foundation') {
          return m.course === 'Foundation Classes' || m.course === 'Foundation' || Boolean(m.class_level);
        }
        return m.course === targetCourse;
      })
      .map((m) => {
        let section = 'Study Materials';
        if (m.category === 'pyq') section = 'Question Papers';
        else if (m.category === 'mocks') section = 'Answer Keys';
        else if (m.category === 'clinics') section = 'Syllabus';

        const isDirect = Boolean(m.file_url && m.file_url.startsWith('/uploads/'));
        const authority = activeCategory === 'foundation'
          ? 'Compete Academy Foundation Faculty'
          : activeCategory === 'neet'
          ? 'National Testing Agency (NTA)'
          : activeCategory === 'jee'
          ? 'NTA & Joint Admission Board (IIT JAB)'
          : activeCategory === 'upsc'
          ? 'Union Public Service Commission (UPSC)'
          : 'Tamil Nadu Public Service Commission (TNPSC)';

        const sourceType = isDirect ? 'Faculty Verified Document' : 'Official Government Archive';

        return {
          id: m.id,
          title: m.title,
          subject: m.subject,
          paperType: m.material_type || section,
          authority,
          sourceType,
          officialSourceUrl: m.file_url || undefined,
          isDirectDownload: isDirect,
          notes: m.description,
          description: m.description,
          language: m.medium || 'English',
          medium: m.medium || 'English',
          classLevel: m.class_level || undefined,
          chapter: m.chapter || undefined,
          academicYear: m.academic_year || undefined,
          sessionOrPhase: m.chapter || undefined,
          category: activeCategory,
          examName: targetCourse,
        } as UnifiedResourceCardItem;
      });
  }, [activeCategory, dbMaterials]);

  // Distinct available years
  const availableYears = useMemo(() => {
    const years = activeResourcePool
      .map((r) => r.academicYear)
      .filter((y): y is string => Boolean(y));
    return Array.from(new Set(years)).sort().reverse();
  }, [activeResourcePool]);

  // Section counters for the tabs
  const sectionCounts = useMemo(() => {
    return {
      all: activeResourcePool.length,
      notes: activeResourcePool.filter(
        (r) =>
          r.paperType.toLowerCase().includes('study') ||
          r.paperType.toLowerCase().includes('notes')
      ).length,
      qp: activeResourcePool.filter(
        (r) =>
          r.paperType.toLowerCase().includes('question') ||
          r.paperType.toLowerCase().includes('paper')
      ).length,
      keys: activeResourcePool.filter(
        (r) =>
          r.paperType.toLowerCase().includes('key') ||
          r.paperType.toLowerCase().includes('solution')
      ).length,
      syllabus: activeResourcePool.filter(
        (r) =>
          r.paperType.toLowerCase().includes('syllabus') ||
          r.paperType.toLowerCase().includes('info')
      ).length,
    };
  }, [activeResourcePool]);

  // Filtered resource list
  const filteredResources = useMemo(() => {
    return activeResourcePool.filter((item) => {
      // 1. Foundation Class Filter
      if (activeCategory === 'foundation') {
        if (selectedClass !== 'all' && item.classLevel !== selectedClass) {
          return false;
        }
        if (selectedSubject !== 'all' && item.subject !== selectedSubject) {
          return false;
        }
      }

      // 2. Year Filter
      if (selectedYear !== 'all' && item.academicYear !== selectedYear) {
        return false;
      }

      // 3. Section Category Tab Filter
      if (selectedSection !== 'all') {
        const pType = item.paperType.toLowerCase();
        if (selectedSection === 'notes' && !pType.includes('study') && !pType.includes('notes')) {
          return false;
        }
        if (selectedSection === 'qp' && !pType.includes('question') && !pType.includes('paper')) {
          return false;
        }
        if (selectedSection === 'keys' && !pType.includes('key') && !pType.includes('solution')) {
          return false;
        }
        if (selectedSection === 'syllabus' && !pType.includes('syllabus') && !pType.includes('info')) {
          return false;
        }
      }

      // 4. Medium Filter
      if (selectedLanguage !== 'all' && item.language && !item.language.toLowerCase().includes(selectedLanguage.toLowerCase())) {
        return false;
      }

      // 5. Search Query Filter
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSubject = item.subject.toLowerCase().includes(q);
        const matchesClass = item.classLevel?.toLowerCase().includes(q);
        const matchesChapter = item.chapter?.toLowerCase().includes(q);
        const matchesYear = item.academicYear?.toLowerCase().includes(q);
        const matchesNotes = item.notes?.toLowerCase().includes(q);
        const matchesType = item.paperType.toLowerCase().includes(q);

        return (
          matchesTitle ||
          matchesSubject ||
          Boolean(matchesClass) ||
          Boolean(matchesChapter) ||
          Boolean(matchesYear) ||
          Boolean(matchesNotes) ||
          matchesType
        );
      }

      return true;
    });
  }, [activeResourcePool, activeCategory, selectedClass, selectedSubject, selectedYear, selectedSection, selectedLanguage, searchQuery]);

  // Open centralized verification modal
  const handleResourceClick = (item: UnifiedResourceCardItem | ExamResourceItem) => {
    const u = item as UnifiedResourceCardItem;
    if (!u.officialSourceUrl) {
      triggerToast('This resource is currently undergoing faculty archival review. Please check back shortly.');
      return;
    }
    setPendingResource({
      id: u.id,
      title: `${u.classLevel || u.examName || 'Document'} — ${u.title}`,
      format: u.paperType,
      size: u.sourceType,
      type: u.paperType.toLowerCase().includes('question') ? 'pyq' : 'materials',
      examCategory: activeCategory,
      accessMethod: u.isDirectDownload ? 'academy_download' : 'external_link',
      destinationUrl: u.officialSourceUrl,
      authority: u.authority,
    });
    setVerificationModalOpen(true);
  };

  const handlePortalClick = (portalName: string, portalUrl: string) => {
    setPendingResource({
      id: `${activeCategory}-official-portal`,
      title: `${authority.name} — ${portalName}`,
      format: 'Official Commission Portal',
      size: 'Government Gateway',
      type: 'portal',
      examCategory: activeCategory,
      accessMethod: 'external_link',
      destinationUrl: portalUrl,
      authority: authority.body,
    });
    setVerificationModalOpen(true);
  };

  const handleVerifiedAccess = (result: {
    accessMethod: 'academy_download' | 'external_link';
    url: string;
  }) => {
    if (result.accessMethod === 'external_link') {
      triggerToast('Verification verified. Opening official document...');
      window.open(result.url, '_blank', 'noopener,noreferrer');
    } else {
      triggerToast('Verification verified. Initiating download...');
      const link = document.createElement('a');
      link.href = result.url;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // GSAP: Refined, subtle page load entrance
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-header-element', {
        opacity: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // GSAP: Restrained staggered reveal of cards
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = resourceGridRef.current?.querySelectorAll('article');
    if (cards && cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          stagger: 0.03,
          ease: 'power2.out',
        }
      );
    }
  }, [activeCategory, selectedClass, selectedSubject, selectedYear, selectedSection, selectedLanguage]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full min-h-screen bg-[#F8F6EF] text-[#0B142B]"
    >
      {/* =========================================================================
          1. REFINED EDITORIAL ARCHIVE HEADER (Playfair Display & DM Sans)
          ========================================================================= */}
      <header className="w-full bg-[#0B142B] text-white pt-8 pb-7 sm:pt-10 sm:pb-9 lg:pt-12 lg:pb-10 border-b border-[#C69A3A]/30">
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div className="flex flex-col max-w-2xl">
              <span className="gsap-header-element font-cormorant italic text-sm text-[#C69A3A] font-semibold tracking-wider mb-2">
                {isTamil
                  ? 'அங்கீகரிக்கப்பட்ட நிறுவன ஆவணக் காப்பகம் · சான்றளிக்கப்பட்ட ஆவண மையம்'
                  : 'Official Institutional Repository • Certified Document Archive'}
              </span>
              <h1 className="gsap-header-element font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                {tr.resources.hub.pageTitle}
              </h1>
              <p className="gsap-header-element font-dmsans text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                {tr.resources.hub.pageSubtitle}
              </p>
            </div>

            {/* Direct Official Authority Actions */}
            <div className="gsap-header-element flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => handlePortalClick(`Official ${authority.name} Portal`, authority.officialPortal)}
                className="px-4 py-2.5 rounded-md bg-transparent hover:bg-white/10 text-white font-manrope text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/20 cursor-pointer"
              >
                <span>{authority.name} {isTamil ? 'அதிகாரப்பூர்வ இணையதளம்' : 'Official Portal'}</span>
                <span className="material-symbols-outlined text-[14px] text-[#C69A3A]">open_in_new</span>
              </button>

              <button
                onClick={() => handlePortalClick('Full Archive Repository', authority.archivePortal)}
                className="px-4 py-2.5 rounded-md bg-[#C69A3A] hover:bg-[#B38728] text-[#0B142B] font-manrope text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{isTamil ? 'முழு ஆவண மையம்' : 'Full Archive'}</span>
                <span className="material-symbols-outlined text-[14px]">archive</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. UPGRADED CATEGORY NAVIGATION (Including Foundation Classes)
          ========================================================================= */}
      <nav className="w-full bg-[#FFFFFF] border-b border-[#E8E2D5] sticky top-16 z-20 shadow-[0_2px_4px_rgba(11,20,43,0.03)]">
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-1.5 sm:gap-2.5 lg:gap-2 overflow-x-auto no-scrollbar py-2.5 sm:py-3">
            {(['neet', 'jee', 'upsc', 'tnpsc', 'foundation'] as ExamCategory[]).map((catKey) => {
              const tab = CATEGORY_TABS[catKey];
              const isSelected = activeCategory === catKey;

              const localizedTabTitle = isTamil
                ? catKey === 'neet'
                  ? 'நீட் (NEET UG)'
                  : catKey === 'jee'
                  ? 'ஜே.இ.இ (JEE)'
                  : catKey === 'upsc'
                  ? 'யு.பி.எஸ்.சி (UPSC)'
                  : catKey === 'tnpsc'
                  ? 'டி.என்.பி.எஸ்.சி (TNPSC)'
                  : 'அடிப்படைக் கல்வி (வகுப்புகள் 6–12)'
                : tab.title;

              return (
                <button
                  key={catKey}
                  onClick={() => handleSelectCategory(catKey)}
                  className={`px-3 sm:px-4 lg:px-3.5 py-2 sm:py-2.5 rounded-md text-xs sm:text-sm font-manrope font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border ${
                    isSelected
                      ? 'bg-[#0B142B] text-white border-[#0B142B] shadow-sm font-bold'
                      : 'text-slate-700 bg-transparent border-transparent hover:border-[#E8E2D5] hover:bg-[#F8F6EF]'
                  }`}
                >
                  <span
                    className={`font-ibm text-[0.6875rem] font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white/15 text-[#C69A3A]' : 'bg-[#E8E2D5] text-slate-700'
                    }`}
                  >
                    {tab.code}
                  </span>
                  <span>{localizedTabTitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* =========================================================================
          3. ACTIVE DISCIPLINE CONTEXT & REPOSITORY TOOLBAR
          ========================================================================= */}
      <main className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 py-5 sm:py-6 lg:py-8">
        {/* Authority Editorial Brief */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#E8E2D5] mb-5 sm:mb-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-cormorant italic font-bold text-sm text-[#7C5806] tracking-wider">
                {activeCategory === 'foundation'
                  ? isTamil ? 'கல்வித் திட்டம்' : 'Academic Program'
                  : isTamil ? 'அரசுத் தேர்வு ஆணையம்' : 'Official Commission'}
              </span>
              <span className="text-slate-300 font-inter">&bull;</span>
              <span className="font-ibm text-xs text-slate-500">
                {activeCategory === 'foundation'
                  ? isTamil ? 'வகுப்புகள் 6 முதல் 12 • NCERT & மாநிலப் பாடத்திட்டம்' : 'Classes 6th to 12th • NCERT & State Board'
                  : isTamil ? `தொடர்ச்சியான ஆவணங்கள்: ${authority.earliestVerifiedYear} – ${authority.latestVerifiedYear}` : `Continuous Repository: ${authority.earliestVerifiedYear} – ${authority.latestVerifiedYear}`}
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0B142B]">
              {isTamil
                ? `${LOCALIZED_AUTHORITIES_TA[activeCategory]?.body || authority.body} • ${LOCALIZED_AUTHORITIES_TA[activeCategory]?.name || authority.name}`
                : `${authority.body} • ${authority.name}`}
            </h2>
            <p className="font-dmsans text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed mt-0.5">
              {isTamil
                ? LOCALIZED_AUTHORITIES_TA[activeCategory]?.description || authority.description
                : authority.description}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto text-xs font-inter text-slate-500">
            <span>
              {tr.resources.hub.showing} <strong className="text-[#0B142B] font-semibold">{filteredResources.length}</strong> {tr.resources.hub.materials}
            </span>
          </div>
        </div>

        {/* -------------------------------------------------------------------------
            SPECIAL FOUNDATION CLASSES: CLASS SELECTION STRIP (Classes 6 to 12)
            ------------------------------------------------------------------------- */}
        {activeCategory === 'foundation' && (
          <div className="bg-[#FFFFFF] p-4 rounded-md border border-[#E8E2D5] mb-6 shadow-[0_1px_2px_rgba(11,20,43,0.02)] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7C5806] text-base">school</span>
                <span className="font-manrope font-bold text-xs uppercase tracking-wider text-[#0B142B]">
                  {isTamil ? 'வகுப்பைத் தேர்ந்தெடுக்கவும்' : 'Select Class Level'}
                </span>
              </div>
              <span className="font-ibm text-[0.6875rem] text-slate-500">
                {isTamil ? 'உயர்நிலை மற்றும் மேல்நிலைப் பள்ளித் தயாரிப்பு' : 'Secondary & Senior Secondary Foundation'}
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <button
                onClick={() => {
                  setSelectedClass('all');
                  setSelectedSubject('all');
                }}
                className={`px-3.5 py-1.5 rounded-md text-xs font-manrope font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                  selectedClass === 'all'
                    ? 'bg-[#0B142B] text-white border-[#0B142B] font-bold shadow-xs'
                    : 'bg-[#F8F6EF] text-slate-700 border-[#E8E2D5] hover:bg-[#E8E2D5]'
                }`}
              >
                {tr.resources.hub.allClasses}
              </button>
              {CLASS_LIST.map((cls) => {
                const isSelected = selectedClass === cls;
                return (
                  <button
                    key={cls}
                    onClick={() => {
                      setSelectedClass(cls);
                      setSelectedSubject('all');
                    }}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-manrope font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                      isSelected
                        ? 'bg-[#0B142B] text-white border-[#0B142B] font-bold shadow-xs'
                        : 'bg-[#F8F6EF] text-slate-700 border-[#E8E2D5] hover:bg-[#E8E2D5]'
                    }`}
                  >
                    {localizeClassLevel(cls, language)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Search & Filter Strip */}
        <div className="bg-[#FFFFFF] p-3 sm:p-4 rounded-md border border-[#E8E2D5] mb-6 flex flex-col lg:flex-row lg:items-center justify-between gap-3 shadow-[0_1px_2px_rgba(11,20,43,0.02)]">
          {/* Integrated Search Box */}
          <div className="relative flex-1 max-w-lg">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={tr.resources.hub.searchPlaceholder}
              className="w-full pl-9 pr-8 py-2 rounded-md bg-[#F8F6EF] text-[#0B142B] placeholder:text-slate-400 border border-[#E8E2D5] focus:border-[#0B142B] focus:outline-none text-xs sm:text-sm font-dmsans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold p-1 cursor-pointer"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtering Selectors */}
          <div className="flex flex-wrap items-center gap-2 max-w-full">
            {/* Document Type Section Filter */}
            <div className="w-full sm:w-auto overflow-x-auto no-scrollbar pb-0.5 sm:pb-0">
              <div className="inline-flex rounded-md border border-[#E8E2D5] bg-[#F8F6EF] p-0.5 text-xs font-manrope font-medium max-w-full">
                {[
                  { id: 'all', label: tr.resources.hub.allSections, count: sectionCounts.all },
                  { id: 'notes', label: isTamil ? 'பாடக் குறிப்புகள்' : 'Study Materials', count: sectionCounts.notes },
                  { id: 'qp', label: isTamil ? 'வினாத்தாள்கள்' : 'Question Papers', count: sectionCounts.qp },
                  { id: 'keys', label: isTamil ? 'விடைக்குறிப்புகள்' : 'Answer Keys', count: sectionCounts.keys },
                  { id: 'syllabus', label: isTamil ? 'பாடத்திட்டம்' : 'Syllabus', count: sectionCounts.syllabus },
                ].map((tab) => {
                  const isActive = selectedSection === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedSection(tab.id)}
                      className={`px-3 py-1.5 rounded text-xs transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                        isActive
                          ? 'bg-[#0B142B] text-white font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-[#0B142B]'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className="text-[0.625rem] opacity-70">({tab.count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-4 w-px bg-slate-200 hidden sm:block mx-0.5" />

            {/* Subject Selector for Foundation */}
            {activeCategory === 'foundation' && (
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-1.5 rounded-md bg-[#F8F6EF] text-[#0B142B] font-inter text-xs font-medium border border-[#E8E2D5] focus:outline-none focus:border-[#0B142B] cursor-pointer"
              >
                <option value="all">
                  {tr.resources.hub.filterSubject}: {tr.resources.hub.allSubjects} ({availableFoundationSubjects.length})
                </option>
                {availableFoundationSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {localizeSubject(sub, language)}
                  </option>
                ))}
              </select>
            )}

            {/* Academic Year Dropdown */}
            {availableYears.length > 0 && (
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 rounded-md bg-[#F8F6EF] text-[#0B142B] font-inter text-xs font-medium border border-[#E8E2D5] focus:outline-none focus:border-[#0B142B] cursor-pointer"
              >
                <option value="all">{tr.resources.hub.filterYear}: {tr.resources.hub.allYears}</option>
                {availableYears.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            )}

            {/* Language / Medium Dropdown */}
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-1.5 rounded-md bg-[#F8F6EF] text-[#0B142B] font-inter text-xs font-medium border border-[#E8E2D5] focus:outline-none focus:border-[#0B142B] cursor-pointer"
            >
              <option value="all">{tr.resources.hub.filterMedium}: {tr.resources.hub.allMediums}</option>
              <option value="English">{isTamil ? 'ஆங்கில வழி' : 'English'}</option>
              <option value="Tamil">{isTamil ? 'தமிழ் வழி' : 'Tamil'}</option>
              <option value="Bilingual">{isTamil ? 'இருமொழி வழி' : 'Bilingual'}</option>
            </select>
          </div>
        </div>

        {/* =========================================================================
            4. REFINED HORIZONTAL EDITORIAL PUBLICATION CARDS (NO YEAR LABELS ON CARDS)
            ========================================================================= */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="p-5 rounded-md bg-[#FFFFFF] border border-[#E8E2D5] flex flex-col justify-between gap-4 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="h-4 w-28 bg-slate-200 rounded" />
                  <div className="h-4 w-20 bg-slate-200 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-5 w-3/4 bg-slate-200 rounded" />
                  <div className="h-3 w-full bg-slate-200 rounded" />
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#EFECE3]">
                  <div className="h-4 w-32 bg-slate-200 rounded" />
                  <div className="h-8 w-24 bg-slate-200 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="p-12 text-center bg-[#FFFFFF] rounded-md border border-[#E8E2D5] flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-3xl text-slate-400 mb-1">
              search_off
            </span>
            <p className="font-serif font-bold text-base text-[#0B142B]">
              {tr.resources.hub.emptyTitle}
            </p>
            <p className="font-dmsans text-xs text-slate-500 max-w-sm">
              {tr.resources.hub.emptySubtitle}
            </p>
            <button
              onClick={() => {
                setSelectedClass('all');
                setSelectedSubject('all');
                setSelectedYear('all');
                setSelectedSection('all');
                setSelectedLanguage('all');
                setSearchQuery('');
              }}
              className="mt-3 px-3.5 py-1.5 rounded-md bg-[#0B142B] text-white font-manrope text-xs font-bold cursor-pointer"
            >
              {tr.resources.hub.resetFilters}
            </button>
          </div>
        ) : (
          <div ref={resourceGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((item) => (
              <EditorialResourceCard
                key={item.id}
                item={item}
                onSelect={handleResourceClick}
              />
            ))}
          </div>
        )}

        {/* Multi-Decade Archives Footnote Callout */}
        <div className="mt-8 p-5 sm:p-6 rounded-md bg-[#FFFFFF] border border-[#E8E2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5 max-w-xl">
            <span className="font-cormorant italic text-sm font-bold text-[#7C5806]">
              {activeCategory === 'foundation'
                ? isTamil ? 'பாடத்திட்டக் கட்டமைப்பு' : 'Curriculum Framework'
                : isTamil ? 'முந்தைய தசாப்தங்களின் அரசு ஆவணக் காப்பகம்' : 'Statutory Prior Decades Repository'}
            </span>
            <h4 className="font-serif text-base font-bold text-[#0B142B]">
              {activeCategory === 'foundation'
                ? isTamil ? 'அதிகாரப்பூர்வ மாதிரி வினாத்தாள்கள் & வழிகாட்டிகள் தேவையா?' : 'Looking for official board question banks & guidelines?'
                : isTamil ? `${authority.earliestVerifiedYear}-க்கு முந்தைய வரலாற்று வினாத்தாள்கள் தேவையா?` : `Need historical papers prior to ${authority.earliestVerifiedYear}?`}
            </h4>
            <p className="font-dmsans text-xs text-slate-500 leading-relaxed">
              {activeCategory === 'foundation'
                ? isTamil ? 'அதிகாரப்பூர்வ NCERT மற்றும் CBSE கல்வி இணையதளங்களில் அனைத்து மாதிரி வினாத்தாள்களும் பாடத்திட்ட விவரங்களும் பராமரிக்கப்படுகின்றன.' : 'Official NCERT and CBSE secondary examination repositories maintain verified model papers and curriculum blueprints directly on statutory academic servers.'
                : isTamil ? '30 ஆண்டுகள் வரையிலான வரலாற்று ஆவணங்கள் நேரடியாக அரசு தேர்வு ஆணைய சேவையகங்களில் பராமரிக்கப்படுகின்றன.' : 'Continuous multi-decade archival holdings up to 30 years are maintained directly on constitutional commission servers.'}
            </p>
          </div>

          <button
            onClick={() => handlePortalClick(activeCategory === 'foundation' ? 'NCERT Official Portal' : 'Constitutional Archive Portal', authority.archivePortal)}
            className="px-4 py-2 rounded-md bg-[#F8F6EF] hover:bg-[#E8E2D5] text-[#0B142B] font-manrope text-xs font-bold flex items-center gap-1.5 transition-colors border border-[#E8E2D5] cursor-pointer self-start sm:self-auto shrink-0"
          >
            <span>
              {activeCategory === 'foundation'
                ? isTamil ? 'கல்வி வாரிய இணையதளம்' : 'Access Board Repository'
                : isTamil ? 'முழு ஆவண மையம்' : 'Access Complete Archive'}
            </span>
            <span className="material-symbols-outlined text-[13px]">open_in_new</span>
          </button>
        </div>
      </main>

      {/* Centralized Student OTP Verification Modal */}
      <ResourceVerificationModal
        isOpen={verificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
        resource={pendingResource}
        onVerifiedAccess={handleVerifiedAccess}
      />

      {/* Quiet Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-md bg-[#0B142B] text-white font-dmsans text-xs shadow-lg flex items-center gap-2 border border-[#C69A3A]/40 animate-in fade-in duration-150">
          <span className="material-symbols-outlined text-[#C69A3A] text-sm">info</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[60vh] flex items-center justify-center bg-[#F8F6EF]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-[#0B142B]/20 border-t-[#0B142B] rounded-full animate-spin" />
            <span className="font-manrope text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Loading Archive...
            </span>
          </div>
        </div>
      }
    >
      <ExamResourcesHubContent />
    </Suspense>
  );
}
