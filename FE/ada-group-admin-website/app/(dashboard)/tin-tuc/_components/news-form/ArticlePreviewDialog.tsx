"use client";

import Image from "next/image";
import { Calendar, Eye, Star, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { RICH_TEXT_TYPOGRAPHY_CLASS } from "@/src/components/shared/RichTextEditor";

function formatNow() {
  return new Date().toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ArticlePreviewDialog({
  open,
  onOpenChange,
  title,
  category,
  content,
  thumbnail,
  featured,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  category: string;
  content: string;
  thumbnail: string | null;
  featured: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] w-full max-w-3xl overflow-y-auto p-0 sm:max-w-3xl">
        <DialogTitle className="sr-only">Xem trước bài viết</DialogTitle>
        <div className="flex flex-col gap-4 p-8">
          <span className="w-fit rounded-full bg-[#AEC6FF] px-3 py-1 text-sm font-medium text-[#001A43]">
            {category || "Chưa chọn danh mục"}
          </span>

          <h2 className="text-[28px] leading-tight font-semibold text-[#1C1B1B]">
            {title || "Chưa có tiêu đề"}
          </h2>

          <div className="flex flex-wrap items-center gap-4 border-b border-[#C4C6D2] pb-6 text-sm text-[#434750]">
            <span className="flex items-center gap-1.5">
              <User className="size-3" />
              Admin
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {formatNow()}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="size-3.5" />
              0 lượt xem
            </span>
            {featured && (
              <span className="flex items-center gap-1.5 font-medium text-[#0054CD]">
                <Star className="size-3.5 fill-[#0054CD]" />
                Nổi bật
              </span>
            )}
          </div>

          {thumbnail && (
            <div className="relative h-80 w-full overflow-hidden rounded-lg">
              <Image src={thumbnail} alt={title} fill unoptimized className="object-cover" />
            </div>
          )}

          {content ? (
            <div
              className={`text-base text-[#1C1B1B] ${RICH_TEXT_TYPOGRAPHY_CLASS}`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <p className="text-base text-[#9CA3AF]">Chưa có nội dung bài viết.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
