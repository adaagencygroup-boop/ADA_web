"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Eye, Save, UploadCloud } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Switch } from "@/src/components/ui/switch";
import RichTextEditor from "@/src/components/shared/RichTextEditor";
import {
  CATEGORIES,
  getNewsArticle,
} from "@/app/(dashboard)/tin-tuc/_components/data";
import ArticlePreviewDialog from "@/app/(dashboard)/tin-tuc/_components/news-form/ArticlePreviewDialog";

export type NewsFormMode = "create" | "edit";

export default function NewsForm({
  mode,
  newsId,
}: {
  mode: NewsFormMode;
  newsId?: number;
}) {
  const isEdit = mode === "edit";
  const article = isEdit && newsId ? getNewsArticle(newsId) : null;

  const [title, setTitle] = useState(article?.title ?? "");
  const [category, setCategory] = useState(article?.category ?? "");
  const [content, setContent] = useState("");
  const [featured, setFeatured] = useState(article?.featured ?? false);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function applyAvatarFile(file: File | undefined) {
    if (!file) return;
    setAvatarPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    applyAvatarFile(event.target.files?.[0]);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    applyAvatarFile(event.dataTransfer.files?.[0]);
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
            className="flex h-10.5 items-center gap-2 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] px-4 text-sm font-medium text-[#2563EB] hover:bg-[#DBEAFE]"
          >
            <Save className="size-4" />
            Lưu nháp
          </button>
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-lg bg-[#2563EB] px-4 text-sm font-medium text-white hover:bg-[#2563EB]/90"
          >
            <UploadCloud className="size-4" />
            Xuất bản
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-xs">
            <h2 className="border-b border-[#F1F5F9] pb-2 text-lg font-bold text-[#1E293B]">
              Thông tin cơ bản
            </h2>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#334155]">
                Tiêu đề bài viết <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Nhập tiêu đề bài viết"
                className="h-9.5 rounded-lg border border-[#CBD5E1] px-3 text-sm text-[#1E293B] outline-none placeholder:text-[#94A3B8] focus-visible:border-[#2563EB]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#334155]">
                Danh mục <span className="text-red-500">*</span>
              </label>
              <Select
                value={category}
                onValueChange={(next) => next && setCategory(next)}
              >
                <SelectTrigger className="w-full rounded-lg border-[#CBD5E1] text-sm text-[#334155] data-[size=default]:h-9.5">
                  <SelectValue placeholder="-- Chọn danh mục --" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-xs">
            <h2 className="border-b border-[#F1F5F9] pb-2 text-lg font-bold text-[#1E293B]">
              Nội dung bài viết <span className="text-red-500">*</span>
            </h2>
            <RichTextEditor value={content} onChange={setContent} variant="full" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 lg:w-95 lg:shrink-0">
          <div className="flex flex-col gap-3 rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-xs">
            <h2 className="text-lg font-bold text-[#1E293B]">Ảnh đại diện</h2>
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center gap-3 overflow-hidden rounded-lg border-2 border-dashed bg-[#F8FAFC] px-8 py-9 text-center ${
                dragActive ? "border-[#2563EB]" : "border-[#CBD5E1]"
              }`}
            >
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt="Ảnh đại diện"
                  fill
                  unoptimized
                  className="object-cover"
                />
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
                className="relative z-10 flex items-center justify-center rounded-lg bg-[#2563EB] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#2563EB]/90"
              >
                Chọn ảnh
              </button>
            </div>
            <p className="text-xs text-[#64748B]">
              Kích thước đề xuất: 1200x675px (16:9)
              <br />
              Định dạng: JPG, PNG, WebP. Dung lượng tối đa 2MB
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-lg border border-[#E2E8F0] bg-white p-6 shadow-xs">
            <h2 className="border-b border-[#F1F5F9] pb-2 text-lg font-bold text-[#1E293B]">
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
              <Switch checked={featured} onCheckedChange={setFeatured} />
            </div>
          </div>
        </div>
      </div>

      <ArticlePreviewDialog
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        title={title}
        category={category}
        content={content}
        thumbnail={avatarPreview}
        featured={featured}
      />
    </div>
  );
}
