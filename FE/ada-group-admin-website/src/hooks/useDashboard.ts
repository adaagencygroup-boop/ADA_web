import { useQuery } from "@tanstack/react-query";
import { getDashboard, type DashboardParams } from "@/src/lib/api/dashboard";

export function useDashboard(params?: DashboardParams) {
  return useQuery({
    queryKey: ["dashboard", params],
    queryFn: ({ signal }) => getDashboard(params, signal),
  });
}