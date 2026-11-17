'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalMaterials: number;
  publishedMaterials: number;
  totalCourses: number;
}

interface RecentItem {
  id: string;
  title: string;
  subject?: string;
  course?: string;
  material_type?: string;
  created_at: string;
  is_published: number;
}

interface ActivityLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  entity_title: string;
  admin_email: string;
  timestamp: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentMaterials, setRecentMaterials] = useState<RecentItem[]>([]);
  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
          setRecentMaterials(data.recentMaterials || []);
          setRecentActivities(data.recentActivities || []);
        }
      })
      .catch((err) => console.error('Failed to load stats:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="w-8 h-8 border-3 border-[#FFB91F] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 sm:gap-7 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#0B1735] via-[#10224d] to-[#0B1735] border border-[#FFB91F]/30 p-5 sm:p-7 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-[#FFB91F]/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <span className="font-headline text-xs font-bold uppercase tracking-wider text-[#FFB91F]">
              Academic Command Center
            </span>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, Dean & Registrar
            </h1>
            <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-xl">
              Upload study modules, sync exam question papers, update course curriculums, and inspect institutional activity in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/materials"
              className="px-4 py-2.5 rounded-xl bg-[#FFB91F] hover:bg-[#e6a517] text-[#071126] font-headline text-xs font-bold tracking-wide transition-all shadow-md flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>New Material</span>
            </Link>
            <Link
              href="/admin/resource-students"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-headline text-xs font-bold tracking-wide transition-colors border border-white/15 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">person_search</span>
              <span>Student Leads</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Total Materials */}
        <div className="bg-[#0B1735]/80 border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-headline font-bold text-slate-400 uppercase tracking-wider">
              Learning Materials
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#FFB91F]/15 text-[#FFB91F] flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">auto_stories</span>
            </div>
          </div>
          <div>
            <span className="font-headline text-3xl font-bold text-white">
              {stats?.totalMaterials || 0}
            </span>
            <span className="text-xs text-emerald-400 block mt-1 font-semibold">
              ● {stats?.publishedMaterials || 0} published live
            </span>
          </div>
          <Link
            href="/admin/materials"
            className="text-xs text-[#FFB91F] hover:underline flex items-center gap-1 font-semibold pt-2 border-t border-white/5"
          >
            <span>Manage materials</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* Verified Student Registrations */}
        <div className="bg-[#0B1735]/80 border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-headline font-bold text-slate-400 uppercase tracking-wider">
              Student Leads
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">person_search</span>
            </div>
          </div>
          <div>
            <span className="font-headline text-3xl font-bold text-white">
              Verified
            </span>
            <span className="text-xs text-purple-300 block mt-1 font-semibold">
              Mobile Verified Resource Leads
            </span>
          </div>
          <Link
            href="/admin/resource-students"
            className="text-xs text-[#FFB91F] hover:underline flex items-center gap-1 font-semibold pt-2 border-t border-white/5"
          >
            <span>View student leads</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* System & Storage Status */}
        <div className="bg-[#0B1735]/80 border border-white/10 rounded-2xl p-5 flex flex-col justify-between gap-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-headline font-bold text-slate-400 uppercase tracking-wider">
              Persistence Engine
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">storage</span>
            </div>
          </div>
          <div>
            <span className="font-headline text-lg font-bold text-white">
              SQLite (WAL Mode)
            </span>
            <span className="text-xs text-slate-300 block mt-1 font-sans">
              data/compete_academy.db
            </span>
          </div>
          <div className="text-[0.6875rem] text-emerald-400 font-semibold pt-2 border-t border-white/5 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Persistent &amp; Synchronized</span>
          </div>
        </div>
      </div>

      {/* Recent Materials */}
      <div className="bg-[#0B1735]/90 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#FFB91F]">description</span>
            <h2 className="font-headline text-base font-bold text-white">
              Recent Learning Materials &amp; Question Papers
            </h2>
          </div>
          <Link
            href="/admin/materials"
            className="text-xs text-[#FFB91F] hover:underline font-semibold"
          >
            View All Materials
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recentMaterials.length === 0 ? (
            <span className="text-xs text-slate-400 py-4 text-center col-span-2">No materials uploaded yet</span>
          ) : (
            recentMaterials.map((m) => (
              <div
                key={m.id}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-colors flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#FFB91F]/15 text-[#FFB91F] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-headline text-xs font-bold text-white truncate">
                      {m.title}
                    </span>
                    <span className="text-[0.6875rem] text-slate-400">
                      {m.course} • {m.subject} • {m.material_type}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-[0.625rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                    m.is_published
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {m.is_published ? 'Live' : 'Draft'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Admin Activity Audit Trail */}
      <div className="bg-[#0B1735]/90 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-400">history</span>
            <h2 className="font-headline text-base font-bold text-white">
              Institutional Audit Trail &amp; Activity Log
            </h2>
          </div>
          <span className="text-xs text-slate-400">Security logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-400 uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Target</th>
                <th className="py-2.5 px-3">Entity Name</th>
                <th className="py-2.5 px-3">Admin</th>
                <th className="py-2.5 px-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans">
              {recentActivities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-slate-400">
                    No recent administrative logs
                  </td>
                </tr>
              ) : (
                recentActivities.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-2.5 px-3 font-headline font-bold">
                      <span
                        className={`px-2 py-0.5 rounded text-[0.625rem] font-bold ${
                          log.action === 'CREATE'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : log.action === 'UPDATE'
                            ? 'bg-sky-500/20 text-sky-300'
                            : log.action === 'DELETE'
                            ? 'bg-rose-500/20 text-rose-300'
                            : 'bg-purple-500/20 text-purple-300'
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">{log.entity_type}</td>
                    <td className="py-2.5 px-3 text-white font-medium truncate max-w-xs">
                      {log.entity_title || log.entity_id}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">{log.admin_email}</td>
                    <td className="py-2.5 px-3 text-right text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
