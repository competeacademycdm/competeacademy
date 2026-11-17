import { commonEn } from './en/common';
import { navigationEn } from './en/navigation';
import { homepageEn } from './en/homepage';
import { programmesEn } from './en/programmes';
import { resourcesEn } from './en/resources';
import { aboutEn } from './en/about';
import { formsEn } from './en/forms';
import { chatbotEn } from './en/chatbot';
import { footerEn } from './en/footer';

import { commonTa } from './ta/common';
import { navigationTa } from './ta/navigation';
import { homepageTa } from './ta/homepage';
import { programmesTa } from './ta/programmes';
import { resourcesTa } from './ta/resources';
import { aboutTa } from './ta/about';
import { formsTa } from './ta/forms';
import { chatbotTa } from './ta/chatbot';
import { footerTa } from './ta/footer';

export const translations = {
  EN: {
    common: commonEn,
    navigation: navigationEn,
    homepage: homepageEn,
    programmes: programmesEn,
    resources: resourcesEn,
    about: aboutEn,
    forms: formsEn,
    chatbot: chatbotEn,
    footer: footerEn,
  },
  TA: {
    common: commonTa,
    navigation: navigationTa,
    homepage: homepageTa,
    programmes: programmesTa,
    resources: resourcesTa,
    about: aboutTa,
    forms: formsTa,
    chatbot: chatbotTa,
    footer: footerTa,
  },
} as const;

export type TranslationSchema = typeof translations.EN;
