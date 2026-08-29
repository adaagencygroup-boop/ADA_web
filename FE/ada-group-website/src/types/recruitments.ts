export type RecruitmentStatus = 'draft' | 'hiring' | 'closed';
export type EmploymentType = 'fulltime' | 'parttime' | 'remote' | 'hybrid';

export interface Department {
  id: string;
  name: string;
}

export interface Recruitment {
  id: string;
  recruiterId: string | null;
  jobTitle: string;
  slug: string;
  departmentId: string | null;
  department?: Department | null;
  location: string | null;
  employmentType: EmploymentType;
  workingHours: string | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  coverImageURL: string | null;
  status: RecruitmentStatus;
  minSalary: number | null;
  maxSalary: number | null;
  isNegotiable: boolean;
  requiredCandidateNum: number;
  viewCount: number;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RecruitmentApplicantCount {
  recruitmentId: string;
  applicantCount: number;
}
