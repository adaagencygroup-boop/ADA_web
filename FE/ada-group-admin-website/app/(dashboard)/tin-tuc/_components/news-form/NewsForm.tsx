"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Eye, Save, UploadCloud, X } from "lucide-react";
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
import ConfirmDialog from "@/src/components/shared/ConfirmDialog";
import {
  useCreateNews,
  useNewsById,
  useUpdateNews,
  useUploadMedia,
} from "@/src/hooks/useNews";
import { useNewsCategories } from "@/src/hooks/useNewsCategories";
import type { NewsStatus, NewsPayload } from "@/src/lib/api/news";
import { newsSchema, type NewsFormValues } from "@/src/lib/validations/news";
import ArticlePreviewDialog from "@/app/(dashboard)/tin-tuc/_components/news-form/ArticlePreviewDialog";

export type NewsFormMode = "create" | "edit";

export default function NewsForm({
  mode,
  newsId,
}: {
  mode: NewsFormMode;
  newsId?: string;
}) {
  const isEdit = mode === "edit";
  const router = useRouter();

  const { data: article, isLoading: isLoadingArticle, isError: isArticleError } =
    useNewsById(isEdit ? newsId : undefined);
  const { data: categories } = useNewsCategories();

  const createMutation = useCreateNews();
  const updateMutation = useUpdateNews();
  const uploadMutation = useUploadMedia();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      categoryId: "",
      content: "",
      coverImageURL: "",
      isFeatured: false,
    },
    values: article
      ? {
          title: article.title,
          categoryId: article.categoryId ?? "",
          content: article.content,
          coverImageURL: article.coverImageURL ?? "",
          isFeatured: article.isFeatured,
        }
      : undefined,
  });

  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [cropSource, setCropSource] = useState<string | null>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  function handleRemoveCover() {
    setCoverPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setValue("coverImageURL", "", { shouldValidate: true });
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

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    selectCoverFile(event.dataTransfer.files?.[0]);
  }

  const [pendingSubmit, setPendingSubmit] = useState<{
    status: NewsStatus;
    payload: NewsPayload;
  } | null>(null);

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isBusy = isSaving || uploadMutation.isPending;

  const requestSubmit = (status: NewsStatus) =>
    handleSubmit((values) => {
      const payload: NewsPayload = {
        title: values.title,
        categoryId: values.categoryId || null,
        content: values.content,
        coverImageURL: values.coverImageURL || null,
        status,
        isFeatured: values.isFeatured ?? false,
      };
      setPendingSubmit({ status, payload });
    });

  function handleConfirmSubmit() {
    if (!pendingSubmit) return;
    const { payload } = pendingSubmit;
    const onSuccess = () => {
      setPendingSubmit(null);
      router.push("/tin-tuc");
    };

    if (isEdit && newsId) {
      updateMutation.mutate({ id: newsId, payload }, { onSuccess });
    } else {
      createMutation.mutate(payload, { onSuccess });
    }
  }

  if (isEdit && isLoadingArticle) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-sm text-[#64748B]">
        Đang tải bài viết...
      </div>
    );
  }

  if (isEdit && isArticleError) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-sm text-red-600">
        Không thể tải bài viết. Vui lòng thử lại.
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
            <Link href="/tin-tuc" className="hover:text-[#1C1B1B]">
              Quản lý tin tức
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-medium text-[#1C1B1B]">
              {isEdit ? "Sửa tin tức" : "Thêm tin tức mới"}
            </span>
          </nav>
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">
            {isEdit ? "Sửa tin tức" : "Thêm tin tức mới"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="flex h-10.5 items-center gap-2 rounded-lg border border-[#CBD5E1] bg-white px-4 text-sm font-medium text-[#334155] hover:bg-[#F8FAFC]"
          >
            <Eye className="size-4" />
            Xem trước
          </button>
          <button
            type="button"
            disabled={isBusy}
            onClick={requestSubmit("draft")}
            className="flex h-10.5 items-center gap-2 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-4 text-sm font-medium text-[#2563EB] hover:bg-[#DBEAFE] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="size-4" />
            Lưu nháp
          </button>
          <button
            type="button"
            disabled={isBusy}
            onClick={requestSubmit("published")}
            className="flex h-10 items-center gap-2 rounded-lg bg-[#2563EB] px-4 text-sm font-medium text-white hover:bg-[#2563EB]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <UploadCloud className="size-4" />
            {isSaving ? "Đang lưu..." : "Xuất bản"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-xs">
            <h2 className="border-b border-[#F1F5F9] pb-2 text-lg font-semibold text-[#1E293B]">
              Thông tin cơ bản
            </h2>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#334155]">
                Tiêu đề bài viết <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Nhập tiêu đề bài viết"
                className="h-9.5 rounded-lg border border-[#CBD5E1] px-3 text-sm text-[#1E293B] outline-none placeholder:text-[#94A3B8] focus-visible:border-[#2563EB]"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#334155]">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <Controller
                control={control}
                name="categoryId"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(next) => next && field.onChange(next)}
                  >
                    <SelectTrigger className="w-full rounded-lg border-[#CBD5E1] text-sm text-[#334155] data-[size=default]:h-9.5">
                      <SelectValue placeholder="-- Chọn danh mục --">
                        {(value: string) =>
                          categories?.find((c) => c.id === value)?.name ?? ""
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categoryId && (
                <p className="text-sm text-red-600">
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-xs">
            <h2 className="border-b border-[#F1F5F9] pb-2 text-lg font-semibold text-[#1E293B]">
              Nội dung bài viết <span className="text-red-500">*</span>
            </h2>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  variant="full"
                />
              )}
            />
            {errors.content && (
              <p className="text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 lg:w-95 lg:shrink-0">
          <div className="flex flex-col gap-3 rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-xs">
            <h2 className="text-lg font-semibold text-[#1E293B]">Ảnh đại diện</h2>
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`relative flex aspect-video w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-lg border-2 border-dashed bg-[#F8FAFC] px-8 text-center ${
                dragActive ? "border-[#2563EB]" : "border-[#CBD5E1]"
              }`}
            >
              {displayedCover ? (
                <>
                  <Image
                    src={displayedCover}
                    alt="Ảnh đại diện"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <button
                    type="button"
                    aria-label="Xóa ảnh đại diện"
                    onClick={handleRemoveCover}
                    className="absolute top-2 right-2 z-10 flex size-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                  >
                    <X className="size-4" />
                  </button>
                </>
              ) : (
                <>
                  <UploadCloud className="size-7 text-[#94A3B8]" />
                  <span className="text-sm text-[#475569]">
                    Kéo thả ảnh vào đây hoặc
                  </span>
                </>
              )}
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
                className="relative z-10 flex items-center justify-center rounded-lg bg-[#2563EB] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#2563EB]/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploadMutation.isPending ? "Đang tải lên..." : "Chọn ảnh"}
              </button>
            </div>
            {uploadMutation.isError && (
              <p className="text-xs text-red-600">
                Tải ảnh lên thất bại. Vui lòng thử lại.
              </p>
            )}
            <p className="text-xs text-[#64748B]">
              Kích thước đề xuất: 1200x675px (16:9)
              <br />
              Định dạng: JPG, PNG, WebP. Dung lượng tối đa 2MB
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-xs">
            <h2 className="border-b border-[#F1F5F9] pb-2 text-lg font-semibold text-[#1E293B]">
              Cài đặt khác
            </h2>
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-[#334155]">
                  Nổi bật
                </span>
                <span className="text-xs text-[#64748B]">
                  Hiển thị bài viết ở trang chủ
                </span>
              </div>
              <Controller
                control={control}
                name="isFeatured"
                render={({ field }) => (
                  <Switch
                    checked={field.value ?? false}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <ArticlePreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        title={watch("title")}
        category={
          categories?.find((c) => c.id === watch("categoryId"))?.name ?? ""
        }
        content={watch("content")}
        thumbnail={displayedCover}
        featured={watch("isFeatured") ?? false}
      />

      <ImageCropDialog
        open={cropDialogOpen}
        onOpenChange={handleCropDialogChange}
        imageSrc={cropSource}
        aspect={16 / 9}
        onCropped={handleCropped}
      />

      <ConfirmDialog
        open={!!pendingSubmit}
        onOpenChange={(open) => {
          if (!open) setPendingSubmit(null);
        }}
        title={
          pendingSubmit?.status === "draft"
            ? "Xác nhận lưu nháp"
            : "Xác nhận xuất bản"
        }
        description={
          pendingSubmit?.status === "draft"
            ? "Bạn có chắc chắn muốn nháp bài viết này không? Thông tin mới sẽ được cập nhật ngay lập tức trên hệ thống."
            : "Bạn có chắc chắn muốn xuất bản bài viết này không? Thông tin mới sẽ được cập nhật ngay lập tức trên hệ thống."
        }
        confirmLabel={pendingSubmit?.status === "draft" ? "Lưu nháp" : "Xuất bản"}
        onConfirm={handleConfirmSubmit}
        isConfirming={isSaving}
      />
    </div>
  );
}
