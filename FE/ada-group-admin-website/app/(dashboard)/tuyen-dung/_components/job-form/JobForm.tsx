"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
  DEFAULT_WORK_SCHEDULE,
  formatWorkSchedule,
  parseWorkSchedule,
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

const DEFAULT_DEADLINE = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

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
    trigger,
    formState: { errors },
  } = useForm<RecruitmentFormValues>({
    resolver: zodResolver(recruitmentSchema),
    mode: "onChange",
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

  useEffect(() => {
    if (job?.workingHours) {
      setWorkSchedule(parseWorkSchedule(job.workingHours));
    }
  }, [job?.workingHours]);

  const isNegotiable = watch("isNegotiable");
  const minSalaryValue = watch("minSalary");
  const maxSalaryValue = watch("maxSalary");
  const coverImageURL = watch("coverImageURL");
  const displayedCover = coverPreview ?? (coverImageURL || null);

  const isSalaryMissing = !isNegotiable && !minSalaryValue && !maxSalaryValue;

  const currentJobTitle = watch("jobTitle");
  const currentDeptId = watch("departmentId");
  const currentLocation = watch("location");
  const currentEmpType = watch("employmentType");
  const currentWorkingHours = watch("workingHours");
  const currentDescription = watch("description");
  const currentRequirements = watch("requirements");
  const currentBenefits = watch("benefits");
  const currentReqNum = watch("requiredCandidateNum");

  const isFormChanged = isEdit && job
    ? (
        (currentJobTitle ?? "").trim() !== (job.jobTitle ?? "").trim() ||
        (currentDeptId ?? "") !== (job.departmentId ?? "") ||
        (currentLocation ?? "").trim() !== (job.location ?? "").trim() ||
        currentEmpType !== job.employmentType ||
        (currentWorkingHours ?? "").trim() !== (job.workingHours ?? "").trim() ||
        (currentDescription ?? "").trim() !== (job.description ?? "").trim() ||
        (currentRequirements ?? "").trim() !== (job.requirements ?? "").trim() ||
        (currentBenefits ?? "").trim() !== (job.benefits ?? "").trim() ||
        (coverImageURL ?? "") !== (job.coverImageURL ?? "") ||
        (minSalaryValue ?? "") !== (job.minSalary != null ? String(job.minSalary) : "") ||
        (maxSalaryValue ?? "") !== (job.maxSalary != null ? String(job.maxSalary) : "") ||
        (isNegotiable ?? true) !== (job.isNegotiable ?? true) ||
        (currentReqNum ?? "") !== (job.requiredCandidateNum != null ? String(job.requiredCandidateNum) : "") ||
        coverPreview !== null
      )
    : (
        (currentJobTitle ?? "").trim().length > 0 ||
        (currentDeptId ?? "").trim().length > 0 ||
        (currentLocation ?? "").trim().length > 0 ||
        (currentDescription ?? "").trim().length > 0 ||
        (currentRequirements ?? "").trim().length > 0 ||
        (currentBenefits ?? "").trim().length > 0 ||
        (coverImageURL ?? "").trim().length > 0 ||
        (currentReqNum ?? "").trim().length > 0 ||
        coverPreview !== null
      );

  const isNavigatingAwayRef = useRef(false);
  const isDirtyRef = useRef(false);
  isDirtyRef.current = isFormChanged;

  const [leaveConfirmOpen, setLeaveConfirmOpen] = useState(false);
  const [pendingNavigationUrl, setPendingNavigationUrl] = useState<string | null>(null);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirtyRef.current && !isNavigatingAwayRef.current) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!isDirtyRef.current || isNavigatingAwayRef.current) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        anchor.target === "_blank"
      ) {
        return;
      }

      try {
        const targetUrl = new URL(href, window.location.origin);
        const currentUrl = new URL(window.location.href);
        if (
          targetUrl.pathname === currentUrl.pathname &&
          targetUrl.search === currentUrl.search
        ) {
          return;
        }
      } catch {
        // ignore
      }

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      setPendingNavigationUrl(href);
      setLeaveConfirmOpen(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("click", handleClick, { capture: true });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);

  function handleConfirmLeave() {
    if (pendingNavigationUrl) {
      isNavigatingAwayRef.current = true;
      setLeaveConfirmOpen(false);
      router.push(pendingNavigationUrl);
    }
  }

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

  const isDraftDisabled =
    isBusy || (isEdit && job?.status === "draft" && !isFormChanged);

  const isPublishDisabled =
    isBusy || (isEdit && job?.status === "hiring" && !isFormChanged);

  const cancelHref = isEdit ? `/tuyen-dung/${jobId}` : "/tuyen-dung";
  function handleCancelClick() {
    if (isFormChanged) {
      setPendingNavigationUrl(cancelHref);
      setLeaveConfirmOpen(true);
    } else {
      router.push(cancelHref);
    }
  }

  const [pendingSubmit, setPendingSubmit] = useState<{
    status: RecruitmentStatus;
    payload: RecruitmentPayload;
  } | null>(null);

  const requestSubmit = (status: RecruitmentStatus) =>
    handleSubmit(
      (values) => {
        const payload: RecruitmentPayload = {
          jobTitle: values.jobTitle.trim(),
          departmentId: values.departmentId || null,
          location: values.location?.trim() || null,
          employmentType: values.employmentType,
          workingHours: values.workingHours?.trim() || null,
          description: values.description.trim(),
          requirements: values.requirements.trim(),
          benefits: values.benefits.trim(),
          coverImageURL: values.coverImageURL || null,
          status,
          minSalary: values.minSalary ? Number(values.minSalary.replace(/,/g, "")) : null,
          maxSalary: values.maxSalary ? Number(values.maxSalary.replace(/,/g, "")) : null,
          isNegotiable: values.isNegotiable ?? false,
          requiredCandidateNum: values.requiredCandidateNum
            ? Number(values.requiredCandidateNum)
            : null,
          expiresAt: (() => {
            const d = new Date(values.expiresAt);
            d.setHours(23, 59, 59, 999);
            return d.toISOString();
          })(),
        };
        setPendingSubmit({ status, payload });
      },
      () => {
        toast.error("Vui lòng kiểm tra lại các thông tin bắt buộc và không nhập chỉ toàn khoảng trắng.");
      }
    );

  function handleConfirmSubmit() {
    if (!pendingSubmit) return;
    const { payload } = pendingSubmit;
    const onSuccess = () => {
      isNavigatingAwayRef.current = true;
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
    <div className="flex flex-1 flex-col gap-6">
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

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={isBusy}
            onClick={handleCancelClick}
            className="flex h-10 items-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-4 text-sm font-medium text-[#334155] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="size-4" />
            Hủy bỏ
          </button>
          {isEdit && (
            <Link
              href={`/tuyen-dung/${jobId}`}
              className="flex h-10 items-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-4 text-sm font-medium text-[#334155] hover:bg-[#F8FAFC]"
            >
              <Eye className="size-4" />
              Xem trước
            </Link>
          )}
          <button
            type="button"
            disabled={isDraftDisabled}
            onClick={requestSubmit("draft")}
            className="flex h-10 items-center gap-2 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-4 text-sm font-medium text-[#2563EB] hover:bg-[#DBEAFE] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="size-4" />
            {isSaving && pendingSubmit?.status === "draft"
              ? "Đang lưu..."
              : isEdit && job?.status === "hiring"
                ? "Lưu nháp"
                : "Lưu nháp"}
          </button>
          {isEdit && job?.status === "hiring" && (
            <button
              type="button"
              disabled={isBusy}
              onClick={requestSubmit("closed")}
              className="flex h-10 items-center gap-2 rounded-lg border border-[#FED7AA] bg-[#FFF7ED] px-4 text-sm font-medium text-[#C2410C] hover:bg-[#FFEDD5] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className="size-4" />
              {isSaving && pendingSubmit?.status === "closed"
                ? "Đang đóng..."
                : "Đóng tin"}
            </button>
          )}
          <button
            type="button"
            disabled={isPublishDisabled}
            onClick={requestSubmit("hiring")}
            className="flex h-10 items-center gap-2 rounded-lg bg-[#2563EB] px-4 text-sm font-medium text-white hover:bg-[#2563EB]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="size-4" />
            {isSaving && pendingSubmit?.status === "hiring"
              ? isEdit ? "Đang lưu..." : "Đang đăng..."
              : isEdit
                ? (job?.status === "draft" || job?.status === "closed" ? "Đăng tuyển ngay" : "Lưu thay đổi")
                : "Đăng tin tuyển dụng"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <div className="flex flex-col gap-6 rounded-xl border border-[#C4C6D2] bg-[#FCF9F8] p-6 shadow-xs">
            <h2 className="flex items-center gap-2 text-[22px] font-semibold text-[#0054CD]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#0054CD] text-sm font-semibold text-white">
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
                className={`h-9.5 rounded-lg border bg-[#FCF9F8] px-4 text-sm text-[#1C1B1B] outline-none placeholder:text-[#9CA3AF] transition-colors ${
                  errors.jobTitle
                    ? "border-red-500 focus-visible:border-red-500"
                    : "border-[#C4C6D2] focus-visible:border-[#316EE9]"
                }`}
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
                  Địa điểm làm việc <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Hà Nội"
                  className="h-9.5 w-full rounded-lg border border-[#C4C6D2] bg-[#FCF9F8] px-4 text-sm text-[#1C1B1B] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#316EE9]"
                  {...register("location")}
                />
                {errors.location && (
                  <p className="text-sm text-red-600">{errors.location.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#1C1B1B]">
                  Thời gian làm việc <span className="text-red-500">*</span>
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
                        trigger("workingHours");
                      }}
                      error={errors.workingHours?.message}
                    />
                  )}
                />
                {errors.workingHours && (
                  <p className="text-sm text-red-600">{errors.workingHours.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-[#1C1B1B]">
                  Số lượng cần tuyển <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  step={1}
                  placeholder="Ví dụ: 2"
                  className="h-9.5 w-full rounded-lg border border-[#C4C6D2] bg-[#FCF9F8] px-4 text-sm text-[#1C1B1B] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#316EE9]"
                  {...register("requiredCandidateNum")}
                />
                {errors.requiredCandidateNum && (
                  <p className="text-sm text-red-600">{errors.requiredCandidateNum.message}</p>
                )}
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
                {errors.expiresAt && (
                  <p className="text-sm text-red-600">{errors.expiresAt.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-xl border border-[#C4C6D2] bg-[#FCF9F8] p-6 shadow-xs">
            <h2 className="flex items-center gap-2 text-[22px] font-semibold text-[#0054CD]">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#0054CD] text-sm font-semibold text-white">
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
              ẢNH ĐẠI DIỆN <span className="text-red-500">*</span>
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
            {errors.coverImageURL && (
              <p className="text-sm text-red-600">{errors.coverImageURL.message}</p>
            )}
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
            <div>
              <h3 className="text-xl font-semibold text-[#001E4B]">
                TIỀN LƯƠNG
              </h3>
              {(errors as Record<string, any>).salarySection && isSalaryMissing && (
                <p className="mt-1 text-sm text-red-600">
                  {(errors as Record<string, any>).salarySection.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1C1B1B]">Min</label>
              <Controller
                control={control}
                name="minSalary"
                render={({ field }) => (
                  <CurrencyInput
                    value={field.value ?? ""}
                    onChange={(val) => {
                      field.onChange(val);
                      trigger(["minSalary", "maxSalary"]);
                    }}
                    placeholder="Nhập số tiền..."
                    disabled={isNegotiable}
                  />
                )}
              />
              {errors.minSalary && (
                <p className="text-sm text-red-600">{errors.minSalary.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-[#1C1B1B]">Max</label>
              <Controller
                control={control}
                name="maxSalary"
                render={({ field }) => (
                  <CurrencyInput
                    value={field.value ?? ""}
                    onChange={(val) => {
                      field.onChange(val);
                      trigger(["minSalary", "maxSalary"]);
                    }}
                    placeholder="Nhập số tiền..."
                    disabled={isNegotiable}
                  />
                )}
              />
              {errors.maxSalary && (
                <p className="text-sm text-red-600">{errors.maxSalary.message}</p>
              )}
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
        title={
          pendingSubmit?.status === "draft"
            ? isEdit && job?.status === "hiring"
              ? "Xác nhận chuyển về bản nháp"
              : "Xác nhận lưu nháp"
            : pendingSubmit?.status === "closed"
              ? "Xác nhận đóng tin tuyển dụng"
              : isEdit
                ? "Xác nhận lưu thay đổi"
                : "Xác nhận đăng tin tuyển dụng"
        }
        description={
          pendingSubmit?.status === "draft"
            ? isEdit && job?.status === "hiring"
              ? "Bạn có chắc chắn muốn chuyển tin tuyển dụng này về bản nháp không? Tin sẽ không còn hiển thị công khai trên website."
              : "Bạn có chắc chắn muốn lưu tin tuyển dụng này dưới dạng bản nháp không?"
            : pendingSubmit?.status === "closed"
              ? "Bạn có chắc chắn muốn đóng tin tuyển dụng này không? Ứng viên sẽ không thể gửi hồ sơ ứng tuyển được nữa."
              : isEdit
                ? "Bạn có chắc chắn muốn lưu các thay đổi cho tin tuyển dụng này không? Thông tin mới sẽ được cập nhật ngay lập tức."
                : "Bạn có chắc chắn muốn đăng tin tuyển dụng này lên website không? Tin tuyển dụng sẽ được hiển thị công khai ngay lập tức."
        }
        confirmLabel={
          pendingSubmit?.status === "draft"
            ? isEdit && job?.status === "hiring"
              ? "Chuyển về nháp"
              : "Lưu nháp"
            : pendingSubmit?.status === "closed"
              ? "Đóng tin"
              : isEdit
                ? "Lưu thay đổi"
                : "Đăng tin ngay"
        }
        onConfirm={handleConfirmSubmit}
        isConfirming={isSaving}
      />

      <ConfirmDialog
        open={leaveConfirmOpen}
        onOpenChange={(open) => {
          setLeaveConfirmOpen(open);
          if (!open) setPendingNavigationUrl(null);
        }}
        title="Xác nhận rời khỏi trang"
        description="Bạn có các thay đổi chưa được lưu. Bạn có chắc chắn muốn rời khỏi trang không? Mọi nội dung thay đổi sẽ bị mất."
        cancelLabel="Ở lại tiếp tục"
        confirmLabel="Rời khỏi"
        onConfirm={handleConfirmLeave}
      />
    </div>
  );
}