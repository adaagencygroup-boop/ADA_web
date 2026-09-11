import apiClient, { unwrap } from "@/src/lib/api/client";
import type { PageResponse } from "@/src/lib/api/types";
import type { EmploymentType } from "@/src/lib/api/recruitment";

export type Candidate = {
  id: string;
  recruitmentId: string;
  recruitmentTitle: string;
  location: string | null;
  employmentType: EmploymentType;
  fullname: string;
  email: string | null;
  phone: string | null;
  resumeURL: string | null;
  message: string | null;
  note: string | null;
  appliedAt: string;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetCandidatesParams = {
  page?: number;
  size?: number;
  recruitmentId?: string;
  search?: string;
  fromDate?: string;
  toDate?: string;
};

export type ExportCandidatesParams = {
  recruitmentId?: string;
  fromDate?: string;
  toDate?: string;
};

export type CandidateNoteResult = {
  id: string;
  note: string;
  updatedAt: string;
};

export function getCandidates(
  params: GetCandidatesParams,
  signal?: AbortSignal
) {
  return unwrap<PageResponse<Candidate>>(
    apiClient.get("/admin/candidates", { params, signal })
  );
}

export function getCandidateById(id: string, signal?: AbortSignal) {
  return unwrap<Candidate>(apiClient.get(`/admin/candidates/${id}`, { signal }));
}

export function updateCandidateNote(id: string, note: string) {
  return unwrap<CandidateNoteResult>(
    apiClient.patch(`/admin/candidates/${id}/note`, { note })
  );
}

export async function exportCandidatesExcel(
  params: ExportCandidatesParams,
  signal?: AbortSignal
) {
  const response = await apiClient.get("/admin/candidates/exportExcel", {
    params,
    signal,
    responseType: "blob",
  });
  return response.data as Blob;
}

export async function getCandidateCvFile(id: string, signal?: AbortSignal) {
  const response = await apiClient.get(`/admin/candidates/${id}/cv`, {
    signal,
    responseType: "blob",
  });
  return response.data as Blob;
}
