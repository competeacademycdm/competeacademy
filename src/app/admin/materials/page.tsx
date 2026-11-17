'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface LearningMaterial {
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
  file_size: number | null;
  thumbnail_url: string | null;
  is_published: number;
  downloads_count: number;
  created_at: string;
}

const CLASS_OPTIONS = [
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

const SUBJECT_OPTIONS_BY_COURSE: Record<string, string[]> = {
  'Foundation Classes': [
    'Mathematics',
    'Science',
    'Physics',
    'Chemistry',
    'Biology',
    'Social Science',
    'English',
    'Tamil',
    'Computer Science',
    'General Knowledge',
  ],
  'NEET Medical': ['Biology', 'Physics', 'Chemistry', 'Botany', 'Zoology', 'Full Syllabus'],
  'JEE Main & Advanced': ['Physics', 'Chemistry', 'Mathematics', 'Full Syllabus'],
  'UPSC Civil Services': ['General Studies', 'CSAT Paper II', 'History & Culture', 'Polity & Governance', 'Economy', 'Geography & Environment'],
  'TNPSC State Services': ['General Tamil', 'General Studies', 'Aptitude & Mental Ability', 'Tamil Society & Heritage'],
};

interface MaterialsStats {
  total: number;
  published: number;
  draft: number;
  missingAttachments: number;
  byCourse: {
    'Foundation Classes': number;
    'NEET Medical': number;
    'JEE Main & Advanced': number;
    'UPSC Civil Services': number;
    'TNPSC State Services': number;
  };
}

export default function MaterialsManagementPage() {
  const [materials, setMaterials] = useState<LearningMaterial[]>([]);
  const [stats, setStats] = useState<MaterialsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedClassFilter, setSelectedClassFilter] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all', 'published', 'draft'

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<LearningMaterial | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formSubject, setFormSubject] = useState('Mathematics');
  const [formCourse, setFormCourse] = useState('Foundation Classes');
  const [formCategory, setFormCategory] = useState('notes');
  const [formType, setFormType] = useState('Study Materials');
  const [formClassLevel, setFormClassLevel] = useState('Class 10');
  const [formChapter, setFormChapter] = useState('');
  const [formAcademicYear, setFormAcademicYear] = useState('2024-2025');
  const [formMedium, setFormMedium] = useState('English');
  const [formFileUrl, setFormFileUrl] = useState('');
  const [formFileName, setFormFileName] = useState('');
  const [formThumbnailUrl, setFormThumbnailUrl] = useState('');
  const [formPublished, setFormPublished] = useState(true);

  // Upload state
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const fetchMaterials = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search.trim()) params.set('search', search.trim());
      if (selectedSubject !== 'all') params.set('subject', selectedSubject);
      if (selectedCourse !== 'all') params.set('course', selectedCourse);
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      if (selectedClassFilter !== 'all') params.set('class_level', selectedClassFilter);
      if (selectedStatus !== 'all') params.set('status', selectedStatus);

      params.set('page', String(currentPage));
      params.set('limit', String(pageSize));

      const res = await fetch(`/api/admin/materials?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setMaterials(data.materials || []);
        if (data.pagination) {
          setTotalRecords(data.pagination.total);
          setTotalPages(data.pagination.totalPages);
        }
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error('Failed to load materials:', err);
    } finally {
      setLoading(false);
    }
  }, [search, selectedSubject, selectedCourse, selectedCategory, selectedClassFilter, selectedStatus, currentPage, pageSize]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedSubject, selectedCourse, selectedCategory, selectedClassFilter, selectedStatus, pageSize]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  // Adjust available subjects when course changes in modal
  const currentSubjectList = SUBJECT_OPTIONS_BY_COURSE[formCourse] || [
    'Mathematics',
    'Science',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
  ];

  const handleOpenAdd = () => {
    setEditingMaterial(null);
    setFormTitle('');
    setFormDescription('');
    setFormCourse('Foundation Classes');
    setFormSubject('Mathematics');
    setFormCategory('notes');
    setFormType('Study Materials');
    setFormClassLevel('Class 10');
    setFormChapter('');
    setFormAcademicYear('2024-2025');
    setFormMedium('English');
    setFormFileUrl('');
    setFormFileName('');
    setFormThumbnailUrl('');
    setFormPublished(true);
    setFormError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (m: LearningMaterial) => {
    setEditingMaterial(m);
    setFormTitle(m.title);
    setFormDescription(m.description || '');
    setFormCourse(m.course);
    setFormSubject(m.subject);
    setFormCategory(m.category);
    setFormType(m.material_type);
    setFormClassLevel(m.class_level || 'Class 10');
    setFormChapter(m.chapter || '');
    setFormAcademicYear(m.academic_year || '2024-2025');
    setFormMedium(m.medium || 'English');
    setFormFileUrl(m.file_url || '');
    setFormFileName(m.file_name || '');
    setFormThumbnailUrl(m.thumbnail_url || '');
    setFormPublished(m.is_published === 1);
    setFormError(null);
    setModalOpen(true);
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdf(true);
    setFormError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'document');

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setFormFileUrl(data.url);
        setFormFileName(data.fileName || file.name);
        showToast('Document uploaded successfully');
      } else {
        setFormError(data.error || 'Failed to upload document');
      }
    } catch (err: unknown) {
      console.error(err);
      setFormError('Network error uploading document');
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('Please enter a material title');
      return;
    }

    setSaving(true);
    setFormError(null);

    const payload = {
      title: formTitle.trim(),
      description: formDescription.trim(),
      subject: formSubject,
      course: formCourse,
      category: formCategory,
      material_type: formType,
      class_level: formCourse === 'Foundation Classes' ? formClassLevel : null,
      chapter: formChapter.trim() || null,
      academic_year: formAcademicYear.trim() || null,
      medium: formMedium,
      file_url: formFileUrl || null,
      file_name: formFileName || null,
      thumbnail_url: formThumbnailUrl || null,
      is_published: formPublished ? 1 : 0,
    };

    try {
      const url = editingMaterial
        ? `/api/admin/materials/${editingMaterial.id}`
        : '/api/admin/materials';
      const method = editingMaterial ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        showToast(editingMaterial ? 'Resource updated successfully' : 'Resource published successfully');
        setModalOpen(false);
        fetchMaterials();
      } else {
        setFormError(data.error || 'Failed to save resource');
      }
    } catch (err) {
      console.error(err);
      setFormError('Failed to save resource');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (m: LearningMaterial) => {
    try {
      const newStatus = m.is_published ? 0 : 1;
      const res = await fetch(`/api/admin/materials/${m.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMaterials((prev) =>
          prev.map((item) => (item.id === m.id ? { ...item, is_published: newStatus } : item))
        );
        showToast(newStatus ? 'Resource Published' : 'Resource Unpublished (Draft)');
      }
    } catch (err) {
      console.error(err);
      showToast('Error updating publish status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/materials/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        showToast('Resource deleted permanently');
        setDeleteConfirmId(null);
        setMaterials((prev) => prev.filter((item) => item.id !== id));
      } else {
        showToast(data.error || 'Failed to delete');
      }
    } catch (err) {
      console.error(err);
      showToast('Error deleting resource');
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-[#0B142B] border border-[#C69A3A]/40 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-manrope font-bold flex items-center gap-2 animate-in fade-in">
          <span className="material-symbols-outlined text-[#C69A3A] text-sm">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="font-mono text-[0.6875rem] font-bold text-[#FFB91F] uppercase tracking-wider">
            Curriculum Document Management
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
            Learning Materials &amp; Foundation Repository
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl font-sans">
            Author and publish verified syllabus blueprints, study notes, chapter PDFs, and question booklets for Foundation Classes (6th&ndash;12th) and Competitive Entrance Programs.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#FFB91F] hover:bg-[#e6a517] text-[#071126] font-headline text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md shrink-0 active:scale-95"
        >
          <span className="material-symbols-outlined text-base">add_circle</span>
          <span>Add New Resource</span>
        </button>
      </div>

      {/* Aggregate Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#0B142B] p-4 rounded-xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[0.6875rem] font-headline uppercase tracking-wider font-semibold">Total Resources</span>
            <span className="material-symbols-outlined text-base text-[#FFB91F]">folder_open</span>
          </div>
          <span className="text-2xl font-bold font-headline text-white mt-2">
            {stats ? stats.total : totalRecords}
          </span>
        </div>

        <div className="bg-[#0B142B] p-4 rounded-xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[0.6875rem] font-headline uppercase tracking-wider font-semibold">Published</span>
            <span className="material-symbols-outlined text-base text-emerald-400">verified</span>
          </div>
          <span className="text-2xl font-bold font-headline text-emerald-400 mt-2">
            {stats ? stats.published : 0}
          </span>
        </div>

        <div className="bg-[#0B142B] p-4 rounded-xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[0.6875rem] font-headline uppercase tracking-wider font-semibold">Drafts</span>
            <span className="material-symbols-outlined text-base text-amber-400">edit_note</span>
          </div>
          <span className="text-2xl font-bold font-headline text-amber-400 mt-2">
            {stats ? stats.draft : 0}
          </span>
        </div>

        <div className="bg-[#0B142B] p-4 rounded-xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[0.6875rem] font-headline uppercase tracking-wider font-semibold">Missing Attachments</span>
            <span className="material-symbols-outlined text-base text-rose-400">attachment</span>
          </div>
          <span className="text-2xl font-bold font-headline text-white mt-2">
            {stats ? stats.missingAttachments : 0}
          </span>
        </div>
      </div>

      {/* Programme Filter Badges */}
      {stats && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCourse('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-headline font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedCourse === 'all'
                ? 'bg-[#FFB91F] text-[#071126] shadow-sm'
                : 'bg-[#0B142B] text-slate-300 hover:bg-white/5 border border-white/10'
            }`}
          >
            <span>All Programmes</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[0.625rem] font-bold ${
              selectedCourse === 'all' ? 'bg-[#071126] text-[#FFB91F]' : 'bg-white/10 text-slate-400'
            }`}>
              {stats.total}
            </span>
          </button>

          {(
            [
              { id: 'Foundation Classes', label: 'Foundation Classes' },
              { id: 'NEET Medical', label: 'NEET Medical' },
              { id: 'JEE Main & Advanced', label: 'JEE Engineering' },
              { id: 'UPSC Civil Services', label: 'UPSC Civil Services' },
              { id: 'TNPSC State Services', label: 'TNPSC State Services' },
            ] as const
          ).map((prog) => {
            const count = stats.byCourse[prog.id] || 0;
            const isSelected = selectedCourse === prog.id;
            return (
              <button
                key={prog.id}
                onClick={() => setSelectedCourse(isSelected ? 'all' : prog.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-headline font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#FFB91F] text-[#071126] shadow-sm'
                    : 'bg-[#0B142B] text-slate-300 hover:bg-white/5 border border-white/10'
                }`}
              >
                <span>{prog.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[0.625rem] font-bold ${
                  isSelected ? 'bg-[#071126] text-[#FFB91F]' : 'bg-white/10 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-[#0B142B] p-4 rounded-xl border border-white/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, subject, chapter, or keywords..."
            className="w-full pl-9 pr-3 py-2 bg-[#071126] border border-white/10 focus:border-[#FFB91F] rounded-lg text-white text-xs placeholder:text-slate-500 focus-visible:outline-none"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-3 py-2 bg-[#071126] border border-white/10 rounded-lg text-slate-300 focus-visible:outline-none cursor-pointer"
          >
            <option value="all">All Subjects</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Social Science">Social Science</option>
            <option value="English">English</option>
            <option value="Tamil">Tamil</option>
          </select>

          {/* Course Program Filter */}
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 bg-[#071126] border border-white/10 rounded-lg text-slate-300 focus-visible:outline-none cursor-pointer"
          >
            <option value="all">All Programs</option>
            <option value="Foundation Classes">Foundation Classes (6th&ndash;12th)</option>
            <option value="NEET Medical">NEET Medical</option>
            <option value="JEE Main & Advanced">JEE Engineering</option>
            <option value="UPSC Civil Services">UPSC Civil Services</option>
            <option value="TNPSC State Services">TNPSC Services</option>
          </select>

          {/* Class Level Filter (Active for Foundation) */}
          <select
            value={selectedClassFilter}
            onChange={(e) => setSelectedClassFilter(e.target.value)}
            className="px-3 py-2 bg-[#071126] border border-white/10 rounded-lg text-slate-300 focus-visible:outline-none cursor-pointer"
          >
            <option value="all">All Classes</option>
            {CLASS_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Category Section Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-[#071126] border border-white/10 rounded-lg text-slate-300 focus-visible:outline-none cursor-pointer"
          >
            <option value="all">All Sections</option>
            <option value="notes">Study Materials</option>
            <option value="pyq">Question Papers</option>
            <option value="mocks">Answer Keys</option>
            <option value="clinics">Syllabus</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-[#071126] border border-white/10 rounded-lg text-slate-300 focus-visible:outline-none cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Materials Table */}
      <div className="bg-[#0B142B] rounded-xl border border-white/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#071126] border-b border-white/10 text-slate-400 font-headline uppercase tracking-wider text-[0.625rem]">
              <tr>
                <th className="py-3 px-4">Document / Title</th>
                <th className="py-3 px-4">Program &amp; Class</th>
                <th className="py-3 px-4">Subject &amp; Type</th>
                <th className="py-3 px-4">Attachment</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-6 h-6 border-2 border-[#FFB91F] border-t-transparent rounded-full animate-spin" />
                      <span>Loading resources...</span>
                    </div>
                  </td>
                </tr>
              ) : materials.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400">
                    No resources found matching the selected filter criteria.
                  </td>
                </tr>
              ) : (
                materials.map((m) => (
                  <tr key={m.id} className="hover:bg-white/5 transition-colors">
                    {/* Title & Info */}
                    <td className="py-3.5 px-4 min-w-[240px]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#FFB91F]/15 border border-[#FFB91F]/30 text-[#FFB91F] flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-base">picture_as_pdf</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-headline text-xs font-bold text-white truncate max-w-sm">
                            {m.title}
                          </span>
                          <span className="text-[0.6875rem] text-slate-400 truncate max-w-sm">
                            {m.chapter ? `Ch: ${m.chapter} • ` : ''}
                            {m.description || 'No description provided'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Program & Class */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-200 block">{m.course}</span>
                      <span className="text-[0.6875rem] text-[#FFB91F]">
                        {m.class_level ? m.class_level : 'General'}
                        {m.academic_year ? ` (${m.academic_year})` : ''}
                      </span>
                    </td>

                    {/* Subject & Type */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-200 block">{m.subject}</span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 font-headline font-semibold text-[0.625rem] border border-white/10">
                        {m.material_type}
                      </span>
                    </td>

                    {/* File Attachment */}
                    <td className="py-3.5 px-4">
                      {m.file_url ? (
                        <a
                          href={m.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#FFB91F] hover:underline"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          <span className="truncate max-w-[120px]">{m.file_name || 'View PDF'}</span>
                        </a>
                      ) : (
                        <span className="text-slate-500 italic text-[0.6875rem]">No file attached</span>
                      )}
                    </td>

                    {/* Published Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(m)}
                        className={`px-2.5 py-0.5 rounded-full text-[0.625rem] font-bold uppercase tracking-wider transition-colors border cursor-pointer ${
                          m.is_published
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                        }`}
                      >
                        {m.is_published ? 'Published' : 'Draft'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(m)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                          title="Edit Resource"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(m.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                          title="Delete Resource"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="bg-[#071126] border-t border-white/10 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 text-slate-400">
            <span>
              Showing <strong className="text-white">{materials.length}</strong> of{' '}
              <strong className="text-white">{totalRecords}</strong> resources
            </span>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5">
              <span>Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-[#0B142B] border border-white/10 rounded px-2 py-0.5 text-white focus-visible:outline-none cursor-pointer"
              >
                <option value={15}>15</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">
              Page <strong className="text-white">{currentPage}</strong> of{' '}
              <strong className="text-white">{totalPages}</strong>
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-1 rounded bg-[#0B142B] border border-white/10 hover:bg-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Previous Page"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1 rounded bg-[#0B142B] border border-white/10 hover:bg-white/10 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                title="Next Page"
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0B142B] border border-white/15 rounded-2xl max-w-sm w-full p-6 flex flex-col gap-4 text-white shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">Delete Resource Permanently?</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                This academic document will be permanently removed from the repository. This action cannot be reversed.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-headline font-semibold text-slate-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-headline font-bold text-white cursor-pointer"
              >
                Delete Resource
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Resource Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0B142B] border border-white/15 rounded-2xl max-w-2xl w-full p-6 flex flex-col gap-5 text-white shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div>
                <span className="font-mono text-[0.625rem] text-[#FFB91F] font-bold uppercase tracking-wider">
                  {editingMaterial ? 'Edit Document' : 'Publish New Resource'}
                </span>
                <h3 className="font-serif text-lg font-bold text-white">
                  {editingMaterial ? 'Update Resource Details' : 'Add Document to Repository'}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-500/15 border border-rose-500/30 rounded-xl text-xs text-rose-300">
                {formError}
              </div>
            )}

            <form onSubmit={handleSave} className="flex flex-col gap-4 text-xs font-sans">
              {/* Title */}
              <div className="flex flex-col gap-1.5">
                <label className="font-headline font-bold uppercase tracking-wider text-slate-300">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Class 10 Real Numbers & Polynomials Formula & Question Bank"
                  className="w-full px-3.5 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white placeholder:text-slate-500 focus-visible:outline-none"
                />
              </div>

              {/* Grid: Course, Class, Subject, Medium */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-headline font-bold uppercase tracking-wider text-slate-300">
                    Program / Track *
                  </label>
                  <select
                    value={formCourse}
                    onChange={(e) => {
                      setFormCourse(e.target.value);
                      const available = SUBJECT_OPTIONS_BY_COURSE[e.target.value] || [];
                      if (available.length > 0) setFormSubject(available[0]);
                    }}
                    className="w-full px-3 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white focus-visible:outline-none cursor-pointer"
                  >
                    <option value="Foundation Classes">Foundation Classes (Class 6th&ndash;12th)</option>
                    <option value="NEET Medical">NEET Medical</option>
                    <option value="JEE Main & Advanced">JEE Main &amp; Advanced</option>
                    <option value="UPSC Civil Services">UPSC Civil Services</option>
                    <option value="TNPSC State Services">TNPSC State Services</option>
                  </select>
                </div>

                {/* Class Level (for Foundation) */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-headline font-bold uppercase tracking-wider text-slate-300">
                    Class Level (Class 6 &ndash; 12)
                  </label>
                  <select
                    value={formClassLevel}
                    onChange={(e) => setFormClassLevel(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white focus-visible:outline-none cursor-pointer"
                  >
                    {CLASS_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-headline font-bold uppercase tracking-wider text-slate-300">
                    Subject *
                  </label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white focus-visible:outline-none cursor-pointer"
                  >
                    {currentSubjectList.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Medium */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-headline font-bold uppercase tracking-wider text-slate-300">
                    Medium of Instruction
                  </label>
                  <select
                    value={formMedium}
                    onChange={(e) => setFormMedium(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white focus-visible:outline-none cursor-pointer"
                  >
                    <option value="English">English</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Bilingual">Bilingual (English &amp; Tamil)</option>
                  </select>
                </div>
              </div>

              {/* Grid: Material Type, Section Category, Chapter, Academic Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-headline font-bold uppercase tracking-wider text-slate-300">
                    Resource Section Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => {
                      setFormCategory(e.target.value);
                      if (e.target.value === 'notes') setFormType('Study Materials');
                      else if (e.target.value === 'pyq') setFormType('Question Papers');
                      else if (e.target.value === 'mocks') setFormType('Answer Keys');
                      else if (e.target.value === 'clinics') setFormType('Syllabus');
                    }}
                    className="w-full px-3 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white focus-visible:outline-none cursor-pointer"
                  >
                    <option value="notes">Study Materials (Notes &amp; Concepts)</option>
                    <option value="pyq">Question Papers (Model &amp; Term Tests)</option>
                    <option value="mocks">Answer Keys &amp; Solutions</option>
                    <option value="clinics">Syllabus &amp; Curriculum Blueprint</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-headline font-bold uppercase tracking-wider text-slate-300">
                    Material Type Display Label *
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white focus-visible:outline-none cursor-pointer"
                  >
                    <option value="Study Materials">Study Materials</option>
                    <option value="Question Papers">Question Papers</option>
                    <option value="Answer Keys">Answer Keys</option>
                    <option value="Syllabus">Syllabus</option>
                    <option value="PDF Notes">PDF Notes</option>
                    <option value="Mock Tests">Mock Tests</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-headline font-bold uppercase tracking-wider text-slate-300">
                    Chapter / Unit Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formChapter}
                    onChange={(e) => setFormChapter(e.target.value)}
                    placeholder="e.g. Chapter 01: Number Systems"
                    className="w-full px-3.5 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white placeholder:text-slate-500 focus-visible:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-headline font-bold uppercase tracking-wider text-slate-300">
                    Academic Year
                  </label>
                  <input
                    type="text"
                    value={formAcademicYear}
                    onChange={(e) => setFormAcademicYear(e.target.value)}
                    placeholder="e.g. 2024-2025"
                    className="w-full px-3.5 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white placeholder:text-slate-500 focus-visible:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="font-headline font-bold uppercase tracking-wider text-slate-300">
                  Description / Chapter Syllabus Overview
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Outline key learning objectives, chapter contents, or solution notes..."
                  className="w-full px-3.5 py-2.5 bg-[#071126] border border-white/15 focus:border-[#FFB91F] rounded-xl text-white placeholder:text-slate-500 focus-visible:outline-none"
                />
              </div>

              {/* PDF Document Upload Area */}
              <div className="flex flex-col gap-2 p-4 rounded-xl bg-white/5 border border-white/10">
                <label className="font-headline font-bold uppercase tracking-wider text-slate-200 flex items-center justify-between">
                  <span>PDF Document File Upload</span>
                  {formFileUrl && (
                    <span className="text-emerald-400 font-normal lowercase flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      Ready
                    </span>
                  )}
                </label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handlePdfUpload}
                    disabled={uploadingPdf}
                    className="w-full text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-headline file:font-bold file:bg-[#FFB91F] file:text-[#071126] hover:file:bg-[#e6a517] cursor-pointer"
                  />
                  {uploadingPdf && (
                    <span className="text-slate-300 shrink-0 flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 border-2 border-[#FFB91F] border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </span>
                  )}
                </div>
                {formFileUrl && (
                  <div className="text-[0.6875rem] text-slate-400 flex items-center gap-2 mt-1">
                    <span>Attached:</span>
                    <code className="text-emerald-300">{formFileName || formFileUrl}</code>
                  </div>
                )}
              </div>

              {/* Publishing Status Toggle */}
              <div className="flex items-center gap-3 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formPublished}
                    onChange={(e) => setFormPublished(e.target.checked)}
                    className="w-4 h-4 rounded text-[#FFB91F] focus:ring-0 bg-[#071126] border-white/20 cursor-pointer"
                  />
                  <span className="font-headline font-semibold text-slate-200">
                    Publish immediately to Public Academic Document Library
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 font-headline font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingPdf}
                  className="px-5 py-2.5 rounded-xl bg-[#FFB91F] hover:bg-[#e6a517] text-[#071126] font-headline font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  {saving && (
                    <span className="w-3.5 h-3.5 border-2 border-[#071126] border-t-transparent rounded-full animate-spin" />
                  )}
                  <span>{editingMaterial ? 'Save Changes' : 'Publish Resource'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
