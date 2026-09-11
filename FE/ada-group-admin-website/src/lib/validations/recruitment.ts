import { z } from "zod";

export const recruitmentSchema = z.object({
  jobTitle: z
    .string()
    .min(1, "Vui lòng nhập vị trí tuyển dụng")
    .max(150, "Vị trí tuyển dụng không được vượt quá 150 ký tự"),
  departmentId: z.string().min(1, "Vui lòng chọn phòng ban"),
  location: z
    .string()
    .min(1, "Vui lòng nhập địa điểm làm việc")
    .max(100, "Địa điểm không được vượt quá 100 ký tự"),
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
  coverImageURL: z.string().min(1, "Vui lòng tải ảnh đại diện"),
  minSalary: z.string().optional(),
  maxSalary: z.string().optional(),
  isNegotiable: z.boolean().optional(),
  requiredCandidateNum: z.string().min(1, "Vui lòng nhập số lượng cần tuyển").refine(
    (val) => !isNaN(parseInt(val)) && parseInt(val) > 0,
    { message: "Số lượng cần tuyển phải lớn hơn 0" }
  ),
  expiresAt: z.date({ message: "Vui lòng chọn hạn ứng tuyển" }).refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    },
    { message: "Hạn ứng tuyển không được nằm trong quá khứ" }
  ),
}).refine(
  (data) => {
    if (data.isNegotiable) return true;
    return !!data.minSalary && !!data.maxSalary;
  },
  {
    message: "Vui lòng nhập mức lương hoặc chọn Thỏa thuận",
    path: ["minSalary"],
  }
).refine(
  (data) => {
    if (!data.minSalary || !data.maxSalary) return true;
    const min = parseFloat(data.minSalary.replace(/,/g, ""));
    const max = parseFloat(data.maxSalary.replace(/,/g, ""));
    if (isNaN(min) || isNaN(max)) return true;
    return max >= min;
  },
  {
    message: "Mức lương tối đa không được nhỏ hơn mức lương tối thiểu",
    path: ["maxSalary"],
  }
);

export type RecruitmentFormValues = z.infer<typeof recruitmentSchema>;
