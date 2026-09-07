"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Database,
  Download,
  Info,
  List,
  Save,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Switch } from "@/src/components/ui/switch";
import {
  useBackupSchedule,
  useTriggerBackup,
  useUpdateBackupSchedule,
} from "@/src/hooks/useSettings";
import type { BackupFrequency } from "@/src/lib/api/settings";

const WEEKDAYS = [
  "Thứ 2",
  "Thứ 3",
  "Thứ 4",
  "Thứ 5",
  "Thứ 6",
  "Thứ 7",
  "Chủ nhật",
];

const HOURS = Array.from(
  { length: 24 },
  (_, i) => `${String(i).padStart(2, "0")}:00`
);

const FREQUENCY_LABELS: Record<BackupFrequency, string> = {
  daily: "Hàng ngày",
  weekly: "Hàng tuần",
  monthly: "Hàng tháng",
};

const FREQUENCY_OPTIONS = Object.values(FREQUENCY_LABELS);

function labelToFrequency(label: string): BackupFrequency {
  return (
    (Object.entries(FREQUENCY_LABELS).find(([, v]) => v === label)?.[0] as
      | BackupFrequency
      | undefined) ?? "daily"
  );
}

function SelectField({
  label,
  icon: Icon,
  value,
  onChange,
  options,
}: {
  label: string;
  icon: typeof Calendar;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div className="flex min-w-47 flex-1 flex-col gap-2">
      <label className="text-sm font-semibold text-[#1C1B1B]">{label}</label>
      <Select
        value={value}
        onValueChange={(next) => next && onChange(next)}
      >
        <SelectTrigger className="relative w-full rounded-lg border-[#C4C6D2] bg-[#FCF9F8] pl-10 text-base text-[#1C1B1B] focus-visible:border-[#316EE9] data-[size=default]:h-12.5">
          <Icon className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-[#434750]" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function InfoBanner({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-[#316EE9]/20 bg-[#316EE9]/10 p-4 ${className}`}
    >
      <Info className="mt-0.5 size-5 shrink-0 text-[#0054CD]" />
      <p className="text-base leading-relaxed text-[#434750]">{text}</p>
    </div>
  );
}

export default function BackupSettingsCard() {
  const { data: schedule, isLoading } = useBackupSchedule();
  const updateMutation = useUpdateBackupSchedule();
  const triggerMutation = useTriggerBackup();

  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [frequency, setFrequency] = useState<BackupFrequency>("daily");
  const [weekdayIndex, setWeekdayIndex] = useState(0);
  const [dayOfMonth, setDayOfMonth] = useState(1);
  const [hour, setHour] = useState("02:00");
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!schedule || initializedRef.current) return;
    initializedRef.current = true;
    setAutoBackupEnabled(schedule.isEnabled ?? true);
    setFrequency(schedule.frequency);
    setWeekdayIndex(Math.min(6, Math.max(0, (schedule.dayOfWeek ?? 1) - 1)));
    setDayOfMonth(schedule.dayOfMonth ?? 1);
    setHour(schedule.timeOfDay.slice(0, 5) || "02:00");
  }, [schedule]);

  const weekday = WEEKDAYS[weekdayIndex];
  const dayOfMonthLabel = `Ngày ${dayOfMonth}`;
  const DAYS_OF_MONTH = Array.from({ length: 31 }, (_, i) => `Ngày ${i + 1}`);

  const bannerText =
    frequency === "daily"
      ? `Hệ thống sẽ tự động sao lưu vào mỗi ngày lúc ${hour}.`
      : frequency === "weekly"
        ? `Hệ thống sẽ tự động sao lưu vào mỗi ${weekday.toLowerCase()} lúc ${hour}.`
        : `Hệ thống sẽ tự động sao lưu vào ${dayOfMonthLabel.toLowerCase()} hàng tháng lúc ${hour}.`;

  function handleSave() {
    updateMutation.mutate({
      isEnabled: autoBackupEnabled,
      frequency,
      timeOfDay: `${hour}:00`,
      dayOfWeek: frequency === "weekly" ? weekdayIndex + 1 : null,
      dayOfMonth: frequency === "monthly" ? dayOfMonth : null,
    });
  }

  return (
    <div className="rounded-xl border border-[#C4C6D2] bg-[#FCF9F8] p-4 sm:p-8 shadow-sm">
      <div className="flex items-center gap-4 border-b border-[#C4C6D2] pb-6">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#D8E2FF]">
          <Database className="size-6 text-[#316EE9]" />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-[22px] leading-7.75 font-semibold text-[#1C1B1B]">
            Sao lưu dữ liệu
          </h2>
          <p className="text-base text-[#434750]">
            Sao lưu toàn bộ dữ liệu hệ thống để phòng tránh mất mát dữ liệu.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:gap-6 pt-2 sm:pt-6">
        <div className="flex items-center justify-between gap-6 rounded-lg p-2 sm:p-4">
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold text-[#1C1B1B]">
              Sao lưu thủ công
            </span>
            <span className="text-base text-[#434750]">
              Tạo ngay bản sao lưu mới của hệ thống.
            </span>
          </div>
          <button
            type="button"
            onClick={() => triggerMutation.mutate()}
            disabled={triggerMutation.isPending}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-[#003274] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#003274]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="size-3.5" />
            {triggerMutation.isPending ? "Đang sao lưu..." : "Sao lưu ngay"}
          </button>
        </div>

        <div className="flex items-center justify-between gap-6 rounded-lg p-2 sm:p-4">
          <div className="flex flex-col gap-1">
            <span className="text-base font-semibold text-[#1C1B1B]">
              Lịch sử sao lưu
            </span>
            <span className="text-base text-[#434750]">
              Xem danh sách các bản sao lưu đã tạo.
            </span>
          </div>
          <Link
            href="/cai-dat/lich-su-sao-luu"
            className="flex shrink-0 items-center gap-2 rounded-lg border border-[#001E4B] bg-[#FCF9F8] px-5 py-2.5 text-sm font-medium text-[#001E4B] hover:bg-[#F1EDEB]"
          >
            <List className="size-3.5" />
            Xem lịch sử
          </Link>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-[#C4C6D2] bg-[#F6F3F2] p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-[22px] leading-7.75 font-semibold text-[#1C1B1B]">
                Tự động sao lưu
              </h3>
              <p className="text-base text-[#434750]">
                Hệ thống sẽ tự động sao lưu dữ liệu theo lịch đã cài đặt.
              </p>
            </div>
            <label className="flex shrink-0 items-center gap-3">
              <Switch
                checked={autoBackupEnabled}
                onCheckedChange={setAutoBackupEnabled}
                disabled={isLoading}
              />
              <span className="text-sm font-medium text-[#1C1B1B]">
                Bật tự động sao lưu
              </span>
            </label>
          </div>

          {autoBackupEnabled &&
            (frequency === "daily" ? (
              <>
                <div className="flex flex-wrap items-end gap-4">
                  <SelectField
                    label="Tần suất sao lưu"
                    icon={Calendar}
                    value={FREQUENCY_LABELS[frequency]}
                    onChange={(value) => setFrequency(labelToFrequency(value))}
                    options={FREQUENCY_OPTIONS}
                  />
                  <SelectField
                    label="Giờ sao lưu"
                    icon={Clock}
                    value={hour}
                    onChange={setHour}
                    options={HOURS}
                  />
                  <InfoBanner text={bannerText} className="min-w-75 flex-1" />
                </div>
                <p className="text-base text-[#434750]">
                  Sao lưu sẽ được thực hiện vào thời gian đã chọn theo múi giờ
                  của hệ thống.
                </p>
              </>
            ) : (
              <>
                <div className="flex flex-wrap gap-4">
                  <SelectField
                    label="Tần suất sao lưu"
                    icon={Calendar}
                    value={FREQUENCY_LABELS[frequency]}
                    onChange={(value) => setFrequency(labelToFrequency(value))}
                    options={FREQUENCY_OPTIONS}
                  />
                  {frequency === "weekly" ? (
                    <SelectField
                      label="Thứ trong tuần"
                      icon={Calendar}
                      value={weekday}
                      onChange={(value) =>
                        setWeekdayIndex(Math.max(0, WEEKDAYS.indexOf(value)))
                      }
                      options={WEEKDAYS}
                    />
                  ) : (
                    <SelectField
                      label="Ngày trong tháng"
                      icon={Calendar}
                      value={dayOfMonthLabel}
                      onChange={(value) =>
                        setDayOfMonth(Number(value.replace(/\D/g, "")) || 1)
                      }
                      options={DAYS_OF_MONTH}
                    />
                  )}
                  <SelectField
                    label="Giờ sao lưu"
                    icon={Clock}
                    value={hour}
                    onChange={setHour}
                    options={HOURS}
                  />
                </div>
                <p className="text-base text-[#434750]">
                  Sao lưu sẽ được thực hiện vào thời gian đã chọn theo múi giờ
                  của hệ thống.
                </p>
                <InfoBanner text={bannerText} />
              </>
            ))}

          <button
            type="button"
            onClick={handleSave}
            disabled={updateMutation.isPending || isLoading}
            className="flex w-fit items-center gap-2 self-end rounded-lg bg-[#316EE9] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#316EE9]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="size-3.5" />
            {updateMutation.isPending ? "Đang lưu..." : "Lưu cài đặt"}
          </button>
        </div>
      </div>
    </div>
  );
}
