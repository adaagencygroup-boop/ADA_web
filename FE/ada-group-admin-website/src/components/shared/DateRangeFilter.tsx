"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { vi } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

function formatDate(date: Date) {
  return date.toLocaleDateString("vi-VN");
}

export default function DateRangeFilter({
  value,
  onChange,
}: {
  value: DateRange | null;
  onChange: (value: DateRange | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(
    value ?? undefined
  );

  function handleOpenChange(next: boolean) {
    if (next) setDraftRange(value ?? undefined);
    setOpen(next);
  }

  function handleApply() {
    if (draftRange?.from) onChange(draftRange);
    setOpen(false);
  }

  function handleClear() {
    setDraftRange(undefined);
    onChange(null);
    setOpen(false);
  }

  const label = value?.from
    ? `${formatDate(value.from)} - ${formatDate(value.to ?? value.from)}`
    : "Chọn khoảng thời gian";

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger className="relative flex h-9.5 min-w-50 flex-1 items-center rounded-lg border border-[#D1D5DB] pr-10 pl-4 text-left text-sm outline-none focus-visible:border-[#1A56DB]">
        <span
          className={`truncate ${value ? "text-[#111827]" : "text-[#6B7280]"}`}
        >
          {label}
        </span>
        <CalendarIcon className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-[#9CA3AF]" />
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto p-4">
        <Calendar
          mode="range"
          selected={draftRange}
          onSelect={setDraftRange}
          numberOfMonths={2}
          locale={vi}
          captionLayout="dropdown"
        />

        <div className="mt-3 flex justify-end gap-2 border-t border-border pt-3">
          <Button type="button" variant="outline" size="sm" onClick={handleClear}>
            Xoá
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={!draftRange?.from}
            onClick={handleApply}
          >
            Áp dụng
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
