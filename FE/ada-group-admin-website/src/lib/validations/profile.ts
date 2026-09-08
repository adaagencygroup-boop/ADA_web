import { z } from "zod";

export const profileSchema = z.object({
  fullname: z
    .string()
    .min(1, "Vui lòng nhập họ và tên")
    .max(150, "Họ và tên không được vượt quá 150 ký tự"),
  phone: z
    .string()
    .optional()
    .refine((value) => !value || /^[0-9+()\s-]{8,20}$/.test(value), {
      message:
        "Số điện thoại không đúng định dạng (8-20 ký tự, chỉ gồm số, +, (), khoảng trắng, dấu -)",
    }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
