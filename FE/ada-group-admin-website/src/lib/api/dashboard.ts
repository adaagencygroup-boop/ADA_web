import apiClient, { unwrap } from "@/src/lib/api/client";

export type DashboardRange = "7d" | "30d" | "90d";

export type ContactStat = {
  date: string;
  count: number;
};

export type TopRecruitmentStat = {
  id: string;
  jobTitle: string;
  viewCount: number;
  percentage: number;
};

export type TopNewsStat = {
  id: string;
  title: string;
  viewCount: number;
};

export type AdminDashboard = {
  totalNews: number;
  totalRecruitments: number;
  totalContacts: number;
  contactStats: ContactStat[];
  topRecruitments: TopRecruitmentStat[];
  topNews: TopNewsStat[];
};

export function getDashboard(range: DashboardRange, signal?: AbortSignal) {
  return unwrap<AdminDashboard>(
    apiClient.get("/admin/dashboard", { params: { range }, signal })
  );
}
