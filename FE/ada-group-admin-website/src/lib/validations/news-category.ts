import { z } from "zod";

export const newsCategorySchema = z.object({
  name: z
    .string()
    .min(1, "Vui lòng nhập tên lĩnh vực")
    .max(100, "Tên lĩnh vực không được vượt quá 100 ký tự"),
});

export type NewsCategoryFormValues = z.infer<typeof newsCategorySchema>;
