import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  Hash,
  Info,
  Pencil,
  Star,
  Tag,
  User,
} from "lucide-react";
import { RICH_TEXT_TYPOGRAPHY_CLASS } from "@/src/components/shared/RichTextEditor";
import type { NewsDetail, NewsStatus } from "@/src/lib/api/news";

const STATUS_STYLES: Record<NewsStatus, string> = {
  published: "bg-[#D1FAE5] text-[#047857]",
  draft: "bg-[#FEF3C7] text-[#92400E]",
};

const STATUS_LABELS: Record<NewsStatus, string> = {
  published: "Đã xuất bản",
  draft: "Bản nháp",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ArticleDetailView({
  article,
}: {
  article: NewsDetail;
}) {
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
            <span className="font-medium text-[#1C1B1B]">Xem bài viết</span>
          </nav>
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">
            Xem bài viết
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/tin-tuc"
            className="flex h-9.5 items-center gap-2 rounded-lg border border-[#747782] px-4 text-sm font-medium text-[#1C1B1B] hover:bg-[#F8FAFC]"
          >
            <ArrowLeft className="size-3.5" />
            Quay lại danh sách
          </Link>
          <Link
            href={`/tin-tuc/${article.id}/sua`}
            className="flex h-9 items-center gap-2 rounded-lg bg-[#003274] px-4 text-sm font-medium text-white hover:bg-[#003274]/90"
          >
            <Pencil className="size-3.5" />
            Chỉnh sửa
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-[#FCF9F8] p-8 shadow-xs xl:col-span-2">
          <span className="w-fit rounded-full bg-[#AEC6FF] px-3 py-1 text-sm font-medium text-[#001A43]">
            {article.categoryName ?? "Chưa phân loại"}
          </span>

          <h2 className="text-[28px] leading-tight font-semibold text-[#1C1B1B]">
            {article.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 border-b border-[#C4C6D2] pb-6 text-sm text-[#434750]">
            <span className="flex items-center gap-1.5">
              <User className="size-3" />
              {article.authorName ?? "Admin"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {formatDate(article.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="size-3.5" />
              {article.viewCount.toLocaleString("vi-VN")} lượt xem
            </span>
            {article.isFeatured && (
              <span className="flex items-center gap-1.5 font-medium text-[#0054CD]">
                <Star className="size-3.5 fill-[#0054CD]" />
                Nổi bật
              </span>
            )}
          </div>

          {article.coverImageURL && (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={article.coverImageURL}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div
            className={`text-base text-[#1C1B1B] ${RICH_TEXT_TYPOGRAPHY_CLASS}`}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        <div className="flex flex-col gap-5 self-start rounded-xl border border-[#C4C6D2] bg-[#FCF9F8] p-6 shadow-xs">
          <h3 className="border-b border-[#C4C6D2] pb-4 text-xl font-semibold text-[#1C1B1B]">
            Thông tin bài viết
          </h3>

          <div className="flex items-start gap-3">
            <Hash className="mt-0.5 size-4 shrink-0 text-[#434750]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-[#434750]">ID bài viết</span>
              <span className="font-mono text-sm font-medium break-all text-[#1C1B1B]">
                {article.id}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Tag className="mt-0.5 size-4 shrink-0 text-[#434750]" />
            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#434750]">Tên danh mục</span>
              <span className="w-fit rounded-full bg-[#AEC6FF] px-2.5 py-1 text-xs font-medium text-[#001A43]">
                {article.categoryName ?? "Chưa phân loại"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-4 shrink-0 text-[#434750]" />
            <div className="flex flex-col gap-1">
              <span className="text-sm text-[#434750]">Trạng thái</span>
              <span
                className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[article.status]}`}
              >
                {STATUS_LABELS[article.status]}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 size-4 shrink-0 text-[#434750]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-[#434750]">Ngày đăng</span>
              <span className="text-base font-medium text-[#1C1B1B]">
                {formatDate(article.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="mt-0.5 size-4 shrink-0 text-[#434750]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-[#434750]">Người đăng</span>
              <span className="text-base font-medium text-[#1C1B1B]">
                {article.authorName}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Eye className="mt-0.5 size-4 shrink-0 text-[#434750]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-[#434750]">Lượt xem</span>
              <span className="text-base font-medium text-[#1C1B1B]">
                {article.viewCount.toLocaleString("vi-VN")}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Star className="mt-0.5 size-4 shrink-0 text-[#434750]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-[#434750]">Nổi bật</span>
              <span
                className={`flex items-center gap-1 text-base font-medium ${
                  article.isFeatured ? "text-[#0054CD]" : "text-[#1C1B1B]"
                }`}
              >
                {article.isFeatured && (
                  <Star className="size-3.5 fill-[#0054CD]" />
                )}
                {article.isFeatured ? "Có" : "Không"}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 size-4 shrink-0 text-[#434750]" />
            <div className="flex flex-col gap-0.5">
              <span className="text-sm text-[#434750]">Ngày cập nhật</span>
              <span className="text-base font-medium text-[#1C1B1B]">
                {formatDate(article.updatedAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
