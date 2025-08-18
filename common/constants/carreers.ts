import { CareerProps } from "../types/careers";

export const CAREER_KEYS = {
  FPT_SOFTWARE: "fpt_software"
} as const;

export const CAREERS: CareerProps[] = [
  {
    position: CAREER_KEYS.FPT_SOFTWARE,
    company: "FPT Software",
    logo: "/images/careers/fsoft.png",
    location: CAREER_KEYS.FPT_SOFTWARE,
    location_type: CAREER_KEYS.FPT_SOFTWARE,
    type: CAREER_KEYS.FPT_SOFTWARE,
    start_date: "2025-01",
    end_date: "2025-05",
    industry: CAREER_KEYS.FPT_SOFTWARE,
    link: "https://fptsoftware.com/",
    responsibilities: [], // Will be populated from translation
    translationKey: CAREER_KEYS.FPT_SOFTWARE,
    isShow: true,
  },
];
