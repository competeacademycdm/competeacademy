import React from 'react';
import type { Metadata } from 'next';
import { ACADEMIC_PROGRAMS_DATA } from '@/data/academicIntelligence';
import { DedicatedCourseTemplate } from '@/components/course-pages/DedicatedCourseTemplate';

export const metadata: Metadata = {
  title: 'School Foundation Classes 6–12 (CBSE & State Board) | Compete Academy',
  description:
    'Secondary and Higher Secondary school foundation classes in Chennai for Classes 6th to 12th. Dual-track excellence: 95%+ in school board exams and early analytical Olympiad/NEET/JEE fundamentals with zero rote learning.',
  keywords: [
    'Foundation Classes Chennai',
    'Class 9 10 CBSE Coaching Guindy',
    'Class 11 12 State Board NEET Bridge',
    'Mathematics Olympiad Coaching Chennai',
    'School Tuition with Competitive Foundation',
  ],
};

export default function FoundationCoursePage() {
  const data = ACADEMIC_PROGRAMS_DATA.school;

  return (
    <DedicatedCourseTemplate
      data={data}
      heroImage={{
        src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&auto=format&fit=crop&q=80',
        alt: 'Foundation Science and Mathematics Students',
        caption: 'Hands-on Science Labs & Visual Mathematical Thinking',
      }}
      secondaryHeroImage={{
        src: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1400&auto=format&fit=crop&q=80',
        alt: 'Olympiad and Board Exam Toppers Classroom',
        caption: 'Conceptual Clarity, Board Excellence & Olympiad Readiness',
      }}
    />
  );
}
