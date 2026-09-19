import { useQuery } from "@tanstack/react-query";
import { getDashboard, type DashboardRange } from "@/src/lib/api/dashboard";

export function useDashboard(range?: DashboardRange, fromDate?: string, toDate?: string) {
  return useQuery({
    queryKey: ["dashboard", range, fromDate, toDate],
    queryFn: ({ signal }) => getDashboard(range, fromDate, toDate, signal),
  });
}