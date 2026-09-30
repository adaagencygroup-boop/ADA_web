"use client";

import { useEffect, useState } from "react";
import { Calendar as CalendarIcon, Clock, X } from "lucide-react";
import { vi } from "date-fns/locale";
import { Calendar } from "@/src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Button } from "@/src/components/ui/button";

function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isDateInPast(date: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  return target.getTime() < today.getTime();
}

function parseDateTimeString(str: string): { date: Date | undefined; time: string } {
  if (!str) return { date: undefined, time: "09:00" };

  // Match "09:30 - Ngày 20/09/2026" or "09:30 - 20/09/2026"
  const matchWithTime = str.match(/(\d{1,2}:\d{2})\s*[-–]?\s*(?:Ngày\s*)?(\d{1,2})\/(\d{1,2})\/(\d{4})/i);
  if (matchWithTime) {
    const [, time, day, month, year] = matchWithTime;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return { date: isNaN(date.getTime()) ? undefined : date, time };
  }

  // Match "20/09/2026" or "Ngày 20/09/2026"
  const matchDateOnly = str.match(/(?:Ngày\s*)?(\d{1,2})\/(\d{1,2})\/(\d{4})/i);
  if (matchDateOnly) {
    const [, day, month, year] = matchDateOnly;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return { date: isNaN(date.getTime()) ? undefined : date, time: "09:00" };
  }

  return { date: undefined, time: "09:00" };
}

function formatDateTimeOutput(
  date: Date | undefined,
  time: string,
  showTime: boolean,
  formatMode: "interview" | "dateOnly"
): string {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  if (showTime && formatMode === "interview") {
    return `${time || "09:00"} - Ngày ${day}/${month}/${year}`;
  }
  return `${day}/${month}/${year}`;
}

const HOURS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, "0"));
const MINUTES = Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, "0"));

export interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showTime?: boolean;
  formatMode?: "interview" | "dateOnly";
  disabled?: boolean;
  disablePast?: boolean;
  error?: string;
  className?: string;
}

export default function DateTimePicker({
  value,
  onChange,
  placeholder = "Chọn ngày giờ...",
  showTime = true,
  formatMode = "interview",
  disabled = false,
  disablePast = true,
  error,
  className = "",
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("09:00");

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Sync internal state when popover opens or value changes
  useEffect(() => {
    const parsed = parseDateTimeString(value);
    setSelectedDate(parsed.date);
    setSelectedTime(parsed.time);
  }, [value, open]);

  function getValidTimeForDate(targetDate: Date, currentTime: string): string {
    if (!disablePast || !isSameDay(targetDate, new Date())) {
      return currentTime || "09:00";
    }

    const now = new Date();
    const [h, m] = (currentTime || "09:00").split(":").map(Number);
    if (h < now.getHours() || (h === now.getHours() && m < now.getMinutes())) {
      const nextHour = String(Math.min(23, now.getHours())).padStart(2, "0");
      const nextMin = String(Math.min(55, Math.ceil(now.getMinutes() / 5) * 5)).padStart(2, "0");
      return `${nextHour}:${nextMin}`;
    }
    return currentTime;
  }

  function handleOpenChange(nextOpen: boolean) {
    if (disabled) return;
    if (nextOpen) {
      const parsed = parseDateTimeString(value);
      let initialDate = parsed.date;
      if (!initialDate || (disablePast && isDateInPast(initialDate))) {
        initialDate = new Date();
      }

      const initialTime = getValidTimeForDate(initialDate, parsed.time || "09:00");

      setSelectedDate(initialDate);
      setSelectedTime(initialTime);
    }
    setOpen(nextOpen);
  }

  function handleSelectDate(date: Date | undefined) {
    if (!date) {
      setSelectedDate(undefined);
      return;
    }
    if (disablePast && isDateInPast(date)) return;

    const timeToUse = getValidTimeForDate(date, selectedTime);
    setSelectedDate(date);
    setSelectedTime(timeToUse);

    const formatted = formatDateTimeOutput(date, timeToUse, showTime, formatMode);
    onChange(formatted);
  }

  function handleSelectTime(time: string) {
    setSelectedTime(time);
    if (selectedDate) {
      const formatted = formatDateTimeOutput(selectedDate, time, showTime, formatMode);
      onChange(formatted);
    }
  }

  function handleHourChange(h: string) {
    const hNum = Number(h);
    let currentMin = (selectedTime || "09:00").split(":")[1] || "00";

    if (disablePast && selectedDate && isSameDay(selectedDate, new Date())) {
      const now = new Date();
      if (hNum === now.getHours() && Number(currentMin) < now.getMinutes()) {
        currentMin = String(Math.min(55, Math.ceil(now.getMinutes() / 5) * 5)).padStart(2, "0");
      }
    }

    const newTime = `${h}:${currentMin}`;
    handleSelectTime(newTime);
  }

  function handleMinuteChange(m: string) {
    const currentHr = (selectedTime || "09:00").split(":")[0] || "09";
    const newTime = `${currentHr}:${m}`;
    handleSelectTime(newTime);
  }

  function handleClear() {
    setSelectedDate(undefined);
    setSelectedTime("09:00");
    onChange("");
    setOpen(false);
  }

  function handleConfirm() {
    if (selectedDate) {
      const formatted = formatDateTimeOutput(selectedDate, selectedTime, showTime, formatMode);
      onChange(formatted);
    }
    setOpen(false);
  }

  const [currentHour, currentMinute] = (selectedTime || "09:00").split(":");

  const now = new Date();
  const isToday = Boolean(selectedDate && isSameDay(selectedDate, now));

  const availableHours = HOURS.map((h) => {
    const isPastHour = Boolean(disablePast && isToday && Number(h) < now.getHours());
    return {
      value: h,
      disabled: isPastHour,
    };
  });

  const selectedHourNum = Number(currentHour || "09");
  const isCurrentHourToday = Boolean(disablePast && isToday && selectedHourNum === now.getHours());

  const availableMinutes = MINUTES.map((m) => {
    const isPastMinute = Boolean(isCurrentHourToday && Number(m) < now.getMinutes());
    return {
      value: m,
      disabled: isPastMinute,
    };
  });

  return (
    <div className={`relative flex flex-col gap-1 ${className}`}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <div
          className={`group relative flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 text-sm transition-colors outline-none ${
            error
              ? "border-red-500 focus-within:border-red-500"
              : "border-[#D1D5DB] hover:border-[#9CA3AF] focus-within:border-[#316EE9]"
          } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
        >
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className="w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF]"
            onClick={() => {
              if (!disabled) setOpen(true);
            }}
          />
          <div className="flex items-center gap-1 shrink-0">
            {value && !disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
                className="cursor-pointer p-1 text-[#9CA3AF] hover:text-[#374151]"
                title="Xóa"
              >
                <X className="size-3.5" />
              </button>
            )}
            <PopoverTrigger
              disabled={disabled}
              className="flex cursor-pointer items-center p-1 text-[#6B7280] hover:text-[#111827] outline-none"
              title="Mở lịch chọn ngày giờ"
            >
              {showTime ? <Clock className="size-4" /> : <CalendarIcon className="size-4" />}
            </PopoverTrigger>
          </div>
        </div>

        <PopoverContent align="start" className="w-auto p-4 shadow-lg border border-[#E5E7EB] bg-white rounded-xl">
          <div className="flex flex-col gap-3">
            {/* Calendar Header / Date Picker */}
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelectDate}
              disabled={disablePast ? { before: startOfToday } : undefined}
              locale={vi}
              captionLayout="dropdown"
              className="p-0"
            />

            {/* Time Picker (if enabled) */}
            {showTime && (
              <div className="flex flex-col gap-2.5 border-t border-[#E5E7EB] pt-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#374151]">
                    <Clock className="size-3.5 text-[#316EE9]" />
                    Chọn thời gian:
                  </span>

                  <div className="flex items-center gap-1">
                    {/* Hour Select */}
                    <select
                      value={currentHour || "09"}
                      onChange={(e) => handleHourChange(e.target.value)}
                      className="cursor-pointer h-8 rounded-md border border-[#D1D5DB] bg-white px-2 text-xs font-medium text-[#111827] outline-none focus:border-[#316EE9]"
                    >
                      {availableHours.map(({ value: h, disabled: isHourDisabled }) => (
                        <option key={h} value={h} disabled={isHourDisabled}>
                          {h} giờ {isHourDisabled ? "(Đã qua)" : ""}
                        </option>
                      ))}
                    </select>

                    <span className="text-xs font-bold text-[#6B7280]">:</span>

                    {/* Minute Select */}
                    <select
                      value={currentMinute || "00"}
                      onChange={(e) => handleMinuteChange(e.target.value)}
                      className="cursor-pointer h-8 rounded-md border border-[#D1D5DB] bg-white px-2 text-xs font-medium text-[#111827] outline-none focus:border-[#316EE9]"
                    >
                      {availableMinutes.map(({ value: m, disabled: isMinDisabled }) => (
                        <option key={m} value={m} disabled={isMinDisabled}>
                          {m} phút {isMinDisabled ? "(Đã qua)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-3">
              <Button type="button" variant="outline" size="sm" onClick={handleClear} className="cursor-pointer h-8 text-xs">
                Xóa
              </Button>
              <Button type="button" size="sm" onClick={handleConfirm} className="cursor-pointer h-8 text-xs bg-[#316EE9] hover:bg-[#1D4ED8]">
                Xác nhận
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
