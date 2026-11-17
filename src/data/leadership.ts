export interface LeaderProfile {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  affiliation: string;
  image?: string;
  initials: string;
}

export const FOUNDER_DATA: LeaderProfile = {
  id: 'founder-karthikeyan',
  name: 'Er. K. S. Karthikeyan',
  designation: 'FOUNDER & DIRECTOR',
  qualification: 'B.E.',
  affiliation: 'Founder, Compete Academy',
  image: '/images/leadership/founder-karthikeyan.jpg',
  initials: 'KK',
};

export const ACADEMIC_ADVISORS_DATA: LeaderProfile[] = [
  {
    id: 'advisor-sathya',
    name: 'Dr. S. Sathya',
    designation: 'ACADEMIC ADVISOR',
    qualification: 'M.B.B.S., M.S. (O.G.)',
    affiliation: 'A4 Group of Hospitals, Chennai.',
    image: '/images/leadership/dr-s-sathya.jpg',
    initials: 'SS',
  },
  {
    id: 'advisor-shanmugasundaram',
    name: 'Dr. M. Shanmugasundaram',
    designation: 'ACADEMIC ADVISOR',
    qualification: 'M.B.B.S., M.S. (Orthopaedics)',
    affiliation: 'Senior Assistant Professor, MMC.',
    image: '/images/leadership/dr-m-shanmugasundaram.jpg',
    initials: 'MS',
  },
];
