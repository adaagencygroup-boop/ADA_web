"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, RefreshCw } from "lucide-react";
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

export default function DateRangeButton({
  value,
  onChange,
}: {
  value: DateRange;
  onChange: (value: DateRange) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(value);

  function handleOpenChange(next: boolean) {
    if (next) setDraftRange(value);
    setOpen(next);
  }

  function handleApply() {
    if (draftRange?.from) onChange(draftRange);
    setOpen(false);
  }

  function handleRefresh(event: React.MouseEvent) {
    event.stopPropagation();
    setDraftRange(value);
    setOpen(false);
  }

  const label = value.from
    ? `${formatDate(value.from)} - ${formatDate(value.to ?? value.from)}`
    : "Chọn khoảng thời gian";

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <div className="flex h-9.5 shrink-0 items-center gap-2 rounded-lg border border-[#C4C6D2] bg-white pr-2 pl-4 text-sm font-medium text-[#1C1B1B] shadow-xs hover:bg-[#F8FAFC]">
        <PopoverTrigger className="flex items-center gap-2 outline-none">
          <CalendarIcon className="size-4" />
          {label}
        </PopoverTrigger>
        <button
          type="button"
          aria-label="Đặt lại khoảng thời gian"
          onClick={handleRefresh}
          className="rounded p-0.5 text-[#1C1B1B] hover:bg-[#F3F4F6]"
        >
          <RefreshCw className="size-3.5" />
        </button>
      </div>

      <PopoverContent align="end" className="w-auto p-4">
        <Calendar
          mode="range"
          selected={draftRange}
          onSelect={setDraftRange}
          numberOfMonths={2}
          locale={vi}
          captionLayout="dropdown"
        />

        <div className="mt-3 flex justify-end gap-2 border-t border-border pt-3">
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
