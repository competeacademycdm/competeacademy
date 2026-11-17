'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface StudentLead {
  id: string;
  name: string;
  mobile: string;
  verification_status: 'Verified' | 'Pending';
  registration_date: string;
  verified_at: string | null;
  last_activity: string;
  downloads_count: number;
}

interface DownloadHistoryItem {
  id: string;
  resource_title: string;
  download_type: string;
  download_timestamp: string;
  ip_address: string;
}

export default function ResourceStudentsAdminPage() {
  const [students, setStudents] = useState<StudentLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Verified' | 'Pending'>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Detail Modal State
  const [selectedStudent, setSelectedStudent] = useState<StudentLead | null>(null);
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistoryItem[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '15',
        search,
        status: statusFilter,
      });

      const res = await fetch(`/api/admin/resource-students?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setStudents(data.students || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalCount(data.pagination?.total || 0);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [page, search, statusFilter]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const viewStudentDetails = async (student: StudentLead) => {
    setSelectedStudent(student);
    setLoadingDetails(true);
    try {
      const res = await fetch(`/api/admin/resource-students/${student.id}`);
      if (res.ok) {
        const data = await res.json();
        setDownloadHistory(data.downloadHistory || []);
      }
    } catch {
      setDownloadHistory([]);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleExportCsv = () => {
    const params = new URLSearchParams({
      search,
      status: statusFilter,
      export: 'true',
    });
    window.open(`/api/admin/resource-students?${params.toString()}`, '_blank');
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[#FFB91F] mb-1">
            <span className="material-symbols-outlined text-base">person_search</span>
            <span className="font-headline font-bold text-xs uppercase tracking-wider">
              Student Lead Management
            </span>
          </div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-white">
            Resource Download Students
          </h1>
          <p className="font-sans text-xs sm:text-sm text-slate-400 mt-1">
            Real-time registry of all students who initiated or completed OTP verification for academic downloads.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleExportCsv}
            className="px-4 py-2.5 rounded-lg bg-[#FFB91F] hover:bg-[#E5A517] text-[#071126] font-headline text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-[#0B1735] p-4 rounded-xl border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by student name or mobile..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#071126] text-white placeholder:text-slate-500 border border-white/15 focus:border-[#FFB91F] focus:outline-none text-xs sm:text-sm font-sans"
          />
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'all', label: 'All Status' },
            { id: 'Verified', label: 'Verified Only' },
            { id: 'Pending', label: 'Pending Only' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setStatusFilter(item.id as 'all' | 'Verified' | 'Pending');
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-md font-headline text-xs font-semibold shrink-0 transition-colors ${
                statusFilter === item.id
                  ? 'bg-[#FFB91F] text-[#071126] font-bold'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-[#0B1735] rounded-xl border border-white/10 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#071126] text-slate-400 font-headline uppercase text-[0.6875rem] tracking-wider border-b border-white/10">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Mobile Number</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Downloads</th>
                <th className="py-3 px-4">Registered Date</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200 font-sans">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="w-8 h-8 border-2 border-[#FFB91F] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <span>Loading student records...</span>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <span className="material-symbols-outlined text-4xl mb-1 text-slate-500">
                      person_off
                    </span>
                    <p className="font-headline font-bold text-sm text-slate-300">
                      No Student Records Found
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      No students have requested or verified academic downloads yet.
                    </p>
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-headline font-bold text-white flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#FFB91F]/15 text-[#FFB91F] flex items-center justify-center text-xs shrink-0 font-bold">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate max-w-[180px]">{student.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs">
                      +91 {student.mobile}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-headline font-bold ${
                          student.verification_status === 'Verified'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {student.verification_status === 'Verified' ? 'verified' : 'hourglass_top'}
                        </span>
                        {student.verification_status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#FFB91F]">
                      {student.downloads_count} files
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-xs">
                      {new Date(student.registration_date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 text-xs">
                      {new Date(student.last_activity).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => viewStudentDetails(student)}
                        className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-headline text-xs font-semibold inline-flex items-center gap-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        <span>History</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-[#071126] border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{students.length}</strong> of{' '}
            <strong className="text-white">{totalCount}</strong> students
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-40 transition-colors text-white"
            >
              Previous
            </button>
            <span className="px-2 font-bold text-white">
              {page} / {totalPages || 1}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-40 transition-colors text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Student Details & Download History Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1735] text-white rounded-2xl max-w-xl w-full p-6 border border-white/15 shadow-2xl flex flex-col gap-4 relative">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFB91F]/20 text-[#FFB91F] flex items-center justify-center font-bold text-lg shrink-0">
                {selectedStudent.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-xs text-[#FFB91F] uppercase font-bold tracking-wider">
                  Student Profile &amp; Downloads
                </span>
                <h3 className="font-headline text-xl font-bold">{selectedStudent.name}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>Mobile: +91 {selectedStudent.mobile}</span>
                  <span>•</span>
                  <span
                    className={`font-bold ${
                      selectedStudent.verification_status === 'Verified'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {selectedStudent.verification_status}
                  </span>
                </div>
              </div>
            </div>

            {/* Download History Stack */}
            <div className="flex flex-col gap-2 mt-2">
              <span className="font-headline text-xs font-bold text-slate-300 uppercase tracking-wider">
                Authorized Download History ({downloadHistory.length})
              </span>

              <div className="max-h-60 overflow-y-auto flex flex-col gap-2 pr-1">
                {loadingDetails ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    Loading download records...
                  </div>
                ) : downloadHistory.length === 0 ? (
                  <div className="p-4 rounded-lg bg-[#071126] text-center text-slate-400 text-xs border border-white/5">
                    No resources downloaded yet.
                  </div>
                ) : (
                  downloadHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg bg-[#071126] border border-white/10 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="material-symbols-outlined text-[#FFB91F] text-base shrink-0">
                          {item.download_type === 'zip' ? 'folder_zip' : 'description'}
                        </span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-headline font-bold text-slate-200 truncate">
                            {item.resource_title}
                          </span>
                          <span className="text-[0.6875rem] text-slate-400">
                            IP: {item.ip_address}
                          </span>
                        </div>
                      </div>
                      <span className="text-slate-400 text-[0.6875rem] shrink-0">
                        {new Date(item.download_timestamp).toLocaleString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(null)}
              className="mt-2 w-full py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-headline text-xs font-bold"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
