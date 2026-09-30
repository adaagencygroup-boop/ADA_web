import { z } from "zod";

function createCleanTextSchema(fieldName: string, maxLength: number = 255) {
  return z
    .string()
    .min(1, `Vui lòng nhập ${fieldName.toLowerCase()}`)
    .refine(
      (val) => !!val && val.trim().length > 0,
      { message: `${fieldName} không được để trống hoặc chỉ chứa khoảng trắng/tab` }
    )
    .refine((val) => !/\t/.test(val || ""), {
      message: `${fieldName} không được chứa phím Tab`,
    })
    .refine(
      (val) => !/^\s+/.test(val || "") && !/\s+$/.test(val || ""),
      { message: `${fieldName} không được chứa khoảng trắng ở đầu hoặc cuối` }
    )
    .refine(
      (val) => !/\s{2,}/.test(val || ""),
      { message: `${fieldName} không được chứa nhiều dấu cách liên tiếp` }
    )
    .refine((val) => val.trim().length <= maxLength, {
      message: `${fieldName} không được vượt quá ${maxLength} ký tự`,
    });
}

export const newsSchema = z.object({
  title: createCleanTextSchema("Tiêu đề bài viết", 255),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  content: z.string().min(1, "Vui lòng nhập nội dung bài viết"),
  coverImageURL: z.string().min(1, "Vui lòng chọn ảnh đại diện"),
  isFeatured: z.boolean().optional(),
});

export type NewsFormValues = z.infer<typeof newsSchema>;
