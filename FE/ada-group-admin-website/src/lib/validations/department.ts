import { z } from "zod";

export const departmentSchema = z.object({
  name: z
    .string()
    .min(1, "Vui lòng nhập tên phòng ban")
    .max(100, "Tên phòng ban không được vượt quá 100 ký tự"),
});

export type DepartmentFormValues = z.infer<typeof departmentSchema>;
