export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export type AcademicStreamId = 'neet' | 'jee' | 'tngov' | 'upsc' | 'school';

export interface AcademicStream {
  id: AcademicStreamId;
  code: string;
  name: string;
  shortName: string;
  badge: string;
  icon: string;
  description: string;
  targetMetric: string;
  curriculum: string;
  mockTests: string;
  highlights: string[];
  bannerBg?: string;
}

export interface ResourceDocument {
  id: string;
  title: string;
  type: 'materials' | 'pyq' | 'mock' | 'voucher';
  format: string;
  size?: string;
  tag: string;
  isLocked: boolean;
  edition?: string;
  description: string;
  downloadUrl?: string;
  voucherCode?: string;
  discount?: string;
}

export interface FacultyMember {
  name: string;
  title: string;
  experience: string;
  credential: string;
  imageUrl: string;
  imageAlt: string;
}
