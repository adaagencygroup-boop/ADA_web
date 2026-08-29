export type RecruitmentStatus = 'draft' | 'hiring' | 'closed';
export type EmploymentType = 'fulltime' | 'parttime' | 'remote' | 'hybrid';

export interface Recruitment {
  id: string;
  recruiterId: string | null;
  jobTitle: string;
  slug: string;
  department: string | null;
  location: string | null;
  employmentType: EmploymentType;
  workingHours: string | null;
  description: string | null;
  requirements: string | null;
  benefits: string | null;
  minSalary: number | null;
  maxSalary: number | null;
  isSalaryNegotiable: boolean;
  coverImageUrl: string | null;
  status: RecruitmentStatus;
  isVisible: boolean;
  isFeatured: boolean;
  viewCount: number;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface RecruitmentApplicantCount {
  recruitmentId: string;
  applicantCount: number;
}
