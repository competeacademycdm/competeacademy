import React from 'react';
import type { Metadata } from 'next';
import { ACADEMIC_PROGRAMS_DATA } from '@/data/academicIntelligence';
import { DedicatedCourseTemplate } from '@/components/course-pages/DedicatedCourseTemplate';

export const metadata: Metadata = {
  title: 'TNPSC Group I, II, IV & VAO Coaching in Chennai | Compete Academy',
  description:
    'Premier Tamil Nadu Public Service Commission coaching in Chennai. 95+ target in General Tamil, Samacheer Kalvi Units 8 & 9 mastery, 25/25 mental aptitude drills, Tamil Nadu 69% reservation guidance, and Deputy Collector / DSP ranks.',
  keywords: [
    'TNPSC Coaching Chennai',
    'TNPSC Group 4 Academy Guindy',
    'TNPSC Group 1 Deputy Collector Coaching',
    'Samacheer Kalvi General Tamil 100 Marks',
    'PSTM Reservation Guidance Tamil Nadu',
  ],
};

export default function TnpscCoursePage() {
  const data = ACADEMIC_PROGRAMS_DATA.tngov;

  return (
    <DedicatedCourseTemplate
      data={data}
      heroImage={{
        src: 'https://images.unsplash.com/photo-1453945619913-79ec89a82c51?w=1400&auto=format&fit=crop&q=80',
        alt: 'Classical Neoclassical Pillars & State Administrative Governance Landmark',
        caption: 'Tamil Nadu Secretariat & State Administrative Services',
      }}
      secondaryHeroImage={{
        src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1400&auto=format&fit=crop&q=80',
        alt: 'Tamil Classical Literature & State Administration Library',
        caption: 'Samacheer Kalvi Units 8 & 9 with 25/25 Aptitude Speed Drills',
      }}
    />
  );
}
