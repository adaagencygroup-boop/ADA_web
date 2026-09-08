"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

const HOURS = Array.from({ length: 24 }, (_, i) => pad(i));
const MINUTES = Array.from({ length: 60 }, (_, i) => pad(i));

export default function TimeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [hour = "", minute = ""] = value.split(":");

  function handleHourChange(next: string) {
    onChange(`${next}:${minute || "00"}`);
  }

  function handleMinuteChange(next: string) {
    onChange(`${hour || "00"}:${next}`);
  }

  return (
    <div className="flex min-w-0 flex-1 items-center gap-1.5">
      <Select value={hour} onValueChange={(v) => v && handleHourChange(v)}>
        <SelectTrigger className="w-full min-w-0 rounded-lg border-[#C4C6D2] text-sm data-[size=default]:h-9.5">
          <SelectValue placeholder="Giờ" />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {HOURS.map((h) => (
            <SelectItem key={h} value={h}>
              {h}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span className="text-sm text-[#434750]">:</span>

      <Select value={minute} onValueChange={(v) => v && handleMinuteChange(v)}>
        <SelectTrigger className="w-full min-w-0 rounded-lg border-[#C4C6D2] text-sm data-[size=default]:h-9.5">
          <SelectValue placeholder="Phút" />
        </SelectTrigger>
        <SelectContent className="max-h-60">
          {MINUTES.map((m) => (
            <SelectItem key={m} value={m}>
              {m}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
