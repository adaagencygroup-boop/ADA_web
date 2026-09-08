import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  deleteContact,
  exportContactsExcel,
  getContactById,
  getContacts,
  respondContact,
  updateContactNote,
  type ExportContactsParams,
  type GetContactsParams,
  type RespondContactPayload,
} from "@/src/lib/api/contact";
import { downloadBlob } from "@/src/lib/download";

const CONTACTS_QUERY_KEY = ["contacts"];

export function useContacts(params: GetContactsParams) {
  return useQuery({
    queryKey: ["contacts", params],
    queryFn: ({ signal }) => getContacts(params, signal),
    placeholderData: keepPreviousData,
  });
}

export function useContactById(id?: string) {
  return useQuery({
    queryKey: ["contacts", "detail", id],
    queryFn: ({ signal }) => getContactById(id as string, signal),
    enabled: !!id,
  });
}

export function useContactCount(status?: "pending" | "responded") {
  return useQuery({
    queryKey: ["contacts", "count", status],
    queryFn: ({ signal }) =>
      getContacts({ page: 1, size: 1, status }, signal),
    select: (data) => data.pagination.totalElements,
  });
}

export function useExportContactsExcel() {
  return useMutation({
    mutationFn: (params: ExportContactsParams) => exportContactsExcel(params),
    onSuccess: (blob) => {
      const timestamp = new Date().toISOString().slice(0, 10);
      downloadBlob(blob, `lien-he-${timestamp}.xlsx`);
      toast.success("Đã xuất file Excel thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useRespondContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RespondContactPayload }) =>
      respondContact(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACTS_QUERY_KEY });
      toast.success("Đã gửi phản hồi thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useUpdateContactNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, note }: { id: string; note: string }) =>
      updateContactNote(id, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACTS_QUERY_KEY });
      toast.success("Đã lưu ghi chú");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useDeleteContact() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACTS_QUERY_KEY });
      toast.success("Đã xóa liên hệ thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
