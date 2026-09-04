"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Eye,
  ImagePlus,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  X,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Switch } from "@/src/components/ui/switch";
import RichTextEditor from "@/src/components/shared/RichTextEditor";
import DatePickerField from "@/app/(dashboard)/tuyen-dung/_components/job-form/DatePickerField";
import WorkScheduleField, {
  type WorkSchedule,
} from "@/app/(dashboard)/tuyen-dung/_components/job-form/WorkScheduleField";
import CurrencyInput from "@/app/(dashboard)/tuyen-dung/_components/job-form/CurrencyInput";

const DEPARTMENTS = [
  "BA",
  "IT",
  "AI",
  "Thiết kế",
  "Công nghệ",
  "Kiểm thử",
  "Dự án",
  "Marketing",
  "Nhân sự",
  "Tài chính",
  "Hạ tầng",
  "Dữ liệu",
  "Kinh doanh",
  "R&D",
];

const WORK_TYPES = ["Offline", "Online", "Hybrid"];

const DEFAULT_BULLETS =
  "<ul><li>Tốt nghiệp Đại học chuyên ngành CNTT, Khoa học máy tính hoặc liên quan.</li><li>Có kinh nghiệm với Python, TensorFlow, PyTorch.</li><li>Tư duy logic tốt và khả năng giải quyết vấn đề sáng tạo.</li></ul>";

const EMPTY_SCHEDULE: WorkSchedule = {
  days: ["t2", "t3", "t4", "t5", "t6"],
  startTime: "",
  endTime: "",
};

export type JobFormMode = "create" | "edit";

export default function JobForm({
  mode,
  jobId,
}: {
  mode: JobFormMode;
  jobId?: string;
}) {
  const isEdit = mode === "edit";

  const [title, setTitle] = useState(isEdit ? "IT BA" : "");
  const [department, setDepartment] = useState<string | undefined>(
    isEdit ? "BA" : undefined
  );
  const [workType, setWorkType] = useState<string | undefined>(
    isEdit ? "Offline" : undefined
  );
  const [location, setLocation] = useState(isEdit ? "Hà Nội" : "");
  const [workSchedule, setWorkSchedule] = useState<WorkSchedule>(EMPTY_SCHEDULE);
  const [postedDate, setPostedDate] = useState(() =>
    isEdit ? new Date(2025, 4, 16) : new Date()
  );
  const [deadline, setDeadline] = useState(() =>
    isEdit
      ? new Date(2025, 6, 28)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );

  const [description, setDescription] = useState(isEdit ? DEFAULT_BULLETS : "");
  const [requirements, setRequirements] = useState(isEdit ? DEFAULT_BULLETS : "");
  const [benefits, setBenefits] = useState(isEdit ? DEFAULT_BULLETS : "");

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [contactEmail, setContactEmail] = useState(
    isEdit ? "example@adagroup.vn" : ""
  );
  const [contactPhone, setContactPhone] = useState(
    isEdit ? "(+84) 024 3456 678" : ""
  );
  const [contactSchedule, setContactSchedule] = useState<WorkSchedule>(EMPTY_SCHEDULE);

  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [salaryNegotiable, setSalaryNegotiable] = useState(true);

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }

  const cancelHref = isEdit ? `/tuyen-dung/${jobId}` : "/tuyen-dung";

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[28px] font-semibold text-[#001E4B]">
            {isEdit ? "Sửa thông tin tuyển dụng" : "Thêm tin tuyển dụng mới"}
          </h1>
          <nav className="flex items-center gap-2 text-sm text-[#434750]">
            <Link href="/" className="hover:text-[#1C1B1B]">
              Dashboard
            </Link>
            <span>›</span>
            <Link href="/tuyen-dung" className="hover:text-[#1C1B1B]">
              Tuyển dụng
            </Link>
            <span>›</span>
            <span className="font-medium text-[#1C1B1B]">
              {isEdit ? "Sửa tin tuyển dụng" : "Thêm tin tuyển dụng"}
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={cancelHref}
            className="flex h-8.5 items-center gap-2 rounded-lg border border-[#C4C6D2] px-4 text-sm font-medium text-[#1C1B1B] hover:bg-[#F8FAFC]"
          >
            <X className="size-3.5" />
            Hủy bỏ
          </Link>
          {isEdit && (
            <Link
              href={`/tuyen-dung/${jobId}`}
              className="flex h-8.5 items-center gap-2 rounded-lg border border-[#C4C6D2] px-4 text-sm font-medium text-[#1C1B1B] hover:bg-[#F8FAFC]"
            >
              <Eye className="size-3.5" />
              Xem trước
            </Link>
          )}
          <button
            type="button"
            className="flex h-8.5 items-center gap-2 rounded-lg border border-white bg-[#316EE9] px-4 text-sm font-medium text-white hover:bg-[#316EE9]/90"
          >
            {isEdit ? (
              <>
                <Save className="size-3.5" />
                Lưu thay đổi
              </>
            ) : (
              <>
                <Plus className="size-3.5" />
                Đăng tin tuyển dụng
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <div className="flex flex-col gap-6 rounded-xl border border-[#C4C6D2] bg-[#FCF9F8] p-6 shadow-xs">
            <h2 className="flex items-center gap-2 text-[22px] font-semibold text-[#0054CD]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#0054CD] text-sm font-bold text-white">
                1
              </span>
              THÔNG TIN CƠ BẢN
            </h2>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1C1B1B]">
                Vị trí tuyển dụng <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ví dụ: Backend Developer"
                className="h-9.5 rounded-lg border border-[#C4C6D2] bg-[#FCF9F8] px-4 text-sm text-[#1C1B1B] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#316EE9]"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#1C1B1B]">
                  Phòng ban <span className="text-red-500">*</span>
                </label>
                <Select value={department} onValueChange={(v) => v && setDepartment(v)}>
                  <SelectTrigger className="w-full rounded-lg border-[#C4C6D2] bg-[#FCF9F8] text-sm data-[size=default]:h-9.5">
                    <SelectValue placeholder="Chọn phòng ban" />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPARTMENTS.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <button
                  type="button"
                  className="w-fit text-sm font-medium text-[#0054CD] hover:underline"
                >
                  + Thêm phòng ban mới
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#1C1B1B]">
                  Hình thức làm việc <span className="text-red-500">*</span>
                </label>
                <Select value={workType} onValueChange={(v) => v && setWorkType(v)}>
                  <SelectTrigger className="w-full rounded-lg border-[#C4C6D2] bg-[#FCF9F8] text-sm data-[size=default]:h-9.5">
                    <SelectValue placeholder="Chọn hình thức" />
                  </SelectTrigger>
                  <SelectContent>
                    {WORK_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1C1B1B]">
                Địa điểm làm việc <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Ví dụ: Hà Nội"
                  className="h-9.5 w-full rounded-lg border border-[#C4C6D2] bg-[#FCF9F8] pr-10 pl-4 text-sm text-[#1C1B1B] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#316EE9]"
                />
                <MapPin className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#434750]" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1C1B1B]">
                Thời gian làm việc <span className="text-red-500">*</span>
              </label>
              <WorkScheduleField value={workSchedule} onChange={setWorkSchedule} />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#1C1B1B]">
                  Ngày đăng <span className="text-red-500">*</span>
                </label>
                <DatePickerField value={postedDate} onChange={setPostedDate} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#1C1B1B]">
                  Hạn ứng tuyển <span className="text-red-500">*</span>
                </label>
                <DatePickerField value={deadline} onChange={setDeadline} />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-xl border border-[#C4C6D2] bg-[#FCF9F8] p-6 shadow-xs">
            <h2 className="flex items-center gap-2 text-[22px] font-semibold text-[#0054CD]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#0054CD] text-sm font-bold text-white">
                2
              </span>
              NỘI DUNG TUYỂN DỤNG
            </h2>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#1C1B1B]">
                Mô tả công việc <span className="text-red-500">*</span>
              </label>
              <RichTextEditor value={description} onChange={setDescription} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#1C1B1B]">
                Yêu cầu ứng viên <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={requirements}
                onChange={setRequirements}
                variant="basic"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#1C1B1B]">
                Quyền lợi được hưởng <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={benefits}
                onChange={setBenefits}
                variant="basic"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-5 shadow-xs">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-[#001E4B]">
              <ImagePlus className="size-5 text-[#001E4B]" />
              ẢNH ĐẠI DIỆN
            </h3>
            <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-[#C4C6D2] p-6">
              <div className="relative flex h-32 w-full items-center justify-center overflow-hidden rounded-lg bg-[#E5E7EB]">
                {avatarPreview ? (
                  <Image
                    src={avatarPreview}
                    alt="Ảnh đại diện"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                ) : (
                  <ImagePlus className="size-8 text-[#9CA3AF]" />
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-lg bg-[#001E4B] px-4 py-2 text-sm font-medium text-white hover:bg-[#001E4B]/90"
              >
                <ImagePlus className="size-3.5" />
                Chọn ảnh
              </button>
            </div>
            <ul className="flex flex-col gap-1 text-xs text-[#434750]">
              <li>• Kích thước khuyến nghị: 1200x675px</li>
              <li>• Định dạng: JPG, PNG, WebP</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-5 shadow-xs">
            <h3 className="text-xl font-semibold text-[#001E4B]">
              THÔNG TIN LIÊN HỆ
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1C1B1B]">
                Email liên hệ <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#434750]" />
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(event) => setContactEmail(event.target.value)}
                  placeholder="example@adagroup.vn"
                  className="h-9.5 w-full rounded-lg border border-[#C4C6D2] pr-4 pl-10 text-sm text-[#1C1B1B] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#316EE9]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1C1B1B]">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#434750]" />
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(event) => setContactPhone(event.target.value)}
                  placeholder="(+84) 024 3456 678"
                  className="h-9.5 w-full rounded-lg border border-[#C4C6D2] pr-4 pl-10 text-sm text-[#1C1B1B] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#316EE9]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1C1B1B]">
                Thời gian liên hệ <span className="text-red-500">*</span>
              </label>
              <WorkScheduleField
                value={contactSchedule}
                onChange={setContactSchedule}
                placeholder="Chọn ngày và giờ liên hệ"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-5 shadow-xs">
            <h3 className="text-xl font-semibold text-[#001E4B]">
              TIỀN LƯƠNG
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1C1B1B]">Min</label>
              <CurrencyInput
                value={salaryMin}
                onChange={setSalaryMin}
                placeholder="Nhập số tiền..."
                disabled={salaryNegotiable}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1C1B1B]">Max</label>
              <CurrencyInput
                value={salaryMax}
                onChange={setSalaryMax}
                placeholder="Nhập số tiền..."
                disabled={salaryNegotiable}
              />
            </div>

            <div className="flex items-center gap-3">
              <Switch
                checked={salaryNegotiable}
                onCheckedChange={setSalaryNegotiable}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#1C1B1B]">
                  Lương thỏa thuận
                </span>
                <span className="text-xs text-[#434750]">Bật tự động</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
