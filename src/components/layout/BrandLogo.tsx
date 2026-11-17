
'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'dark' | 'light';
}

export function BrandLogo({
  className = '',
  showTagline = true,
  size = 'lg',
  theme = 'light',
}: BrandLogoProps) {
  const isDark = theme === 'dark';
  const [imageError, setImageError] = useState(false);

  // Logo crest dimensions — enlarged by ~32-35% in both rendered width and height
  // Matched to the authentic crest's 1.78:1 (1672x940) aspect ratio so neither dimension bottlenecks object-contain,
  // while negative vertical margins preserve the exact existing compact navbar height.
  const crestDimensions =
    size === 'sm'
      ? 'w-[4.5rem] h-[2.5rem] sm:w-[5.75rem] sm:h-[3.25rem]'
      : size === 'lg'
        ? 'w-[4.25rem] h-[2.4rem] xs:w-[5.25rem] xs:h-[2.95rem] sm:w-[7.5rem] sm:h-[4.25rem] lg:w-[8.5rem] lg:h-[4.75rem] -my-1 sm:-my-1.5 lg:-my-2'
        : 'w-[5rem] h-[2.8rem] sm:w-[6.5rem] sm:h-[3.625rem]';

  // Academy name typography — balanced beside the larger crest
  const titleDimensions =
    size === 'sm'
      ? 'text-xs sm:text-sm'
      : size === 'lg'
        ? 'text-[0.8125rem] xs:text-[0.875rem] sm:text-lg lg:text-[1.1875rem]'
        : 'text-sm sm:text-base lg:text-lg';

  // Tagline typography
  const taglineDimensions =
    size === 'sm'
      ? 'text-[0.625rem]'
      : size === 'lg'
        ? 'text-[0.65rem] sm:text-[0.71875rem]'
        : 'text-[0.6875rem] sm:text-[0.75rem]';

  return (
    <div
      className={`flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}
    >
      {/* Authentic Academy Crest */}
      <div
        className={`relative shrink-0 ${crestDimensions} flex items-center justify-center`}
      >
        {!imageError ? (
          <Image
            src="/logo/compete-academy-crest.png"
            alt="Compete Academy Crest"
            fill
            className="object-contain"
            sizes={
              size === 'lg'
                ? '(max-width: 640px) 104px, (max-width: 1024px) 120px, 136px'
                : size === 'sm'
                  ? '92px'
                  : '104px'
            }
            onError={() => setImageError(true)}
            priority
          />
        ) : (
          <div
            className={`w-full h-full rounded-lg border flex items-center justify-center font-headline font-bold ${
              isDark
                ? 'bg-primary-container border-[#C69A48]/50 text-[#C69A48]'
                : 'bg-[#101B3D] border-[#C69A48]/40 text-[#C69A48]'
            }`}
          >
            <span className="tracking-tighter font-extrabold">CA</span>
          </div>
        )}
      </div>

      {/* Academy Wordmark */}
      <div className="flex flex-col min-w-0">
        <span
          className={`font-headline font-black tracking-wider uppercase leading-none ${
            isDark ? 'text-white' : 'text-[#101B3D]'
          } ${titleDimensions}`}
        >
          COMPETE <span className="text-[#C69A48]">ACADEMY</span>
        </span>

        {showTagline && (
          <span
            className={`font-sans tracking-wide mt-0.5 truncate font-semibold hidden xs:inline-block ${
              isDark ? 'text-slate-300' : 'text-[#C69A48]'
            } ${taglineDimensions}`}
          >
            Dream • Prepare • Become
          </span>
        )}
      </div>
    </div>
  );
}
