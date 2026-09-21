import { z } from "zod";

function createCleanTextSchema(fieldName: string, maxLength?: number) {
  let schema = z
    .string()
    .refine(
      (val) => !!val && val.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim().length > 0,
      { message: `${fieldName} không được để trống hoặc chỉ chứa khoảng trắng/tab` }
    )
    .refine((val) => !/\t/.test(val || ""), {
      message: `${fieldName} không được chứa phím Tab`,
    })
    .refine(
      (val) => !/\s{2,}/.test(val ? val.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ") : ""),
      { message: `${fieldName} không được chứa nhiều dấu cách liên tiếp` }
    );

  if (maxLength) {
    schema = schema.refine((val) => val.trim().length <= maxLength, {
      message: `${fieldName} không được vượt quá ${maxLength} ký tự`,
    });
  }

  return schema;
}

export const recruitmentSchema = z.object({
  jobTitle: createCleanTextSchema("Vị trí tuyển dụng", 150),
  departmentId: z.string().min(1, "Vui lòng chọn phòng ban"),
  location: createCleanTextSchema("Địa điểm làm việc", 100),
  employmentType: z.enum(["fulltime", "parttime", "remote", "hybrid"], {
    message: "Vui lòng chọn hình thức làm việc",
  }),
  status: z.enum(["draft", "hiring", "closed"], {
    message: "Vui lòng chọn trạng thái",
  }),
  workingHours: createCleanTextSchema("Thời gian làm việc", 100),
  description: createCleanTextSchema("Mô tả công việc"),
  requirements: createCleanTextSchema("Yêu cầu ứng viên"),
  benefits: createCleanTextSchema("Quyền lợi được hưởng"),
  coverImageURL: z.string().min(1, "Vui lòng tải ảnh đại diện"),
  minSalary: z.string().optional(),
  maxSalary: z.string().optional(),
  isNegotiable: z.boolean().optional(),
  requiredCandidateNum: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập số lượng cần tuyển")
    .regex(/^[1-9]\d*$/, "Số lượng cần tuyển phải là số nguyên dương lớn hơn 0"),
  expiresAt: z.date({ message: "Vui lòng chọn hạn ứng tuyển" }).refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(date);
      selected.setHours(0, 0, 0, 0);
      return selected > today;
    },
    { message: "Hạn ứng tuyển phải lớn hơn ngày hiện tại" }
  ),
}).refine(
  (data) => {
    if (data.isNegotiable) return true;
    return !!data.minSalary || !!data.maxSalary;
  },
  {
    message: "Vui lòng nhập mức lương hoặc chọn Thỏa thuận",
    path: ["salarySection"],
  }
).refine(
  (data) => {
    if (data.isNegotiable) return true;
    if (data.minSalary && !data.maxSalary) return false;
    return true;
  },
  {
    message: "Vui lòng nhập mức lương tối đa",
    path: ["maxSalary"],
  }
).refine(
  (data) => {
    if (data.isNegotiable) return true;
    if (data.maxSalary && !data.minSalary) return false;
    return true;
  },
  {
    message: "Vui lòng nhập mức lương tối thiểu",
    path: ["minSalary"],
  }
).refine(
  (data) => {
    if (data.isNegotiable) return true;
    if (!data.minSalary) return true;
    const min = parseFloat(data.minSalary.replace(/,/g, ""));
    if (isNaN(min)) return true;
    return min > 0;
  },
  {
    message: "Mức lương tối thiểu phải lớn hơn 0",
    path: ["minSalary"],
  }
).refine(
  (data) => {
    if (data.isNegotiable) return true;
    if (!data.maxSalary) return true;
    const max = parseFloat(data.maxSalary.replace(/,/g, ""));
    if (isNaN(max)) return true;
    return max > 0;
  },
  {
    message: "Mức lương tối đa phải lớn hơn 0",
    path: ["maxSalary"],
  }
).refine(
  (data) => {
    if (data.isNegotiable) return true;
    if (!data.minSalary || !data.maxSalary) return true;
    const min = parseFloat(data.minSalary.replace(/,/g, ""));
    const max = parseFloat(data.maxSalary.replace(/,/g, ""));
    if (isNaN(min) || isNaN(max)) return true;
    return min < max;
  },
  {
    message: "Mức lương tối thiểu phải nhỏ hơn mức lương tối đa",
    path: ["minSalary"],
  }
).refine(
  (data) => {
    if (data.isNegotiable) return true;
    if (!data.minSalary || !data.maxSalary) return true;
    const min = parseFloat(data.minSalary.replace(/,/g, ""));
    const max = parseFloat(data.maxSalary.replace(/,/g, ""));
    if (isNaN(min) || isNaN(max)) return true;
    return max > min;
  },
  {
    message: "Mức lương tối đa phải lớn hơn mức lương tối thiểu",
    path: ["maxSalary"],
  }
).refine(
  (data) => {
    if (!data.workingHours) return true;
    const timeMatch = data.workingHours.match(/\((\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})\)/);
    if (!timeMatch) return true;
    const [, start, end] = timeMatch;
    const parseMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
    };
    return parseMinutes(end) > parseMinutes(start);
  },
  {
    message: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
    path: ["workingHours"],
  }
);

export type RecruitmentFormValues = z.infer<typeof recruitmentSchema>;