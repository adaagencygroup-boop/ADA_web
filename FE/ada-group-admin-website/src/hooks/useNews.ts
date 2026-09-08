import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createNews,
  deleteNews,
  getNews,
  getNewsById,
  updateNews,
  uploadMedia,
  type GetNewsParams,
  type NewsPayload,
} from "@/src/lib/api/news";

const NEWS_QUERY_KEY = ["news"];

export function useNews(params: GetNewsParams) {
  return useQuery({
    queryKey: ["news", params],
    queryFn: ({ signal }) => getNews(params, signal),
    placeholderData: keepPreviousData,
  });
}

export function useNewsById(id?: string) {
  return useQuery({
    queryKey: ["news", "detail", id],
    queryFn: ({ signal }) => getNewsById(id as string, signal),
    enabled: !!id,
  });
}

export function useCreateNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewsPayload) => createNews(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEWS_QUERY_KEY });
      toast.success("Đã tạo tin tức thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useUpdateNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: NewsPayload }) =>
      updateNews(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEWS_QUERY_KEY });
      toast.success("Đã cập nhật tin tức thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useToggleFeatured() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      isFeatured,
    }: {
      id: string;
      isFeatured: boolean;
    }) => {
      const detail = await getNewsById(id);
      return updateNews(id, {
        title: detail.title,
        categoryId: detail.categoryId,
        content: detail.content,
        coverImageURL: detail.coverImageURL,
        status: detail.status,
        isFeatured,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEWS_QUERY_KEY });
      toast.success("Đã cập nhật trạng thái nổi bật");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NEWS_QUERY_KEY });
      toast.success("Đã xóa tin tức thành công");
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export function useUploadMedia() {
  return useMutation({
    mutationFn: (file: File) => uploadMedia(file),
    onError: (error: Error) => toast.error(error.message),
  });
}
