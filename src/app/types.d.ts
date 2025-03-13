interface ResumeData {
  personalDetails: PersonalDetailsData;
  employment: EmploymentDataEntry[];
  education: EducationDataEntry[];
  skills: SkillDataEntry[];
  websites: WebsiteData;
  languages: LanguageDataEntry[];
  hobbies: HobbiesData;
}

interface PersonalDetailsData {
  jobTitle: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  summary: string;
}

interface EmploymentDataEntry {
  achievements: string[];
  projects: string[];
  startDate: string;
  endDate?: string;
  city: string;
  employer: string;
  jobTitle: string;
  position: string;
}

interface EducationDataEntry {
  degree: string;
  description: string;
  startDate: string;
  endDate: string;
  school: string;
}

interface SkillDataEntry {
  name: string;
  level: number;
}

interface WebsiteData {
  github: string;
  linkedin: string;
}

interface LanguageDataEntry {
  name: string;
  level: number;
}

interface HobbiesData {
  description: string;
}
