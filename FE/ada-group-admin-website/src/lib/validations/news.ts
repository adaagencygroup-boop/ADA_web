import { z } from "zod";

export const newsSchema = z.object({
  title: z
    .string()
    .min(1, "Vui lòng nhập tiêu đề bài viết")
    .max(255, "Tiêu đề không được vượt quá 255 ký tự"),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  content: z.string().min(1, "Vui lòng nhập nội dung bài viết"),
  coverImageURL: z.string().optional(),
  isFeatured: z.boolean().optional(),
});

export type NewsFormValues = z.infer<typeof newsSchema>;
