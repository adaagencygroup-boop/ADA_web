"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { vi } from "date-fns/locale";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";

function formatDate(date: Date) {
  return date.toLocaleDateString("vi-VN");
}

export default function DatePickerField({
  value,
  onChange,
}: {
  value: Date;
  onChange: (date: Date) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="relative flex h-9.5 w-full items-center rounded-lg border border-[#C4C6D2] bg-[#FCF9F8] pr-10 pl-4 text-left text-sm text-[#1C1B1B] outline-none focus-visible:border-[#316EE9]">
        {formatDate(value)}
        <CalendarIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#434750]" />
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto p-4">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (!date) return;
            onChange(date);
            setOpen(false);
          }}
          locale={vi}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  );
}
