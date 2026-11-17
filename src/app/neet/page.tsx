import React from 'react';
import type { Metadata } from 'next';
import { ACADEMIC_PROGRAMS_DATA } from '@/data/academicIntelligence';
import { DedicatedCourseTemplate } from '@/components/course-pages/DedicatedCourseTemplate';

export const metadata: Metadata = {
  title: 'NEET UG Medical Coaching in Chennai | Compete Academy',
  description:
    'Dedicated NEET UG medical coaching in Chennai. 100% line-by-line NCERT Biology, clinical Physics numericals, speed chemistry drills, 48 full-length simulated NTA mocks, and AIIMS/MMC faculty mentorship.',
  keywords: [
    'NEET Coaching Chennai',
    'NEET Medical Entrance Guindy',
    'Best NEET Academy Tamil Nadu',
    'NCERT Biology NEET coaching',
    'NEET Previous Year Question Papers',
  ],
};

export default function NeetCoursePage() {
  const data = ACADEMIC_PROGRAMS_DATA.neet;

  return (
    <DedicatedCourseTemplate
      data={data}
      heroImage={{
        src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&auto=format&fit=crop&q=80',
        alt: 'NEET Medical Academy Aspirants',
        caption: 'Clinical NCERT Precision & Stethoscope Aspiration',
      }}
      secondaryHeroImage={{
        src: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=1400&auto=format&fit=crop&q=80',
        alt: 'Compete Academy Medical Lecture Amphitheatre',
        caption: 'Line-by-Line NCERT Mastery & Clinical Reasoning Cohorts',
      }}
    />
  );
}
