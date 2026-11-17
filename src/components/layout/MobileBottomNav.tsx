'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/i18n';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { tr } = useLanguage();

  const isCourseActive =
    pathname.startsWith('/neet') ||
    pathname.startsWith('/jee') ||
    pathname.startsWith('/upsc') ||
    pathname.startsWith('/foundation') ||
    pathname.startsWith('/tnpsc');

  const currentCourseHref = isCourseActive ? pathname : '/neet';

  const tabs = [
    { label: tr.navigation.mobileBottomNav.home, href: '/', icon: 'home', activeMatch: pathname === '/' },
    { label: tr.navigation.mobileBottomNav.courses, href: currentCourseHref, icon: 'school', activeMatch: isCourseActive },
    { label: tr.navigation.mobileBottomNav.resources, href: '/resources', icon: 'folder_open', activeMatch: pathname.startsWith('/resources') },
    { label: tr.navigation.mobileBottomNav.about, href: '/about', icon: 'account_balance', activeMatch: pathname.startsWith('/about') },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-white/95 backdrop-blur-xl shadow-[0_-1px_12px_rgba(0,0,0,0.08)] border-t border-slate-200 lg:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = tab.activeMatch;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[60px] min-h-[44px] px-2 transition-colors ${
                isActive
                  ? 'text-[#0B142B] font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                  isActive ? 'bg-[#C69A3A]/20 text-[#0B142B]' : ''
                }`}
              >
                <span
                  className={`material-symbols-outlined text-xl ${
                    isActive ? 'text-[#0B142B]' : 'text-slate-500'
                  }`}
                >
                  {tab.icon}
                </span>
              </div>
              <span
                className={`text-[0.6875rem] font-sans ${
                  isActive ? 'font-bold text-[#0B142B]' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
