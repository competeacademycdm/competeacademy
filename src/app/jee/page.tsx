import React from 'react';
import type { Metadata } from 'next';
import { ACADEMIC_PROGRAMS_DATA } from '@/data/academicIntelligence';
import { DedicatedCourseTemplate } from '@/components/course-pages/DedicatedCourseTemplate';

export const metadata: Metadata = {
  title: 'JEE Main & Advanced Coaching in Chennai | Compete Academy',
  description:
    'Premier IIT-JEE Main and Advanced engineering coaching in Chennai. Verified 2026 NTA JEE Main & IIT JEE Advanced eligibility, JoSAA Round 5 opening/closing ranks, first-principles PCM instruction, and 60-terminal CBT testing lab.',
  keywords: [
    'IIT JEE Coaching Chennai',
    'JEE Main Preparation Guindy',
    'JEE Advanced Mentors Tamil Nadu',
    'NIT Trichy JoSAA Opening and Closing Ranks 2026',
    'JEE Previous Year Papers with Solutions',
  ],
};

export default function JeeCoursePage() {
  const data = ACADEMIC_PROGRAMS_DATA.jee;

  return (
    <DedicatedCourseTemplate
      data={data}
      heroImage={{
        src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1400&auto=format&fit=crop&q=80',
        alt: 'JEE Advanced Engineering Laboratory',
        caption: 'First-Principles Calculus & Analytical Mechanics',
      }}
      secondaryHeroImage={{
        src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1400&auto=format&fit=crop&q=80',
        alt: 'CBT Simulation Terminal Laboratory',
        caption: 'NTA CBT Console & IIT JAB Multi-Concept Synthesis',
      }}
    />
  );
}
