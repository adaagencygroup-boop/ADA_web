"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CalendarClock,
  ChevronRight,
  Download,
  ExternalLink,
  History,
  Loader2,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { getCandidateCvFile, type Candidate } from "@/src/lib/api/candidate";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("vi-VN");
}

function getExtensionFromMimeType(mimeType?: string): string {
  if (!mimeType) return "";
  const lower = mimeType.toLowerCase();
  if (lower.includes("pdf")) return ".pdf";
  if (lower.includes("wordprocessingml") || lower.includes("docx")) return ".docx";
  if (lower.includes("msword") || lower.includes("doc")) return ".doc";
  if (lower.includes("png")) return ".png";
  if (lower.includes("jpeg") || lower.includes("jpg")) return ".jpg";
  return "";
}

function resolveFileName(fullname: string, resumeUrl: string | null, mimeType?: string): string {
  const cleanName = fullname ? `CV_${fullname.trim().replace(/\s+/g, "_")}` : "CV_Candidate";
  let ext = "";
  if (resumeUrl && resumeUrl.includes(".")) {
    const rawExt = "." + resumeUrl.split(".").pop();
    if ([".pdf", ".docx", ".doc", ".png", ".jpg", ".jpeg"].includes(rawExt.toLowerCase())) {
      ext = rawExt;
    }
  }
  if (!ext && mimeType) {
    ext = getExtensionFromMimeType(mimeType);
  }
  if (!ext) ext = ".pdf";
  return cleanName.endsWith(ext) ? cleanName : cleanName + ext;
}

function DocxRenderer({ blob }: { blob: Blob }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rendering, setRendering] = useState(true);
  const [renderError, setRenderError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !blob) return;
    setRendering(true);
    setRenderError(null);

    const container = containerRef.current;
    container.innerHTML = "";

    import("docx-preview")
      .then(({ renderAsync }) => {
        return renderAsync(blob, container, undefined, {
          inWrapper: true,
          ignoreWidth: false,
          ignoreHeight: false,
          experimental: true,
          className: "docx-body",
        });
      })
      .then(() => {
        setRendering(false);
      })
      .catch((err) => {
        console.error("docx-preview error:", err);
        setRenderError("Không thể hiển thị xem trước file Word này.");
        setRendering(false);
      });
  }, [blob]);

  return (
    <div className="relative min-h-[75vh] max-h-[80vh] w-full overflow-auto bg-[#F1F5F9] p-4">
      {rendering && (
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-[#F1F5F9]/80 text-sm text-[#6B7280] backdrop-blur-xs">
          <Loader2 className="size-5 animate-spin text-[#1D4ED8]" />
          Đang chuyển đổi và hiển thị văn bản Word...
        </div>
      )}
      {renderError && (
        <div className="flex h-60 items-center justify-center text-sm text-red-600">
          {renderError}
        </div>
      )}
      <div
        ref={containerRef}
        className="mx-auto min-h-[60vh] max-w-4xl rounded-lg bg-white p-4 shadow-md"
      />
    </div>
  );
}

export default function CandidateCvViewer({
  candidate,
}: {
  candidate: Candidate;
}) {
  const [rawBlob, setRawBlob] = useState<Blob | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [fileMimeType, setFileMimeType] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let createdUrl: string | null = null;

    if (!candidate.resumeURL) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    getCandidateCvFile(candidate.id)
      .then((blob) => {
        if (!active) return;
        setRawBlob(blob);
        setFileMimeType(blob.type);
        createdUrl = URL.createObjectURL(blob);
        setBlobUrl(createdUrl);
      })
      .catch((err) => {
        if (!active) return;
        console.error("Failed to fetch CV file:", err);
        setError("Không thể tải file CV từ máy chủ.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [candidate.id, candidate.resumeURL]);

  const fileName = resolveFileName(candidate.fullname, candidate.resumeURL, fileMimeType);

  const isDocx =
    fileMimeType.toLowerCase().includes("wordprocessingml") ||
    fileMimeType.toLowerCase().includes("msword") ||
    (candidate.resumeURL?.toLowerCase().endsWith(".docx") ?? false) ||
    (candidate.resumeURL?.toLowerCase().endsWith(".doc") ?? false);

  const isImage = fileMimeType.toLowerCase().includes("image");

  const isPdf =
    fileMimeType.toLowerCase().includes("pdf") ||
    (candidate.resumeURL?.toLowerCase().endsWith(".pdf") ?? false) ||
    (!isDocx && !isImage);

  function handleDownload() {
    if (!blobUrl) return;
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function handleOpenNewTab() {
    if (!blobUrl) return;
    window.open(blobUrl, "_blank");
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-2 text-sm text-[#434750]">
            <Link href="/" className="hover:text-[#1C1B1B]">
              Trang chủ
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/tuyen-dung" className="hover:text-[#1C1B1B]">
              Tuyển dụng
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/tuyen-dung/ung-vien" className="hover:text-[#1C1B1B]">
              Ứng viên
            </Link>
            <ChevronRight className="size-3" />
            <Link
              href={`/tuyen-dung/ung-vien/${candidate.id}`}
              className="hover:text-[#1C1B1B]"
            >
              Thông tin ứng viên
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-medium text-[#1C1B1B]">Xem CV</span>
          </nav>
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">
            Xem CV ứng viên
          </h1>
        </div>

        <Link
          href={`/tuyen-dung/ung-vien/${candidate.id}`}
          className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-[#BFDBFE] px-4 text-sm font-medium text-[#1D4ED8] hover:bg-[#EFF6FF]"
        >
          <ArrowLeft className="size-3.5" />
          Quay lại thông tin ứng viên
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="overflow-hidden rounded-xl border border-[#C4C6D2] bg-white shadow-xs xl:col-span-2">
          {!candidate.resumeURL ? (
            <div className="flex h-80 items-center justify-center text-sm text-[#6B7280]">
              Ứng viên chưa đính kèm CV.
            </div>
          ) : isLoading ? (
            <div className="flex h-80 items-center justify-center gap-2 text-sm text-[#6B7280]">
              <Loader2 className="size-5 animate-spin text-[#1D4ED8]" />
              Đang tải tập tin CV...
            </div>
          ) : error ? (
            <div className="flex h-80 flex-col items-center justify-center gap-2 text-sm text-red-600">
              <p>{error}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-[#E5E2E1] bg-[#F8FAFC] px-4 py-3">
                <span className="truncate text-sm font-medium text-[#1C1B1B]">
                  {fileName}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleOpenNewTab}
                    className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#434750] hover:text-[#1C1B1B]"
                  >
                    <ExternalLink className="size-3.5" />
                    Mở thẻ mới
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#1D4ED8] hover:underline"
                  >
                    <Download className="size-3.5" />
                    Tải xuống
                  </button>
                </div>
              </div>

              {/* PDF Preview */}
              {blobUrl && isPdf && (
                <iframe
                  src={blobUrl}
                  title="CV ứng viên (PDF)"
                  className="h-[80vh] w-full"
                />
              )}

              {/* DOCX / Word Preview using docx-preview */}
              {rawBlob && isDocx && (
                <DocxRenderer blob={rawBlob} />
              )}

              {/* Image Preview */}
              {blobUrl && isImage && (
                <div className="flex h-[80vh] items-center justify-center bg-[#F1F5F9] p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blobUrl}
                    alt="CV ứng viên"
                    className="max-h-full max-w-full rounded-lg object-contain shadow-md"
                  />
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#1D4ED8]">
              <User className="size-4" />
              THÔNG TIN ỨNG VIÊN
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <User className="size-4 shrink-0 text-[#94A3B8]" />
                <div className="flex flex-col">
                  <span className="text-xs text-[#94A3B8]">Họ và tên</span>
                  <span className="text-sm font-semibold text-[#1C1B1B]">
                    {candidate.fullname}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-[#94A3B8]" />
                <div className="flex flex-col">
                  <span className="text-xs text-[#94A3B8]">Email</span>
                  <span className="text-sm font-semibold text-[#1C1B1B]">
                    {candidate.email ?? "—"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-[#94A3B8]" />
                <div className="flex flex-col">
                  <span className="text-xs text-[#94A3B8]">
                    Số điện thoại
                  </span>
                  <span className="text-sm font-semibold text-[#1C1B1B]">
                    {candidate.phone ?? "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#1D4ED8]">
              <Briefcase className="size-4" />
              ỨNG TUYỂN VỊ TRÍ
            </h2>
            <p className="text-base font-semibold text-[#1C1B1B]">
              {candidate.recruitmentTitle}
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#1D4ED8]">
              <History className="size-4" />
              THÔNG TIN GHI NHẬN
            </h2>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm text-[#6B7280]">
                <Calendar className="size-4" />
                Ngày ứng tuyển
              </span>
              <span className="text-sm font-medium text-[#1C1B1B]">
                {formatDate(candidate.appliedAt)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm text-[#6B7280]">
                <CalendarClock className="size-4" />
                Hạn nộp hồ sơ
              </span>
              <span className="text-sm font-medium text-red-600">
                {formatDate(candidate.expiresAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
