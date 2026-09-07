import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNewsCategory,
  deleteNewsCategory,
  updateNewsCategory,
  type NewsCategoryPayload,
} from "@/src/lib/api/news";

const CATEGORIES_QUERY_KEY = ["admin-news-categories"];

export function useCreateNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNewsCategory,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY }),
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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY }),
  });
}

export function useDeleteNewsCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteNewsCategory(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY }),
  });
}
