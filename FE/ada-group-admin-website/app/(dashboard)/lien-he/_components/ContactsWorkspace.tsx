"use client";

import { useEffect, useState } from "react";
import { Download, Eye, Mail } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/src/components/ui/sheet";
import {
  useContactById,
  useContactCount,
  useContacts,
  useExportContactsExcel,
} from "@/src/hooks/useContacts";
import type { ContactStatus } from "@/src/lib/api/contact";
import ContactDetailPanel from "@/app/(dashboard)/lien-he/_components/ContactDetailPanel";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined"
      ? true
      : window.matchMedia("(min-width: 1024px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    function handleChange(event: MediaQueryListEvent) {
      setIsDesktop(event.matches);
    }

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDesktop;
}

type Tab = "all" | ContactStatus;

const TABS: { value: Tab; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chưa phản hồi" },
  { value: "responded", label: "Đã phản hồi" },
];

const STATUS_STYLES: Record<ContactStatus, string> = {
  pending: "bg-[#FDEEE0] text-[#C2410C]",
  responded: "bg-[#E1FCEF] text-[#15803D]",
};

const STATUS_LABELS: Record<ContactStatus, string> = {
  pending: "Chưa phản hồi",
  responded: "Đã phản hồi",
};

const PAGE_SIZE_OPTIONS = ["5", "10", "20"];

function formatSentAt(iso: string) {
  const date = new Date(iso);
  return {
    date: date.toLocaleDateString("vi-VN"),
    time: date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function ContactsWorkspace() {
  const isDesktop = useIsDesktop();
  const [tab, setTab] = useState<Tab>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState("5");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useContacts({
    page,
    size: Number(pageSize),
    status: tab === "all" ? undefined : tab,
  });
  const { data: allCount } = useContactCount();
  const { data: pendingCount } = useContactCount("pending");
  const { data: respondedCount } = useContactCount("responded");

  const counts = {
    all: allCount ?? 0,
    pending: pendingCount ?? 0,
    responded: respondedCount ?? 0,
  };

  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.page ?? 1;
  const totalElements = pagination?.totalElements ?? 0;

  const {
    data: selectedContact,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useContactById(selectedId ?? undefined);

  function handleTabChange(next: Tab) {
    setTab(next);
    setPage(1);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="flex flex-col gap-4 lg:col-span-3">
        <div className="rounded-xl border border-[#E5E7EB] bg-white">
          <div className="flex items-center gap-6 overflow-x-auto border-b border-[#E5E7EB] px-4">
            {TABS.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => handleTabChange(item.value)}
                className={`flex shrink-0 items-center gap-2 border-b-2 py-4 text-sm font-medium whitespace-nowrap ${
                  tab === item.value
                    ? "border-[#1A56DB] text-[#1A56DB]"
                    : "border-transparent text-[#6B7280] hover:text-[#111827]"
                }`}
              >
                {item.label}
                <span
                  className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-medium ${
                    tab === item.value
                      ? "bg-[#1A56DB] text-white"
                      : "bg-[#F3F4F6] text-[#4B5563]"
                  }`}
                >
                  {counts[item.value]}
                </span>
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-150 border-collapse">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-left">
                  <th className="px-3 py-3 text-xs font-semibold text-[#374151]">
                    Họ và tên
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold text-[#374151]">
                    Số điện thoại
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold text-[#374151]">
                    Ngày gửi
                  </th>
                  <th className="px-3 py-3 text-xs font-semibold text-[#374151]">
                    Trạng thái
                  </th>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-[#374151]">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-[#6B7280]">
                      Đang tải...
                    </td>
                  </tr>
                )}
                {isError && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-sm text-red-600">
                      {error?.message ?? "Đã có lỗi xảy ra khi tải danh sách liên hệ."}
                    </td>
                  </tr>
                )}
                {!isLoading && !isError &&
                  items.map((contact) => {
                    const sentAt = formatSentAt(contact.createdAt);
                    return (
                      <tr
                        key={contact.id}
                        onClick={() => setSelectedId(contact.id)}
                        className={`cursor-pointer border-t border-[#E5E7EB] ${
                          selectedId === contact.id ? "bg-[#EFF6FF]" : "hover:bg-[#F9FAFB]"
                        }`}
                      >
                        <td className="px-3 py-3 text-sm font-medium text-[#111827]">
                          {contact.customerFullname}
                        </td>
                        <td className="px-3 py-3 text-sm text-[#4B5563]">
                          {contact.customerPhone ?? "—"}
                        </td>
                        <td className="px-3 py-3 text-sm text-[#4B5563]">
                          {sentAt.date}
                          <br />
                          {sentAt.time}
                        </td>
                        <td className="px-3 py-3">
                          <span
                            className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[contact.status]}`}
                          >
                            {STATUS_LABELS[contact.status]}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-center">
                          <button
                            type="button"
                            aria-label="Xem chi tiết"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedId(contact.id);
                            }}
                            className="inline-flex size-8 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6]"
                          >
                            <Eye className="size-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                {!isLoading && !isError && items.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-sm text-[#6B7280]"
                    >
                      Không có liên hệ nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E7EB] px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-[#4B5563]">
              <span>
                Hiển thị {totalElements === 0 ? 0 : (currentPage - 1) * Number(pageSize) + 1} -{" "}
                {Math.min(currentPage * Number(pageSize), totalElements)} trong tổng số{" "}
                {totalElements} liên hệ
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Select
                value={pageSize}
                onValueChange={(next) => {
                  if (!next) return;
                  setPageSize(next);
                  setPage(1);
                }}
              >
                <SelectTrigger className="rounded-lg border-[#D1D5DB] text-sm data-[size=default]:h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}/trang
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex flex-wrap items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setPage(num)}
                      className={`flex size-8 items-center justify-center rounded-lg text-sm font-medium ${
                        num === currentPage
                          ? "bg-[#1A56DB] text-white"
                          : "text-[#374151] hover:bg-[#F8FAFC]"
                      }`}
                    >
                      {num}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDesktop && (
        <div className="lg:col-span-2">
          {!selectedId ? (
            <div className="flex min-h-100 flex-col items-center justify-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-10 text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-[#D8E2FF]">
                <Mail className="size-8 text-[#316EE9]" />
              </div>
              <h2 className="text-xl font-semibold text-[#111827]">
                Chọn một liên hệ
              </h2>
              <p className="text-sm text-[#6B7280]">
                Vui lòng chọn một liên hệ trong danh sách để xem chi tiết và
                phản hồi.
              </p>
            </div>
          ) : isDetailLoading ? (
            <div className="flex min-h-100 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white p-10 text-sm text-[#6B7280]">
              Đang tải chi tiết...
            </div>
          ) : isDetailError || !selectedContact ? (
            <div className="flex min-h-100 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white p-10 text-sm text-red-600">
              Không thể tải chi tiết liên hệ. Vui lòng thử lại.
            </div>
          ) : (
            <ContactDetailPanel
              key={selectedContact.id}
              contact={selectedContact}
              onDeleted={() => setSelectedId(null)}
            />
          )}
        </div>
      )}

      {!isDesktop && (
        <Sheet
          open={!!selectedId}
          onOpenChange={(open) => {
            if (!open) setSelectedId(null);
          }}
        >
          <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
            <SheetTitle className="sr-only">Chi tiết liên hệ</SheetTitle>
            <div className="h-full overflow-y-auto p-4 pt-14">
              {isDetailLoading ? (
                <div className="flex min-h-60 items-center justify-center text-sm text-[#6B7280]">
                  Đang tải chi tiết...
                </div>
              ) : isDetailError || !selectedContact ? (
                <div className="flex min-h-60 items-center justify-center text-sm text-red-600">
                  Không thể tải chi tiết liên hệ. Vui lòng thử lại.
                </div>
              ) : (
                <ContactDetailPanel
                  key={selectedContact.id}
                  contact={selectedContact}
                  onDeleted={() => setSelectedId(null)}
                />
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}

export function ContactsToolbar() {
  const exportMutation = useExportContactsExcel();

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => exportMutation.mutate({})}
        disabled={exportMutation.isPending}
        className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Download className="size-4" />
        {exportMutation.isPending ? "Đang xuất..." : "Xuất Excel"}
      </button>
    </div>
  );
}
