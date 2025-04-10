interface ResumeListItem {
  id: string;
  title: string;
  lastModificationDate: firebase.firestore.Timestamp;
  creationDate: firebase.firestore.Timestamp;
}

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
  name: string;
  surname: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  position: string;
  summary: string;
}

interface EmploymentDataEntry {
  position: string;
  employer: string;
  city: string;
  startDate: firebase.firestore.Timestamp;
  endDate?: firebase.firestore.Timestamp;
  projects: string[];
  achievements: string[];
}

interface EducationDataEntry {
  degree: string;
  description: string;
  startDate: firebase.firestore.Timestamp;
  endDate: firebase.firestore.Timestamp;
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
