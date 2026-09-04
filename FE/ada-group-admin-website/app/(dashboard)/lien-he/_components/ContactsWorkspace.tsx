"use client";

import { useEffect, useMemo, useState } from "react";
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
  INITIAL_CONTACTS,
  type Contact,
  type ContactStatus,
} from "@/app/(dashboard)/lien-he/_components/data";
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
  { value: "answered", label: "Đã phản hồi" },
];

const STATUS_STYLES: Record<ContactStatus, string> = {
  pending: "bg-[#FDEEE0] text-[#C2410C]",
  answered: "bg-[#E1FCEF] text-[#15803D]",
};

const STATUS_LABELS: Record<ContactStatus, string> = {
  pending: "Chưa phản hồi",
  answered: "Đã phản hồi",
};

const PAGE_SIZE_OPTIONS = ["5", "10", "20"];

export default function ContactsWorkspace() {
  const isDesktop = useIsDesktop();
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [tab, setTab] = useState<Tab>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [pageSize, setPageSize] = useState("5");
  const [page, setPage] = useState(1);

  const counts = useMemo(
    () => ({
      all: contacts.length,
      pending: contacts.filter((c) => c.status === "pending").length,
      answered: contacts.filter((c) => c.status === "answered").length,
    }),
    [contacts]
  );

  const filtered = useMemo(
    () => (tab === "all" ? contacts : contacts.filter((c) => c.status === tab)),
    [contacts, tab]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / Number(pageSize)));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * Number(pageSize),
    currentPage * Number(pageSize)
  );

  const selectedContact = contacts.find((c) => c.id === selectedId) ?? null;
  const allPagedSelected =
    paged.length > 0 && paged.every((c) => selectedRows.has(c.id));

  function handleTabChange(next: Tab) {
    setTab(next);
    setPage(1);
  }

  function toggleRow(id: string) {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllRows() {
    setSelectedRows((prev) => {
      if (allPagedSelected) {
        const next = new Set(prev);
        paged.forEach((c) => next.delete(c.id));
        return next;
      }
      const next = new Set(prev);
      paged.forEach((c) => next.add(c.id));
      return next;
    });
  }

  function handleSendReply(
    id: string,
    content: string,
    attachment?: { name: string; size: string }
  ) {
    setContacts((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "answered",
              reply: {
                content,
                attachmentName: attachment?.name,
                attachmentSize: attachment?.size,
                sentAt: new Date().toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            }
          : c
      )
    );
  }

  function handleMarkAnswered(id: string) {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "answered" } : c))
    );
  }

  function handleDelete(id: string) {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="flex flex-col gap-4 lg:col-span-3">
        <div className="rounded-xl border border-[#E5E7EB] bg-white">
          <div className="flex items-center gap-6 border-b border-[#E5E7EB] px-4">
            {TABS.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => handleTabChange(item.value)}
                className={`flex items-center gap-2 border-b-2 py-4 text-sm font-medium ${
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
                  <th className="w-10 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allPagedSelected}
                      onChange={toggleAllRows}
                      className="size-4 rounded border-[#D1D5DB]"
                    />
                  </th>
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
                {paged.map((contact) => (
                  <tr
                    key={contact.id}
                    onClick={() => setSelectedId(contact.id)}
                    className={`cursor-pointer border-t border-[#E5E7EB] ${
                      selectedId === contact.id ? "bg-[#EFF6FF]" : "hover:bg-[#F9FAFB]"
                    }`}
                  >
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.has(contact.id)}
                        onChange={() => toggleRow(contact.id)}
                        className="size-4 rounded border-[#D1D5DB]"
                      />
                    </td>
                    <td className="px-3 py-3 text-sm font-medium text-[#111827]">
                      {contact.name}
                    </td>
                    <td className="px-3 py-3 text-sm text-[#4B5563]">
                      {contact.phone}
                    </td>
                    <td className="px-3 py-3 text-sm text-[#4B5563]">
                      {contact.sentAt.split(" ")[0]}
                      <br />
                      {contact.sentAt.split(" ")[1]}
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
                ))}
                {paged.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
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
                Hiển thị {filtered.length === 0 ? 0 : (currentPage - 1) * Number(pageSize) + 1} -{" "}
                {Math.min(currentPage * Number(pageSize), filtered.length)} trong tổng số{" "}
                {filtered.length} liên hệ
              </span>
            </div>

            <div className="flex items-center gap-3">
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

              <div className="flex items-center gap-1.5">
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
          {selectedContact ? (
            <ContactDetailPanel
              key={selectedContact.id}
              contact={selectedContact}
              onSendReply={handleSendReply}
              onMarkAnswered={handleMarkAnswered}
              onDelete={handleDelete}
            />
          ) : (
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
          )}
        </div>
      )}

      {!isDesktop && (
        <Sheet
          open={!!selectedContact}
          onOpenChange={(open) => {
            if (!open) setSelectedId(null);
          }}
        >
          <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-md">
            <SheetTitle className="sr-only">Chi tiết liên hệ</SheetTitle>
            <div className="h-full overflow-y-auto p-4 pt-14">
              {selectedContact && (
                <ContactDetailPanel
                  key={selectedContact.id}
                  contact={selectedContact}
                  onSendReply={handleSendReply}
                  onMarkAnswered={handleMarkAnswered}
                  onDelete={handleDelete}
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
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#F8FAFC]"
      >
        <Download className="size-4" />
        Xuất Excel
      </button>
    </div>
  );
}
