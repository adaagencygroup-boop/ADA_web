"use client";

import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import TimeSelect from "@/app/(dashboard)/tuyen-dung/_components/job-form/TimeSelect";

const DAYS = [
  { value: "t2", short: "T2", label: "Thứ 2" },
  { value: "t3", short: "T3", label: "Thứ 3" },
  { value: "t4", short: "T4", label: "Thứ 4" },
  { value: "t5", short: "T5", label: "Thứ 5" },
  { value: "t6", short: "T6", label: "Thứ 6" },
  { value: "t7", short: "T7", label: "Thứ 7" },
  { value: "cn", short: "CN", label: "Chủ nhật" },
];

export type WorkSchedule = {
  days: string[];
  startTime: string;
  endTime: string;
};

export const DEFAULT_WORK_SCHEDULE: WorkSchedule = {
  days: ["t2", "t3", "t4", "t5", "t6"],
  startTime: "08:30",
  endTime: "18:00",
};

export function parseWorkSchedule(workingHoursStr?: string | null): WorkSchedule {
  if (!workingHoursStr) return DEFAULT_WORK_SCHEDULE;

  const timeMatch = workingHoursStr.match(/\((\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})\)/);
  const startTime = timeMatch ? timeMatch[1] : "08:30";
  const endTime = timeMatch ? timeMatch[2] : "18:00";

  const daysStr = workingHoursStr.replace(/\s*\(\d{2}:\d{2}\s*-\s*\d{2}:\d{2}\)/, "").trim();
  if (!daysStr) return { days: ["t2", "t3", "t4", "t5", "t6"], startTime, endTime };

  const daysSet = new Set<string>();
  const segments = daysStr.split(",").map((s) => s.trim());

  for (const seg of segments) {
    if (seg.includes("-") || seg.includes("–")) {
      const parts = seg.split(/[-–]/).map((s) => s.trim());
      if (parts.length === 2) {
        const startIdx = DAYS.findIndex(
          (d) =>
            d.label.toLowerCase() === parts[0].toLowerCase() ||
            d.short.toLowerCase() === parts[0].toLowerCase()
        );
        const endIdx = DAYS.findIndex(
          (d) =>
            d.label.toLowerCase() === parts[1].toLowerCase() ||
            d.short.toLowerCase() === parts[1].toLowerCase()
        );
        if (startIdx !== -1 && endIdx !== -1 && startIdx <= endIdx) {
          for (let i = startIdx; i <= endIdx; i++) {
            daysSet.add(DAYS[i].value);
          }
        }
      }
    } else {
      const found = DAYS.find(
        (d) =>
          d.label.toLowerCase() === seg.toLowerCase() ||
          d.short.toLowerCase() === seg.toLowerCase()
      );
      if (found) {
        daysSet.add(found.value);
      }
    }
  }

  const days = Array.from(daysSet);
  return {
    days: days.length > 0 ? days : ["t2", "t3", "t4", "t5", "t6"],
    startTime,
    endTime,
  };
}

export function parseTimeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(":").map(Number);
  return (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
}

export function formatWorkSchedule(schedule: WorkSchedule, placeholder: string) {
  if (schedule.days.length === 0) return placeholder;

  const selectedIndexes = DAYS.map((d, i) => (schedule.days.includes(d.value) ? i : -1)).filter(
    (i) => i !== -1
  );

  const ranges: string[] = [];
  let start = selectedIndexes[0];
  let prev = selectedIndexes[0];

  for (let i = 1; i <= selectedIndexes.length; i++) {
    const current = selectedIndexes[i];
    if (current === prev + 1) {
      prev = current;
      continue;
    }
    ranges.push(
      start === prev ? DAYS[start].label : `${DAYS[start].label} - ${DAYS[prev].label}`
    );
    start = current;
    prev = current;
  }

  const daysLabel = ranges.join(", ");
  const timeLabel =
    schedule.startTime && schedule.endTime
      ? ` (${schedule.startTime} - ${schedule.endTime})`
      : "";

  return `${daysLabel}${timeLabel}`;
}

export default function WorkScheduleField({
  value,
  onChange,
  placeholder = "Chọn ngày và giờ làm việc",
  error,
}: {
  value: WorkSchedule;
  onChange: (value: WorkSchedule) => void;
  placeholder?: string;
  error?: string;
}) {
  function toggleDay(day: string) {
    const days = value.days.includes(day)
      ? value.days.filter((d) => d !== day)
      : [...value.days, day];
    onChange({ ...value, days });
  }

  const allSelected = value.days.length === DAYS.length;

  function toggleSelectAll() {
    onChange({ ...value, days: allSelected ? [] : DAYS.map((d) => d.value) });
  }

  const isInvalidTime =
    !!value.startTime &&
    !!value.endTime &&
    parseTimeToMinutes(value.endTime) <= parseTimeToMinutes(value.startTime);

  return (
    <Popover>
      <PopoverTrigger
        className={`flex h-9.5 w-full items-center justify-between rounded-lg border bg-[#FCF9F8] px-4 text-left text-sm outline-none focus-visible:border-[#316EE9] ${
          isInvalidTime || error ? "border-red-500" : "border-[#C4C6D2]"
        }`}
      >
        <span
          className={`truncate ${value.days.length ? "text-[#1C1B1B]" : "text-[#6B7280]"}`}
        >
          {formatWorkSchedule(value, placeholder)}
        </span>
        <ChevronDown className="size-4 shrink-0 text-[#434750]" />
      </PopoverTrigger>

      <PopoverContent align="start" className="w-84 p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#1C1B1B]">Ngày làm việc</span>
            <button
              type="button"
              onClick={toggleSelectAll}
              className="text-sm font-medium text-[#316EE9] hover:underline"
            >
              {allSelected ? "Bỏ chọn tất cả" : "Chọn tất cả"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => {
              const active = value.days.includes(day.value);
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => toggleDay(day.value)}
                  className={`flex h-8.5 w-11 items-center justify-center rounded-lg border text-sm font-medium ${
                    active
                      ? "border-[#316EE9] bg-[#316EE9] text-white"
                      : "border-[#C4C6D2] bg-white text-[#434750] hover:bg-[#F3F4F6]"
                  }`}
                >
                  {day.short}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-10 shrink-0 text-sm text-[#434750]">Từ</span>
              <TimeSelect
                value={value.startTime}
                onChange={(startTime) => onChange({ ...value, startTime })}
                hasError={isInvalidTime}
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-10 shrink-0 text-sm text-[#434750]">Đến</span>
              <TimeSelect
                value={value.endTime}
                onChange={(endTime) => onChange({ ...value, endTime })}
                hasError={isInvalidTime}
              />
            </div>
            {isInvalidTime && (
              <p className="mt-1 text-xs font-medium text-red-600">
                Thời gian kết thúc phải lớn hơn thời gian bắt đầu
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

