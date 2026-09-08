import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại"),
    newPassword: z
      .string()
      .min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
      .regex(/[A-Z]/, "Mật khẩu mới phải chứa ít nhất 1 chữ hoa")
      .regex(/[a-z]/, "Mật khẩu mới phải chứa ít nhất 1 chữ thường")
      .regex(/[0-9]/, "Mật khẩu mới phải chứa ít nhất 1 chữ số")
      .regex(/^\S*$/, "Mật khẩu mới không được chứa khoảng trắng"),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu mới"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
