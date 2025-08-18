import { EducationProps } from "../types/education";

export const EDUCATION_KEYS = {
  FPT_UNIVERSITY: "fpt_university"
} as const;

export const EDUCATION: EducationProps[] = [
  {
    school: EDUCATION_KEYS.FPT_UNIVERSITY,
    major: EDUCATION_KEYS.FPT_UNIVERSITY,
    logo: "/images/education/fptu.jpg",
    location: EDUCATION_KEYS.FPT_UNIVERSITY,
    degree: EDUCATION_KEYS.FPT_UNIVERSITY,
    start_year: 2022,
    end_year: 2026,
    link: "https://daihoc.fpt.edu.vn/",
    translationKey: EDUCATION_KEYS.FPT_UNIVERSITY,
  },
];
