import { apiGet, apiPostForm, ApiError, type PageResponse } from "@/src/lib/api/http";
import type { Department, EmploymentType, Recruitment } from "@/src/types/recruitments";

const REVALIDATE_SECONDS = 0;

export type GetRecruitmentsParams = {
  departmentId?: string;
  employmentType?: EmploymentType;
  location?: string;
  search?: string;
  page?: number;
  size?: number;
};

export async function getRecruitments(
  params: GetRecruitmentsParams = {},
): Promise<PageResponse<Recruitment>> {
  return apiGet<PageResponse<Recruitment>>(
    "/public/recruitments",
    {
      page: params.page ?? 1,
      size: params.size ?? 50,
      departmentId: params.departmentId,
      employmentType: params.employmentType,
      location: params.location,
      search: params.search,
    },
    REVALIDATE_SECONDS,
  );
}

export async function getRecruitmentBySlug(slug: string): Promise<Recruitment | undefined> {
  try {
    return await apiGet<Recruitment>(`/public/recruitments/${slug}`, undefined, REVALIDATE_SECONDS);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return undefined;
    throw error;
  }
}

export async function getDepartments(): Promise<Department[]> {
  return apiGet<Department[]>("/public/departments", undefined, REVALIDATE_SECONDS * 5);
}

export type ApplyToJobPayload = {
  fullname: string;
  email: string;
  phone?: string;
  message?: string;
  resume: File;
};

export async function applyToJob(recruitmentId: string, data: ApplyToJobPayload): Promise<void> {
  const formData = new FormData();
  formData.set("fullname", data.fullname);
  formData.set("email", data.email);
  if (data.phone) formData.set("phone", data.phone);
  if (data.message) formData.set("message", data.message);
  formData.set("resume", data.resume);
  await apiPostForm<void>(`/public/recruitments/${recruitmentId}/apply`, formData);
}

export function formatEmploymentType(type: EmploymentType): string {
  const map: Record<EmploymentType, string> = {
    fulltime: "Full-time",
    parttime: "Part-time",
    remote: "Remote",
    hybrid: "Hybrid",
  };
  return map[type] || type;
}

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
}

export function formatDeadlineDate(iso: string | null | undefined): string {
  if (!iso) return "Đang mở";
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "Đang mở";
  return date.toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
}

// description/requirements/benefits are rich-text HTML (authored via the admin's
// RichTextEditor); use this to derive a clean plain-text snippet for card previews.
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function getJobIconLabel(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("developer") || (t.includes("engineer") && !t.includes("ai") && !t.includes("qa"))) return "</>";
  if (t.includes("ai")) return "AI";
  if (t.includes("ba") || t.includes("business analyst")) return "BA";
  if (t.includes("ui") || t.includes("ux") || t.includes("design")) return "UI";
  if (t.includes("qa") || t.includes("qc") || t.includes("test")) return "QA";
  if (t.includes("mobile") || t.includes("app")) return "App";
  return "💼";
}

