import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  exportCandidatesExcel,
  getCandidateById,
  getCandidates,
  updateCandidateNote,
  type ExportCandidatesParams,
  type GetCandidatesParams,
} from "@/src/lib/api/candidate";
import { downloadBlob } from "@/src/lib/download";

const CANDIDATES_QUERY_KEY = ["candidates"];

export function useCandidates(params: GetCandidatesParams) {
  return useQuery({
    queryKey: ["candidates", params],
    queryFn: ({ signal }) => getCandidates(params, signal),
    placeholderData: keepPreviousData,
  });
}

export function useCandidateById(id?: string) {
  return useQuery({
    queryKey: ["candidates", "detail", id],
    queryFn: ({ signal }) => getCandidateById(id as string, signal),
    enabled: !!id,
  });
}

export function useUpdateCandidateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, note }: { id: string; note: string }) =>
      updateCandidateNote(id, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CANDIDATES_QUERY_KEY });
      toast.success("Đã lưu ghi chú");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useExportCandidatesExcel() {
  return useMutation({
    mutationFn: (params: ExportCandidatesParams) =>
      exportCandidatesExcel(params),
    onSuccess: (blob) => {
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadBlob(blob, `ung-vien-${timestamp}.xlsx`);
      toast.success("Đã xuất file Excel thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
