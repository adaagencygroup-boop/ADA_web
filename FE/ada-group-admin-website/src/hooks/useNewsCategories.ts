import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createNewsCategory,
  deleteNewsCategory,
  getNewsCategories,
  updateNewsCategory,
  type NewsCategoryPayload,
} from "@/src/lib/api/news";

const CATEGORIES_QUERY_KEY = ["news-categories"];

export function useNewsCategories(search?: string) {
  return useQuery({
    queryKey: ["news-categories", search],
    queryFn: ({ signal }) => getNewsCategories(search, signal),
  });
}

export function useCreateNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewsCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      toast.success("Đã thêm lĩnh vực thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useUpdateNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: NewsCategoryPayload;
    }) => updateNewsCategory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      toast.success("Đã cập nhật lĩnh vực thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useDeleteNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteNewsCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY });
      toast.success("Đã xóa lĩnh vực thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}
