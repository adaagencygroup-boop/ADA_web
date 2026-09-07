import apiClient, { unwrap } from "@/src/lib/api/client";
import type { PageResponse } from "@/src/lib/api/types";

export type RecruitmentStatus = "draft" | "hiring" | "closed";

export type EmploymentType = "fulltime" | "parttime" | "remote" | "hybrid";

export type Recruitment = {
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
};

export type RecruitmentDetail = Recruitment & {
  description: string;
  requirements: string;
  benefits: string;
};

export type GetRecruitmentsParams = {
  page?: number;
  size?: number;
  status?: RecruitmentStatus;
  departmentId?: string;
  employmentType?: EmploymentType;
  search?: string;
};

export type RecruitmentPayload = {
  jobTitle: string;
  departmentId?: string | null;
  location?: string | null;
  employmentType: EmploymentType;
  workingHours?: string | null;
  description: string;
  requirements: string;
  benefits: string;
  coverImageURL?: string | null;
  status: RecruitmentStatus;
  minSalary?: number | null;
  maxSalary?: number | null;
  isNegotiable?: boolean;
  requiredCandidateNum?: number | null;
  expiresAt?: string | null;
};

export type RecruitmentDashboardMetrics = {
  activeCount: number;
  totalCandidatesCount: number;
  expiringSoonCount: number;
  closedCount: number;
};

export function getRecruitmentDashboardMetrics(signal?: AbortSignal) {
  return unwrap<RecruitmentDashboardMetrics>(
    apiClient.get("/admin/recruitments/dashboardMetrics", { signal })
  );
}

export function getRecruitments(
  params: GetRecruitmentsParams,
  signal?: AbortSignal
) {
  return unwrap<PageResponse<Recruitment>>(
    apiClient.get("/admin/recruitments", { params, signal })
  );
}

export function getRecruitmentById(id: string, signal?: AbortSignal) {
  return unwrap<RecruitmentDetail>(
    apiClient.get(`/admin/recruitments/${id}`, { signal })
  );
}

export function createRecruitment(payload: RecruitmentPayload) {
  return unwrap<RecruitmentDetail>(
    apiClient.post("/admin/recruitments", payload)
  );
}

export function updateRecruitment(id: string, payload: RecruitmentPayload) {
  return unwrap<RecruitmentDetail>(
    apiClient.put(`/admin/recruitments/${id}`, payload)
  );
}

export function deleteRecruitment(id: string) {
  return unwrap<void>(apiClient.delete(`/admin/recruitments/${id}`));
}

export type Department = {
  id: string;
  name: string;
};

export type DepartmentPayload = {
  name: string;
};

export function getDepartments(search?: string, signal?: AbortSignal) {
  return unwrap<Department[]>(
    apiClient.get("/admin/departments", { params: { search }, signal })
  );
}

export function createDepartment(payload: DepartmentPayload) {
  return unwrap<Department>(apiClient.post("/admin/departments", payload));
}

export function updateDepartment(id: string, payload: DepartmentPayload) {
  return unwrap<Department>(
    apiClient.put(`/admin/departments/${id}`, payload)
  );
}

export function deleteDepartment(id: string) {
  return unwrap<void>(apiClient.delete(`/admin/departments/${id}`));
}
