// Academic Intelligence & Course Discovery Data Model
// Verified Examination Authorities, Statutory Cutoffs, Marking Schemes, and Curricula

export interface ExamStage {
  stageNumber: number;
  name: string;
  shortCode: string;
  type: string;
  duration: string;
  totalMarks: number | string;
  questionsCount?: number | string;
  nature: string;
  description: string;
}

export interface MarksDistributionRow {
  subject: string;
  section?: string;
  questionsAsked: number | string;
  questionsToAttempt: number | string;
  marksPerQuestion: number | string;
  negativeMark: string;
  totalMarks: number;
  syllabusScope: string;
  highYieldWeightage: string;
}

export interface EligibilityCategory {
  categoryName: string;
  code: string;
  reservationPercentage: string;
  qualifyingCriteria: string;
  recentQualifyingCutoff: string;
  typicalAllotmentSafeScore: string;
  maxAttemptsOrAge: string;
  notes: string;
}

export interface CurriculumChapter {
  title: string;
  subtopics: string[];
  weightageLevel: 'High Yield' | 'Core Standard' | 'Foundational' | string;
  estimatedHours: number;
}

export interface SubjectCurriculum {
  subjectName: string;
  icon: string;
  totalChapters: number;
  totalHours: number;
  chapters: CurriculumChapter[];
}

export interface LearningJourneyStage {
  stageNumber: number;
  phaseTitle: string;
  timeline: string;
  academicObjective: string;
  pedagogicalFocus: string[];
  assessmentMilestone: string;
  keyDeliverable: string;
}

export interface StudentApproachPillar {
  pillarNumber: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface CareerOpportunity {
  roleOrDegree: string;
  institutionOrCadre: string;
  description: string;
  futureScope: string;
}

export interface AcademicProgramIntelligence {
  id: string;
  programCode: string; // 'neet' | 'jee' | 'tngov' | 'upsc' | 'school'
  title: string;
  shortName: string;
  badge: string;
  targetAudience: string;
  headline: string;
  heroBranding: {
    primarySlogan: string;
    supportingLine: string;
    supportingDescription: string;
  };
  introduction: {
    heroStatement: string;
    purpose: string;
    examinationReality: string;
    strategicImperative: string;
    competeAcademyPhilosophy: string;
  };
  examination: {
    examName: string;
    conductingAuthority: string;
    authorityFull: string;
    annualCadence: string;
    examMode: string;
    totalMarks: number;
    totalQuestions: number;
    durationMinutes: number;
    negativeMarkingRule: string;
    officialSourceTitle: string;
    officialSourceUrl: string;
    examYear: string;
    verifiedDate: string;
    stages: ExamStage[];
  };
  marksDistribution: {
    overview: string;
    rows: MarksDistributionRow[];
    totalCalculatedMarks: number;
    scoringStrategy: string[];
  };
  eligibilityAndCutoffs: {
    academicPrerequisite: string;
    ageLimitRule: string;
    officialStatutoryNote: string;
    categories: EligibilityCategory[];
    cutoffsDistinctionExplanation: string;
  };
  timeManagement: {
    modeDescription: string;
    recommendedTimePerQuestion: string;
    tacticalPacingStrategy: {
      round: string;
      title: string;
      durationAllocated: string;
      actionPlan: string;
    }[];
    negativeMarkingMitigation: string[];
  };
  curriculum: SubjectCurriculum[];
  foundationClassesData?: {
    classGroups: {
      groupLabel: string;
      grades: string;
      tagline: string;
      objective: string;
      boardAlignment: string;
      subjects: SubjectCurriculum[];
    }[];
  };
  learningJourney: LearningJourneyStage[];
  studentApproach: StudentApproachPillar[];
  institutionalStrengths: {
    title: string;
    description: string;
    metric: string;
  }[];
  careerOpportunities: CareerOpportunity[];
  connectedResourceFilter: string;
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const ACADEMIC_PROGRAMS_DATA: Record<string, AcademicProgramIntelligence> = {
  // --------------------------------------------------------------------------
  // 01. NEET UG COACHING
  // --------------------------------------------------------------------------
  neet: {
    id: 'prog-neet-01',
    programCode: 'neet',
    title: 'NEET UG Medical Precision Coaching',
    shortName: '01. NEET UG',
    badge: 'National Medical Commission (NMC) & NTA Pattern',
    targetAudience: 'Classes 11 & 12 Medical Aspirants + 1-Year Dedicated Repeaters',
    headline: 'Your White Coat Awaits. We pave the way.',
    heroBranding: {
      primarySlogan: 'Your White Coat Awaits.',
      supportingLine: 'We pave the way.',
      supportingDescription: 'Build the knowledge. Master the science. Become the doctor.',
    },
    introduction: {
      heroStatement:
        'Build the knowledge. Master the science. Become the doctor. We cultivate deep NCERT conceptual understanding, scientific reasoning, and clinical thinking so you enter the medical profession truly capable—not merely exam-qualified.',
      purpose: 'The National Eligibility cum Entrance Test (NEET-UG) is the single statutory entrance examination for admission to MBBS, BDS, BAMS, BHMS, and other undergraduate medical courses across all medical institutions in India, including AIIMS and JIPMER.',
      examinationReality: 'With over 24 lakh candidates competing for approximately 55,000 Government MBBS seats, NEET UG is an unforgiving test of speed, micro-concept precision, and negative-mark containment. A single unforced error costs 5 marks (4 lost + 1 penalty), translating to an immediate rank drop of 2,000+ positions.',
      strategicImperative: 'Success does not come from solving obscure university-level problems. It requires 100% textbook mastery of NCERT Biology (180/180 target recall), rapid physical chemistry calculations, and mechanics/electrodynamics error mitigation under a 200-minute time constraint.',
      competeAcademyPhilosophy:
        'Through 3 tiers of line-by-line NCERT deconstruction, analytical Physics and Chemistry mastery, and 48 full-length simulated NTA-pattern evaluations supervised by medical mentors, we prepare aspiring doctors for clinical and academic excellence.',
    },
    examination: {
      examName: 'National Eligibility cum Entrance Test (UG)',
      conductingAuthority: 'National Testing Agency (NTA)',
      authorityFull: 'Conducted under guidelines of the National Medical Commission (NMC) & Ministry of Health & Family Welfare',
      annualCadence: 'Once a year (Usually first Sunday of May)',
      examMode: 'Offline OMR Pen & Paper',
      totalMarks: 720,
      totalQuestions: 180, // out of 200 provided in question paper
      durationMinutes: 200, // 3 hours 20 minutes
      negativeMarkingRule: '+4 for each correct response, -1 for each incorrect response, 0 for unattempted questions',
      officialSourceTitle: 'NTA NEET UG Official Information Bulletin',
      officialSourceUrl: 'https://exams.nta.ac.in/NEET/',
      examYear: '2025 / 2026',
      verifiedDate: 'November 2026',
      stages: [
        {
          stageNumber: 1,
          name: 'NEET UG Single National Examination',
          shortCode: 'NEET-UG',
          type: 'Pen & Paper (OMR)',
          duration: '200 Minutes (3 hrs 20 mins)',
          totalMarks: 720,
          questionsCount: '180 attempted out of 200',
          nature: 'Merit Ranking',
          description: 'Single session nationwide pen-and-paper test covering Physics, Chemistry, Botany, and Zoology across Section A (compulsory) and Section B (optional choice).',
        },
        {
          stageNumber: 2,
          name: 'All India Quota (15%) & State Quota (85%) Medical Counselling',
          shortCode: 'MCC / DME',
          type: 'Descriptive Written',
          duration: '3 to 4 Rounds Online Counselling',
          totalMarks: 'Rank-based Allotment',
          nature: 'Merit Ranking',
          description: 'Centralized counselling conducted by MCC (for 15% AIQ, Central/Deemed Universities, AIIMS, JIPMER) and TN DME / State Authorities for 85% state quota seats.',
        },
      ],
    },
    marksDistribution: {
      overview: 'NEET UG consists of 4 distinct subject sections: Physics, Chemistry, Botany, and Zoology. Each subject has Section A (35 mandatory questions) and Section B (15 questions where the student must attempt any 10). Total questions = 200; total attempted = 180.',
      rows: [
        {
          subject: 'Physics',
          section: 'Section A (35 Qs) + Section B (15 Qs, attempt 10)',
          questionsAsked: '50 Qs',
          questionsToAttempt: '45 Qs',
          marksPerQuestion: 4,
          negativeMark: '-1 mark',
          totalMarks: 180,
          syllabusScope: 'Mechanics, Electrodynamics, Modern Physics, Thermal & Optics (NCERT Classes 11 & 12)',
          highYieldWeightage: 'Mechanics & Electrodynamics account for ~55% of total physics weightage.',
        },
        {
          subject: 'Chemistry',
          section: 'Section A (35 Qs) + Section B (15 Qs, attempt 10)',
          questionsAsked: '50 Qs',
          questionsToAttempt: '45 Qs',
          marksPerQuestion: 4,
          negativeMark: '-1 mark',
          totalMarks: 180,
          syllabusScope: 'Physical Chemistry, Inorganic Chemistry (NCERT Pure), Organic Reaction Mechanisms',
          highYieldWeightage: 'Inorganic NCERT trends + Organic named reactions comprise 65% of reliable scoring.',
        },
        {
          subject: 'Botany',
          section: 'Section A (35 Qs) + Section B (15 Qs, attempt 10)',
          questionsAsked: '50 Qs',
          questionsToAttempt: '45 Qs',
          marksPerQuestion: 4,
          negativeMark: '-1 mark',
          totalMarks: 180,
          syllabusScope: 'Genetics, Plant Physiology, Ecology, Cell Biology, Plant Reproduction',
          highYieldWeightage: 'Genetics & Molecular Biology yield 12-14 direct questions annually.',
        },
        {
          subject: 'Zoology',
          section: 'Section A (35 Qs) + Section B (15 Qs, attempt 10)',
          questionsAsked: '50 Qs',
          questionsToAttempt: '45 Qs',
          marksPerQuestion: 4,
          negativeMark: '-1 mark',
          totalMarks: 180,
          syllabusScope: 'Human Physiology, Biotechnology Principles & Applications, Animal Kingdom, Evolution',
          highYieldWeightage: 'Human Physiology & Biotechnology account for over 22-25 questions.',
        },
      ],
      totalCalculatedMarks: 720,
      scoringStrategy: [
        'Aim for 340+ out of 360 in Biology by treating NCERT as the absolute syllabus boundary.',
        'Complete Biology within 45-50 minutes to bank 140+ minutes for numerical calculations in Physics and Physical Chemistry.',
        'Never guess in Section B: pick the 10 questions with direct, unequivocal factual or calculation verification.',
      ],
    },
    eligibilityAndCutoffs: {
      academicPrerequisite: 'Passed 10+2 / Higher Secondary Examination with Physics, Chemistry, Biology/Biotechnology, and English as core subjects from a recognized board (CBSE, CISCE, State Board). Minimum aggregate marks in PCB: 50% for Unreserved, 40% for OBC/SC/ST, 45% for PwD.',
      ageLimitRule: 'Minimum 17 years completed on or before 31st December of the year of admission. There is NO upper age limit as per NMC revised regulations.',
      officialStatutoryNote: 'Statutory Reference: NTA Information Bulletin & National Medical Commission (NMC) Undergraduate Medical Education Regulations.',
      cutoffsDistinctionExplanation: 'CRITICAL DISTINCTION: "Qualifying Cutoff Percentile" simply makes an applicant eligible to participate in counselling; it DOES NOT grant an MBBS seat. Actual Government Medical College admission requires achieving the "Seat Allotment Safe Score" (typically 610-660+ depending on state and category).',
      categories: [
        {
          categoryName: 'General / Unreserved (UR)',
          code: 'UR / Open',
          reservationPercentage: 'Open Merit (~40.5% after EWS)',
          qualifyingCriteria: '50th Percentile in NEET UG',
          recentQualifyingCutoff: '164 - 137 Marks (Varies by session curve)',
          typicalAllotmentSafeScore: '655+ (AIQ GMC) | 610+ (TN State Quota GMC)',
          maxAttemptsOrAge: 'No Attempt Limit | Min 17 Years',
          notes: 'High competition; minimal margin for error in Physics/Chemistry calculations.',
        },
        {
          categoryName: 'Economically Weaker Sections (EWS)',
          code: 'GEN-EWS',
          reservationPercentage: '10% Central Reservation',
          qualifyingCriteria: '50th Percentile in NEET UG',
          recentQualifyingCutoff: '164 - 137 Marks',
          typicalAllotmentSafeScore: '645+ (AIQ GMC) | 600+ (Central Univs)',
          maxAttemptsOrAge: 'No Attempt Limit | Valid Income & Asset Certificate',
          notes: 'Applicable in Central institutions and participating state quota colleges.',
        },
        {
          categoryName: 'Other Backward Classes (OBC-NCL)',
          code: 'OBC-NCL',
          reservationPercentage: '27% in Central AIQ Seats',
          qualifyingCriteria: '40th Percentile in NEET UG',
          recentQualifyingCutoff: '136 - 107 Marks',
          typicalAllotmentSafeScore: '650+ (AIQ GMC) | TN State BC/MBC Quota applies separately',
          maxAttemptsOrAge: 'No Attempt Limit | NCL Certificate issued for current FY',
          notes: 'Central OBC-NCL differs from Tamil Nadu State BC/MBC classifications.',
        },
        {
          categoryName: 'Tamil Nadu Backward Classes (BC & BCM)',
          code: 'TN BC / BCM',
          reservationPercentage: '26.5% (BC) + 3.5% (BCM) in TN State Quota',
          qualifyingCriteria: '40th Percentile (Categorized under OBC in NTA)',
          recentQualifyingCutoff: '136 - 107 Marks',
          typicalAllotmentSafeScore: '585+ (BC) | 565+ (BCM) in TN Govt Medical Colleges',
          maxAttemptsOrAge: 'No Attempt Limit | Valid TN Community Certificate',
          notes: 'Governed by Tamil Nadu 69% Reservation Act (1994).',
        },
        {
          categoryName: 'Most Backward Classes & Denotified (MBC/DNC)',
          code: 'TN MBC/DNC',
          reservationPercentage: '20% in TN State Quota',
          qualifyingCriteria: '40th Percentile in NEET UG',
          recentQualifyingCutoff: '136 - 107 Marks',
          typicalAllotmentSafeScore: '555+ in TN Govt Medical Colleges',
          maxAttemptsOrAge: 'No Attempt Limit | Community Certificate mandatory',
          notes: 'High seat availability across 36 Tamil Nadu Government Medical Colleges.',
        },
        {
          categoryName: 'Scheduled Castes (SC & SCA)',
          code: 'SC / SCA',
          reservationPercentage: '15% (SC) + 3% (SCA Arunthathiyar) in TN Quota',
          qualifyingCriteria: '40th Percentile in NEET UG',
          recentQualifyingCutoff: '136 - 107 Marks',
          typicalAllotmentSafeScore: '475+ (SC) | 420+ (SCA) for TN Govt Medical College seat',
          maxAttemptsOrAge: 'No Attempt Limit | Permanent Community Certificate',
          notes: 'Sub-quota of 16% within SC for Arunthathiyar community.',
        },
        {
          categoryName: 'Scheduled Tribes (ST)',
          code: 'ST',
          reservationPercentage: '7.5% Central AIQ | 1% TN State Quota',
          qualifyingCriteria: '40th Percentile in NEET UG',
          recentQualifyingCutoff: '136 - 107 Marks',
          typicalAllotmentSafeScore: '410+ in TN Govt Medical Colleges',
          maxAttemptsOrAge: 'No Attempt Limit | Revenue Divisional Officer verification',
          notes: 'Reserved seats across all state and central medical institutions.',
        },
      ],
    },
    timeManagement: {
      modeDescription: 'Conducted in Pen & Paper (OMR) mode. The physical nature of darkening OMR bubbles introduces mechanical risks: double bubbling, offset row errors, and time loss (darkening 180 bubbles takes ~18 minutes).',
      recommendedTimePerQuestion: 'Biology: 40 seconds per question | Chemistry: 60 seconds | Physics: 80-90 seconds.',
      tacticalPacingStrategy: [
        {
          round: 'Phase 1 (0 to 45 mins)',
          title: 'Biology Blitzkrieg',
          durationAllocated: '45 Minutes',
          actionPlan: 'Solve Botany and Zoology Section A & selected Section B questions. Immediate OMR bubble bubbling in sets of 10. Target: 330+ marks banked.',
        },
        {
          round: 'Phase 2 (45 to 105 mins)',
          title: 'Chemistry Precision Sweep',
          durationAllocated: '60 Minutes',
          actionPlan: 'Solve Inorganic and Organic first (direct theory recall), followed by straightforward Physical calculations. Bubble immediately.',
        },
        {
          round: 'Phase 3 (105 to 180 mins)',
          title: 'Physics Systematic Computation',
          durationAllocated: '75 Minutes',
          actionPlan: 'Solve standard mechanics, electrodynamics, modern physics problems. Mark lengthy/uncertain calculations for Round 4.',
        },
        {
          round: 'Phase 4 (180 to 200 mins)',
          title: 'Buffer, Review & OMR Audit',
          durationAllocated: '20 Minutes',
          actionPlan: 'Review marked uncertain questions. Ensure no question offset mistakes on the physical OMR sheet.',
        },
      ],
      negativeMarkingMitigation: [
        'The 50/50 Rule: Attempt a question only if you have eliminated at least 2 incorrect options through scientific reasoning.',
        'Zero Blind Guessing: 4 incorrect guesses negate the value of 1 hard-earned correct answer.',
        'Section B Filtering: Spend 90 seconds reading all 15 questions before choosing the 10 easiest/fastest.',
      ],
    },
    curriculum: [
      {
        subjectName: 'Physics for Medical Aspirants',
        icon: 'bolt',
        totalChapters: 28,
        totalHours: 190,
        chapters: [
          {
            title: 'Mechanics & Physical World',
            subtopics: ['Units & Dimensions', 'Kinematics in 1D & 2D', 'Laws of Motion & Friction', 'Work, Energy & Power', 'Rotational Dynamics & Moment of Inertia', 'Gravitation & Satellite Motion'],
            weightageLevel: 'High Yield',
            estimatedHours: 42,
          },
          {
            title: 'Thermodynamics & Kinetic Theory',
            subtopics: ['Thermal Properties of Matter', 'Zeroth, First & Second Laws of Thermodynamics', 'Carnot Engine & Efficiency', 'Kinetic Theory of Gases & Mean Free Path'],
            weightageLevel: 'Core Standard',
            estimatedHours: 24,
          },
          {
            title: 'Electrodynamics & Magnetism',
            subtopics: ['Electrostatics & Gauss Law', 'Capacitance & Dielectrics', 'Current Electricity & Kirchhoffs Laws', 'Moving Charges & Magnetic Fields', 'Electromagnetic Induction & Lenz Law', 'Alternating Currents & Resonance'],
            weightageLevel: 'High Yield',
            estimatedHours: 48,
          },
          {
            title: 'Optics & Wave Motion',
            subtopics: ['Ray Optics, Lenses & Optical Instruments', 'Wave Optics, Interference & Youngs Double Slit', 'Diffraction and Polarization Basics'],
            weightageLevel: 'High Yield',
            estimatedHours: 32,
          },
          {
            title: 'Modern Physics & Semiconductor Devices',
            subtopics: ['Dual Nature of Radiation & Photoelectric Effect', 'Atoms & Bohr Model', 'Nuclei, Mass Defect & Radioactivity', 'Semiconductor Diodes, Rectifiers & Logic Gates'],
            weightageLevel: 'High Yield',
            estimatedHours: 30,
          },
        ],
      },
      {
        subjectName: 'Chemistry (Physical, Inorganic & Organic)',
        icon: 'science',
        totalChapters: 30,
        totalHours: 200,
        chapters: [
          {
            title: 'Physical Chemistry Fundamentals',
            subtopics: ['Mole Concept & Stoichiometry', 'Atomic Structure & Quantum Numbers', 'Thermodynamics & Enthalpy Calculations', 'Chemical & Ionic Equilibrium', 'Electrochemistry & Nernst Equation', 'Chemical Kinetics & Rate Laws'],
            weightageLevel: 'High Yield',
            estimatedHours: 54,
          },
          {
            title: 'Inorganic Chemistry & Periodic Trends',
            subtopics: ['Periodic Classification & Trends', 'Chemical Bonding & Molecular Orbital Theory', 'p-Block Elements', 'd- and f-Block Elements & Catalysis', 'Coordination Compounds & IUPAC Naming'],
            weightageLevel: 'High Yield',
            estimatedHours: 48,
          },
          {
            title: 'Organic Chemistry & Reaction Mechanisms',
            subtopics: ['Basic Principles & Purification (GOC)', 'Isomerism: Structural & Stereoisomerism', 'Hydrocarbons: Alkanes, Alkenes, Alkynes & Benzene', 'Haloalkanes & Haloarenes (SN1/SN2)', 'Alcohols, Phenols & Ethers', 'Aldehydes, Ketones & Carboxylic Acids', 'Amines & Diazonium Salts', 'Biomolecules & Polymers'],
            weightageLevel: 'High Yield',
            estimatedHours: 68,
          },
        ],
      },
      {
        subjectName: 'Biology (Botany & Zoology)',
        icon: 'psychology_alt',
        totalChapters: 38,
        totalHours: 240,
        chapters: [
          {
            title: 'Diversity in Living World & Plant Kingdom',
            subtopics: ['Biological Classification (Five Kingdom System)', 'Monera, Protista, Fungi, Viruses & Viroids', 'Plant Kingdom: Algae, Bryophytes, Pteridophytes, Gymnosperms & Angiosperms'],
            weightageLevel: 'Core Standard',
            estimatedHours: 32,
          },
          {
            title: 'Cell Biology, Genetics & Evolution',
            subtopics: ['Cell: The Unit of Life & Organelles', 'Biomolecules (Proteins, Lipids, Nucleic Acids)', 'Cell Cycle & Cell Division (Mitosis & Meiosis)', 'Principles of Inheritance & Variation (Mendelism)', 'Molecular Basis of Inheritance (DNA Replication, Transcription, Translation, Lac Operon)', 'Evolution & Population Genetics'],
            weightageLevel: 'High Yield',
            estimatedHours: 60,
          },
          {
            title: 'Human Physiology',
            subtopics: ['Breathing & Exchange of Gases', 'Body Fluids & Circulation (Cardiac Cycle, ECG)', 'Excretory Products & Their Elimination', 'Locomotion & Movement (Sliding Filament Theory)', 'Neural Control & Coordination (Nerve Impulse Transmission)', 'Chemical Coordination & Hormonal Regulation'],
            weightageLevel: 'High Yield',
            estimatedHours: 56,
          },
          {
            title: 'Biotechnology & Ecology',
            subtopics: ['Biotechnology: Principles & Recombinant DNA', 'Biotechnology & Its Applications (Gene Therapy, Transgenic Animals)', 'Organisms & Populations', 'Ecosystem, Energy Flow & Food Chains', 'Biodiversity & Conservation Initiatives'],
            weightageLevel: 'High Yield',
            estimatedHours: 42,
          },
        ],
      },
    ],
    learningJourney: [
      {
        stageNumber: 1,
        phaseTitle: 'Phase 1: Deep NCERT Text & Conceptual Grounding',
        timeline: 'Months 1 to 4',
        academicObjective: 'Master fundamental NCERT line-by-line syntax in Biology and establish high-speed core calculations in Physics and Chemistry.',
        pedagogicalFocus: [
          'Every paragraph of NCERT Biology mapped into fill-in-the-blank and assertion-reason cards.',
          'Formula derivational rigor in Physics: understand the conditions and limits of applicability for every equation.',
          'Physical Chemistry basic math: logarithms, exponents, unit conversions, and dimensional checks.',
        ],
        assessmentMilestone: 'Bi-weekly Unit Mastery Assessments with 100% video-deconstructed doubt clearing.',
        keyDeliverable: 'Student-annotated NCERT master volumes with integrated margin summaries.',
      },
      {
        stageNumber: 2,
        phaseTitle: 'Phase 2: High-Yield Application & Cross-Topic Linkage',
        timeline: 'Months 5 to 8',
        academicObjective: 'Transition from single-chapter familiarity to complex multi-concept application problems matching NTA tricky question types.',
        pedagogicalFocus: [
          'Assertion-Reasoning workshops designed specifically to eliminate confusion in NMC modified formats.',
          'Statement I vs Statement II analytical questions drill.',
          'Calculative shortcuts in Mechanics and Thermodynamics to achieve sub-60-second completion.',
        ],
        assessmentMilestone: 'Combined Sectional Tests (Cumulative 360-mark modules) every Sunday morning.',
        keyDeliverable: 'Error Log Diary with root cause categorizations (Conceptual / Calculation / Misread).',
      },
      {
        stageNumber: 3,
        phaseTitle: 'Phase 3: 20-Year Previous Years Question (PYQ) Deconstruction',
        timeline: 'Months 9 to 10',
        academicObjective: 'Exhaustive resolution and reverse-engineering of all NEET-UG, AIPMT, and AIIMS questions from 2005 to 2025.',
        pedagogicalFocus: [
          'Recognize repeating examiner traps, recurring distractors, and standard option formatting patterns.',
          'Speed benchmarks: completing 90 Biology questions in under 42 minutes with zero negative marks.',
          'Inorganic NCERT exceptions catalogued and revised in daily 15-minute flash drills.',
        ],
        assessmentMilestone: 'Full Syllabus Mock Tests 1 through 20 under strict 2:00 PM to 5:20 PM exam conditions.',
        keyDeliverable: 'Personalized Weakness Heatmap pinpointing specific chapters with sub-80% accuracy.',
      },
      {
        stageNumber: 4,
        phaseTitle: 'Phase 4: Simulated National Mock Tests & Mental Conditioning',
        timeline: 'Final 2 Months',
        academicObjective: 'Peak biological clock alignment, stamina endurance, and error-free OMR bubbling under pressure.',
        pedagogicalFocus: [
          '48 Full-Length Simulated Tests using identical physical OMR sheets with candidate demographic filling.',
          'Stress inoculation sessions: testing in varying ambient classroom temperatures and environments.',
          'Post-test one-on-one audit sessions with Chief Academic Dean to tune individual pacing.',
        ],
        assessmentMilestone: 'Predictive All-India Rank Simulation benchmarked against historical cutoff databases.',
        keyDeliverable: 'Complete confidence to score 650+ and secure a Government Medical College seat.',
      },
    ],
    studentApproach: [
      {
        pillarNumber: '01',
        title: 'Line-by-Line NCERT Dissection',
        tagline: 'Treating the textbook as law, not just a reference.',
        description: 'Our faculties dissect every diagram, caption, table footnote, and summary point across NCERT Classes 11 and 12, ensuring zero surprise questions on exam day.',
        icon: 'menu_book',
      },
      {
        pillarNumber: '02',
        title: 'Daily 30-Minute OMR Drills',
        tagline: 'Mechanical muscle memory that prevents bubbling errors.',
        description: 'Bubbling 180 questions under time pressure leads to row shifts if untrained. We conduct daily rapid bubble tests to ensure mechanical perfection.',
        icon: 'fact_check',
      },
      {
        pillarNumber: '03',
        title: 'Doctor-Led Mentor Council',
        tagline: 'Guided by those who have walked the path.',
        description: 'Periodic interactive seminars with practicing doctors, surgeons, and top GMC alumni who share clinical case studies and maintain student motivation.',
        icon: 'stethoscope',
      },
      {
        pillarNumber: '04',
        title: 'Strict Error Analysis Protocol',
        tagline: 'No wrong answer is dismissed without root cause diagnosis.',
        description: 'Every incorrect mock test answer must be transcribed into the physical "Compete Mistake Logbook" categorised into Conceptual Gap, Misread, or Mathematical Error.',
        icon: 'rate_review',
      },
      {
        pillarNumber: '05',
        title: 'Curated 7,500 Question Databank',
        tagline: 'No redundant or irrelevant out-of-syllabus questions.',
        description: 'Every problem in our question repository is mapped directly to the current NMC revised syllabus, eliminating obsolete topics removed from curriculum.',
        icon: 'database',
      },
      {
        pillarNumber: '06',
        title: 'Small Cohort Classrooms',
        tagline: 'Individual academic attention over crowded auditoriums.',
        description: 'We cap our medical batches at 45 students per cohort to allow continuous teacher-student interaction and immediate on-the-spot doubt resolution.',
        icon: 'groups',
      },
      {
        pillarNumber: '07',
        title: 'Parent Academic Progress Sync',
        tagline: 'Transparent partnership between home and academy.',
        description: 'Weekly automated performance analytics, attendance updates, and scheduled monthly academic consultations with lead subject mentors.',
        icon: 'sync_alt',
      },
      {
        pillarNumber: '08',
        title: 'Mental Stamina & Wellbeing Support',
        tagline: 'High performance requires psychological equilibrium.',
        description: 'Dedicated student counseling sessions addressing examination anxiety, sleep hygiene, and cognitive endurance during long study hours.',
        icon: 'spa',
      },
    ],
    institutionalStrengths: [
      {
        title: 'Government Medical College Conversions',
        description: 'Demonstrated consistency in placing committed aspirants in Tamil Nadu Government Medical Colleges (Madras Medical College, Stanley, MMC Vellore, etc.).',
        metric: '78% Cohort GMC Qualified',
      },
      {
        title: 'Full-Time Dedicated Faculty Council',
        description: 'Permanent, in-house subject master teachers with an average of 12+ years specializing exclusively in competitive entrance coaching.',
        metric: '100% In-House Mentors',
      },
      {
        title: 'Strictly NCERT-Aligned Question Quality',
        description: 'Zero fabricated or outdated questions. Every module is verified against NMC syllabus notifications and historical NTA test datasets.',
        metric: '100% NMC Pattern',
      },
    ],
    careerOpportunities: [
      {
        roleOrDegree: 'MBBS (Bachelor of Medicine & Bachelor of Surgery)',
        institutionOrCadre: 'AIIMS, JIPMER, Madras Medical College, Stanley Medical College & All GMCs',
        description: 'Primary undergraduate clinical medical degree leading to medical licensure, residency, and specialized MD/MS or super-specialty DM/MCh surgical training.',
        futureScope: 'Critical national demand across cardiology, oncology, neurosurgery, internal medicine, and healthcare administration.',
      },
      {
        roleOrDegree: 'BDS (Bachelor of Dental Surgery)',
        institutionOrCadre: 'Tamil Nadu Government Dental College, Central Dental Institutes',
        description: 'Dental healthcare, maxillofacial surgery, oral pathology, and orthodontic specialized clinical practice.',
        futureScope: 'High opportunity for private clinics, hospital dentistry, and international advanced degrees (MDS).',
      },
      {
        roleOrDegree: 'AYUSH (BAMS / BHMS / BSMS)',
        institutionOrCadre: 'National Institutes of Ayurveda, Siddha & Homeopathy',
        description: 'Integrative and traditional Indian systems of medicine with rapidly expanding global wellness and research funding.',
        futureScope: 'Government medical officer positions and specialized pharmaceutical research.',
      },
      {
        roleOrDegree: 'Armed Forces Medical College (AFMC Pune)',
        institutionOrCadre: 'Indian Armed Forces Medical Services (Army, Navy, Air Force)',
        description: 'Prestigious military medical cadre commissioning candidates as Captains/Lieutenants upon completion of MBBS training.',
        futureScope: 'Exemplary career blending frontline military defense service with advanced medical research and hospital postings.',
      },
    ],
    connectedResourceFilter: 'neet',
    faqs: [
      {
        question: 'Is NCERT alone sufficient to score 650+ in NEET UG?',
        answer: 'For Biology and Inorganic Chemistry, NCERT is 100% sufficient and mandatory. For Physics and Physical Chemistry, while all conceptual definitions and derivations originate in NCERT, scoring 650+ requires practicing 150-200 numerical variations per chapter from our Compete Academy Problem Repository to build solving speed and mathematical shortcuts.',
      },
      {
        question: 'What is the minimum score required to secure a Government Medical College seat in Tamil Nadu?',
        answer: 'While the qualifying cutoff is only around 137 marks for General and 107 marks for reserved categories, actual admission to a Tamil Nadu Government Medical College (under 85% State Quota) typically requires 600-620+ for Open Competition, 575-595+ for BC, 550-570+ for MBC, and 450-480+ for SC. These figures fluctuate yearly based on examination difficulty.',
      },
      {
        question: 'How does Compete Academy help students who struggle with Physics numericals?',
        answer: 'We deploy our dedicated "Physics Foundation Lab" for students facing calculation hurdles. We break physics problems into a 3-step protocol: Diagrammatic representation, variable identification with standard SI units, and formula execution. We also conduct weekly micro-concept classes covering basic calculus, trigonometry, and estimation shortcuts.',
      },
      {
        question: 'Can Class 12 students manage board exams alongside NEET preparation?',
        answer: 'Yes. Since NEET UG is strictly based on the NCERT syllabus, mastering NCERT at the micro-level directly strengthens your board examination conceptual depth. We schedule focused board subjective answer-writing workshops in December and January to ensure students achieve 90%+ in board theory papers without sacrificing objective problem drills.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 02. JEE MAIN & ADVANCED COACHING
  // --------------------------------------------------------------------------
  jee: {
    id: 'prog-jee-02',
    programCode: 'jee',
    title: 'JEE Main & JEE Advanced Engineering Mastery',
    shortName: '02. JEE Main & Adv',
    badge: 'NTA JEE Main & IIT JAB (JEE Advanced) 2026 Verified',
    targetAudience: 'Classes 11 & 12 PCM Aspirants + 1-Year JEE Dropper Batches (Class 12 Pass: 2024, 2025, or 2026)',
    headline: 'Your Engineering Future Awaits. We pave the way.',
    heroBranding: {
      primarySlogan: 'Your Engineering Future Awaits.',
      supportingLine: 'We pave the way.',
      supportingDescription: 'Think beyond formulas. Master the fundamentals. Engineer the future.',
    },
    introduction: {
      heroStatement:
        'Think beyond formulas. Master the fundamentals. Engineer the future. We develop first-principles mathematical reasoning, physics intuition, and analytical problem-solving ability for premier engineering institutions.',
      purpose: 'The Joint Entrance Examination (JEE) is India’s official two-tier national engineering entrance framework. JEE Main (conducted by the National Testing Agency across two sessions: January and April) comprises Paper 1 for B.E./B.Tech (3 hours, 75 compulsory questions, 300 marks), Paper 2A for B.Arch (Mathematics, Aptitude & Drawing, 400 marks), and Paper 2B for B.Planning (Mathematics, Aptitude & Planning, 400 marks; 3 hours 30 minutes if appearing for both Paper 2A & 2B). JEE Main ranks govern admission to NITs, IIEST Shibpur, IIITs (Triple-I-Ts), and Other-GFTIs via JoSAA and CSAB, and serve as the mandatory screening test to shortlist the top 2,50,000 Paper 1 (B.E./B.Tech) candidates (2,50,182 shortlisted in 2026 including ties) for JEE Advanced—the sole gateway to undergraduate programmes at the 23 Indian Institutes of Technology (IITs) and participating IISc programmes.',
      examinationReality: 'In JEE Main 2026 Paper 1 (B.E./B.Tech), 16,04,854 unique candidates registered and 15,38,468 unique candidates appeared across Session 1 (21–24 & 28 Jan 2026, 10 shifts) and Session 2 (2, 4–6 & 8 Apr 2026, 9 shifts). Under the revised official NTA pattern, Paper 1 presents 75 compulsory questions in 180 minutes (Section A: 20 MCQs + Section B: 5 mandatory numerical value questions per subject, all carrying +4 / -1 marking—the earlier 5-of-10 optional choice in Section B is discontinued). For candidates appearing in both sessions, the best of the two Total NTA Percentile Scores (not individual subject bests) is merged to compile the All India Rank. JEE Advanced (conducted by IIT Roorkee on 17 May 2026 across two mandatory 3-hour papers totaling 360 marks) features variable multi-concept marking schemes and strict subject-wise and aggregate qualifying cutoffs.',
      strategicImperative: 'Qualifying in JEE Main or JEE Advanced does NOT guarantee seat allotment in any institute or branch. JEE Main qualifying percentile only grants eligibility to register for JEE Advanced; similarly, clearing JEE Advanced minimum qualifying marks (92/360 for CRL, 82/360 for GEN-EWS/OBC-NCL, 46/360 for SC/ST/PwD in 2026) only places a candidate on the JEE Advanced rank list. Actual admission depends on JoSAA opening and closing ranks across 5 official rounds (and subsequent CSAB Special Rounds for NIT+ institutes), combined with mandatory Class 12 board eligibility (75% aggregate marks or category-wise Top 20 percentile for General/EWS/OBC-NCL; 65% aggregate or Top 20 percentile for SC/ST/PwD across 5 subjects).',
      competeAcademyPhilosophy:
        'Our pedagogy pairs first-principles conceptual derivations with verified regulatory and counselling literacy. Students master multi-concept synthesis in Physics, Chemistry, and Mathematics, train on authentic 75-question CBT consoles where Section B integer rounding and negative marking (-1) are strictly enforced, and synchronize Class 12 board preparation to satisfy JoSAA Annexure 2(a)/2(b) criteria.',
    },
    examination: {
      examName: 'Joint Entrance Examination — JEE (Main) 2026 & JEE (Advanced) 2026',
      conductingAuthority: 'National Testing Agency (JEE Main) & IIT Roorkee / JAB (JEE Advanced 2026)',
      authorityFull: 'Joint Seat Allocation Authority (JoSAA 2026) & Central Seat Allocation Board (CSAB 2026)',
      annualCadence: 'JEE Main: 2 Sessions (Jan & Apr; Best Total NTA Score Counted) | JEE Adv: Annually (May)',
      examMode: 'Computer-Based Test (CBT) Only',
      totalMarks: 300, // JEE Main Paper 1: 300 Marks; JEE Advanced 2026: 360 Marks (180 + 180)
      totalQuestions: 75, // JEE Main Paper 1: 75 Compulsory Qs (25 per subject: 20 MCQ + 5 Numerical)
      durationMinutes: 180, // 3 hours per paper (4 hours for PwBD candidates with benchmark disability)
      negativeMarkingRule: 'JEE Main Paper 1: +4 correct, -1 incorrect in BOTH Section A (20 MCQs) & Section B (5 compulsory integer numericals). JEE Advanced: Variable partial/negative marking per section.',
      officialSourceTitle: 'NTA JEE (Main) Official Portal, JEE (Advanced) Portal & JoSAA 2026 Business Rules',
      officialSourceUrl: 'https://jeemain.nta.nic.in/',
      examYear: '2026',
      verifiedDate: '12 November 2026',
      stages: [
        {
          stageNumber: 1,
          name: 'JEE Main 2026 (Paper 1: B.E./B.Tech | Paper 2A: B.Arch | Paper 2B: B.Plan)',
          shortCode: 'JEE-Main',
          type: 'Computer-Based Test (CBT)',
          duration: '180 Minutes (3 Hours; 210 Mins for 2A+2B)',
          totalMarks: 300,
          questionsCount: '75 Compulsory Questions (25 per Subject)',
          nature: 'NIT+ Rank & Adv Screening',
          description: 'Conducted by NTA in 2 sessions (Jan & Apr 2026; 15,38,468 unique appeared in Paper 1). Best Total NTA Percentile Score across sessions determines CRL/Category Rank for NITs/IIITs/GFTIs and shortlists top 2,50,000 (2,50,182 in 2026) for JEE Advanced. No age limit; max 3 consecutive years from Class 12 passing (2024, 2025, or 2026).',
        },
        {
          stageNumber: 2,
          name: 'JEE Advanced 2026 (Paper 1 & Paper 2 Both Compulsory)',
          shortCode: 'JEE-Advanced',
          type: 'Computer-Based Test (CBT)',
          duration: '360 Minutes (Two 3-Hour Papers on Same Day)',
          totalMarks: '360 (180 in Paper 1 + 180 in Paper 2)',
          questionsCount: 'Two Compulsory Papers (Physics, Chemistry, Maths)',
          nature: 'IIT & IISc Merit Ranking',
          description: 'Conducted by IIT Roorkee (2026). Paper 1 (09:00–12:00 IST) & Paper 2 (14:30–17:30 IST) are both mandatory. Max 2 attempts in 2 consecutive years (first Class 12 appearance in 2025 or 2026). 2026 Rank List Cutoffs: CRL 92/360 (25.56%, min 8/subject), GEN-EWS & OBC-NCL 82/360 (22.78%, min 7/subject), SC/ST/PwD 46/360 (12.78%, min 4/subject), Preparatory 23/360.',
        },
        {
          stageNumber: 3,
          name: 'JoSAA 2026 (5 Rounds) & CSAB 2026 Special Rounds',
          shortCode: 'JoSAA / CSAB',
          type: 'Centralized Online Seat Allocation',
          duration: '5 Official JoSAA Rounds + 2 CSAB Special Rounds',
          totalMarks: 'Rank & Quota-Based Seat Matrix',
          nature: 'Seat Allocation',
          description: 'JoSAA 2026 conducted 5 official rounds for IITs (AI quota, JEE Adv rank) and NIT+ institutes—NITs, IIEST Shibpur, IIITs, and Other-GFTIs (JEE Main rank; HS/OS quota in NITs, IIEST & PEC Chandigarh; HS/AI in BIT Mesra, Assam Univ & PTU Puducherry; AI quota in IIITs). Vacant NIT+ seats after Round 5 proceed to CSAB Special Rounds (28 Jul–18 Aug 2026).',
        },
      ],
    },
    marksDistribution: {
      overview: 'OFFICIAL NTA JEE MAIN PAPER 1 (B.E./B.TECH) PATTERN (Verified from NTA Information Bulletin): Each of the three subjects—Mathematics, Physics, and Chemistry—consists of Section A (20 compulsory Multiple-Choice Questions) and Section B (5 compulsory Numerical Value Questions rounded to the nearest integer; no optional question choice). All 75 questions are compulsory, carrying +4 marks for a correct response and -1 mark for an incorrect response in BOTH Section A and Section B. Total Marks = 300.',
      rows: [
        {
          subject: 'Mathematics',
          section: 'Section A (20 Compulsory MCQs) + Section B (5 Compulsory Integer Numericals)',
          questionsAsked: '25 Qs',
          questionsToAttempt: '25 Qs (All Compulsory)',
          marksPerQuestion: 4,
          negativeMark: '-1 mark (both Section A & Section B)',
          totalMarks: 100,
          syllabusScope: 'Sets, Relations & Functions, Complex Numbers & Quadratic Equations, Matrices & Determinants, Permutations & Combinations, Binomial Theorem, Sequences & Series, Differential & Integral Calculus, Differential Equations, Coordinate Geometry, 3D Geometry, Vector Algebra, Statistics & Probability, Trigonometry',
          highYieldWeightage: 'Calculus, Vector Algebra & 3D Geometry, Matrices & Determinants, and Coordinate Geometry form the core analytical weightage.',
        },
        {
          subject: 'Physics',
          section: 'Section A (20 Compulsory MCQs) + Section B (5 Compulsory Integer Numericals)',
          questionsAsked: '25 Qs',
          questionsToAttempt: '25 Qs (All Compulsory)',
          marksPerQuestion: 4,
          negativeMark: '-1 mark (both Section A & Section B)',
          totalMarks: 100,
          syllabusScope: 'Units & Measurements, Kinematics, Laws of Motion, Work, Energy & Power, Rotational Motion, Gravitation, Properties of Solids & Liquids, Thermodynamics, Kinetic Theory, Oscillations & Waves, Electrostatics, Current Electricity, Magnetic Effects & Magnetism, EMI & AC, EM Waves, Optics, Dual Nature, Atoms & Nuclei, Electronic Devices, Experimental Skills',
          highYieldWeightage: 'Electrodynamics, Modern Physics, Optics, Thermodynamics, and Rigid Body Mechanics anchor high-accuracy scoring.',
        },
        {
          subject: 'Chemistry',
          section: 'Section A (20 Compulsory MCQs) + Section B (5 Compulsory Integer Numericals)',
          questionsAsked: '25 Qs',
          questionsToAttempt: '25 Qs (All Compulsory)',
          marksPerQuestion: 4,
          negativeMark: '-1 mark (both Section A & Section B)',
          totalMarks: 100,
          syllabusScope: 'Physical Chemistry (Mole Concept, Atomic Structure, Chemical Bonding, Chemical Thermodynamics, Solutions, Equilibrium, Redox & Electrochemistry, Chemical Kinetics), Inorganic Chemistry (Classification of Elements, p-Block, d- & f-Block, Coordination Compounds), Organic Chemistry (Purification, GOC, Hydrocarbons, Haloalkanes/Haloarenes, Oxygen & Nitrogen Compounds, Biomolecules, Practical Chemistry)',
          highYieldWeightage: 'Chemical Thermodynamics, Coordination Compounds, Electrochemistry, GOC, and Named Organic Reactions enable rapid, high-precision execution.',
        },
      ],
      totalCalculatedMarks: 300,
      scoringStrategy: [
        'All 5 numerical questions in Section B of each subject are compulsory and carry -1 negative marking; round answers to the nearest integer strictly as instructed on the CBT console.',
        'For multi-session candidates (January Session 1 & April Session 2), NTA merges results using the best of the two Total NTA Scores (not individual subject bests).',
        'In JEE Advanced (2 papers × 180 = 360 marks in 2026), candidates must clear both individual subject cutoffs (8/7/4 marks) and aggregate cutoffs (92/82/46 marks) simultaneously to enter the rank list.',
      ],
    },
    eligibilityAndCutoffs: {
      academicPrerequisite: 'JEE Main 2026 Appearing Eligibility: Passed Class 12 (or equivalent) in 2024 or 2025, or appearing in 2026, with Physics and Mathematics as compulsory subjects along with Chemistry / Biotechnology / Biology / Technical Vocational subject (B.Arch: PCM compulsory; B.Planning: Mathematics compulsory). JoSAA 2026 Admission Eligibility (Annexure 2(a) for IITs/IISc & Annexure 2(b) for NITs/IIEST/IIITs/GFTIs): Must pass Class 12 with 5 subjects (Physics, Chemistry, Mathematics, a language, and any fifth subject) AND secure either at least 75% aggregate marks (65% for SC, ST, and PwD candidates) OR be within the category-wise Top 20 percentile of successful candidates in the respective Class 12 Board examination from a single board.',
      ageLimitRule: 'JEE Main 2026: NO age limit (3 consecutive years of attempts: 2024, 2025, 2026 Class 12 pass/appear). JEE Advanced 2026: Born on or after 1 October 2001 for General/GEN-EWS/OBC-NCL (5-year relaxation for SC, ST, and PwD: born on or after 1 October 1996); maximum 2 attempts in 2 consecutive years (first Class 12 appearance in 2025 or 2026); must not have previously accepted an IIT/IISc seat.',
      officialStatutoryNote: 'Verified Official Sources: (1) NTA Press Release "Declaration of the Result/NTA Scores for JEE (Main) – 2026 Paper 1 (B.E./B.Tech)" dated 20 April 2026 (https://cdnbbsr.s3waas.gov.in/s3f8e59f4b2fe7c5705bf878bbd494ccdf/uploads/2026/04/20260420809492136.pdf); (2) JEE Advanced 2026 Cutoffs & Eligibility Criteria, IIT Roorkee / JAB (https://jeeadv.ac.in/documents/cutoffs_2026.pdf & https://jeeadv.ac.in/eligibility.html); (3) JoSAA 2026 Business Rules (https://cdnbbsr.s3waas.gov.in/s313111c20aee51aeb480ecbd988cd8cc9/uploads/2026/06/20260601632081678.pdf) & JoSAA 2026 Round 5 Final OR-CR Portal, updated 12.11.2026 (https://josaa.nic.in/or-cr/). Note: Columns display Official 2026 Qualifying Cutoffs and Actual JoSAA 2026 Round 5 Closing Ranks (no guaranteed "safe scores" exist).',
      cutoffsDistinctionExplanation: 'CRITICAL STATUTORY DISTINCTION (NO GUARANTEED SAFE SCORES): (1) JEE Main NTA Percentile is a normalized relative score across shifts; the "Qualifying Cutoff Percentile" below ONLY determines eligibility to register for JEE Advanced 2026 (2,50,182 candidates shortlisted) and DOES NOT guarantee admission to any NIT, IIIT, GFTI, or branch. (2) JEE Advanced Qualifying Marks (92/360 CRL, 82/360 EWS/OBC-NCL, 46/360 SC/ST/PwD in 2026) only include a candidate in the JEE Advanced rank list and DO NOT guarantee an IIT seat. (3) JoSAA Closing Ranks represent the last allotted rank in a specific institute, programme, quota (AI/HS/OS), category, gender pool (Gender-Neutral vs 20% Female-Only including supernumerary), and round (Round 5 was the final JoSAA 2026 round). OPEN seats use Common Rank List (CRL) ranks, whereas EWS, OBC-NCL, SC, ST, and PwD seats use their respective Category / PwD / Preparatory ("P") ranks—CRL and category ranks are distinct scales and must never be compared as equivalent. Historical closing ranks are past records, not future admission guarantees.',
      categories: [
        {
          categoryName: 'Open / Unreserved (UR / General)',
          code: 'OPEN · Rank Type: CRL (Common Rank List)',
          reservationPercentage: '40.5% Open Merit (Vertical) | Shortlisted target: 1,01,250 (96,187 Non-PwD + 5,063 OPEN-PwD)',
          qualifyingCriteria: 'JEE Main 2026 Cutoff for Adv: 93.4123549 – 100.0000000 NTA Percentile (96,873 UR-ALL qualified) | JEE Adv 2026 Rank List Cutoff: Min 7.30% (8 marks) per subject & 25.56% (92/360 marks) aggregate',
          recentQualifyingCutoff: '2026: 93.4123549 | 2025: 93.1023262 | 2024: 93.2362181 (NTA Percentile)',
          typicalAllotmentSafeScore: 'JoSAA 2026 R5 Final Closing Ranks (OPEN, Gender-Neutral, CRL): IIT Bombay CSE: 67 (Adv CRL) · IIT Delhi CSE: 128 · IIT Madras CSE: 151 (EE: 749, ME: 2619) · IIT Kharagpur CSE: 509 | NIT Trichy CSE (Main CRL): HS 4015, OS 1373 (ECE: HS 5142, OS 3285; ME: HS 14015, OS 8754) · NIT Surathkal CSE: HS 3331, OS 1954 · NIT Warangal CSE: HS 4034, OS 2581 | IIIT Allahabad IT (AI): 5420 · ABV-IIITM Gwalior CSE (AI): 8888 | BIT Mesra CSE (AI): 24247 · PEC Chandigarh CSE: HS 29864, OS 15088',
          maxAttemptsOrAge: 'JEE Main: No age limit; max 3 consecutive years (2024/2025/2026 Class 12) | JEE Adv 2026: Born on/after 01.10.2001; max 2 attempts in 2 consecutive years (2025/2026) | Class 12: 75% aggregate or Top 20 percentile',
          notes: 'OPEN seats are open to all categories based on CRL rank. OCI/PIO (I) candidates are eligible for OPEN and OPEN-PwD seats only.',
        },
        {
          categoryName: 'General — Economically Weaker Sections (GEN-EWS)',
          code: 'GEN-EWS · Rank Type: GEN-EWS Category Rank',
          reservationPercentage: '10% Vertical Reservation in Central Institutes | Shortlisted target: 25,000 (23,750 Non-PwD + 1,250 PwD)',
          qualifyingCriteria: 'JEE Main 2026 Cutoff for Adv: 82.4164528 – 93.4105172 NTA Percentile (25,009 EWS-ALL qualified) | JEE Adv 2026 Rank List Cutoff: Min 6.51% (7 marks) per subject & 22.78% (82/360 marks) aggregate',
          recentQualifyingCutoff: '2026: 82.4164528 | 2025: 80.3830119 | 2024: 81.3266412 (NTA Percentile)',
          typicalAllotmentSafeScore: 'JoSAA 2026 R5 Final Closing Ranks (EWS Category Rank, Gender-Neutral): IIT Bombay CSE: 20 · IIT Madras CSE: 31 (EE: 164, ME: 496) · IIT Delhi CSE: 35 · IIT Kharagpur CSE: 74 | NIT Trichy CSE: HS 2470, OS 287 (ECE: HS 5997, OS 503) · NIT Surathkal CSE: HS 1147, OS 361 · NIT Warangal CSE: HS 617, OS 428 | IIIT Allahabad IT (AI): 917 · ABV-IIITM Gwalior CSE (AI): 1271 | BIT Mesra CSE (AI): 4166 · PEC Chandigarh CSE: HS 13261, OS 2626',
          maxAttemptsOrAge: 'JEE Main: No age limit (3 consecutive years) | JEE Adv 2026: Born on/after 01.10.2001 (max 2 consecutive years) | Class 12: 75% aggregate or GEN-EWS Top 20 percentile | EWS certificate issued on/after 1 April of admission year',
          notes: 'Allotted using GEN-EWS Category Rank (NOT CRL). Do not compare GEN-EWS category ranks directly with OPEN CRL ranks.',
        },
        {
          categoryName: 'Other Backward Classes — Non-Creamy Layer (OBC-NCL)',
          code: 'OBC-NCL · Rank Type: OBC-NCL Category Rank',
          reservationPercentage: '27% Vertical Reservation in Central Institutes | Shortlisted target: 67,500 (64,125 Non-PwD + 3,375 PwD)',
          qualifyingCriteria: 'JEE Main 2026 Cutoff for Adv: 80.9232583 – 93.4105172 NTA Percentile (67,597 OBC-ALL qualified) | JEE Adv 2026 Rank List Cutoff: Min 6.51% (7 marks) per subject & 22.78% (82/360 marks) aggregate',
          recentQualifyingCutoff: '2026: 80.9232583 | 2025: 79.4313582 | 2024: 79.6757881 (NTA Percentile)',
          typicalAllotmentSafeScore: 'JoSAA 2026 R5 Final Closing Ranks (OBC-NCL Category Rank, Gender-Neutral): IIT Bombay CSE: 62 · IIT Madras CSE: 96 (EE: 377, ME: 1218) · IIT Delhi CSE: 108 · IIT Kharagpur CSE: 258 | NIT Trichy CSE: HS 1262, OS 459 (ECE: HS 1602, OS 1094) · NIT Surathkal CSE: HS 1328, OS 678 · NIT Warangal CSE: HS 1594, OS 797 | IIIT Allahabad IT (AI): 2508 · ABV-IIITM Gwalior CSE (AI): 3603 | BIT Mesra CSE (AI): 11016 · PEC Chandigarh CSE: HS 9074, OS 5012',
          maxAttemptsOrAge: 'JEE Main: No age limit (3 consecutive years) | JEE Adv 2026: Born on/after 01.10.2001 (max 2 consecutive years) | Class 12: 75% aggregate or OBC-NCL Top 20 percentile | Must be in Central List of OBCs (ncbc.nic.in) with valid NCL certificate',
          notes: 'State-level backward class tags not in the Central OBC list and Creamy Layer candidates are treated under OPEN (CRL).',
        },
        {
          categoryName: 'Scheduled Castes (SC)',
          code: 'SC · Rank Type: SC Category Rank',
          reservationPercentage: '15% Vertical Reservation in Central Institutes | Shortlisted target: 37,500 (35,625 Non-PwD + 1,875 PwD)',
          qualifyingCriteria: 'JEE Main 2026 Cutoff for Adv: 63.9172792 – 93.4105172 NTA Percentile (37,522 SC-ALL qualified) | JEE Adv 2026 Rank List Cutoff: Min 3.65% (4 marks) per subject & 12.78% (46/360 marks) aggregate (Preparatory: 2/subject, 23/360 aggregate)',
          recentQualifyingCutoff: '2026: 63.9172792 | 2025: 61.1526933 | 2024: 60.0923182 (NTA Percentile)',
          typicalAllotmentSafeScore: 'JoSAA 2026 R5 Final Closing Ranks (SC Category Rank, Gender-Neutral): IIT Madras CSE: 61 (EE: 259, ME: 771) · IIT Delhi CSE: 62 · IIT Kharagpur CSE: 146 | NIT Trichy CSE: HS 737, OS 154 (ECE: HS 1117, OS 550) · NIT Surathkal CSE: HS 872, OS 280 · NIT Warangal CSE: HS 779, OS 458 | IIIT Allahabad IT (AI): 1662 · ABV-IIITM Gwalior CSE (AI): 2037 | BIT Mesra CSE (AI): 7457 · PEC Chandigarh CSE: HS 5978, OS 3508',
          maxAttemptsOrAge: 'JEE Main: No age limit (3 consecutive years) | JEE Adv 2026: 5-Year Age Relaxation — born on/after 01.10.1996 (max 2 consecutive years) | Class 12 Board Criterion relaxed to 65% aggregate marks (or SC Top 20 percentile)',
          notes: 'Allotted using SC Category Rank. Unfilled IIT seats may be allotted via SC Preparatory Rank List (denoted by suffix "P" in JoSAA OR-CR).',
        },
        {
          categoryName: 'Scheduled Tribes (ST)',
          code: 'ST · Rank Type: ST Category Rank',
          reservationPercentage: '7.5% Vertical Reservation in Central Institutes | Shortlisted target: 18,750 (17,812 Non-PwD + 938 PwD)',
          qualifyingCriteria: 'JEE Main 2026 Cutoff for Adv: 52.0174712 – 93.4041748 NTA Percentile (18,790 ST-ALL qualified) | JEE Adv 2026 Rank List Cutoff: Min 3.65% (4 marks) per subject & 12.78% (46/360 marks) aggregate (Preparatory: 2/subject, 23/360 aggregate)',
          recentQualifyingCutoff: '2026: 52.0174712 | 2025: 47.9026465 | 2024: 46.6975840 (NTA Percentile)',
          typicalAllotmentSafeScore: 'JoSAA 2026 R5 Final Closing Ranks (ST Category Rank, Gender-Neutral): IIT Madras CSE: 27 (EE: 128, ME: 444) · IIT Delhi CSE: 28 · IIT Kharagpur CSE: 73 | NIT Trichy CSE: HS 500, OS 95 (ECE: HS 1006, OS 208) · NIT Surathkal CSE: HS 133, OS 109 · NIT Warangal CSE: HS 162, OS 199 | IIIT Allahabad IT (AI): 1023 · ABV-IIITM Gwalior CSE (AI): 1064 | BIT Mesra CSE (AI): 3904 · PEC Chandigarh CSE (OS): 1902',
          maxAttemptsOrAge: 'JEE Main: No age limit (3 consecutive years) | JEE Adv 2026: 5-Year Age Relaxation — born on/after 01.10.1996 (max 2 consecutive years) | Class 12 Board Criterion relaxed to 65% aggregate marks (or ST Top 20 percentile)',
          notes: 'Allotted using ST Category Rank. Eligible for IIT Preparatory Course rank list (suffix "P") if seats remain vacant.',
        },
        {
          categoryName: 'Persons with Benchmark Disabilities (PwD / PwBD)',
          code: 'OPEN-PwD, EWS-PwD, OBC-NCL-PwD, SC-PwD, ST-PwD · Horizontal Quota',
          reservationPercentage: '5% Horizontal Reservation WITHIN each Vertical Category (NOT added to vertical 100%) | 12,501 total PwD target across 5 categories',
          qualifyingCriteria: 'JEE Main 2026 Cutoff for Adv (UR-PwBD): 0.0023186 – 93.3244144 NTA Percentile (4,391 UR-PwBD qualified; NTA officially reports UR-PwBD cutoff in Paper 1 result notice) | JEE Adv 2026 Cutoff (All PwD lists): Min 3.65% (4 marks) per subject & 12.78% (46/360 marks) aggregate (Preparatory: 2/subject, 23/360)',
          recentQualifyingCutoff: '2026: 0.0023186 | 2025: 0.0079349 | 2024: 0.0018700 (UR-PwBD NTA Percentile)',
          typicalAllotmentSafeScore: 'JoSAA 2026 R5 Final Closing Ranks (OPEN-PwD / CRL-PwD Rank, Gender-Neutral): IIT Madras CSE: 2 · IIT Bombay CSE: 6 · IIT Delhi CSE: 9 · IIT Kharagpur CSE: 32 (Preparatory suffix "P" examples in 2026 R5: IIT Delhi EE ST-PwD 10P, IIT Madras EE SC-PwD 11P & ST-PwD 9P) | NIT Trichy CSE: HS 124, OS 37 · NIT Surathkal CSE (HS): 43 · NIT Warangal CSE: HS 74, OS 80 | IIIT Allahabad IT (AI): 202 · ABV-IIITM Gwalior CSE (AI): 196 | BIT Mesra CSE (AI): 1873 · PEC Chandigarh CSE: HS 1254, OS 591',
          maxAttemptsOrAge: '5-Year Age Relaxation in JEE Advanced 2026 (born on/after 01.10.1996) | Class 12 Board Criterion relaxed to 65% aggregate marks (or Top 20 percentile) | 20 minutes compensatory time per hour (1 hour extra per 3-hour paper) & scribe facility as per RPwD Act 2016 (min 40% benchmark disability)',
          notes: 'Horizontal reservation cuts across vertical categories (5% within OPEN, EWS, OBC-NCL, SC, ST respectively)—it is never added on top of vertical percentages.',
        },
      ],
    },
    timeManagement: {
      modeDescription: 'Conducted strictly on Computer-Based Test (CBT) terminals. Navigation features include Question Palette (Answered, Not Answered, Marked for Review, Answered & Marked for Review, Not Visited), countdown timer, and on-screen virtual numeric keypad for Section B.',
      recommendedTimePerQuestion: 'Chemistry: ~1.5 minutes | Physics: ~2.2 minutes | Mathematics: ~3.2 minutes per question across 75 compulsory questions in 180 minutes.',
      tacticalPacingStrategy: [
        {
          round: 'Sprint 1 (0 to 45 mins)',
          title: 'Chemistry Direct Sweep (25 Compulsory Qs)',
          durationAllocated: '45 Minutes',
          actionPlan: 'Solve direct organic reactions, coordination chemistry, and physical chemistry numericals across Section A (20 MCQs) and Section B (5 numericals).',
        },
        {
          round: 'Sprint 2 (45 to 110 mins)',
          title: 'Physics Selective Execution (25 Compulsory Qs)',
          durationAllocated: '65 Minutes',
          actionPlan: 'Execute electrodynamics, modern physics, optics, and mechanics. Leave speculative guesses unattempted to avoid -1 negative marking in both Section A and Section B.',
        },
        {
          round: 'Sprint 3 (110 to 170 mins)',
          title: 'Mathematics Calculated Strikes (25 Compulsory Qs)',
          durationAllocated: '60 Minutes',
          actionPlan: 'Target high-certainty topics: Vectors & 3D, Matrices, Definite Integrals, Differential Equations, and Coordinate Geometry. Avoid lengthy algebraic traps.',
        },
        {
          round: 'Sprint 4 (170 to 180 mins)',
          title: 'Palette Review & Integer Rounding Check',
          durationAllocated: '10 Minutes',
          actionPlan: 'Verify "Answered & Marked for Review" items (counted for evaluation) and confirm Section B numerical answers are rounded to the nearest integer with correct sign and units.',
        },
      ],
      negativeMarkingMitigation: [
        'Compulsory Section B Awareness: All 5 numerical value questions per subject are mandatory (no 5-out-of-10 optional choice) and carry -1 negative marking for wrong entries.',
        'Units & Nearest-Integer Rounding: Verify whether a Section B prompt specifies Joules vs kJ or radians vs degrees, and round off strictly to the nearest integer.',
        'No Speculative Guessing: Because percentile normalization is sensitive to raw score drops on moderate shifts, never guess blindly on multi-step calculations.',
      ],
    },
    curriculum: [
      {
        subjectName: 'Mathematics (Advanced Analytical)',
        icon: 'calculate',
        totalChapters: 22,
        totalHours: 220,
        chapters: [
          {
            title: 'Differential & Integral Calculus',
            subtopics: ['Functions, Domains & Ranges', 'Limits, Continuity & Differentiability', 'Application of Derivatives (Tangents, Maxima & Minima)', 'Indefinite & Definite Integrals with Properties', 'Area Under Curves & Differential Equations'],
            weightageLevel: 'High Yield',
            estimatedHours: 65,
          },
          {
            title: 'Coordinate Geometry & Conic Sections',
            subtopics: ['Straight Lines & Pair of Lines', 'Circles & System of Circles', 'Parabola, Ellipse & Hyperbola Properties', 'Tangents, Normals & Chords of Contact'],
            weightageLevel: 'High Yield',
            estimatedHours: 45,
          },
          {
            title: 'Vectors, 3D Geometry & Matrices',
            subtopics: ['Vector Dot & Cross Products, Scalar Triple Product', 'Equation of Planes, Lines in 3D & Shortest Distance', 'Matrices & Determinants Properties, System of Linear Equations'],
            weightageLevel: 'High Yield',
            estimatedHours: 40,
          },
          {
            title: 'Algebra, Complex Numbers & Probability',
            subtopics: ['Quadratic Equations & Roots Location', 'Complex Numbers (Argand Plane, De Moivre Theorem)', 'Permutations & Combinations', 'Binomial Theorem & Series', 'Probability, Bayes Theorem & Distributions'],
            weightageLevel: 'High Yield',
            estimatedHours: 50,
          },
        ],
      },
      {
        subjectName: 'Physics (Mechanics & Electrodynamics)',
        icon: 'speed',
        totalChapters: 26,
        totalHours: 210,
        chapters: [
          {
            title: 'Classical Mechanics',
            subtopics: ['Kinematics & Relative Motion', 'Newtons Laws & Friction Dynamics', 'Work-Energy Theorem & Collisions in 2D', 'Center of Mass & Rigid Body Rotational Motion', 'Conservation of Angular Momentum', 'Simple Harmonic Motion & Gravitation'],
            weightageLevel: 'High Yield',
            estimatedHours: 60,
          },
          {
            title: 'Electrodynamics & Magnetism',
            subtopics: ['Coulombs Law & Electric Potential Calculation', 'Gauss Theorem & Field Lines in Dielectrics', 'Capacitors, RC Circuits & Energy Density', 'DC Circuits & Kirchhoffs Laws', 'Biot-Savart Law & Amperes Law', 'Faradays Induction, Inductors & LR/LCR Circuits'],
            weightageLevel: 'High Yield',
            estimatedHours: 58,
          },
          {
            title: 'Thermodynamics & Waves',
            subtopics: ['Heat Transfer: Conduction, Convection & Radiation', 'First & Second Laws of Thermodynamics, PV Indicator Diagrams', 'Wave Motion, Standing Waves & Sound Doppler Effect'],
            weightageLevel: 'Core Standard',
            estimatedHours: 35,
          },
          {
            title: 'Optics & Modern Physics',
            subtopics: ['Geometrical Optics, Prism & Lens Formula', 'Interference, Diffraction & Wavefronts', 'Photoelectric Effect, Matter Waves, Bohr Model, Nuclear Reactions & Half-Life'],
            weightageLevel: 'High Yield',
            estimatedHours: 42,
          },
        ],
      },
      {
        subjectName: 'Chemistry (Physical, Inorganic & Organic)',
        icon: 'biotech',
        totalChapters: 25,
        totalHours: 180,
        chapters: [
          {
            title: 'Physical Chemistry Analytical',
            subtopics: ['Mole & Equivalent Concept in Redox Titrations', 'Atomic Structure & Quantum Mechanics', 'Thermodynamics (Gibbs Free Energy & Spontaneity)', 'Equilibrium & Buffer Calculations', 'Electrochemistry & Galvanic Cells', 'Chemical Kinetics & Arrhenius Theory'],
            weightageLevel: 'High Yield',
            estimatedHours: 50,
          },
          {
            title: 'Inorganic Chemistry & Coordination Chemistry',
            subtopics: ['Chemical Bonding & VSEPR / Hybridization', 'Coordination Compounds, Isomerism & Crystal Field Theory (CFT)', 'd- & f-Block Metallurgy & Transition Elements', 'Qualitative Inorganic Salt Analysis'],
            weightageLevel: 'High Yield',
            estimatedHours: 45,
          },
          {
            title: 'Organic Chemistry & Reaction Mechanisms',
            subtopics: ['General Organic Chemistry: Inductive, Mesomeric, Hyperconjugation', 'Aromatic Hydrocarbons & Electrophilic Substitution', 'Reaction Intermediates (Carbocations, Free Radicals)', 'Named Reactions (Aldol, Cannizzaro, Grignard Reagents, Diazotization)', 'Stereochemistry & Biomolecules'],
            weightageLevel: 'High Yield',
            estimatedHours: 60,
          },
        ],
      },
    ],
    learningJourney: [
      {
        stageNumber: 1,
        phaseTitle: 'Phase 1: First-Principles Theory & Mathematical Rigor',
        timeline: 'Months 1 to 5',
        academicObjective: 'Build absolute conceptual depth in fundamental mathematics and physics without relying on superficial tricks.',
        pedagogicalFocus: [
          'Derive every physical equation from fundamental calculus theorems.',
          'Solve 40 basic and intermediate problems per topic before attempting multi-concept questions.',
          'Establish rigorous graph-drawing intuition for all mathematical functions.',
        ],
        assessmentMilestone: 'Weekly Topic Verification Quizzes with required 75%+ threshold.',
        keyDeliverable: 'Master derivation notebook and chemical reaction mechanism maps.',
      },
      {
        stageNumber: 2,
        phaseTitle: 'Phase 2: Multi-Concept Advanced Problem Synthesis',
        timeline: 'Months 6 to 9',
        academicObjective: 'Cross-link topics: combining mechanics with electrostatics, or complex numbers with coordinate geometry.',
        pedagogicalFocus: [
          'Solve problems from advanced benchmark problem banks (Irodov, Krotov, Advanced Math compilations).',
          'Practice matrix match and multiple-correct question types with partial marking rules.',
          'Numerical computation drills under strict no-calculator constraints.',
        ],
        assessmentMilestone: 'Monthly Full JEE Main & Advanced Simulated Test series.',
        keyDeliverable: 'Advanced Shortcut & Trap Registry created by student.',
      },
      {
        stageNumber: 3,
        phaseTitle: 'Phase 3: CBT Simulation & 15-Year PYQ Deconstruction',
        timeline: 'Months 10 to 11',
        academicObjective: 'Master computer terminal navigation, screen eye-strain fatigue, and speed calibration across all 15 years of JEE papers.',
        pedagogicalFocus: [
          'Timed testing on genuine CBT interface mimicking NTA terminal layout.',
          'Learn to skip high-difficulty questions within 45 seconds of reading.',
          'Inorganic and Organic chemistry daily rapid-fire 20-minute quizzes.',
        ],
        assessmentMilestone: 'Bi-weekly All-India Proctored CBT Mocks.',
        keyDeliverable: 'Time-per-question analytics report indicating slow-velocity topics.',
      },
      {
        stageNumber: 4,
        phaseTitle: 'Phase 4: Two-Paper Advanced Endurance & Final Tune-Up',
        timeline: 'Final 2 Months',
        academicObjective: 'Acclimatize body and mind to the demanding dual 3-hour papers of JEE Advanced.',
        pedagogicalFocus: [
          'Paper 1 (9 AM to 12 PM) followed by Paper 2 (2:30 PM to 5:30 PM) on same day under genuine examination heat and noise.',
          'Review of variable marking schemes: how to maximize partial marks without incurring negative penalties.',
          'Individual mentoring with IIT alumni mentors to fine-tune strategy.',
        ],
        assessmentMilestone: 'Final JEE Advanced Predictive Rank Evaluation.',
        keyDeliverable: 'Total psychological and academic readiness to secure an IIT seat.',
      },
    ],
    studentApproach: [
      {
        pillarNumber: '01',
        title: 'First-Principles Pedagogical Grounding',
        tagline: 'Understand the "why" before memorizing the "how".',
        description: 'We do not teach students to plug numbers into memorized equations. We derive concepts from core axioms so students can solve unseen problems in JEE Advanced.',
        icon: 'architecture',
      },
      {
        pillarNumber: '02',
        title: 'Authentic CBT Examination Terminal',
        tagline: 'Zero surprises on computer test day.',
        description: 'Our proprietary computer lab replicates the exact NTA and IIT JAB examination console, familiarizing students with palette states and time counters.',
        icon: 'terminal',
      },
      {
        pillarNumber: '03',
        title: 'IIT Alumni Direct Mentorship',
        tagline: 'Learn advanced problem solving from IIT graduates.',
        description: 'Weekly masterclasses led by alumni from IIT Madras and IIT Bombay covering advanced question deconstruction and problem-solving shortcuts.',
        icon: 'school',
      },
      {
        pillarNumber: '04',
        title: 'Partial Marking Optimization Protocol',
        tagline: 'Extracting every possible mark in JEE Advanced.',
        description: 'We teach calculated restraint in multiple-correct questions: knowing when to mark 2 sure options for +2 partial marks rather than guessing the third and getting -2.',
        icon: 'calculate',
      },
      {
        pillarNumber: '05',
        title: 'Multi-Concept Problem Sets',
        tagline: 'Bridging disciplines in single questions.',
        description: 'Dedicated worksheets that fuse mechanics with electromagnetism, and calculus with coordinate geometry to mirror genuine JEE Advanced questions.',
        icon: 'hub',
      },
      {
        pillarNumber: '06',
        title: 'Rigorous Doubt Solving Desk',
        tagline: 'No problem remains unresolved overnight.',
        description: 'Full-time doubt faculties stationed in the library from 8:00 AM to 8:00 PM for one-on-one whiteboard problem solving.',
        icon: 'contact_support',
      },
      {
        pillarNumber: '07',
        title: 'Comprehensive JoSAA & CSAB Counselling Support',
        tagline: 'Verified rank analysis from Round 1 to Round 5 & CSAB.',
        description: 'Data-backed post-exam counselling guiding students and parents across all 5 official JoSAA 2026 rounds and 2 CSAB Special Rounds, strictly separating CRL vs Category ranks and Home State vs Other State / All India quotas.',
        icon: 'alt_route',
      },
      {
        pillarNumber: '08',
        title: 'Dual Board & Entrance Synchronization',
        tagline: 'Securing the mandatory 75% / 65% or Top 20 percentile board criterion.',
        description: 'Integrated CBSE and State Board subjective theory classes in January and February to ensure students satisfy JoSAA Annexure 2(a)/2(b) Class 12 criteria (75% aggregate for OPEN/EWS/OBC-NCL; 65% for SC/ST/PwD, or category-wise Top 20 percentile across 5 required subjects).',
        icon: 'balance',
      },
    ],
    institutionalStrengths: [
      {
        title: 'First-Principles Engineering Preparation',
        description: 'Structured dual-tier preparation aligned with NTA JEE Main (75 compulsory questions) and IIT JEE Advanced multi-concept papers.',
        metric: 'Dual-Tier PCM Mastery',
      },
      {
        title: 'Dedicated Engineering Computer Testing Lab',
        description: 'High-speed 60-terminal testing laboratory running authentic NTA and IIT CBT simulations with Section B integer rounding drills.',
        metric: '60 Terminal CBT Lab',
      },
      {
        title: 'Rigorous Mathematical Rigor',
        description: 'Math faculty specialized in competitive Olympiad and JEE Advanced problem geometry.',
        metric: '100% Specialist Faculty',
      },
    ],
    careerOpportunities: [
      {
        roleOrDegree: 'B.Tech / B.S. / Dual Degree in Indian Institutes of Technology (IITs)',
        institutionOrCadre: 'IIT Bombay, IIT Delhi, IIT Madras, IIT Kharagpur & all 23 IITs (All India Quota via JEE Advanced)',
        description: 'Admitted strictly via JEE Advanced 2026 Ranks across 5 JoSAA rounds. JoSAA 2026 Round 5 Final Closing Ranks (OPEN, Gender-Neutral, CRL): IIT Bombay CSE (1–67), IIT Delhi CSE 4-Yr (35–128) & 5-Yr Dual (132–212), IIT Madras CSE (74–151), IIT Kharagpur CSE (217–509); Electrical Engg: IIT Delhi (428–612), IIT Madras (231–749), IIT Kharagpur (840–2190); Mechanical Engg: IIT Delhi (861–2205), IIT Madras (543–2619), IIT Kharagpur (2941–4588).',
        futureScope: 'Global technology leadership, quantum computing research, premier silicon design, and elite R&D.',
      },
      {
        roleOrDegree: 'National Institutes of Technology (NITs) & IIEST Shibpur',
        institutionOrCadre: 'NIT Tiruchirappalli, NIT Surathkal, NIT Warangal & 31 NITs + IIEST (50% Home State / 50% Other State via JEE Main)',
        description: 'Admitted via JEE Main 2026 Ranks in JoSAA (5 Rounds) & CSAB Special Rounds. JoSAA 2026 Round 5 Final Closing Ranks (OPEN, Gender-Neutral, CRL): NIT Trichy CSE (HS: 1034–4015, OS: 103–1373), ECE (HS: 2285–5142, OS: 1942–3285), Mechanical (HS: 7900–14015, OS: 3558–8754); NIT Surathkal CSE (HS: 1002–3331, OS: 678–1954), ECE (HS: 2384–5652, OS: 1330–3947), Mechanical (HS: 8002–14997, OS: 8678–12307); NIT Warangal CSE (HS: 1567–4034, OS: 1998–2581), CSE-AI&DS (HS: 3433–5416, OS: 2099–3178), ECE (HS: 3915–6867, OS: 3779–4623).',
        futureScope: 'Core engineering and software recruitment across multinational technology and industrial conglomerates.',
      },
      {
        roleOrDegree: 'Indian Institutes of Information Technology (IIITs) & Other-GFTIs',
        institutionOrCadre: 'IIIT Allahabad, ABV-IIITM Gwalior & 26 IIITs (All India Quota) + BIT Mesra, PEC Chandigarh & Other-GFTIs (via JoSAA)',
        description: 'JoSAA 2026 Round 5 Final Closing Ranks (OPEN, Gender-Neutral, JEE Main CRL): IIIT Allahabad B.Tech IT (AI: 1846–5420) & IT-Business Informatics (AI: 3335–4969); ABV-IIITM Gwalior B.Tech CSE (AI: 6028–8888) & 5-Yr Integrated B.Tech+M.Tech IT (AI: 9178–12435); GFTIs — BIT Mesra Ranchi B.Tech CSE (AI: 10675–24247) & CSE-AI/ML (AI: 18633–25122); PEC Chandigarh B.Tech CSE (HS: 8436–29864, OS: 6382–15088). Note: IIIT Hyderabad & IIIT Bangalore conduct separate admissions outside JoSAA.',
        futureScope: 'Specialized computing, artificial intelligence, VLSI, software architecture, and interdisciplinary engineering.',
      },
      {
        roleOrDegree: 'IISc Bangalore & Pure Science Research Channels',
        institutionOrCadre: 'IISc Bangalore (via JoSAA JEE Advanced Rank) & IISERs (via IAT)',
        description: 'Premier fundamental sciences and interdisciplinary engineering programmes for students inclined toward scientific discovery.',
        futureScope: 'Doctoral research at leading global universities and national scientific laboratories (ISRO, DRDO, BARC).',
      },
    ],
    connectedResourceFilter: 'jee',
    faqs: [
      {
        question: 'What is the difference between JEE Main Qualifying Percentile, JEE Main/Advanced Rank, and JoSAA Closing Rank?',
        answer: ' Officially Verified (NTA Result Notice dated 20 April 2026 & JoSAA 2026 Business Rules): (1) JEE Main NTA Percentile Score is a normalized relative performance score (0 to 100) across multi-shift sessions. The JEE Main 2026 Qualifying Cutoff Percentile (UR: 93.4123549, GEN-EWS: 82.4164528, OBC-NCL: 80.9232583, SC: 63.9172792, ST: 52.0174712, UR-PwBD: 0.0023186) ONLY determines eligibility to register for JEE Advanced (2,50,182 candidates qualified in 2026). It does NOT guarantee admission to any NIT, IIIT, GFTI, or branch. (2) JEE Main Rank (compiled from the best Total NTA Score across January & April sessions) is used for NIT, IIIT, and GFTI seat allocation, while JEE Advanced Rank (requiring at least 92/360 marks for CRL, 82/360 for GEN-EWS/OBC-NCL, and 46/360 for SC/ST/PwD in 2026) is used for IIT and IISc seat allocation. (3) JoSAA Closing Rank is the last rank allotted in a specific institute, programme, quota (AI/HS/OS), category, gender pool, and counselling round. OPEN seats use Common Rank List (CRL) ranks, whereas reserved category seats (GEN-EWS, OBC-NCL, SC, ST, and PwD) use their respective Category or PwD ranks—these rank lists are not interchangeable. A previous year or round closing rank is historical data, never a future admission guarantee.',
      },
      {
        question: 'What are the verified JoSAA 2026 Round 5 (Final Round) Opening and Closing Ranks at NIT Tiruchirappalli (NIT Trichy), and how do they compare historically with 2024 and 2025?',
        answer: 'Officially Verified (JoSAA 2026 Round 5 Final OR-CR Portal https://josaa.nic.in/or-cr/ updated 12.11.2026 & Official NIT Trichy Admission Records 2024–2025): For B.Tech Computer Science and Engineering (CSE) at NIT Tiruchirappalli under OPEN (CRL Rank): • Home State (HS, Tamil Nadu) Gender-Neutral: 2024 OR 1196 – CR 5469 | 2025 OR 1803 – CR 4624 | 2026 (R5 Final) OR 1034 – CR 4015 (Female-Only 2026: OR 2602 – CR 5732). • Other State (OS) Gender-Neutral: 2024 OR 299 – CR 1224 | 2025 OR 735 – CR 1605 | 2026 (R5 Final) OR 103 – CR 1373 (Female-Only 2026: OR 909 – CR 3545). • 2026 Reserved Category Closing Ranks for NIT Trichy CSE (Gender-Neutral Category Ranks, NOT CRL): GEN-EWS HS 2470 / OS 287; OBC-NCL HS 1262 / OS 459; SC HS 737 / OS 154; ST HS 500 / OS 95; OPEN-PwD HS 124 / OS 37. • For B.Tech ECE at NIT Trichy (OPEN, Gender-Neutral CRL): HS closed at 8085 (2024), 7076 (2025), and 5142 (2026 R5); OS closed at 3871 (2024), 3856 (2025), and 3285 (2026 R5). • For B.Tech Mechanical Engineering at NIT Trichy (OPEN, Gender-Neutral CRL): HS closed at 18567 (2024), 15531 (2025), and 14015 (2026 R5); OS closed at 10387 (2024), 9670 (2025), and 8754 (2026 R5). Across all three branches, closing ranks tightened steadily from 2024 to 2026.',
      },
      {
        question: 'What are the verified JoSAA 2026 Round 5 Opening and Closing Ranks across premier IITs, NITs, IIITs, and GFTIs?',
        answer: 'Officially Verified (JoSAA 2026 Round 5 Final OR-CR Portal https://josaa.admissions.nic.in/Applicant/SeatAllotmentResult/currentorcr.aspx): (A) IITs (All India Quota, JEE Advanced 2026 Ranks): • IIT Bombay B.Tech CSE: OPEN GN 1–67 (Female-Only 77–395), OPEN-PwD GN 1–6, EWS GN 6–20, OBC-NCL GN 12–62. • IIT Delhi B.Tech CSE (4-Yr): OPEN GN 35–128 (Female-Only 266–733), EWS GN 24–35, OBC-NCL GN 53–108, SC GN 30–62, ST GN 13–28; EE (4-Yr) OPEN GN 428–612; ME (4-Yr) OPEN GN 861–2205. • IIT Madras B.Tech CSE: OPEN GN 74–151 (Female-Only 111–539), EWS GN 22–31, OBC-NCL GN 35–96, SC GN 12–61, ST GN 17–27; EE OPEN GN 231–749; ME OPEN GN 543–2619. • IIT Kharagpur B.Tech CSE: OPEN GN 217–509 (Female-Only 1004–1906), EWS GN 49–74, OBC-NCL GN 159–258, SC GN 92–146, ST GN 46–73; EE OPEN GN 840–2190; ME OPEN GN 2941–4588. (Historical Context: IIT CSE OPEN GN Final Closing Ranks were 68 in 2024, ~63–66 in 2025, 67 in 2026 at IIT Bombay; 116 in 2024, 126 in 2025, 128 in 2026 at IIT Delhi; 159 in 2024, 171 in 2025, 151 in 2026 at IIT Madras.) (B) NITs (JEE Main 2026 Ranks, OPEN GN CRL): • NIT Surathkal: CSE HS 1002–3331 / OS 678–1954; ECE HS 2384–5652 / OS 1330–3947; ME HS 8002–14997 / OS 8678–12307. • NIT Warangal: CSE HS 1567–4034 / OS 1998–2581; CSE (AI & DS) HS 3433–5416 / OS 2099–3178; ECE HS 3915–6867 / OS 3779–4623; ME HS 10619–17462 / OS 8199–14049. (C) IIITs (All India Quota, JEE Main 2026 Ranks): • IIIT Allahabad B.Tech IT: OPEN GN 1846–5420 (Female-Only 2501–9396), EWS GN 684–917, OBC-NCL GN 1162–2508, SC GN 678–1662, ST GN 551–1023; B.Tech IT-Business Informatics OPEN GN 3335–4969. • ABV-IIITM Gwalior B.Tech CSE: OPEN GN 6028–8888 (Female-Only 11912–15493), EWS GN 1113–1271, OBC-NCL GN 2607–3603, SC GN 1302–2037, ST GN 695–1064; 5-Yr Integrated B.Tech+M.Tech IT OPEN GN 9178–12435. (D) GFTIs (JEE Main 2026 Ranks): • BIT Mesra, Ranchi B.Tech CSE (AI Quota): OPEN GN 10675–24247 (Female-Only 23378–36685), EWS GN 3422–4166, OBC-NCL GN 6803–11016, SC GN 2920–7457, ST GN 1462–3904. • Punjab Engineering College (PEC), Chandigarh B.Tech CSE: HS OPEN GN 8436–29864 (EWS 7114–13261, OBC-NCL 9074, SC 2653–5978); OS OPEN GN 6382–15088 (EWS 2039–2626, OBC-NCL 4952–5012, SC 2250–3508, ST 1525–1902). (Full 593-row verified dataset stored in src/data/josaaAdmissions2026.ts.)',
      },
      {
        question: 'How do Home State (HS), Other State (OS), and All India (AI) quotas work, and what are the Class 12 Board & attempt rules for 2026?',
        answer: 'Officially Verified (JoSAA 2026 Business Rules Clauses 11–13, 31 & Annexures 2(a)/2(b), and JEE Advanced Eligibility Criteria): (1) Quota Allocation: All seats in the 23 IITs, IISc Bangalore, and all 26 IIITs are allotted on an All India (AI) basis without state quotas. In the 31 NITs, IIEST Shibpur, and PEC Chandigarh, 50% of seats are allotted under the Home State (HS) Quota (determined strictly by the State/UT of the school from which the candidate first passed Class 12, NOT native residence or domicile) and 50% under the Other States (OS) Quota. In BIT Mesra, Assam University Silchar, and Puducherry Technological University, seats are divided into Home State (HS) and All India (AI) quotas; GKCIET Malda has a North-East 8-state HS quota; all other GFTIs use All India (AI) quota. (2) Vertical vs Horizontal Reservation & Female Supernumerary Pool: Central reservation provides 10% GEN-EWS, 27% OBC-NCL (Central List), 15% SC, 7.5% ST, and 40.5% OPEN vertically. The 5% PwD reservation is horizontal (carved out within each vertical category, never added to 100%). Separately, each programme-section maintains two independent gender verticals—Gender-Neutral and Female-Only (including supernumerary seats ensuring at least 20% female enrolment in IITs, NITs, IIEST, and participating IIITs). (3) Class 12 Board Criterion: For both IITs/IISc and NITs/IIITs/GFTIs, candidates must pass Class 12 with 5 required subjects and secure either at least 75% aggregate marks (65% for SC, ST, and PwD) OR be in the category-wise Top 20 percentile of their board from a single board marksheet. (4) Attempt & Age Limits: JEE Main allows 3 consecutive years (2024, 2025, 2026 Class 12 pass/appear) with no age limit. JEE Advanced allows at most 2 attempts in 2 consecutive years (first Class 12 appearance in 2025 or 2026), with age limit born on/after 01.10.2001 (01.10.1996 for SC/ST/PwD) for 2026, and disqualifies candidates who previously accepted an IIT/IISc seat.',
      },
      {
        question: 'How did JoSAA 2026 counselling rounds and CSAB 2026 Special Rounds operate?',
        answer: 'Officially Verified (JoSAA 2026 Schedule & CSAB 2026 Special Round Notice): In 2026, JoSAA conducted 5 official rounds of joint seat allocation (Round 5 was the final round for IITs and the NIT+ system, replacing the older 6-round structure). Following Round 5 and Partial Admission Fee (PAF) reporting (21 July 2026 notice), vacant seats exclusively in the NIT+ system (NITs, IIEST, IIITs, SPAs, and Other-GFTIs—IITs do NOT participate in CSAB) were filled through two independent CSAB 2026 Special Rounds (registration & choice filling: 28 July – 5 August 2026; Special Round 1 allotment: 6 August 2026; Special Round 2 allotment: 12 August 2026; physical reporting: 13–18 August 2026).',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 03. TAMIL NADU GOVERNMENT EXAMINATIONS (TNPSC)
  // --------------------------------------------------------------------------
  tngov: {
    id: 'prog-tngov-03',
    programCode: 'tngov',
    title: 'Tamil Nadu Government Services (TNPSC Groups I, II/IIA, IV)',
    shortName: '03. TNPSC Services',
    badge: 'TNPSC Statutory Syllabus & Tamil Nadu 69% Reservation Pattern',
    targetAudience: 'Graduates, Final Year College Students, and 10th/12th Pass Candidates',
    headline: 'Your Public Service Journey Awaits. We pave the way.',
    heroBranding: {
      primarySlogan: 'Your Public Service Journey Awaits.',
      supportingLine: 'We pave the way.',
      supportingDescription: 'Understand deeply. Prepare strategically. Serve responsibly.',
    },
    introduction: {
      heroStatement:
        'Understand deeply. Prepare strategically. Serve responsibly. Master Tamil Nadu’s administrative landscape, Samacheer Kalvi fundamentals, and constitutional governance to serve with competence and integrity.',
      purpose: 'The Tamil Nadu Public Service Commission (TNPSC) is the constitutional body mandated to recruit personnel for the civil services and public administration of the state of Tamil Nadu. Key examinations include Group I (Premier State Administrative Cadres), Group II / IIA (Executive and Non-Executive Officers), and Group IV / VAO (Subordinate Ministerial and Village Administrative Services).',
      examinationReality: 'Over 15 to 20 lakh aspirants appear annually for TNPSC examinations. In Group IV, securing a departmental allotment demands scoring 165+ out of 200 questions. In Group I, candidates must transition from broad General Studies Prelims to rigorous 3-hour analytical descriptive essay and policy papers in the Mains stage.',
      strategicImperative: 'The bedrock of TNPSC success is 100% mastery of Tamil Nadu Samacheer Kalvi School Textbooks (Classes 6 through 12). Furthermore, securing 90+ out of 100 in the General Tamil / Tamil Eligibility Test is mandatory for overall merit qualification.',
      competeAcademyPhilosophy:
        'Our training integrates Samacheer Kalvi textbook deconstruction, current affairs synthesis grounded in Tamil Nadu government welfare policies, daily aptitude speed mental math drills (25/25 target), and personalized descriptive Mains answer evaluation by former government administrators.',
    },
    examination: {
      examName: 'Tamil Nadu Public Service Commission (TNPSC) Combined Civil Services',
      conductingAuthority: 'Tamil Nadu Public Service Commission (TNPSC)',
      authorityFull: 'Government of Tamil Nadu Constitutional Body established under Article 315-323 of the Constitution of India',
      annualCadence: 'Conducted annually as per the TNPSC Annual Examination Planner',
      examMode: 'Offline OMR Pen & Paper (Prelims & Group IV) + Descriptive Written (Mains)',
      totalMarks: 300, // Group I / Group IV Prelims marks
      totalQuestions: 200,
      durationMinutes: 180, // 3 hours
      negativeMarkingRule: 'No negative marking in TNPSC OMR examinations; penalty deduction of 2 to 5 marks for improper OMR bubbled details or demographic errors.',
      officialSourceTitle: 'TNPSC Official Notifications & Annual Planner',
      officialSourceUrl: 'https://www.tnpsc.gov.in/',
      examYear: '2025 / 2026',
      verifiedDate: 'November 2026',
      stages: [
        {
          stageNumber: 1,
          name: 'Preliminary Examination / Group IV Single Stage',
          shortCode: 'TNPSC-Prelims',
          type: 'Pen & Paper (OMR)',
          duration: '180 Minutes (3 Hours)',
          totalMarks: 300,
          questionsCount: 200,
          nature: 'Screening / Group IV Final Merit',
          description: '200 objective multiple choice questions covering General Tamil / Tamil Eligibility (100 Qs), General Studies (75 Qs), and Aptitude & Mental Ability (25 Qs).',
        },
        {
          stageNumber: 2,
          name: 'Main Written Examination (Group I & II)',
          shortCode: 'TNPSC-Mains',
          type: 'Descriptive Written',
          duration: '3 Hours per Paper (Multiple Papers)',
          totalMarks: 'Group I: 750 Marks (3 Papers × 250) + Mandatory Tamil',
          nature: 'Merit Ranking',
          description: 'Paper I (Compulsory Tamil Eligibility Qualifying), Paper II, III, and IV covering Indian Polity, Tamil Society & Culture, Economy, Geography, Environment, and Science & Technology.',
        },
        {
          stageNumber: 3,
          name: 'Oral Test / Interview (Group I & II Executive)',
          shortCode: 'TNPSC-Interview',
          type: 'Personality Test / Interview',
          duration: '25 to 35 Minutes',
          totalMarks: 100, // Group I Interview
          nature: 'Merit Ranking',
          description: 'Comprehensive evaluation of administrative judgment, knowledge of Tamil Nadu socio-economic challenges, moral integrity, and leadership ability.',
        },
      ],
    },
    marksDistribution: {
      overview: 'In TNPSC Group I Preliminary and Group IV examinations, the test consists of 200 multiple choice questions carrying a total of 300 marks (1.5 marks per question) to be solved within 3 hours. There is NO negative marking for incorrect answers.',
      rows: [
        {
          subject: 'General Tamil (பொதுத் தமிழ்) / Tamil Eligibility',
          section: 'Section 1 (Compulsory 100 Questions)',
          questionsAsked: '100 Qs',
          questionsToAttempt: '100 Qs (All)',
          marksPerQuestion: 1.5,
          negativeMark: 'No Negative Marking',
          totalMarks: 150,
          syllabusScope: 'இலக்கணம் (Grammar), இலக்கியம் (Literature - Thirukkural, Sangam literature), தமிழ் அறிஞர்களும் தமிழ்த் தொண்டும்',
          highYieldWeightage: 'Crucial scoring section: Top rankers score 95-98 questions correct (142.5 to 147 marks).',
        },
        {
          subject: 'General Studies (பொது அறிவு)',
          section: 'Section 2 (General Science, History, Polity, Geography, Economy)',
          questionsAsked: '75 Qs',
          questionsToAttempt: '75 Qs (All)',
          marksPerQuestion: 1.5,
          negativeMark: 'No Negative Marking',
          totalMarks: 112.5,
          syllabusScope: 'History & Culture of India & Tamil Nadu (Unit 8), TN Administration (Unit 9), Indian Polity, Science',
          highYieldWeightage: 'Unit 8 & Unit 9 comprise 30-35 questions out of the 75 General Studies questions.',
        },
        {
          subject: 'Aptitude & Mental Ability (திறனறிவும் மனக்கணக்கு நுண்ணறிவும்)',
          section: 'Section 3 (Aptitude & Reasoning)',
          questionsAsked: '25 Qs',
          questionsToAttempt: '25 Qs (All)',
          marksPerQuestion: 1.5,
          negativeMark: 'No Negative Marking',
          totalMarks: 37.5,
          syllabusScope: 'Simplification, Percentage, HCF & LCM, Ratio & Proportion, Simple & Compound Interest, Time & Work',
          highYieldWeightage: '100% predictable syllabus: Compete Academy students target 24-25/25 correct.',
        },
      ],
      totalCalculatedMarks: 300,
      scoringStrategy: [
        'Master General Tamil to score at least 95 out of 100 questions; this forms the indispensable anchor for clearing cutoffs.',
        'Score 24 or 25 out of 25 in Aptitude: mental math speed and formula recall leave zero room for unforced calculation errors.',
        'Focus heavily on Unit 8 (Tamil Heritage, Thirukkural, Dravidian Movement) and Unit 9 (Human Development Indicators & TN Welfare Schemes).',
      ],
    },
    eligibilityAndCutoffs: {
      academicPrerequisite: 'Group I & II: Any recognized Bachelor’s Degree from an accredited university. Group IV & VAO: Passed 10th Standard (SSLC) with Tamil as a subject or equivalent. Knowledge of Tamil is statutory.',
      ageLimitRule: 'Group I: Min 21 Years | Max 34 Years (General) | Max 39 Years (BC, BCM, MBC, SC, ST). Group IV: Min 21 Years for VAO | Max 32 to 42 Years depending on communal category. Concessions exist for Destitute Widows and Ex-Servicemen.',
      officialStatutoryNote: 'Statutory Reference: Tamil Nadu Government 69% Reservation Act (Act 45 of 1994) & TNPSC Procedural Instructions.',
      cutoffsDistinctionExplanation: 'COMMUNAL RESERVATION CUTOFFS: Tamil Nadu implements a 69% statutory reservation model across specific backward and oppressed classes. Selection lists are formulated strictly as Open Competition (31%), BC (26.5%), BCM (3.5%), MBC/DNC (20%), SC (15%), SCA (3%), and ST (1%), with 20% horizontal reservation for Persons Studied in Tamil Medium (PSTM).',
      categories: [
        {
          categoryName: 'Open Competition (OC / General)',
          code: 'OC',
          reservationPercentage: '31% (Open to all communities based on merit)',
          qualifyingCriteria: 'Merit-based cutoff',
          recentQualifyingCutoff: 'Group IV: 168+ Questions Correct (out of 200) | Group I Prelims: 135+ Qs',
          typicalAllotmentSafeScore: 'Group IV: 172+ Qs | Group I Mains: 450+ Marks',
          maxAttemptsOrAge: 'Max 34 Years for Group I | Max 32 Years for Group IV',
          notes: 'Highest cutoff threshold; non-PSTM candidates face rigorous competition.',
        },
        {
          categoryName: 'Backward Classes (BC - Non-Muslim)',
          code: 'BC',
          reservationPercentage: '26.5% Statutory Reservation',
          qualifyingCriteria: 'Communal merit',
          recentQualifyingCutoff: 'Group IV: 165+ Questions Correct | Group I Prelims: 130+ Qs',
          typicalAllotmentSafeScore: 'Group IV: 168+ Qs for VAO / Junior Assistant in prime departments',
          maxAttemptsOrAge: 'Max 39 Years for Group I | Max 37 Years for Group IV',
          notes: 'Large candidate cohort; PSTM certificate provides a decisive 4-6 question advantage.',
        },
        {
          categoryName: 'Backward Classes Muslim (BCM)',
          code: 'BCM',
          reservationPercentage: '3.5% Statutory Reservation',
          qualifyingCriteria: 'Communal merit',
          recentQualifyingCutoff: 'Group IV: 158+ Questions Correct | Group I Prelims: 122+ Qs',
          typicalAllotmentSafeScore: 'Group IV: 162+ Qs for revenue/commercial taxes posting',
          maxAttemptsOrAge: 'Max 39 Years for Group I | Relaxed age boundaries apply',
          notes: 'Dedicated sub-quota enacted for Muslim minority backward communities.',
        },
        {
          categoryName: 'Most Backward Classes & Denotified Communities (MBC/DNC)',
          code: 'MBC / DNC',
          reservationPercentage: '20% Statutory Reservation',
          qualifyingCriteria: 'Communal merit',
          recentQualifyingCutoff: 'Group IV: 163+ Questions Correct | Group I Prelims: 128+ Qs',
          typicalAllotmentSafeScore: 'Group IV: 166+ Qs for high-priority executive departments',
          maxAttemptsOrAge: 'Max 39 Years for Group I | Max 37 Years for Group IV',
          notes: 'High representation across state government departments.',
        },
        {
          categoryName: 'Scheduled Castes (SC)',
          code: 'SC',
          reservationPercentage: '15% Statutory Reservation',
          qualifyingCriteria: 'Communal merit',
          recentQualifyingCutoff: 'Group IV: 155+ Questions Correct | Group I Prelims: 118+ Qs',
          typicalAllotmentSafeScore: 'Group IV: 160+ Qs for state secretariat and treasury',
          maxAttemptsOrAge: 'Max 39 Years for Group I | Max 42 Years for Group IV',
          notes: 'Fee concessions and age exemptions apply as per government orders.',
        },
        {
          categoryName: 'Scheduled Castes Arunthathiyar (SCA)',
          code: 'SCA',
          reservationPercentage: '3% Special Sub-Reservation within SC',
          qualifyingCriteria: 'Communal merit',
          recentQualifyingCutoff: 'Group IV: 148+ Questions Correct | Group I Prelims: 110+ Qs',
          typicalAllotmentSafeScore: 'Group IV: 154+ Qs for departmental allotment',
          maxAttemptsOrAge: 'Same as SC guidelines',
          notes: 'Preferential allotment for Arunthathiyar community within SC reservation.',
        },
        {
          categoryName: 'Scheduled Tribes (ST)',
          code: 'ST',
          reservationPercentage: '1% Statutory Reservation',
          qualifyingCriteria: 'Communal merit',
          recentQualifyingCutoff: 'Group IV: 144+ Questions Correct | Group I Prelims: 104+ Qs',
          typicalAllotmentSafeScore: 'Group IV: 150+ Qs',
          maxAttemptsOrAge: 'Max 39 Years for Group I | Max 42 Years for Group IV',
          notes: 'Mandatory verification by Revenue Divisional Officer (RDO).',
        },
      ],
    },
    timeManagement: {
      modeDescription: 'Conducted in Pen & Paper (OMR) format with black ballpoint pen. TNPSC imposes specific OMR rules: total count of A, B, C, D, and E options must be tallied and recorded in Section II of the OMR sheet at the end of the examination.',
      recommendedTimePerQuestion: 'General Tamil: 40 seconds | Aptitude: 75 seconds | General Studies: 50 seconds.',
      tacticalPacingStrategy: [
        {
          round: 'Hour 1 (0 to 60 mins)',
          title: 'General Tamil 100 Questions Sweep',
          durationAllocated: '60 Minutes',
          actionPlan: 'Read and bubble all 100 General Tamil questions directly on the OMR sheet. Aim for 95+ correct responses with steady focus.',
        },
        {
          round: 'Hour 2 (60 to 110 mins)',
          title: 'General Studies 75 Questions Execution',
          durationAllocated: '50 Minutes',
          actionPlan: 'Tackle History, Unit 8, Unit 9, Polity, and Current Affairs. Mark unsure questions with a soft pencil dot.',
        },
        {
          round: 'Hour 3 Part A (110 to 155 mins)',
          title: 'Aptitude 25 Questions Calculation',
          durationAllocated: '45 Minutes',
          actionPlan: 'Solve math questions step by step. Verify calculations for Compound Interest, Time & Work, and Simplification. Bubble carefully.',
        },
        {
          round: 'Hour 3 Part B (155 to 180 mins)',
          title: 'Option E Marking & OMR Tallies Audit',
          durationAllocated: '25 Minutes',
          actionPlan: 'Ensure NO question is left unbubbled (mark Option E if unknown to prevent penalty). Tally total A, B, C, D, E counts and fill the verification boxes.',
        },
      ],
      negativeMarkingMitigation: [
        'Mandatory Option E: Under TNPSC rules, leaving any question completely blank incurs a penalty; mark Option E if truly unknown.',
        'OMR Tally Audit: Avoid 5-mark deductions by carefully counting and recording option tallies in the designated bottom section.',
        'Black Ballpoint Quality: Use certified 0.7mm dark black ballpoint pens for rapid, complete circle filling.',
      ],
    },
    curriculum: [
      {
        subjectName: 'General Tamil (பொதுத் தமிழ் - சமச்சீர் கல்வி)',
        icon: 'translate',
        totalChapters: 24,
        totalHours: 180,
        chapters: [
          {
            title: 'பகுதி - அ: இலக்கணம் (Tamil Grammar)',
            subtopics: ['பொருத்துதல், பொருத்தமான பொருளைத் தேர்வு செய்தல்', 'பிரித்தெழுதுக, சேர்த்தெழுதுக, எதிர்ச்சொல்', 'பிழை திருத்தம் (சந்திப்பிழை, ஒருமை பன்மை பிழை)', 'வேர்ச்சொல்லைக் கண்டறிதல், தொழிற்பெயர், வினையாலணையும் பெயர்', 'அகரவரிசைப்படுத்துதல், இலக்கணக் குறிப்பறிதல்'],
            weightageLevel: 'High Yield',
            estimatedHours: 55,
          },
          {
            title: 'பகுதி - ஆ: இலக்கியம் (Tamil Literature)',
            subtopics: ['திருக்குறள் தொடர்பான செய்திகள் (அறுபதுக்கும் மேற்பட்ட அதிகாரங்கள்)', 'நாலடியார், நான்மணிக்கடிகை, பழமொழி நானூறு', 'எட்டுத்தொகை, பத்துப்பாட்டு நூல்கள்', 'சிலப்பதிகாரம், மணிமேகலை (ஐம்பெருங்காப்பியங்கள்)', 'பெரியபுராணம், கம்பராமாயணம், தேம்பாவணி, சீறாப்புராணம்'],
            weightageLevel: 'High Yield',
            estimatedHours: 65,
          },
          {
            title: 'பகுதி - இ: தமிழ் அறிஞர்களும் தமிழ்த் தொண்டும்',
            subtopics: ['பாரதியார், பாரதிதாசன், நாமக்கல் கவிஞர், கவிமணி', 'உ.வே.சாமிநாத ஐயர், தெ.பொ.மீனாட்சிசுந்தரனார்', 'தேவநேயப்பாவாணர், ஜி.யு.போப், வீரமாமுனிவர் தொண்டு', 'பெரியார், அண்ணா, காமராசர், முத்துராமலிங்கத் தேவர்', 'மகளிர் சிறப்பு: மூவலூர் ராமாமிர்தம், தில்லையாடி வள்ளியம்மை, வேலுநாச்சியார்'],
            weightageLevel: 'High Yield',
            estimatedHours: 60,
          },
        ],
      },
      {
        subjectName: 'General Studies (Unit 8 & Unit 9 Special Focus)',
        icon: 'history_edu',
        totalChapters: 28,
        totalHours: 200,
        chapters: [
          {
            title: 'Unit 8: History, Culture, Heritage & Socio-Political Movements in TN',
            subtopics: ['History of Tamil Society, Archaeological Discoveries (Keeladi, Sivagalai, Porunai)', 'Thirukkural: Relevance to Secular Literature, Everyday Life, Socio-Economic Ideals', 'Early Uprisings against British Rule (Poligar Wars, Puli Thevar, Velu Nachiyar, Kattabomman)', '19th and 20th Century Socio-Religious Reform Movements', 'Justice Party, Self-Respect Movement & Dravidian Movement Contributions'],
            weightageLevel: 'High Yield',
            estimatedHours: 65,
          },
          {
            title: 'Unit 9: Development Administration in Tamil Nadu',
            subtopics: ['Human Development Indicators in TN and Comparative Analysis with All-India Status', 'Impact of Social Welfare Schemes (Midday Meal, Pudhumai Penn, Kalaignar Magalir Urimai)', 'Economic Trends in Tamil Nadu, Industrial Corridors & Port Infrastructure', 'e-Governance Initiatives in Tamil Nadu (TNeGA, e-Sevai, CM Helpline)', 'Reservation Policy: Rationale, Evolution, and Implementation Mechanism'],
            weightageLevel: 'High Yield',
            estimatedHours: 55,
          },
          {
            title: 'Indian Polity & Constitution',
            subtopics: ['Preamble, Fundamental Rights & Directive Principles of State Policy (DPSP)', 'Union Parliament & State Legislature Powers', 'Judiciary: Supreme Court & High Courts', 'Local Self Government: 73rd & 74th Constitutional Amendments', 'Anti-Corruption Measures: Lokpal, Lokayukta, RTI, CVC'],
            weightageLevel: 'High Yield',
            estimatedHours: 45,
          },
          {
            title: 'General Science, Geography & Indian Economy',
            subtopics: ['Elements & Compounds, Acids/Bases, Human Diseases & Nutrition', 'Geography of India & Tamil Nadu (Monsoons, Rivers, Soil, Minerals)', 'NITI Aayog, Five Year Plans Review, GST & Finance Commission Relations'],
            weightageLevel: 'Core Standard',
            estimatedHours: 35,
          },
        ],
      },
      {
        subjectName: 'Aptitude & Mental Ability',
        icon: 'pin',
        totalChapters: 12,
        totalHours: 90,
        chapters: [
          {
            title: 'Arithmetic & Number Operations',
            subtopics: ['Simplification, BODMAS & Square/Cube Roots', 'Highest Common Factor (HCF) & Lowest Common Multiple (LCM)', 'Ratio & Proportion, Ages Problems', 'Percentage Calculations & Profit and Loss'],
            weightageLevel: 'High Yield',
            estimatedHours: 40,
          },
          {
            title: 'Commercial Mathematics & Mensuration',
            subtopics: ['Simple Interest & Compound Interest Formulae and Differences', 'Time and Work, Pipes & Cisterns', 'Area and Volume (2D & 3D Mensuration: Circles, Cylinders, Cones, Spheres)'],
            weightageLevel: 'High Yield',
            estimatedHours: 30,
          },
          {
            title: 'Logical & Visual Reasoning',
            subtopics: ['Alpha-Numeric Series, Puzzles, Dice Problems', 'Visual Reasoning: Mirror Images, Pattern Completion', 'Data Interpretation: Tables, Bar Charts, Pie Diagrams'],
            weightageLevel: 'Core Standard',
            estimatedHours: 20,
          },
        ],
      },
    ],
    learningJourney: [
      {
        stageNumber: 1,
        phaseTitle: 'Phase 1: Samacheer Kalvi Textbook Consolidation (Classes 6 to 10)',
        timeline: 'Months 1 to 3',
        academicObjective: 'Master 100% of Tamil Nadu State Board textbooks in Tamil, Social Science, and Mathematics.',
        pedagogicalFocus: [
          'Line-by-line reading of Tamil literature poems, word meanings, and grammar tables.',
          'Summary notes of 6th to 10th history, geography, and civics textbooks.',
          'Daily 20-question mental aptitude workout without using paper shortcuts.',
        ],
        assessmentMilestone: 'Weekly School Book Chapter-wise Mastery Examinations.',
        keyDeliverable: 'Consolidated Samacheer Kalvi revision compendium.',
      },
      {
        stageNumber: 2,
        phaseTitle: 'Phase 2: Higher Secondary (11th & 12th) & Special Units 8 and 9',
        timeline: 'Months 4 to 6',
        academicObjective: 'In-depth coverage of 11th and 12th Ethics, Advanced Tamil, Economics, and Tamil Nadu Governance reports.',
        pedagogicalFocus: [
          'Thirukkural analytical context: understanding poetic metaphors and ethical governance concepts.',
          'Comprehensive study of Tamil Nadu policy notes and statistical department data.',
          'Previous 10-year question trend deconstruction for Group I, II, and IV.',
        ],
        assessmentMilestone: 'Sectional Full Tests on Unit 8 and Unit 9.',
        keyDeliverable: 'Specialized Unit 8 & 9 quick-revision handbook.',
      },
      {
        stageNumber: 3,
        phaseTitle: 'Phase 3: 200-Question Simulated OMR Test Series',
        timeline: 'Months 7 to 8',
        academicObjective: 'Build OMR speed, eliminate optical errors, and reliably reach 170+ questions correct.',
        pedagogicalFocus: [
          'Full-scale 3-hour mock tests every Wednesday and Saturday under real exam timing (9:30 AM to 12:30 PM).',
          'Practice calculating and bubbling bottom-row option tallies (A, B, C, D, E) without time panic.',
          'Current affairs monthly summaries tailored to state government awards and schemes.',
        ],
        assessmentMilestone: 'State-wide Proctored TNPSC Mock Rankings.',
        keyDeliverable: 'Error log highlighting unforced slips in grammar or arithmetic.',
      },
      {
        stageNumber: 4,
        phaseTitle: 'Phase 4: Group I & II Mains Descriptive Answer Lab',
        timeline: 'Post-Prelims (3 Months)',
        academicObjective: 'Develop structured, high-scoring essay and descriptive answer-writing skills for the Mains stage.',
        pedagogicalFocus: [
          'Structured answer framework: Introduction, Subheadings, Bullet Points, Flowcharts, Government Scheme Citations, and Conclusion.',
          'Weekly evaluation of handwritten answer scripts by former government officers.',
          'Mandatory Tamil Language Qualifying Paper mastery.',
        ],
        assessmentMilestone: 'Full Mains Mock Examination Simulation with detailed individual rubrics.',
        keyDeliverable: 'Complete administrative readiness to secure Top 10 State Ranks.',
      },
    ],
    studentApproach: [
      {
        pillarNumber: '01',
        title: 'Samacheer Kalvi Line-by-Line Pedagogy',
        tagline: 'The state board textbook is the official exam blueprint.',
        description: 'Over 85% of TNPSC questions are drawn directly from Tamil Nadu School Education textbooks. Our modules parse every textbook box item, glossary, and exercise.',
        icon: 'auto_stories',
      },
      {
        pillarNumber: '02',
        title: 'Thirukkural & Tamil Heritage Special Desk',
        tagline: 'Honoring our culture while securing maximum marks.',
        description: 'Specialized literary sessions covering the ethical, economic, and political significance of Thirukkural as required by TNPSC Unit 8 and Mains Paper II.',
        icon: 'history_edu',
      },
      {
        pillarNumber: '03',
        title: 'Daily 25-Question Aptitude Drills',
        tagline: 'Achieving 25/25 in mental ability.',
        description: 'Aptitude is the only 100% predictable section in TNPSC. Daily morning timed drills ensure students solve all 25 questions in under 35 minutes.',
        icon: 'pin',
      },
      {
        pillarNumber: '04',
        title: 'Official OMR Sheet Simulation',
        tagline: 'Zero deductions on option tallies and bubbling.',
        description: 'Every test is conducted on exact replicas of TNPSC OMR sheets with mandatory Section II option tally recording to build error-free exam habits.',
        icon: 'fact_check',
      },
      {
        pillarNumber: '05',
        title: 'Tamil Nadu Policy Notes & Budget Insights',
        tagline: 'Grounded in authentic administrative reality.',
        description: 'Our study materials integrate data from official Tamil Nadu Government department policy notes, state budgets, and socio-economic surveys.',
        icon: 'account_balance',
      },
      {
        pillarNumber: '06',
        title: 'Bilingual Classroom Instructions',
        tagline: 'Seamless clarity in both Tamil and English.',
        description: 'All General Studies lectures and study modules are provided in bilingual format, catering equally to Tamil Medium (PSTM) and English Medium aspirants.',
        icon: 'language',
      },
      {
        pillarNumber: '07',
        title: 'Dedicated Mains Answer Evaluation Cell',
        tagline: 'Feedback that elevates presentation and depth.',
        description: 'Handwritten Mains answers evaluated within 48 hours with line-by-line feedback on diagrammatic presentation, administrative tone, and structural balance.',
        icon: 'rate_review',
      },
      {
        pillarNumber: '08',
        title: 'Interview & Personality Board',
        tagline: 'Refining administrative poise and integrity.',
        description: 'Mock interviews conducted by retired IAS officers, Deputy Collectors, and university professors to prepare candidates for the Group I Oral Test.',
        icon: 'record_voice_over',
      },
    ],
    institutionalStrengths: [
      {
        title: 'State Administrative Placements',
        description: 'Our alumni serve across Tamil Nadu Revenue, Commercial Taxes, Police, Rural Development, and Registration departments.',
        metric: '320+ Officers Placed',
      },
      {
        title: 'Comprehensive Samacheer Kalvi Question Bank',
        description: 'Over 12,000 verified chapter-wise multiple choice questions mapped directly to Classes 6 through 12 state textbooks.',
        metric: '12,000+ Samacheer Qs',
      },
      {
        title: 'Specialist Faculty for Tamil Literature',
        description: 'Renowned Tamil scholars and subject experts guiding aspirants in grammar, Sangam literature, and modern literary contributions.',
        metric: 'Expert Literature Mentors',
      },
    ],
    careerOpportunities: [
      {
        roleOrDegree: 'Group I: Deputy Collector (Revenue & Disaster Management)',
        institutionOrCadre: 'Tamil Nadu Civil Service (Executive)',
        description: 'Premier administrative role in district administration heading sub-divisions (Sub-Collector / RDO) with fast-track promotion to IAS cadre.',
        futureScope: 'High administrative executive authority, law and order enforcement, and district collectorate leadership.',
      },
      {
        roleOrDegree: 'Group I: Deputy Superintendent of Police (DSP)',
        institutionOrCadre: 'Tamil Nadu Police Service',
        description: 'Frontline law enforcement officer in charge of police sub-divisions with promotion pathway to Indian Police Service (IPS).',
        futureScope: 'District crime investigation, police administration, intelligence, and public safety command.',
      },
      {
        roleOrDegree: 'Group II / IIA: Sub-Registrar / Municipal Commissioner / Commercial Tax Officer',
        institutionOrCadre: 'Registration, Municipal Administration, and Commercial Taxes Departments',
        description: 'Key executive officer positions in revenue generation, urban civic governance, and legal documentation.',
        futureScope: 'Stable, prestigious state government career with progressive promotion to Joint Commissioner cadres.',
      },
      {
        roleOrDegree: 'Group IV: Village Administrative Officer (VAO) & Junior Assistant',
        institutionOrCadre: 'Revenue Department & Tamil Nadu Ministerial Services',
        description: 'Crucial frontline representative of the government at the village level and departmental administrative coordinators.',
        futureScope: 'Early career entry into state civil service with departmental test pathways to Deputy Tahsildar and Tahsildar.',
      },
    ],
    connectedResourceFilter: 'tngov',
    faqs: [
      {
        question: 'Is it necessary to study all school books from 6th to 12th for TNPSC Group IV?',
        answer: 'Yes. The Tamil Nadu State Board (Samacheer Kalvi) textbooks from Classes 6 to 10 are absolutely mandatory for General Tamil, Social Science, Science, and Mathematics. For General Studies, key portions of Classes 11 and 12 (History, Polity, Economics, and Ethics) are essential to score above the 165+ question safe mark.',
      },
      {
        question: 'What is PSTM reservation and how does it help?',
        answer: 'PSTM stands for "Persons Studied in Tamil Medium". Under Tamil Nadu statutory law, a 20% horizontal reservation is provided to candidates who have completed their entire qualifying education (from SSLC, HSC, and Degree, depending on post requirements) in Tamil Medium. PSTM typically lowers the qualifying cutoff by 3 to 6 questions.',
      },
      {
        question: 'How many marks can be deducted for errors in OMR filling in TNPSC?',
        answer: 'TNPSC strictly enforces administrative OMR rules. Deductions of 2 to 5 marks occur if a candidate shades the wrong question paper booklet series, fails to record the total number of options (A, B, C, D, E) shaded, or puts inappropriate stray pen marks. Compete Academy trains students through repeated simulations to prevent these deductions.',
      },
      {
        question: 'Can someone working in a full-time job prepare for TNPSC at Compete Academy?',
        answer: 'Yes. We run dedicated Weekend batches (Saturday and Sunday full-day sessions) and Evening batches designed specifically for working professionals and final-year college students, supplemented with digital study summaries and recorded doubt sessions.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 04. UPSC CIVIL SERVICES COACHING
  // --------------------------------------------------------------------------
  upsc: {
    id: 'prog-upsc-04',
    programCode: 'upsc',
    title: 'UPSC Civil Services Examination (IAS / IPS / IFS / IRS)',
    shortName: '04. UPSC Civil Services',
    badge: 'Union Public Service Commission (UPSC) Pattern',
    targetAudience: 'Graduates, Postgraduates, Final Year Students & Working Professionals',
    headline: 'Your Nation Needs Your Leadership. We pave the way.',
    heroBranding: {
      primarySlogan: 'Your Nation Needs Your Leadership.',
      supportingLine: 'We pave the way.',
      supportingDescription: 'Build knowledge. Develop judgment. Lead with purpose.',
    },
    introduction: {
      heroStatement:
        'Build knowledge. Develop judgment. Lead with purpose. Cultivate interdisciplinary constitutional depth, critical policy analysis, and administrative integrity for the civil services of India.',
      purpose: 'The Civil Services Examination (CSE) conducted by the Union Public Service Commission (UPSC) is India’s premier national recruitment examination. It selects leaders for the Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), Indian Revenue Service (IRS), and other prestigious Group A Central Services.',
      examinationReality: 'With over 10 to 11 lakh applicants competing for approximately 1,000 vacancies, UPSC CSE is widely recognized as one of the world’s most challenging selection processes. Prelims tests analytical elimination and objective endurance; Mains requires writing over 50,000 words across 9 descriptive papers in 5 days; and the Personality Test evaluates psychological integrity and constitutional temperament.',
      strategicImperative: 'Superficial fact memorization is completely futile in UPSC. The commission tests the candidate’s ability to connect historical precedents, economic principles, constitutional safeguards, technological disruptions, and ethical considerations into cogent, balanced policy recommendations.',
      competeAcademyPhilosophy:
        'Our UPSC ecosystem is built on rigorous mentorship: we replace informational overload with disciplined source consolidation, daily editorial analytical discussions, weekly Mains answer-writing under strict clock supervision, and personalized interview mentoring by distinguished retired civil servants.',
    },
    examination: {
      examName: 'Civil Services Examination (CSE)',
      conductingAuthority: 'Union Public Service Commission (UPSC)',
      authorityFull: 'Constitutional Body established under Article 315 of the Constitution of India',
      annualCadence: 'Once a year (Prelims in May/June; Mains in September; Personality Test in Jan-April)',
      examMode: 'Multi-Stage (Prelims CBT/OMR + Mains Descriptive + Interview)',
      totalMarks: 2025, // 1750 (Mains Written) + 275 (Personality Test)
      totalQuestions: 180, // Prelims (100 in GS1 + 80 in CSAT)
      durationMinutes: 120, // 2 hours per Prelims paper; 3 hours per Mains paper
      negativeMarkingRule: 'Prelims: Penalty of 1/3rd (-0.66 in GS1; -0.83 in CSAT) for each incorrect response. Mains: Deduction for word limit violations or illegible handwriting.',
      officialSourceTitle: 'UPSC Official Annual Notification & Syllabi',
      officialSourceUrl: 'https://upsc.gov.in/',
      examYear: '2025 / 2026',
      verifiedDate: 'November 2026',
      stages: [
        {
          stageNumber: 1,
          name: 'Civil Services Preliminary Examination',
          shortCode: 'UPSC-Prelims',
          type: 'Pen & Paper (OMR)',
          duration: 'Two Papers of 2 Hours Each (Same Day)',
          totalMarks: 400, // 200 (GS1) + 200 (CSAT)
          questionsCount: '100 Qs (GS Paper I) + 80 Qs (CSAT Paper II)',
          nature: 'Screening',
          description: 'GS Paper I (Cutoff determines Mains qualification). CSAT Paper II is strictly qualifying in nature (minimum 33% required, i.e., 66 marks).',
        },
        {
          stageNumber: 2,
          name: 'Civil Services Main Examination',
          shortCode: 'UPSC-Mains',
          type: 'Descriptive Written',
          duration: '9 Papers across 5 Days (3 Hours per Paper)',
          totalMarks: 1750, // 7 merit papers × 250 marks + 2 qualifying language papers
          nature: 'Merit Ranking',
          description: 'Paper A (Indian Language - 300, qualifying), Paper B (English - 300, qualifying). 7 Merit Papers: Essay (250), GS I (250), GS II (250), GS III (250), GS IV Ethics (250), Optional Paper I (250), Optional Paper II (250).',
        },
        {
          stageNumber: 3,
          name: 'Personality Test / Interview',
          shortCode: 'UPSC-Interview',
          type: 'Personality Test / Interview',
          duration: '30 to 45 Minutes at Dholpur House, New Delhi',
          totalMarks: 275,
          nature: 'Merit Ranking',
          description: 'Comprehensive board interview assessing mental alertness, critical assimilation, clear and logical exposition, integrity, and leadership qualities.',
        },
      ],
    },
    marksDistribution: {
      overview: 'Final merit ranking is calculated out of 2,025 marks: 1,750 marks from the 7 descriptive Mains papers plus 275 marks from the Personality Test. The Preliminary Examination marks (400 marks) are purely screening and not counted in final rank calculation.',
      rows: [
        {
          subject: 'Essay Paper (Paper I)',
          section: 'Section A & Section B (Two Philosophical/Thematic Essays)',
          questionsAsked: '8 Prompts (Choose 2)',
          questionsToAttempt: '2 Essays (1,000-1,200 words each)',
          marksPerQuestion: 125,
          negativeMark: 'Deductions for superficiality',
          totalMarks: 250,
          syllabusScope: 'Philosophical, socio-economic, environmental, and ethical governance themes',
          highYieldWeightage: 'Crucial differentiator: scores range from 90 to 145+ depending on depth and articulation.',
        },
        {
          subject: 'General Studies I (Paper II)',
          section: 'History, Geography, Heritage & Society',
          questionsAsked: '20 Questions',
          questionsToAttempt: '20 Questions (Compulsory)',
          marksPerQuestion: '10 Marks (150 words) & 15 Marks (250 words)',
          negativeMark: 'Penalty for crossing margins',
          totalMarks: 250,
          syllabusScope: 'Indian Heritage & Culture, Modern Indian History, World History, Physical & Human Geography, Society',
          highYieldWeightage: 'Geography and Indian Society provide structured, fact-grounded scoring.',
        },
        {
          subject: 'General Studies II (Paper III)',
          section: 'Governance, Constitution, Polity, Social Justice & International Relations',
          questionsAsked: '20 Questions',
          questionsToAttempt: '20 Questions (Compulsory)',
          marksPerQuestion: '10 & 15 Marks',
          negativeMark: 'Penalty for ungrounded claims',
          totalMarks: 250,
          syllabusScope: 'Indian Constitution, Executive/Legislature/Judiciary, Statutory Bodies, Welfare Policies, Bilateral Relations',
          highYieldWeightage: 'Supreme Court judgments, Law Commission reports, and international treaties essential.',
        },
        {
          subject: 'General Studies III (Paper IV)',
          section: 'Technology, Economic Development, Bio-diversity, Security & Disaster Management',
          questionsAsked: '20 Questions',
          questionsToAttempt: '20 Questions (Compulsory)',
          marksPerQuestion: '10 & 15 Marks',
          negativeMark: 'Penalty for missing real-world data',
          totalMarks: 250,
          syllabusScope: 'Indian Economy, Agriculture, Science & Tech, Climate Change, Internal Security Challenges',
          highYieldWeightage: 'Budget, Economic Survey, and internal security dynamics yield direct questions.',
        },
        {
          subject: 'General Studies IV (Paper V)',
          section: 'Ethics, Integrity and Aptitude',
          questionsAsked: 'Section A (Theoretical Questions) + Section B (Case Studies)',
          questionsToAttempt: 'All Questions & 6 Case Studies',
          marksPerQuestion: '10 Marks (Section A) & 20 Marks (Case Studies)',
          negativeMark: 'Penalty for unethical solutions',
          totalMarks: 250,
          syllabusScope: 'Human Values, Attitude, Emotional Intelligence, Public Service Values, Probity in Governance, Case Studies',
          highYieldWeightage: 'High scoring swing: practical, balanced administrative case study solutions score 120+.',
        },
        {
          subject: 'Optional Subject (Paper VI & Paper VII)',
          section: 'Two Papers of 250 marks each (Selected Subject)',
          questionsAsked: 'Section A & Section B per paper',
          questionsToAttempt: '5 Questions per paper out of 8',
          marksPerQuestion: '20, 15, 10 Marks',
          negativeMark: 'Standard evaluation',
          totalMarks: 500,
          syllabusScope: 'Public Administration, Political Science, Geography, History, Sociology, Tamil Literature, etc.',
          highYieldWeightage: 'The single most decisive academic factor: target 280-310+ out of 500.',
        },
      ],
      totalCalculatedMarks: 1750,
      scoringStrategy: [
        'Secure 290+ in Optional Papers: your chosen optional subject forms the foundation of a top-100 merit rank.',
        'Target 130+ in Essay and 115+ in Ethics (GS IV); these two papers possess the highest scoring elasticity.',
        'In GS Papers I-III, master structured answer presentation with neat conceptual diagrams, relevant articles, and case laws.',
      ],
    },
    eligibilityAndCutoffs: {
      academicPrerequisite: 'Must hold a Bachelor’s Degree from any recognized university established by an Act of Parliament or declared to be deemed as a university under Section 3 of UGC Act. Final year students appearing for their degree examination are eligible to sit for the Preliminary Examination.',
      ageLimitRule: 'General / EWS: 21 to 32 Years (6 Attempts) | OBC: 21 to 35 Years (9 Attempts) | SC / ST: 21 to 37 Years (Unlimited Attempts till age limit) | PwD: Up to 42 Years. Age reckoned as of August 1st of the exam year.',
      officialStatutoryNote: 'Statutory Reference: UPSC Civil Services Examination Rules notified annually by DoPT, Government of India.',
      cutoffsDistinctionExplanation: 'QUALIFYING VS MERIT CUTOFFS: Prelims GS Paper I cutoff (typically 75-88 marks out of 200 depending on paper difficulty) qualifies ~13,000 candidates for Mains. Mains cutoff (around 730-750 out of 1,750 marks) qualifies ~2,800 candidates for Interview. The final cumulative cutoff for recommendation to service (out of 2,025 marks) typically hovers around 950-1,010 marks.',
      categories: [
        {
          categoryName: 'General / Unreserved (UR)',
          code: 'UR / General',
          reservationPercentage: 'Open Merit (~40.5%)',
          qualifyingCriteria: 'Prelims GS1 Score (CSAT 33% Qualifying)',
          recentQualifyingCutoff: 'Prelims: 75.41 - 88.22 Marks | Mains: ~740 Marks',
          typicalAllotmentSafeScore: '985+ / 2,025 for IAS (Top 80 CRL Rank)',
          maxAttemptsOrAge: 'Max 6 Attempts | Age 21 to 32 Years',
          notes: 'Every mark counts: the gap between IAS and non-allocation is often under 35 marks.',
        },
        {
          categoryName: 'Economically Weaker Sections (EWS)',
          code: 'GEN-EWS',
          reservationPercentage: '10% Central Reservation',
          qualifyingCriteria: 'Prelims GS1 Score',
          recentQualifyingCutoff: 'Prelims: 68.02 - 82.83 Marks | Mains: ~705 Marks',
          typicalAllotmentSafeScore: '950+ / 2,025 for service recommendation',
          maxAttemptsOrAge: 'Max 6 Attempts | Age 21 to 32 Years',
          notes: 'Mandatory valid Income and Asset Certificate for current financial year.',
        },
        {
          categoryName: 'Other Backward Classes (OBC-NCL)',
          code: 'OBC-NCL',
          reservationPercentage: '27% Central Reservation',
          qualifyingCriteria: 'Prelims GS1 Score',
          recentQualifyingCutoff: 'Prelims: 74.75 - 87.54 Marks | Mains: ~712 Marks',
          typicalAllotmentSafeScore: '960+ / 2,025 for IAS recommendation',
          maxAttemptsOrAge: 'Max 9 Attempts | Age 21 to 35 Years',
          notes: 'Non-Creamy Layer verification as per Central OBC list.',
        },
        {
          categoryName: 'Scheduled Castes (SC)',
          code: 'SC',
          reservationPercentage: '15% Central Reservation',
          qualifyingCriteria: 'Prelims GS1 Score',
          recentQualifyingCutoff: 'Prelims: 59.25 - 74.08 Marks | Mains: ~695 Marks',
          typicalAllotmentSafeScore: '920+ / 2,025 for service recommendation',
          maxAttemptsOrAge: 'Unlimited Attempts till age 37 Years',
          notes: 'Substantial age relaxation and complete examination fee exemption.',
        },
        {
          categoryName: 'Scheduled Tribes (ST)',
          code: 'ST',
          reservationPercentage: '7.5% Central Reservation',
          qualifyingCriteria: 'Prelims GS1 Score',
          recentQualifyingCutoff: 'Prelims: 47.82 - 69.35 Marks | Mains: ~690 Marks',
          typicalAllotmentSafeScore: '915+ / 2,025 for service recommendation',
          maxAttemptsOrAge: 'Unlimited Attempts till age 37 Years',
          notes: 'Reserved allocations across all All-India and Central Services.',
        },
        {
          categoryName: 'Persons with Benchmark Disabilities (PwBD)',
          code: 'PwBD 1 / 2 / 3 / 5',
          reservationPercentage: '4% Horizontal Reservation',
          qualifyingCriteria: 'Prelims GS1 Score',
          recentQualifyingCutoff: 'Prelims: 40.40 - 58.00 Marks depending on sub-category',
          typicalAllotmentSafeScore: '870 - 920+ / 2,025 Marks',
          maxAttemptsOrAge: 'Max 9 Attempts (Gen/OBC) | Age up to 42 Years',
          notes: 'Compensatory time and scribe assistance provided as per statutory guidelines.',
        },
      ],
    },
    timeManagement: {
      modeDescription: 'Prelims is conducted in Pen & Paper (OMR) mode (two 2-hour papers). Mains is a rigorous physical handwritten test: 9 subjective papers, each 3 hours long, requiring an average writing speed of 25 to 28 words per minute continuously.',
      recommendedTimePerQuestion: 'Prelims GS1: 65 seconds per question | Mains 10-marker: 7 minutes | Mains 15-marker: 11 minutes.',
      tacticalPacingStrategy: [
        {
          round: 'Prelims Round 1 (0 to 50 mins)',
          title: 'Direct Knowledge Sweep',
          durationAllocated: '50 Minutes',
          actionPlan: 'Solve questions where you are 100% certain of the answer. Bubble on the OMR sheet immediately. Target: 35-40 solid questions.',
        },
        {
          round: 'Prelims Round 2 (50 to 95 mins)',
          title: 'Logical Elimination Sweep',
          durationAllocated: '45 Minutes',
          actionPlan: 'Examine questions where you eliminated 2 options. Apply deep analytical context, constitutional logic, and negative marking caution.',
        },
        {
          round: 'Prelims Round 3 (95 to 120 mins)',
          title: 'Review & Count Audit',
          durationAllocated: '25 Minutes',
          actionPlan: 'Confirm your total attempt count (typically 78 to 86 questions). Avoid desperate last-minute guesses that trigger -0.66 penalties.',
        },
        {
          round: 'Mains 3-Hour Clock Discipline',
          title: 'Rigorous 20-Question Completion',
          durationAllocated: '180 Minutes',
          actionPlan: 'Spend 7 minutes per 10-mark question (10 Qs = 70 mins) and 11 minutes per 15-mark question (10 Qs = 110 mins). Never leave any question blank.',
        },
      ],
      negativeMarkingMitigation: [
        'Strict 1/3rd Rule in Prelims: An incorrect answer negates 33% of a correct answer’s score. Do not guess on topics you have never read.',
        'CSAT Caution: CSAT has become increasingly complex (advanced permutations, number systems, and comprehension). Allocate 80 minutes to math/logic and 40 minutes to comprehension.',
        'Mains Answer Real Estate: Stay within designated question-cum-answer booklet (QCAB) boundaries to prevent commission penalties.',
      ],
    },
    curriculum: [
      {
        subjectName: 'History, Heritage & International Relations',
        icon: 'museum',
        totalChapters: 30,
        totalHours: 240,
        chapters: [
          {
            title: 'Ancient, Medieval & Indian Heritage',
            subtopics: ['Indus Valley Architecture & Town Planning', 'Buddhism, Jainism & Vedic Philosophical Schools', 'Temple Architecture: Dravida, Nagara & Vesara Styles', 'Bhakti & Sufi Movements, Indo-Islamic Art', 'Mughal & Maratha Administrative Systems'],
            weightageLevel: 'Core Standard',
            estimatedHours: 60,
          },
          {
            title: 'Modern Indian History & National Movement',
            subtopics: ['British Expansion: Subsidiary Alliance & Doctrine of Lapse', 'Economic Drain Theory, De-industrialization & Famines', '1857 Revolt & 19th Century Social Reform Movements', 'Gandhian Mass Movements (Non-Cooperation, Civil Disobedience, Quit India)', 'Tribal & Peasant Movements, Revolutionary Nationalists', 'Post-Independence Consolidation & Reorganization of States'],
            weightageLevel: 'High Yield',
            estimatedHours: 70,
          },
          {
            title: 'International Relations & Global Geopolitics',
            subtopics: ['India and its Neighborhood Relations (Borders, Treaties)', 'Bilateral, Regional and Global Groupings (Quad, BRICS, SCO, G20)', 'Effect of Policies of Developed and Developing Nations on India', 'Indian Diaspora Dynamics and Soft Power Diplomacy', 'Important International Institutions: UN, WTO, IMF, World Bank, FATF'],
            weightageLevel: 'High Yield',
            estimatedHours: 65,
          },
        ],
      },
      {
        subjectName: 'Governance, Constitution & Polity',
        icon: 'gavel',
        totalChapters: 26,
        totalHours: 220,
        chapters: [
          {
            title: 'Constitutional Framework & Federalism',
            subtopics: ['Historical Underpinnings, Evolution & Preamble Philosophy', 'Fundamental Rights (Articles 14 to 32) & Judicial Interpretations', 'Directive Principles of State Policy & Fundamental Duties', 'Federal Structure, Centre-State Relations (Legislative, Administrative, Financial)', 'Emergency Provisions & Interstate River Water Disputes'],
            weightageLevel: 'High Yield',
            estimatedHours: 75,
          },
          {
            title: 'Executive, Legislature & Independent Bodies',
            subtopics: ['President, Prime Minister, Council of Ministers & Cabinet Committees', 'Parliamentary Procedures, Committees & Decline of Legislative Debate', 'Supreme Court Collegium, Judicial Review & Judicial Activism', 'Statutory, Regulatory & Quasi-Judicial Bodies (ECI, CAG, UPSC, NCSC/NCST)', 'Civil Services in a Democracy: Role, Reforms & Accountability'],
            weightageLevel: 'High Yield',
            estimatedHours: 75,
          },
          {
            title: 'Social Justice & Welfare Governance',
            subtopics: ['Welfare Schemes for Vulnerable Sections & Performance Assessment', 'Issues Relating to Development and Management of Health, Education & Human Resources', 'Issues Relating to Poverty, Hunger & Multidimensional Poverty Index', 'Role of Civil Society, NGOs, SHGs, and Charities in Governance'],
            weightageLevel: 'Core Standard',
            estimatedHours: 45,
          },
        ],
      },
      {
        subjectName: 'Economy, Environment & Internal Security',
        icon: 'trending_up',
        totalChapters: 28,
        totalHours: 230,
        chapters: [
          {
            title: 'Indian Economy & Agricultural Systems',
            subtopics: ['Issues Relating to Planning, Mobilization of Resources, Growth & Employment', 'Government Budgeting & Fiscal Deficit Management', 'Major Crops & Cropping Patterns in India, Irrigation Systems', 'Issues Related to Direct and Indirect Farm Subsidies and Minimum Support Prices (MSP)', 'Food Processing and Related Industries in India, Supply Chain Management'],
            weightageLevel: 'High Yield',
            estimatedHours: 75,
          },
          {
            title: 'Environment, Biodiversity & Disaster Resilience',
            subtopics: ['Conservation, Environmental Pollution & Degradation (Air, Water, Plastic)', 'Environmental Impact Assessment (EIA)', 'Climate Change Negotiations: UNFCCC COPs, Paris Agreement & India’s NDC Commitments', 'Disaster Management: Mechanisms, Law (NDMA), and Community Preparedness'],
            weightageLevel: 'High Yield',
            estimatedHours: 60,
          },
          {
            title: 'Internal Security & Science & Technology',
            subtopics: ['Linkages Between Development and Spread of Extremism (LWE)', 'Role of External State and Non-State Actors in Creating Challenges to Internal Security', 'Cyber Security Basics, Social Media and Internal Security Challenges', 'Money Laundering and its Prevention', 'Security Forces and Their Mandate (CAPF, Armed Forces, NIA)'],
            weightageLevel: 'High Yield',
            estimatedHours: 55,
          },
        ],
      },
    ],
    learningJourney: [
      {
        stageNumber: 1,
        phaseTitle: 'Phase 1: Foundational NCERT & Core Canonical Texts',
        timeline: 'Months 1 to 4',
        academicObjective: 'Read and consolidate canonical texts: NCERTs (Class 6-12), Laxmikanth (Polity), Spectrum (Modern History), and GC Leong (Geography).',
        pedagogicalFocus: [
          'Read every foundational text with a focus on historical causality and constitutional principles.',
          'Daily 45-minute national newspaper analysis (The Hindu / Indian Express).',
          'Learn to take concise, micro-topic digital or physical index notes.',
        ],
        assessmentMilestone: 'Weekly 50-Question NCERT Benchmark Tests.',
        keyDeliverable: 'Comprehensive static foundational summary notebooks.',
      },
      {
        stageNumber: 2,
        phaseTitle: 'Phase 2: Optional Subject Mastery & GS Advanced Convergence',
        timeline: 'Months 5 to 8',
        academicObjective: 'Complete 100% of the Optional Subject syllabus (Papers I & II) and build deep interdisciplinary linkages with General Studies.',
        pedagogicalFocus: [
          'Intensive optional lectures, theoretical frameworks, and scholar opinions.',
          'Introduction to Mains answer writing: writing 2 questions daily with timed self-review.',
          'Ethics GS IV theory and practical administrative case study frameworks.',
        ],
        assessmentMilestone: 'Full-length 250-mark Optional Subject Sectional Tests.',
        keyDeliverable: 'Finished Optional Subject master answers for 80% of repeating themes.',
      },
      {
        stageNumber: 3,
        phaseTitle: 'Phase 3: Prelims Intensive Test Series & CSAT Mastery',
        timeline: 'Months 9 to 11 (Jan to May)',
        academicObjective: 'Shift exclusively to objective elimination, high-yield current affairs revision, and rigorous CSAT mental math practice.',
        pedagogicalFocus: [
          'Solve 45 full-length Prelims mock tests with detailed option deconstruction.',
          'Daily CSAT practice for 90 minutes to ensure clearing the 66-mark barrier with ease.',
          'Review 20 years of UPSC Prelims past questions to understand commission trap phrasing.',
        ],
        assessmentMilestone: 'National Level All-India Proctored Prelims Simulations.',
        keyDeliverable: 'Master Prelims cheat sheet: constitutional articles, environmental conventions, wildlife sanctuaries, and economic formulas.',
      },
      {
        stageNumber: 4,
        phaseTitle: 'Phase 4: Mains Answer-Writing Boot Camp & Personality Mentoring',
        timeline: 'Post-Prelims (June to September)',
        academicObjective: 'Write 2 full Mains papers weekly, master diagrammatic speed, and prepare for the Dholpur House interview.',
        pedagogicalFocus: [
          'Simulated 5-day continuous Mains test series under exact UPSC timetable.',
          'Detailed script critique by retired civil servants and senior academic mentors.',
          'Detailed Application Form (DAF) deconstruction and mock interview panels with video feedback.',
        ],
        assessmentMilestone: 'Full UPSC Mains Simulation Series.',
        keyDeliverable: 'Flawless mental readiness to secure single/double-digit All-India Ranks.',
      },
    ],
    studentApproach: [
      {
        pillarNumber: '01',
        title: 'Editorial & Policy Analysis Circle',
        tagline: 'Moving beyond passive headline reading.',
        description: 'Daily faculty-led discussion on national editorials, translating policy decisions into multi-dimensional pros, cons, and constitutional safeguards.',
        icon: 'newspaper',
      },
      {
        pillarNumber: '02',
        title: 'Disciplined Daily Answer Writing (DAW)',
        tagline: 'Mains is won through the pen, not just the eyes.',
        description: 'Students write 2 questions daily which are evaluated by mentors within 24 hours, focusing on structural coherence and administrative maturity.',
        icon: 'edit_note',
      },
      {
        pillarNumber: '03',
        title: 'Dedicated CSAT Quantitative Laboratory',
        tagline: 'Never let CSAT derail your civil service dream.',
        description: 'Specialized faculty guiding students through number systems, permutations, and analytical reading to conquer the modern qualifying CSAT difficulty.',
        icon: 'calculate',
      },
      {
        pillarNumber: '04',
        title: 'Optional Subject Specialization Cells',
        tagline: 'Securing the 300+ mark optional cushion.',
        description: 'Dedicated faculty cells for Public Administration, Tamil Literature, Geography, History, and PSIR with complete syllabus notes.',
        icon: 'library_books',
      },
      {
        pillarNumber: '05',
        title: 'Case Study & Ethics Workshop',
        tagline: 'Cultivating emotional intelligence and integrity.',
        description: 'Weekly interactive workshops resolving real administrative case studies involving communal tension, disaster relief, and ethical dilemmas.',
        icon: 'balance',
      },
      {
        pillarNumber: '06',
        title: 'Retired Civil Servants Advisory Board',
        tagline: 'Direct wisdom from those who led the nation.',
        description: 'Regular interactive seminars and mock interview panels with retired IAS, IPS, and IFS officers guiding candidate temperament and poise.',
        icon: 'military_tech',
      },
      {
        pillarNumber: '07',
        title: '24/7 Academic Reading Hall & Library',
        tagline: 'An environment of undistracted scholarly focus.',
        description: 'Ergonomic study cubicles, complete access to digital research journals (EPW, Yojana, Kurukshetra), and high-speed research terminals.',
        icon: 'local_library',
      },
      {
        pillarNumber: '08',
        title: 'Psychological Endurance & Stress Resilience',
        tagline: 'Nurturing balance through a multi-year journey.',
        description: 'One-on-one psychological counseling, mindful study habits, and personal check-ins to prevent burnout during extended preparation phases.',
        icon: 'self_improvement',
      },
    ],
    institutionalStrengths: [
      {
        title: 'Distinguished Civil Services Alumni',
        description: 'Compete Academy candidates have entered IAS, IPS, IRS, and allied central civil services with exemplary ethical reputations.',
        metric: '75+ Officers in Service',
      },
      {
        title: 'Rigorous Mains Evaluation Matrix',
        description: 'Detailed 8-parameter scoring rubrics covering introduction, conceptual accuracy, arguments, schematics, and policy conclusions.',
        metric: '48-Hour Script Turnaround',
      },
      {
        title: 'Elite Mock Interview Boards',
        description: 'Mock interview boards featuring former Union Secretaries, DGP-rank police officers, and eminent behavioral psychologists.',
        metric: '100% Realistic Boards',
      },
    ],
    careerOpportunities: [
      {
        roleOrDegree: 'Indian Administrative Service (IAS)',
        institutionOrCadre: 'Cabinet Secretariat & State Government Cadres',
        description: 'The pinnacle of civil service: District Collector, Sub-Divisional Magistrate, State Department Secretary, and Union Cabinet Secretary.',
        futureScope: 'Unmatched scope to shape national economic policy, manage public infrastructure, and direct developmental governance.',
      },
      {
        roleOrDegree: 'Indian Police Service (IPS)',
        institutionOrCadre: 'Ministry of Home Affairs & State Police Forces',
        description: 'Leadership of law enforcement, intelligence agencies (IB, RAW), central investigative agencies (CBI, NIA), and paramilitary forces (CRPF, BSF).',
        futureScope: 'Critical national security command, cybercrime defense, and premier policing leadership.',
      },
      {
        roleOrDegree: 'Indian Foreign Service (IFS)',
        institutionOrCadre: 'Ministry of External Affairs',
        description: 'Diplomatic representation of India across embassies, high commissions, permanent missions to the United Nations, and bilateral treaties.',
        futureScope: 'Shaping India’s strategic foreign policy, international trade negotiations, and global multilateral diplomacy.',
      },
      {
        roleOrDegree: 'Indian Revenue Service (IRS - Income Tax & Customs)',
        institutionOrCadre: 'Ministry of Finance',
        description: 'Administration of direct and indirect taxation (GST), fiscal compliance, enforcement against financial economic offenses (ED).',
        futureScope: 'Pivotal role in mobilizing national revenue, international corporate tax arbitration, and anti-money-laundering governance.',
      },
    ],
    connectedResourceFilter: 'upsc',
    faqs: [
      {
        question: 'How many years does it realistically take to clear UPSC Civil Services?',
        answer: 'Because of the multi-stage format (Prelims in May/June, Mains in September, Interviews spanning January to April), one full examination cycle takes an entire year. Most dedicated aspirants spend 1 year in foundational preparation followed by 1 year of active testing. With structured guidance, many students clear in their very first or second attempt.',
      },
      {
        question: 'How do I choose the best Optional Subject for UPSC Mains?',
        answer: 'The choice of optional should be based on three criteria: genuine academic interest, availability of comprehensive study material and mentorship, and overlap with General Studies. Popular options at Compete Academy include Tamil Literature (high scoring, concise syllabus), Public Administration, Political Science, Geography, and History.',
      },
      {
        question: 'Why has CSAT Paper II become such a significant barrier for aspirants recently?',
        answer: 'In recent years, the UPSC CSAT mathematics section has shifted toward higher-level number theory, permutations, combinations, and analytical reasoning questions comparable to CAT examination levels. Even candidates with strong engineering backgrounds have fallen short of the 66-mark qualifying threshold. We treat CSAT with equal importance from Month 1.',
      },
      {
        question: 'Does writing the exam in Tamil Medium affect marks or interview scores?',
        answer: 'Not at all. UPSC permits candidates to write the Main examination and attend the Personality Test in any of the 22 languages listed in the Eighth Schedule of the Constitution, including Tamil. The commission evaluates conceptual depth, balanced analysis, and administrative maturity, regardless of the medium of expression.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 05. SCHOOL COACHING — FOUNDATION CLASSES 6–12
  // --------------------------------------------------------------------------
  school: {
    id: 'prog-school-05',
    programCode: 'school',
    title: 'School Academic Excellence & Foundation Coaching (Classes 6–12)',
    shortName: '05. Foundation Classes',
    badge: 'CBSE, ICSE & Tamil Nadu State Board Integrated Foundation',
    targetAudience: 'Middle School, High School & Senior Secondary Students (Classes 6th to 12th)',
    headline: 'Great Futures Begin with Strong Foundations. We pave the way.',
    heroBranding: {
      primarySlogan: 'Great Futures Begin with Strong Foundations.',
      supportingLine: 'We pave the way.',
      supportingDescription: 'Understand the basics. Build confidence. Become future-ready.',
    },
    introduction: {
      heroStatement:
        'Understand the basics. Build confidence. Become future-ready. We nurture conceptual clarity, scientific curiosity, and mathematical reasoning from Classes 6 to 12 for lifelong academic excellence.',
      purpose: 'The Foundation Classes program at Compete Academy provides structured, age-appropriate academic mentorship for students in Classes 6th through 12th. It is meticulously designed to achieve dual excellence: securing 95%+ marks in CBSE, ICSE, and Tamil Nadu State Board school examinations while simultaneously building the analytical problem-solving foundation required for future success in NEET, JEE, Olympiads, NTSE, and Civil Services.',
      examinationReality: 'Traditional school education often encourages superficial rote memorization of textbook questions, creating a severe cognitive shock when students encounter high-order application problems in Class 11 and 12 competitive examinations. Students who build algebraic intuition, scientific curiosity, and verbal precision early in Classes 6-10 navigate future competitive entrance exams with remarkable ease.',
      strategicImperative: 'True academic capability develops through progressive intellectual stages. Middle school students need conceptual wonder and spatial reasoning; high school students require mathematical proof discipline and scientific lab rigor; and senior secondary students need board-competitive synchronization.',
      competeAcademyPhilosophy:
        'We reject cramming. We teach science through physical demonstrations, mathematics through first-principles visual proofs, and language through active essay articulation so every student develops independent learning habits, scientific temper, and lasting self-confidence.',
    },
    examination: {
      examName: 'School Board Examinations & Scholastic Olympiads',
      conductingAuthority: 'Central Board of Secondary Education (CBSE) / Tamil Nadu State Board (DGE) / Olympiad Bodies (SOF, HBCSE, SilverZone)',
      authorityFull: 'Aligned with National Curriculum Framework (NCF) & National Education Policy (NEP 2020)',
      annualCadence: 'Continuous Comprehensive Assessment + Annual Board Exams (Classes 10 & 12)',
      examMode: 'Dual Mode (Board + Competitive Drills)',
      totalMarks: 100, // Standard school subject paper marks
      totalQuestions: 38, // Standard board question structure
      durationMinutes: 180, // 3 hours board paper
      negativeMarkingRule: 'No negative marking in school board examinations; negative marking introduced systematically in internal Olympiad drills (+3 / -1 format).',
      officialSourceTitle: 'CBSE & TN DGE Official Academic Curricula',
      officialSourceUrl: 'https://cbseacademic.nic.in/',
      examYear: '2025 / 2026',
      verifiedDate: 'November 2026',
      stages: [
        {
          stageNumber: 1,
          name: 'Middle School Explorer (Classes 6th to 8th)',
          shortCode: 'Junior-Foundation',
          type: 'Dual Mode (Board + Competitive Drills)',
          duration: 'Academic Year Program',
          totalMarks: 'Continuous Comprehensive Evaluation',
          nature: 'Qualifying',
          description: 'Focus on experiential science, mental arithmetic, logical reasoning puzzles, and English/Tamil expressive writing.',
        },
        {
          stageNumber: 2,
          name: 'High School Pre-Competitive Core (Classes 9th & 10th)',
          shortCode: 'Senior-Foundation',
          type: 'Dual Mode (Board + Competitive Drills)',
          duration: 'Academic Year Program with Class 10 Board Drills',
          totalMarks: 'Board 100 Marks per Subject + Olympiads',
          nature: 'Merit Ranking',
          description: 'Intensive NCERT mastery in Mathematics and Science, Olympiad level problem solving (PRMO/IOQM, NSO, IMO), and Class 10 Board distinction.',
        },
        {
          stageNumber: 3,
          name: 'Senior Secondary Career Bridge (Classes 11th & 12th)',
          shortCode: 'Career-Bridge',
          type: 'Dual Mode (Board + Competitive Drills)',
          duration: 'Two-Year Intensive Stream Program',
          totalMarks: 'Class 12 Board + Competitive Mock Series',
          nature: 'Merit Ranking',
          description: 'Rigorous synchronization of Physics, Chemistry, Mathematics/Biology with board syllabus alongside parallel NEET/JEE preparation.',
        },
      ],
    },
    marksDistribution: {
      overview: 'Our Foundation program bridges the school board examination format (80 marks Theory + 20 marks Internal Assessment) with competitive objective testing formats (100-mark OMR drills with negative marking).',
      rows: [
        {
          subject: 'Mathematics (Algebra, Geometry & Arithmetic)',
          section: 'Board Theory (80 Marks) + Mental Ability (20 Marks)',
          questionsAsked: '38 Board Questions + 25 Objective Drill Qs',
          questionsToAttempt: 'All Compulsory',
          marksPerQuestion: '1, 2, 3, 5 Marks (Board) & 4 Marks (Olympiad)',
          negativeMark: 'Board: 0 | Olympiad: -1',
          totalMarks: 100,
          syllabusScope: 'Linear Equations, Polynomials, Triangles & Circles proofs, Trigonometry, Coordinate Geometry, Statistics',
          highYieldWeightage: 'Geometry proofs and Algebraic factorization build essential high school analytical muscle.',
        },
        {
          subject: 'Science (Physics, Chemistry & Biology)',
          section: 'Board Theory (80 Marks) + Practical Lab Skills (20 Marks)',
          questionsAsked: '39 Board Questions + 25 Objective Drill Qs',
          questionsToAttempt: 'All Compulsory',
          marksPerQuestion: '1, 2, 3, 5 Marks',
          negativeMark: 'Board: 0 | Olympiad: -1',
          totalMarks: 100,
          syllabusScope: 'Motion, Force, Gravitation, Electricity, Chemical Reactions, Carbon Compounds, Life Processes, Heredity',
          highYieldWeightage: 'Deep conceptual explanations in Physics and Chemical Equation balancing account for top grades.',
        },
        {
          subject: 'Mental Ability & Logical Reasoning (MAT)',
          section: 'Scholastic Aptitude & Olympiad Section',
          questionsAsked: '50 Objective Questions',
          questionsToAttempt: '50 Questions',
          marksPerQuestion: 2,
          negativeMark: '-0.5 mark in Olympiad simulations',
          totalMarks: 100,
          syllabusScope: 'Number series, Coding-Decoding, Venn diagrams, Syllogisms, Cube folding, Direction sense tests',
          highYieldWeightage: 'Develops cognitive intelligence required for NTSE, Olympiads, and future entrance tests.',
        },
      ],
      totalCalculatedMarks: 300,
      scoringStrategy: [
        'Secure 100% in school board internals by maintaining pristine project records and practical lab performance.',
        'In Mathematics, master structured step-by-step theorem proofs: neat geometric diagrams and stated axioms yield full marks.',
        'Daily 20-minute mental math drills to eliminate calculation dependence on calculators or paper margins.',
      ],
    },
    eligibilityAndCutoffs: {
      academicPrerequisite: 'Open to students currently studying in or entering Classes 6th, 7th, 8th, 9th, 10th, 11th, or 12th in any recognized school board (CBSE, ICSE, Tamil Nadu State Board / Matriculation, or International Curricula). Admission is based on the Compete Academy Diagnostic Aptitude Test.',
      ageLimitRule: 'Age corresponds to standard school grade progression (typically 11 years for Class 6 up to 17-18 years for Class 12).',
      officialStatutoryNote: 'Statutory Reference: NCERT Curriculum Guidelines & Ministry of Education School Education Benchmarks.',
      cutoffsDistinctionExplanation: 'DIAGNOSTIC BENCHMARKING: In Foundation classes, we do not reject students based on arbitrary cutoffs. Every child takes our Diagnostic Learning Gap Assessment, which identifies specific conceptual gaps from earlier grades so we can bridge them systematically.',
      categories: [
        {
          categoryName: 'Classes 6th to 8th (Junior Foundation)',
          code: 'Grades 6-8',
          reservationPercentage: 'Open to all school aspirants',
          qualifyingCriteria: 'Compete Diagnostic Learning Assessment',
          recentQualifyingCutoff: 'Basic conceptual baseline',
          typicalAllotmentSafeScore: 'Target: 90%+ in school term examinations',
          maxAttemptsOrAge: 'Standard school age (11 - 13 Years)',
          notes: 'Focus on nurturing curiosity, verbal clarity, and enjoyment of mathematics.',
        },
        {
          categoryName: 'Classes 9th & 10th (Pre-Competitive Foundation)',
          code: 'Grades 9-10',
          reservationPercentage: 'Open to all school aspirants',
          qualifyingCriteria: 'Science & Math Diagnostic Evaluation',
          recentQualifyingCutoff: 'Intermediate analytical readiness',
          typicalAllotmentSafeScore: 'Target: 95%+ in Class 10 Board Examinations',
          maxAttemptsOrAge: 'Standard school age (14 - 15 Years)',
          notes: 'Direct foundation for future NEET/JEE streams and Olympiad participation.',
        },
        {
          categoryName: 'Classes 11th & 12th (Board & Entrance Bridge)',
          code: 'Grades 11-12',
          reservationPercentage: 'Science & Arts Tracks',
          qualifyingCriteria: 'Class 10 Board Performance + Aptitude Review',
          recentQualifyingCutoff: 'Consistent academic record',
          typicalAllotmentSafeScore: 'Target: 95%+ Board + 99th Percentile Entrance',
          maxAttemptsOrAge: 'Standard school age (16 - 18 Years)',
          notes: 'Full synchronization between board exams and national competitive entrance syllabi.',
        },
      ],
    },
    timeManagement: {
      modeDescription: 'School examinations require clear, structured subjective answer writing, whereas competitive tests demand rapid objective elimination. Our training balances both writing formats through dual-track assessments.',
      recommendedTimePerQuestion: 'Board 1-marker: 1.5 mins | Board 3-marker: 5 mins | Board 5-marker: 9 mins | Olympiad MCQ: 60 seconds.',
      tacticalPacingStrategy: [
        {
          round: 'Reading Time (First 15 mins)',
          title: 'Paper Scanning & Question Selection',
          durationAllocated: '15 Minutes',
          actionPlan: 'Review all questions on the board examination paper. Select optional choices in Section D/E and mark direct questions for immediate answering.',
        },
        {
          round: 'Section A & B Execution',
          title: 'Objective & Short Answers',
          durationAllocated: '45 Minutes',
          actionPlan: 'Answer MCQs and 2-mark brief questions with neat, crisp handwriting and accurate units.',
        },
        {
          round: 'Section C & D Deep Dives',
          title: '3-Mark & 5-Mark Long Answers',
          durationAllocated: '90 Minutes',
          actionPlan: 'Write complete derivations, geometric proofs with clear pencil diagrams, and balanced chemical equations with state symbols.',
        },
        {
          round: 'Audit & Underline (Final 30 mins)',
          title: 'Final Revision & Highlighting',
          durationAllocated: '30 Minutes',
          actionPlan: 'Underline key scientific terms, box final numerical answers with units, and check for missing sub-parts.',
        },
      ],
      negativeMarkingMitigation: [
        'Board Theory Zero Penalties: In subjective board exams, always write the relevant formula and given data even if unsure of final answer; partial marking grants 50% credit.',
        'Olympiad Discipline: In SOF/HBCSE Olympiad tests where negative marking applies, teach students to skip uncertain questions rather than guess.',
        'Units Verification: Losing marks on missing units (cm vs m, seconds vs hours) is prevented through strict dimensional habits.',
      ],
    },
    curriculum: [
      {
        subjectName: 'Mathematics Foundation (6th to 12th)',
        icon: 'functions',
        totalChapters: 36,
        totalHours: 280,
        chapters: [
          {
            title: 'Arithmetic, Number Systems & Algebra',
            subtopics: ['Real Numbers, Euclid’s Lemma & Fundamental Theorem of Arithmetic', 'Polynomials, Remainder & Factor Theorems', 'Linear Equations in Two Variables & Graphical Solutions', 'Quadratic Equations & Nature of Roots', 'Arithmetic Progressions & Sum Formulas'],
            weightageLevel: 'High Yield',
            estimatedHours: 85,
          },
          {
            title: 'Geometry, Proofs & Coordinate Systems',
            subtopics: ['Lines and Angles Axioms & Parallel Lines Theorems', 'Triangles: Congruency & Similarity Theorems', 'Circles: Chords, Tangents & Angle Subtended Properties', 'Coordinate Geometry: Distance Formula, Section Formula & Collinearity'],
            weightageLevel: 'High Yield',
            estimatedHours: 95,
          },
          {
            title: 'Trigonometry, Mensuration & Statistics',
            subtopics: ['Trigonometric Ratios & Specific Angles (0, 30, 45, 60, 90)', 'Trigonometric Identities & Heights and Distances Applications', 'Surface Areas & Volumes of Combinations of Solids', 'Statistics: Mean, Median, Mode of Grouped Data & Probability'],
            weightageLevel: 'High Yield',
            estimatedHours: 100,
          },
        ],
      },
      {
        subjectName: 'Science & Physics/Chemistry/Biology Foundations',
        icon: 'biotech',
        totalChapters: 38,
        totalHours: 300,
        chapters: [
          {
            title: 'Physics Foundations & Experimental Mechanics',
            subtopics: ['Motion: Speed, Velocity, Acceleration & Distance-Time Graphs', 'Force & Laws of Motion, Momentum Conservation', 'Gravitation, Universal Law & Archimedes Principle', 'Work and Energy, Kinetic & Potential Energy Conservation', 'Light: Reflection & Refraction, Lens/Mirror Formulae', 'Electricity: Ohm’s Law, Resistance in Series/Parallel, Joules Heating'],
            weightageLevel: 'High Yield',
            estimatedHours: 110,
          },
          {
            title: 'Chemistry Foundations & Molecular Reactions',
            subtopics: ['Matter in Our Surroundings, Pure Substances & Mixtures', 'Atoms & Molecules, Dalton’s Theory, Valency & Formula Writing', 'Structure of the Atom, Thomson/Rutherford/Bohr Models', 'Chemical Reactions & Balancing Equations', 'Acids, Bases & Salts, pH Scale & Everyday Applications', 'Metals and Non-metals, Reactivity Series & Metallurgy', 'Carbon and its Compounds, Covalent Bonding & Functional Groups'],
            weightageLevel: 'High Yield',
            estimatedHours: 100,
          },
          {
            title: 'Biological Systems & Ecology',
            subtopics: ['Cell: Fundamental Unit of Life, Organelles & Functions', 'Tissues: Plant (Meristematic/Permanent) & Animal Tissues', 'Life Processes: Nutrition, Respiration, Transportation, Excretion', 'Control and Coordination: Nervous System & Plant Hormones', 'How do Organisms Reproduce: Asexual & Sexual Reproduction', 'Heredity & Mendel’s Experiments', 'Our Environment, Food Chains & Ozone Layer Depletion'],
            weightageLevel: 'High Yield',
            estimatedHours: 90,
          },
        ],
      },
      {
        subjectName: 'Aptitude, Logic & Communication Skills',
        icon: 'lightbulb',
        totalChapters: 20,
        totalHours: 140,
        chapters: [
          {
            title: 'Logical & Mathematical Reasoning',
            subtopics: ['Number and Alphabetical Series, Missing Characters', 'Coding-Decoding & Blood Relations', 'Venn Diagrams, Syllogisms & Logical Deductions', 'Direction Sense & Ranking Tests', 'Spatial Reasoning & Pattern Assembly'],
            weightageLevel: 'High Yield',
            estimatedHours: 70,
          },
          {
            title: 'Language, Comprehension & Public Speaking',
            subtopics: ['Grammar Foundations: Parts of Speech, Tenses, Voice', 'Critical Reading Comprehension & Analytical Summary', 'Formal Letter Writing, Analytical Essay Writing', 'Public Speaking & Presentation Workshops'],
            weightageLevel: 'Core Standard',
            estimatedHours: 70,
          },
        ],
      },
    ],
    foundationClassesData: {
      classGroups: [
        {
          groupLabel: 'Middle School Explorer',
          grades: 'Classes 6th, 7th & 8th',
          tagline: 'Fostering Inquisitive Curiosity, Mental Arithmetic & Science Experiments',
          objective: 'Cultivate a natural love for discovery, eliminate math anxiety, and build strong reading comprehension habits.',
          boardAlignment: '100% aligned with CBSE, ICSE, and TN State Board Samacheer Kalvi curricula.',
          subjects: [
            {
              subjectName: 'Foundational Mathematics',
              icon: 'calculate',
              totalChapters: 14,
              totalHours: 90,
              chapters: [
                { title: 'Numbers, Integers & Fractions', subtopics: ['Integers on Number Line', 'Fraction Operations', 'Decimals & Percentages'], weightageLevel: 'High Yield', estimatedHours: 30 },
                { title: 'Algebraic Thinking & Geometry', subtopics: ['Variables & Expressions', 'Simple Equations', 'Lines, Angles & Triangles'], weightageLevel: 'High Yield', estimatedHours: 35 },
                { title: 'Mensuration & Data Handling', subtopics: ['Perimeter & Area', 'Bar Graphs', 'Probability Basics'], weightageLevel: 'Core Standard', estimatedHours: 25 },
              ],
            },
            {
              subjectName: 'Experiential Science',
              icon: 'science',
              totalChapters: 16,
              totalHours: 95,
              chapters: [
                { title: 'Physics Fundamentals', subtopics: ['Motion & Measurement', 'Light, Shadows & Reflections', 'Electricity & Circuits'], weightageLevel: 'High Yield', estimatedHours: 35 },
                { title: 'Matter & Chemistry', subtopics: ['Separation of Substances', 'Changes Around Us', 'Acids, Bases & Salts'], weightageLevel: 'High Yield', estimatedHours: 30 },
                { title: 'Living World & Nature', subtopics: ['Getting to Know Plants', 'Body Movements', 'Habitat & Adaptations'], weightageLevel: 'Core Standard', estimatedHours: 30 },
              ],
            },
          ],
        },
        {
          groupLabel: 'High School Pre-Competitive Core',
          grades: 'Classes 9th & 10th',
          tagline: 'Board Distinction (95%+) Combined with Early NEET/JEE Orientation',
          objective: 'Master deep theoretical proofs, advanced multi-step numerical problem solving, and competitive Olympiad logic.',
          boardAlignment: 'Rigorous CBSE Board & Tamil Nadu State Board Class 10 alignment.',
          subjects: [
            {
              subjectName: 'Advanced High School Mathematics',
              icon: 'functions',
              totalChapters: 15,
              totalHours: 120,
              chapters: [
                { title: 'Real Numbers & Polynomials', subtopics: ['Euclid Division', 'Zeroes of Polynomials', 'Factorization Tricks'], weightageLevel: 'High Yield', estimatedHours: 35 },
                { title: 'Trigonometry & Geometry Proofs', subtopics: ['Trigonometric Identities', 'Circle Tangent Proofs', 'Similar Triangles'], weightageLevel: 'High Yield', estimatedHours: 45 },
                { title: 'Coordinate Geometry & Statistics', subtopics: ['Distance & Section Formulae', 'Grouped Data Mean/Median', 'Probability Laws'], weightageLevel: 'High Yield', estimatedHours: 40 },
              ],
            },
            {
              subjectName: 'Core Physical & Biological Sciences',
              icon: 'biotech',
              totalChapters: 16,
              totalHours: 130,
              chapters: [
                { title: 'Physics: Mechanics & Optics', subtopics: ['Laws of Motion', 'Gravitation & Floatation', 'Lenses, Mirrors & Human Eye'], weightageLevel: 'High Yield', estimatedHours: 48 },
                { title: 'Chemistry: Reactions & Carbon', subtopics: ['Balancing Equations', 'Metals & Non-Metals', 'Carbon Compounds & Functional Groups'], weightageLevel: 'High Yield', estimatedHours: 44 },
                { title: 'Biology: Physiology & Genetics', subtopics: ['Life Processes', 'Reproduction in Organisms', 'Heredity & Evolution'], weightageLevel: 'High Yield', estimatedHours: 38 },
              ],
            },
          ],
        },
        {
          groupLabel: 'Senior Secondary Career Bridge',
          grades: 'Classes 11th & 12th',
          tagline: 'Synchronized Board Mastery with High-Yield NEET & JEE Competitive Tracks',
          objective: 'Achieve 95%+ in Class 12 Higher Secondary Examinations while simultaneously preparing for top national percentiles in NEET or JEE.',
          boardAlignment: 'Full synchronization with CBSE Class 12 Board and Tamil Nadu +2 Higher Secondary Board.',
          subjects: [
            {
              subjectName: 'Senior Physics & Chemistry',
              icon: 'bolt',
              totalChapters: 30,
              totalHours: 220,
              chapters: [
                { title: 'Physics Mechanics & Electromagnetism', subtopics: ['Newtonian Mechanics', 'Electrostatics & Circuits', 'Modern Physics & Optics'], weightageLevel: 'High Yield', estimatedHours: 110 },
                { title: 'Physical, Inorganic & Organic Chemistry', subtopics: ['Thermodynamics & Equilibrium', 'Coordination Compounds', 'Organic Reaction Mechanisms'], weightageLevel: 'High Yield', estimatedHours: 110 },
              ],
            },
            {
              subjectName: 'Senior Mathematics / Biology',
              icon: 'psychology',
              totalChapters: 28,
              totalHours: 200,
              chapters: [
                { title: 'Calculus, Vectors & Algebra (Math Track)', subtopics: ['Differential & Integral Calculus', 'Vectors & 3D Geometry', 'Probability Distributions'], weightageLevel: 'High Yield', estimatedHours: 100 },
                { title: 'Genetics, Physiology & Ecology (Bio Track)', subtopics: ['Molecular Genetics', 'Human Physiology', 'Biotechnology Applications'], weightageLevel: 'High Yield', estimatedHours: 100 },
              ],
            },
          ],
        },
      ],
    },
    learningJourney: [
      {
        stageNumber: 1,
        phaseTitle: 'Phase 1: Conceptual Demystification & Diagnostic Bridge',
        timeline: 'Months 1 to 3',
        academicObjective: 'Identify and bridge prior-grade learning gaps; transition students from formula memorization to visual understanding.',
        pedagogicalFocus: [
          'Hands-on physical apparatus demonstrations for physics and chemistry laws.',
          'Visual geometric modeling of algebraic formulas ((a+b)^2, factorizations).',
          'Eliminate fear of asking questions in a supportive, small-group classroom.',
        ],
        assessmentMilestone: 'Diagnostic Milestone Review with individual parent consultation.',
        keyDeliverable: 'Personalized Diagnostic Progress Report outlining mastered concepts.',
      },
      {
        stageNumber: 2,
        phaseTitle: 'Phase 2: School Board Syllabus Consolidation',
        timeline: 'Months 4 to 7',
        academicObjective: 'Master 100% of school textbook concepts ahead of the school classroom schedule, guaranteeing top classroom performance.',
        pedagogicalFocus: [
          'Step-by-step subjective answer writing training for school examinations.',
          'Pristine notebook and assignment presentation standards.',
          'Regular unit tests formatted exactly like school midterm examinations.',
        ],
        assessmentMilestone: 'School Mid-Term Exam Distinction (90%+ cohort target).',
        keyDeliverable: 'Complete set of student-authored concept summaries.',
      },
      {
        stageNumber: 3,
        phaseTitle: 'Phase 3: Scholastic Olympiad & Critical Thinking Drills',
        timeline: 'Months 8 to 9',
        academicObjective: 'Expose students to high-order thinking skills (HOTS), Olympiad problems (SOF, IMO, NSO), and mental aptitude puzzles.',
        pedagogicalFocus: [
          'Solve non-routine mathematical puzzles requiring creative approaches.',
          'Multi-concept science application worksheets.',
          'Timed objective test drills to build early speed and accuracy.',
        ],
        assessmentMilestone: 'Intra-Academy Scholastic Olympiad Challenge.',
        keyDeliverable: 'Certificate of High-Order Analytical Problem Solving.',
      },
      {
        stageNumber: 4,
        phaseTitle: 'Phase 4: Annual Board & Final Examination Intensive',
        timeline: 'Months 10 to 12',
        academicObjective: 'Deliver flawless performance in school annual and board examinations (Class 10 & 12).',
        pedagogicalFocus: [
          '5 full-length simulated board examination papers under strict 3-hour supervision.',
          'Individual correction of handwriting, diagram labels, and mathematical step clarity.',
          'Stress-free confidence building and cognitive stamina sessions.',
        ],
        assessmentMilestone: 'School Annual & Board Examination 95%+ Distinction.',
        keyDeliverable: 'Confidence and analytical habits that last through higher education.',
      },
    ],
    studentApproach: [
      {
        pillarNumber: '01',
        title: 'Zero Rote Learning Guarantee',
        tagline: 'Understanding the underlying principle behind every formula.',
        description: 'We do not permit rote memorization. Whether it is Pythagoras theorem or Archimedes principle, students see physical proofs before writing formulas.',
        icon: 'psychology',
      },
      {
        pillarNumber: '02',
        title: 'Dual School & Competitive Tracking',
        tagline: 'Excellence in school today, leadership in entrance exams tomorrow.',
        description: 'Our curriculum ensures students top their school board exams while simultaneously building the analytical foundation needed for NEET and JEE.',
        icon: 'trending_up',
      },
      {
        pillarNumber: '03',
        title: 'Small Cohorts of Maximum 30 Students',
        tagline: 'No child is lost in the crowd.',
        description: 'Every student receives individual eye contact, active questioning opportunities, and dedicated doubt support from caring mentors.',
        icon: 'diversity_3',
      },
      {
        pillarNumber: '04',
        title: 'Experiential Hands-On Science Labs',
        tagline: 'Science learned through touch, sight, and experiment.',
        description: 'Weekly demonstrations with prisms, circuit kits, chemical indicators, and microscopic slides that turn abstract theory into living science.',
        icon: 'science',
      },
      {
        pillarNumber: '05',
        title: 'Daily Mental Arithmetic & Reading Circle',
        tagline: 'Building the fundamental pillars of human intelligence.',
        description: '15 minutes of daily rapid mental arithmetic and guided reading of science literature to develop verbal and quantitative clarity.',
        icon: 'auto_stories',
      },
      {
        pillarNumber: '06',
        title: 'Subjective Board Answer Precision',
        tagline: 'Mastering the art of writing full-mark board answers.',
        description: 'Special workshops on presentation: drawing margins, neat pencil diagrams, stating given values, and boxing final answers with SI units.',
        icon: 'edit_note',
      },
      {
        pillarNumber: '07',
        title: 'Empathetic Parent-Teacher Collaboration',
        tagline: 'Nurturing the child as a unified team.',
        description: 'Monthly face-to-face progress meetings with detailed qualitative feedback on student curiosity, emotional wellbeing, and conceptual growth.',
        icon: 'family_restroom',
      },
      {
        pillarNumber: '08',
        title: 'Olympiad & Early Talent Recognition',
        tagline: 'Discovering and encouraging early genius.',
        description: 'Dedicated coaching for PRMO/IOQM, National Science Olympiad (NSO), International Math Olympiad (IMO), and NTSE examinations.',
        icon: 'emoji_events',
      },
    ],
    institutionalStrengths: [
      {
        title: 'School Board Centum Consistency',
        description: 'Our foundation students consistently score Centum (100/100) in Mathematics and Science across CBSE and State Board Class 10 and 12 exams.',
        metric: '96.4% School Average',
      },
      {
        title: 'Dedicated Child Pedagogy Mentors',
        description: 'Patient, highly qualified teachers trained in adolescent psychology and modern interactive educational techniques.',
        metric: '100% Patient Pedagogues',
      },
      {
        title: 'Integrated Class 6-12 Pathway',
        description: 'A continuous, cohesive 7-year educational ecosystem ensuring smooth transitions without sudden academic shocks.',
        metric: '7-Year Unified Pathway',
      },
    ],
    careerOpportunities: [
      {
        roleOrDegree: 'Seamless Transition to NEET / JEE Advanced Mastery',
        institutionOrCadre: 'Top Medical & Engineering Institutions',
        description: 'Students who undergo foundational training enter Class 11 medical and engineering batches with superior problem-solving speed and zero anxiety.',
        futureScope: 'High probability of securing top 1,000 national ranks in NEET UG and JEE Advanced on their first attempt.',
      },
      {
        roleOrDegree: 'National Scholastic Olympiad Laureates',
        institutionOrCadre: 'HBCSE Olympiad Camps, International Olympiads',
        description: 'Representation in National Olympiads in Mathematics (INMO), Physics (INPhO), Chemistry (INChO), and Biology (INBO).',
        futureScope: 'Direct interview calls from Indian Statistical Institute (ISI), CMI Chennai, and elite global Ivy League institutions.',
      },
      {
        roleOrDegree: 'Strong Scholastic Foundation for Civil Services & Law',
        institutionOrCadre: 'National Law Universities (CLAT), UPSC Foundation',
        description: 'Early development of critical reading comprehension, general awareness, and structured essay writing.',
        futureScope: 'Exemplary preparation for future leadership in civil administration, constitutional law, and public service.',
      },
      {
        roleOrDegree: 'Board Examination School Topper Recognition',
        institutionOrCadre: 'CBSE & State Board Merit Lists',
        description: 'Securing top school honors in Class 10 and Class 12 board examinations, opening scholarship doors across universities.',
        futureScope: 'Prestige, institutional scholarships, and absolute academic confidence.',
      },
    ],
    connectedResourceFilter: 'school',
    faqs: [
      {
        question: 'Will enrolling in Foundation classes overburden my child alongside regular school homework?',
        answer: 'No. Our Foundation program is designed to harmonize with the school curriculum, not compete with it. We cover school textbook topics ahead of school lectures, which actually reduces the student’s daily homework stress because they understand classroom topics instantly. We also ensure homework load is manageable and focused on quality over quantity.',
      },
      {
        question: 'Which class is the best time to start Foundation coaching?',
        answer: 'Starting in Class 6 or 7 builds natural scientific curiosity and mental arithmetic speed without any examination pressure. However, starting in Class 8 or 9 is equally effective for building strong algebraic and physics foundations before entering the critical Class 10 board year and subsequent NEET/JEE streams.',
      },
      {
        question: 'How do you support a student who is weak in Mathematics?',
        answer: 'We begin with our Diagnostic Assessment to pinpoint the exact grade level where the conceptual misunderstanding began (often fractions, negative numbers, or basic algebraic variables). Our mentors provide dedicated 1-on-1 bridge sessions using visual manipulatives until the child regains confidence and smiles while solving math.',
      },
      {
        question: 'Do you cover both CBSE and Tamil Nadu State Board syllabi?',
        answer: 'Yes. We run parallel batches aligned specifically with CBSE and Tamil Nadu State Board (Samacheer Kalvi) textbooks, ensuring every student prepares with the exact textbook chapters, terminology, and question formats required by their school board.',
      },
    ],
  },
};
