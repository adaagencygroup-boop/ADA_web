export type RecruitmentStatus = "draft" | "hiring" | "closed";
export type EmploymentType = "fulltime" | "parttime" | "remote" | "hybrid";

export interface Department {
  id: string;
  name: string;
}

export interface Recruitment {
  id: string;
  jobTitle: string;
  slug: string;
  departmentId: string | null;
  departmentName: string | null;
  recruiterId: string | null;
  recruiterName: string | null;
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
  isNegotiable: boolean | null;
  requiredCandidateNum: number | null;
  applicantCount: number | null;
  viewCount: number | null;
  expiresAt: string | null;
  updatedAt: string;
  createdAt: string;
}
