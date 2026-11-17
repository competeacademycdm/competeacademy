import React from 'react';
import type { Metadata } from 'next';
import { ACADEMIC_PROGRAMS_DATA } from '@/data/academicIntelligence';
import { DedicatedCourseTemplate } from '@/components/course-pages/DedicatedCourseTemplate';

export const metadata: Metadata = {
  title: 'UPSC Civil Services Coaching (IAS / IPS / IFS) in Chennai | Compete Academy',
  description:
    'Distinguished UPSC Civil Services coaching in Chennai. Interdisciplinary policy analysis, daily descriptive Mains answer writing, qualifying CSAT mathematics laboratory, and interview mentoring by retired IAS/IPS officers.',
  keywords: [
    'UPSC Coaching Chennai',
    'IAS Academy Guindy',
    'Civil Services Mains Answer Writing',
    'UPSC Prelims CSAT Laboratory',
    'Tamil Literature Optional UPSC Chennai',
  ],
};

export default function UpscCoursePage() {
  const data = ACADEMIC_PROGRAMS_DATA.upsc;

  return (
    <DedicatedCourseTemplate
      data={data}
      heroImage={{
        src: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1400&auto=format&fit=crop&q=80',
        alt: 'India Gate & Central Vista National Administrative Landmark',
        caption: 'Constitution, Indian Polity & Policy Governance',
      }}
      secondaryHeroImage={{
        src: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1400&auto=format&fit=crop&q=80',
        alt: 'UPSC Aspirants Mains Answer Writing',
        caption: 'Daily Mains Answer Writing & Dholpur House Interview Board',
      }}
    />
  );
}
