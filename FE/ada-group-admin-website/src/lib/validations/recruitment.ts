import { z } from "zod";

export const recruitmentSchema = z.object({
  jobTitle: z
    .string()
    .min(1, "Vui lòng nhập vị trí tuyển dụng")
    .max(150, "Vị trí tuyển dụng không được vượt quá 150 ký tự"),
  departmentId: z.string().min(1, "Vui lòng chọn phòng ban"),
  location: z
    .string()
    .max(100, "Địa điểm không được vượt quá 100 ký tự")
    .optional(),
  employmentType: z.enum(["fulltime", "parttime", "remote", "hybrid"], {
    message: "Vui lòng chọn hình thức làm việc",
  }),
  status: z.enum(["draft", "hiring", "closed"], {
    message: "Vui lòng chọn trạng thái",
  }),
  workingHours: z
    .string()
    .max(100, "Thời gian làm việc không được vượt quá 100 ký tự")
    .optional(),
  description: z.string().min(1, "Vui lòng nhập mô tả công việc"),
  requirements: z.string().min(1, "Vui lòng nhập yêu cầu ứng viên"),
  benefits: z.string().min(1, "Vui lòng nhập quyền lợi được hưởng"),
  coverImageURL: z.string().optional(),
  minSalary: z.string().optional(),
  maxSalary: z.string().optional(),
  isNegotiable: z.boolean().optional(),
  requiredCandidateNum: z.string().optional(),
  expiresAt: z.date({ message: "Vui lòng chọn hạn ứng tuyển" }),
});

export type RecruitmentFormValues = z.infer<typeof recruitmentSchema>;
