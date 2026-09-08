import { useQuery } from "@tanstack/react-query";
import { getDashboard, type DashboardRange } from "@/src/lib/api/dashboard";

export function useDashboard(range: DashboardRange) {
  return useQuery({
    queryKey: ["dashboard", range],
    queryFn: ({ signal }) => getDashboard(range, signal),
  });
}
