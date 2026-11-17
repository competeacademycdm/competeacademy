import { Language } from './LanguageContext';

export const COURSE_NAMES_TA: Record<string, string> = {
  'NEET Medical': 'நீட் மருத்துவப் படிப்பு',
  'JEE Main & Advanced': 'ஜே.இ.இ பொறியியல்',
  'UPSC Civil Services': 'யு.பி.எஸ்.சி குடிமைப் பணிகள்',
  'TNPSC State Services': 'டி.என்.பி.எஸ்.சி அரசுப் பணிகள்',
  'Foundation Classes': 'அடிப்படைக் கல்வி (வகுப்புகள் 6–12)',
};

export const CATEGORY_NAMES_TA: Record<string, string> = {
  'pyq': 'முந்தைய ஆண்டு வினாத்தாள்கள்',
  'notes': 'ஆய்வுக் குறிப்புகள்',
  'mocks': 'விடைக்குறிப்புகள் & மாதிரித் தேர்வுகள்',
  'clinics': 'பாடத்திட்டம் & தகவல்',
  'Question Paper': 'முந்தைய ஆண்டு வினாத்தாள்',
  'Question Papers': 'முந்தைய ஆண்டு வினாத்தாள்கள்',
  'Study Materials': 'பாடக் குறிப்புகள்',
  'PDF Notes': 'பாடக் குறிப்புகள்',
  'Official Answer Key': 'அதிகாரப்பூர்வ விடைக்குறிப்பு',
  'Final Answer Key': 'இறுதி விடைக்குறிப்பு',
  'Answer Keys': 'விடைக்குறிப்புகள்',
  'Syllabus': 'அங்கீகரிக்கப்பட்ட பாடத்திட்டம்',
  'Syllabus & Info': 'பாடத்திட்டம் & தேர்வுத் தகவல்',
};

export const SUBJECT_NAMES_TA: Record<string, string> = {
  'Physics': 'இயற்பியல்',
  'Chemistry': 'வேதியியல்',
  'Biology': 'உயிரியல்',
  'Mathematics': 'கணிதம்',
  'Botany': 'தாவரவியல்',
  'Zoology': 'விலங்கியல்',
  'Science': 'அறிவியல்',
  'Social Science': 'சமூக அறிவியல்',
  'General Studies': 'பொது ஆய்வுகள்',
  'General Studies Paper 1': 'பொது ஆய்வுகள் தாள் 1',
  'General Studies Paper 2': 'பொது ஆய்வுகள் தாள் 2',
  'Indian Polity': 'இந்திய அரசியலமைப்பு',
  'History & Culture': 'வரலாறு & பண்பாடு',
  'Geography': 'புவியியல்',
  'Indian Economy': 'இந்தியப் பொருளாதாரம்',
  'Tamil': 'தமிழ்',
  'English': 'ஆங்கிலம்',
  'General Mental Ability': 'திறனறிவு & மனக்கணக்கு',
};

export const MEDIUM_NAMES_TA: Record<string, string> = {
  'English': 'ஆங்கில வழி',
  'Tamil': 'தமிழ் வழி',
  'Bilingual': 'இருமொழி வழி (தமிழ் & ஆங்கிலம்)',
};

export const CLASS_LEVELS_TA: Record<string, string> = {
  'Class 6': '6-ஆம் வகுப்பு',
  'Class 7': '7-ஆம் வகுப்பு',
  'Class 8': '8-ஆம் வகுப்பு',
  'Class 9': '9-ஆம் வகுப்பு',
  'Class 10': '10-ஆம் வகுப்பு',
  'Class 11': '11-ஆம் வகுப்பு',
  'Class 12': '12-ஆம் வகுப்பு',
};

export function localizeCourse(course: string, lang: Language): string {
  if (lang === 'EN') return course;
  return COURSE_NAMES_TA[course] || course;
}

export function localizeCategory(cat: string, lang: Language): string {
  if (lang === 'EN') return cat;
  return CATEGORY_NAMES_TA[cat] || cat;
}

export function localizeSubject(subj: string, lang: Language): string {
  if (lang === 'EN') return subj;
  return SUBJECT_NAMES_TA[subj] || subj;
}

export function localizeMedium(medium: string | null | undefined, lang: Language): string {
  if (!medium) return lang === 'TA' ? 'ஆங்கில வழி' : 'English';
  if (lang === 'EN') return medium;
  return MEDIUM_NAMES_TA[medium] || medium;
}

export function localizeClassLevel(level: string | null | undefined, lang: Language): string {
  if (!level) return '';
  if (lang === 'EN') return level;
  return CLASS_LEVELS_TA[level] || level;
}
