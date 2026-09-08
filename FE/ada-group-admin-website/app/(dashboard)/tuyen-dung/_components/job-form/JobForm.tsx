"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronRight,
  Eye,
  ImagePlus,
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
import ImageCropDialog from "@/src/components/shared/ImageCropDialog";
import DatePickerField from "@/app/(dashboard)/tuyen-dung/_components/job-form/DatePickerField";
import CurrencyInput from "@/app/(dashboard)/tuyen-dung/_components/job-form/CurrencyInput";
import WorkScheduleField, {
  formatWorkSchedule,
  type WorkSchedule,
} from "@/app/(dashboard)/tuyen-dung/_components/job-form/WorkScheduleField";
import AddDepartmentDialog from "@/app/(dashboard)/tuyen-dung/_components/job-form/AddDepartmentDialog";
import ConfirmDialog from "@/src/components/shared/ConfirmDialog";
import { useDepartments } from "@/src/hooks/useDepartments";
import {
  useCreateRecruitment,
  useRecruitmentById,
  useUpdateRecruitment,
} from "@/src/hooks/useRecruitments";
import { useUploadMedia } from "@/src/hooks/useNews";
import type {
  EmploymentType,
  RecruitmentPayload,
  RecruitmentStatus,
} from "@/src/lib/api/recruitment";
import {
  recruitmentSchema,
  type RecruitmentFormValues,
} from "@/src/lib/validations/recruitment";

const EMPLOYMENT_TYPE_OPTIONS: { value: EmploymentType; label: string }[] = [
  { value: "fulltime", label: "Full-time" },
  { value: "parttime", label: "Part-time" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
];

const STATUS_OPTIONS: { value: RecruitmentStatus; label: string }[] = [
  { value: "draft", label: "Nháp" },
  { value: "hiring", label: "Đang tuyển" },
  { value: "closed", label: "Đã đóng" },
];

const DEFAULT_DEADLINE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

const DEFAULT_WORK_SCHEDULE: WorkSchedule = {
  days: ["t2", "t3", "t4", "t5", "t6"],
  startTime: "08:30",
  endTime: "18:00",
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
  const router = useRouter();

  const { data: job, isLoading: isLoadingJob, isError: isJobError } =
    useRecruitmentById(isEdit ? jobId : undefined);
  const { data: departments } = useDepartments();

  const createMutation = useCreateRecruitment();
  const updateMutation = useUpdateRecruitment();
  const uploadMutation = useUploadMedia();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RecruitmentFormValues>({
    resolver: zodResolver(recruitmentSchema),
    defaultValues: {
      jobTitle: "",
      departmentId: "",
      location: "",
      employmentType: "fulltime",
      status: "hiring",
      workingHours: formatWorkSchedule(DEFAULT_WORK_SCHEDULE, ""),
      description: "",
      requirements: "",
      benefits: "",
      coverImageURL: "",
      minSalary: "",
      maxSalary: "",
      isNegotiable: true,
      requiredCandidateNum: "",
      expiresAt: DEFAULT_DEADLINE,
    },
    values: job
      ? {
          jobTitle: job.jobTitle,
          departmentId: job.departmentId ?? "",
          location: job.location ?? "",
          employmentType: job.employmentType,
          status: job.status,
          workingHours: job.workingHours ?? "",
          description: job.description,
          requirements: job.requirements,
          benefits: job.benefits,
          coverImageURL: job.coverImageURL ?? "",
          minSalary: job.minSalary != null ? String(job.minSalary) : "",
          maxSalary: job.maxSalary != null ? String(job.maxSalary) : "",
          isNegotiable: job.isNegotiable ?? true,
          requiredCandidateNum:
            job.requiredCandidateNum != null
              ? String(job.requiredCandidateNum)
              : "",
          expiresAt: job.expiresAt ? new Date(job.expiresAt) : DEFAULT_DEADLINE,
        }
      : undefined,
  });

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [cropSource, setCropSource] = useState<string | null>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [workSchedule, setWorkSchedule] = useState<WorkSchedule>(
    DEFAULT_WORK_SCHEDULE
  );
  const [addDepartmentOpen, setAddDepartmentOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isNegotiable = watch("isNegotiable");
  const coverImageURL = watch("coverImageURL");
  const displayedCover = coverPreview ?? (coverImageURL || null);

  function selectCoverFile(file: File | undefined) {
    if (!file) return;
    setCropSource((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setCropDialogOpen(true);
  }

  function handleCropDialogChange(next: boolean) {
    setCropDialogOpen(next);
    if (!next && cropSource) {
      URL.revokeObjectURL(cropSource);
      setCropSource(null);
    }
  }

  function handleCropped(file: File) {
    setCoverPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    uploadMutation.mutate(file, {
      onSuccess: (result) => {
        setValue("coverImageURL", result.fileURL, { shouldValidate: true });
      },
    });
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    selectCoverFile(event.target.files?.[0]);
    event.target.value = "";
  }

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isBusy = isSaving || uploadMutation.isPending;

  const cancelHref = isEdit ? `/tuyen-dung/${jobId}` : "/tuyen-dung";

  const [pendingSubmit, setPendingSubmit] = useState<RecruitmentPayload | null>(
    null
  );

  const requestSubmit = handleSubmit((values) => {
    const payload: RecruitmentPayload = {
      jobTitle: values.jobTitle,
      departmentId: values.departmentId || null,
      location: values.location || null,
      employmentType: values.employmentType,
      workingHours: values.workingHours || null,
      description: values.description,
      requirements: values.requirements,
      benefits: values.benefits,
      coverImageURL: values.coverImageURL || null,
      status: values.status,
      minSalary: values.minSalary ? Number(values.minSalary) : null,
      maxSalary: values.maxSalary ? Number(values.maxSalary) : null,
      isNegotiable: values.isNegotiable ?? false,
      requiredCandidateNum: values.requiredCandidateNum
        ? Number(values.requiredCandidateNum)
        : null,
      expiresAt: values.expiresAt.toISOString(),
    };

    setPendingSubmit(payload);
  });

  function handleConfirmSubmit() {
    if (!pendingSubmit) return;
    const payload = pendingSubmit;
    const onSuccess = () => {
      setPendingSubmit(null);
      router.push("/tuyen-dung");
    };

    if (isEdit && jobId) {
      updateMutation.mutate({ id: jobId, payload }, { onSuccess });
    } else {
      createMutation.mutate(payload, { onSuccess });
    }
  }

  if (isEdit && isLoadingJob) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-sm text-[#64748B]">
        Đang tải tin tuyển dụng...
      </div>
    );
  }

  if (isEdit && isJobError) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-sm text-red-600">
        Không thể tải tin tuyển dụng. Vui lòng thử lại.
      </div>
    );
  }

  return (
    <form onSubmit={requestSubmit} noValidate className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-2 text-sm text-[#434750]">
            <Link href="/" className="hover:text-[#1C1B1B]">
              Dashboard
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/tuyen-dung" className="hover:text-[#1C1B1B]">
              Tuyển dụng
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-medium text-[#1C1B1B]">
              {isEdit ? "Sửa tin tuyển dụng" : "Thêm tin tuyển dụng"}
            </span>
          </nav>
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">
            {isEdit ? "Sửa thông tin tuyển dụng" : "Thêm tin tuyển dụng mới"}
          </h1>
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
            type="submit"
            disabled={isBusy}
            className="flex h-8.5 items-center gap-2 rounded-lg border border-white bg-[#316EE9] px-4 text-sm font-medium text-white hover:bg-[#316EE9]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isEdit ? (
              <>
                <Save className="size-3.5" />
                {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
              </>
            ) : (
              <>
                <Plus className="size-3.5" />
                {isSaving ? "Đang đăng..." : "Đăng tin tuyển dụng"}
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
                placeholder="Ví dụ: Backend Developer"
                className="h-9.5 rounded-lg border border-[#C4C6D2] bg-[#FCF9F8] px-4 text-sm text-[#1C1B1B] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#316EE9]"
                {...register("jobTitle")}
              />
              {errors.jobTitle && (
                <p className="text-sm text-red-600">{errors.jobTitle.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#1C1B1B]">
                  Phòng ban <span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="departmentId"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(next) => next && field.onChange(next)}
                    >
                      <SelectTrigger className="w-full rounded-lg border-[#C4C6D2] bg-[#FCF9F8] text-sm data-[size=default]:h-9.5">
                        <SelectValue placeholder="Chọn phòng ban">
                          {(value: string) =>
                            departments?.find((d) => d.id === value)?.name ?? ""
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {departments?.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.departmentId && (
                  <p className="text-sm text-red-600">
                    {errors.departmentId.message}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setAddDepartmentOpen(true)}
                  className="w-fit text-sm font-medium text-[#0054CD] hover:underline"
                >
                  + Thêm phòng ban mới
                </button>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#1C1B1B]">
                  Hình thức làm việc <span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="employmentType"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(next) => next && field.onChange(next)}
                    >
                      <SelectTrigger className="w-full rounded-lg border-[#C4C6D2] bg-[#FCF9F8] text-sm data-[size=default]:h-9.5">
                        <SelectValue placeholder="Chọn hình thức">
                          {(value: EmploymentType) =>
                            EMPLOYMENT_TYPE_OPTIONS.find((o) => o.value === value)
                              ?.label
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {EMPLOYMENT_TYPE_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#1C1B1B]">
                  Địa điểm làm việc
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hà Nội"
                  className="h-9.5 w-full rounded-lg border border-[#C4C6D2] bg-[#FCF9F8] px-4 text-sm text-[#1C1B1B] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#316EE9]"
                  {...register("location")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#1C1B1B]">
                  Thời gian làm việc
                </label>
                <Controller
                  control={control}
                  name="workingHours"
                  render={({ field }) => (
                    <WorkScheduleField
                      value={workSchedule}
                      onChange={(next) => {
                        setWorkSchedule(next);
                        field.onChange(formatWorkSchedule(next, ""));
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#1C1B1B]">
                  Trạng thái <span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(next) => next && field.onChange(next)}
                    >
                      <SelectTrigger className="w-full rounded-lg border-[#C4C6D2] bg-[#FCF9F8] text-sm data-[size=default]:h-9.5">
                        <SelectValue>
                          {(value: RecruitmentStatus) =>
                            STATUS_OPTIONS.find((o) => o.value === value)?.label
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#1C1B1B]">
                  Số lượng cần tuyển
                </label>
                <input
                  type="number"
                  min={0}
                  placeholder="Ví dụ: 2"
                  className="h-9.5 w-full rounded-lg border border-[#C4C6D2] bg-[#FCF9F8] px-4 text-sm text-[#1C1B1B] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#316EE9]"
                  {...register("requiredCandidateNum")}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#1C1B1B]">
                  Hạn ứng tuyển <span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="expiresAt"
                  render={({ field }) => (
                    <DatePickerField value={field.value} onChange={field.onChange} />
                  )}
                />
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
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <RichTextEditor value={field.value} onChange={field.onChange} />
                )}
              />
              {errors.description && (
                <p className="text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#1C1B1B]">
                Yêu cầu ứng viên <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="requirements"
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    variant="basic"
                  />
                )}
              />
              {errors.requirements && (
                <p className="text-sm text-red-600">
                  {errors.requirements.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#1C1B1B]">
                Quyền lợi được hưởng <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="benefits"
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    variant="basic"
                  />
                )}
              />
              {errors.benefits && (
                <p className="text-sm text-red-600">{errors.benefits.message}</p>
              )}
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
              <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg bg-[#E5E7EB]">
                {displayedCover ? (
                  <Image
                    src={displayedCover}
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
                onChange={handleFileInputChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadMutation.isPending}
                className="flex items-center gap-2 rounded-lg bg-[#001E4B] px-4 py-2 text-sm font-medium text-white hover:bg-[#001E4B]/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ImagePlus className="size-3.5" />
                {uploadMutation.isPending ? "Đang tải lên..." : "Chọn ảnh"}
              </button>
            </div>
            {uploadMutation.isError && (
              <p className="text-xs text-red-600">
                Tải ảnh lên thất bại. Vui lòng thử lại.
              </p>
            )}
            <ul className="flex flex-col gap-1 text-xs text-[#434750]">
              <li>• Kích thước khuyến nghị: 1200x675px</li>
              <li>• Định dạng: JPG, PNG, WebP</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-5 shadow-xs">
            <h3 className="text-xl font-semibold text-[#001E4B]">
              TIỀN LƯƠNG
            </h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1C1B1B]">Min</label>
              <Controller
                control={control}
                name="minSalary"
                render={({ field }) => (
                  <CurrencyInput
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    placeholder="Nhập số tiền..."
                    disabled={isNegotiable}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1C1B1B]">Max</label>
              <Controller
                control={control}
                name="maxSalary"
                render={({ field }) => (
                  <CurrencyInput
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    placeholder="Nhập số tiền..."
                    disabled={isNegotiable}
                  />
                )}
              />
            </div>

            <div className="flex items-center gap-3">
              <Controller
                control={control}
                name="isNegotiable"
                render={({ field }) => (
                  <Switch
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                  />
                )}
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

      <ImageCropDialog
        open={cropDialogOpen}
        onOpenChange={handleCropDialogChange}
        imageSrc={cropSource}
        aspect={16 / 9}
        onCropped={handleCropped}
      />

      <AddDepartmentDialog
        open={addDepartmentOpen}
        onOpenChange={setAddDepartmentOpen}
        onCreated={(departmentId) =>
          setValue("departmentId", departmentId, { shouldValidate: true })
        }
      />

      <ConfirmDialog
        open={!!pendingSubmit}
        onOpenChange={(open) => {
          if (!open) setPendingSubmit(null);
        }}
        title={isEdit ? "Xác nhận lưu thay đổi" : "Xác nhận đăng tin tuyển dụng"}
        description={
          isEdit
            ? "Bạn có chắc chắn muốn lưu các thay đổi này không? Thông tin mới sẽ được cập nhật ngay lập tức trên hệ thống."
            : "Bạn có chắc chắn muốn đăng tin tuyển dụng này không? Thông tin mới sẽ được cập nhật ngay lập tức trên hệ thống."
        }
        cancelLabel="Tiếp tục chỉnh sửa"
        confirmLabel={isEdit ? "Lưu ngay" : "Đăng tin ngay"}
        onConfirm={handleConfirmSubmit}
        isConfirming={isSaving}
      />
    </form>
  );
}
