import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createRecruitment,
  deleteRecruitment,
  exportRecruitmentsExcel,
  getRecruitmentById,
  getRecruitmentDashboardMetrics,
  getRecruitments,
  updateRecruitment,
  type ExportRecruitmentsParams,
  type GetRecruitmentsParams,
  type RecruitmentPayload,
} from "@/src/lib/api/recruitment";
import { downloadBlob } from "@/src/lib/download";

const RECRUITMENTS_QUERY_KEY = ["recruitments"];

export function useRecruitmentDashboardMetrics() {
  return useQuery({
    queryKey: ["recruitments", "dashboardMetrics"],
    queryFn: ({ signal }) => getRecruitmentDashboardMetrics(signal),
  });
}

export function useRecruitments(params: GetRecruitmentsParams) {
  return useQuery({
    queryKey: ["recruitments", params],
    queryFn: ({ signal }) => getRecruitments(params, signal),
    placeholderData: keepPreviousData,
  });
}

export function useExportRecruitmentsExcel() {
  return useMutation({
    mutationFn: (params: ExportRecruitmentsParams) =>
      exportRecruitmentsExcel(params),
    onSuccess: (blob) => {
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadBlob(blob, `tin-tuyen-dung-${timestamp}.xlsx`);
      toast.success("Đã xuất file Excel thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useRecruitmentById(id?: string) {
  return useQuery({
    queryKey: ["recruitments", "detail", id],
    queryFn: ({ signal }) => getRecruitmentById(id as string, signal),
    enabled: !!id,
  });
}

export function useCreateRecruitment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RecruitmentPayload) => createRecruitment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECRUITMENTS_QUERY_KEY });
      toast.success("Đã tạo tin tuyển dụng thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useUpdateRecruitment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: RecruitmentPayload;
    }) => updateRecruitment(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECRUITMENTS_QUERY_KEY });
      toast.success("Đã cập nhật tin tuyển dụng thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useDeleteRecruitment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteRecruitment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECRUITMENTS_QUERY_KEY });
      toast.success("Đã xóa tin tuyển dụng thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
