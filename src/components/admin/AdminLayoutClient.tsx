'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BrandLogo } from '@/components/layout/BrandLogo';

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

interface AdminUser {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(!isLoginPage);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (isLoginPage) return;

    let mounted = true;
    fetch('/api/admin/auth/me')
      .then((res) => {
        if (!res.ok) throw new Error('Unauthenticated');
        return res.json();
      })
      .then((data) => {
        if (mounted && data.authenticated) {
          setAdminUser(data.user);
          setLoading(false);
        } else {
          router.push('/admin/login?expired=1');
        }
      })
      .catch(() => {
        if (mounted) {
          router.push('/admin/login?expired=1');
        }
      });

    return () => {
      mounted = false;
    };
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    router.push('/admin/login');
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071126] flex flex-col items-center justify-center text-white gap-3">
        <div className="w-10 h-10 border-3 border-[#FFB91F] border-t-transparent rounded-full animate-spin" />
        <span className="font-headline text-sm font-semibold tracking-wider uppercase text-slate-300">
          Loading Admin Security Session...
        </span>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: 'dashboard' },
    { label: 'Resource Download Students', href: '/admin/resource-students', icon: 'person_search' },
    { label: 'Learning Materials', href: '/admin/materials', icon: 'auto_stories' },
    { label: 'Student Enquiries', href: '/admin/enquiries', icon: 'contact_support' },
    { label: 'Settings', href: '/admin/settings', icon: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-[#071126] text-slate-100 flex flex-col md:flex-row antialiased font-sans">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#0B1735] border-b border-white/10 px-4 py-3 sticky top-0 z-40">
        <Link href="/admin" className="flex items-center gap-2">
          <BrandLogo size="sm" theme="dark" />
          <span className="font-headline text-xs font-bold uppercase tracking-wider text-[#FFB91F] px-2 py-0.5 rounded bg-[#FFB91F]/15 border border-[#FFB91F]/30">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="p-2 text-slate-300 hover:text-white"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-50 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 w-72 bg-[#0B1735] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } h-screen`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Logo & Dean Identity Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link href="/" className="flex flex-col gap-1">
              <BrandLogo size="md" theme="dark" />
              <span className="font-headline text-[0.6875rem] font-bold text-[#FFB91F] tracking-widest uppercase">
                Academic Administration
              </span>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Admin User Card */}
          <div className="p-4 mx-4 my-4 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FFB91F] text-[#071126] font-bold font-headline flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline text-xs font-bold text-white truncate">
                {adminUser?.name || 'Administrator'}
              </span>
              <span className="text-[0.6875rem] text-slate-400 truncate">
                {adminUser?.email || 'admin@competeacademy.in'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-2 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-headline text-xs font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#FFB91F] text-[#071126] shadow-md shadow-[#FFB91F]/20'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-lg ${
                      isActive ? 'text-[#071126]' : 'text-slate-400'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Website Return & Logout */}
          <div className="p-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-headline font-semibold transition-colors"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-[#FFB91F]">open_in_new</span>
                <span>View Public Site</span>
              </span>
              <span className="text-[0.625rem] text-slate-400">Live</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-rose-400 hover:bg-rose-500/15 text-xs font-headline font-bold transition-colors w-full"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span>Logout Admin</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar Bar inside Dashboard */}
        <header className="hidden md:flex items-center justify-between bg-[#0B1735]/60 backdrop-blur-md border-b border-white/10 px-8 py-3.5 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Admin</span>
            <span>/</span>
            <span className="text-white font-semibold capitalize">
              {pathname === '/admin' ? 'Dashboard Overview' : pathname.replace('/admin/', '').replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Database Online (WAL)</span>
            </div>
            <Link
              href="/admin/materials"
              className="px-3 py-1.5 rounded-lg bg-[#FFB91F] text-[#071126] font-headline text-xs font-bold hover:bg-[#e6a517] transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm font-bold">upload_file</span>
              <span>Upload Material</span>
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-5 lg:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
