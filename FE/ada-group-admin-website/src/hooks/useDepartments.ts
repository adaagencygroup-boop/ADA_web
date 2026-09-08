import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createDepartment,
  deleteDepartment,
  getDepartments,
  updateDepartment,
  type DepartmentPayload,
} from "@/src/lib/api/recruitment";

const DEPARTMENTS_QUERY_KEY = ["departments"];

export function useDepartments(search?: string) {
  return useQuery({
    queryKey: ["departments", search],
    queryFn: ({ signal }) => getDepartments(search, signal),
  });
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPARTMENTS_QUERY_KEY });
      toast.success("Đã thêm phòng ban thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useUpdateDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DepartmentPayload }) =>
      updateDepartment(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPARTMENTS_QUERY_KEY });
      toast.success("Đã cập nhật phòng ban thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useDeleteDepartment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DEPARTMENTS_QUERY_KEY });
      toast.success("Đã xóa phòng ban thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
