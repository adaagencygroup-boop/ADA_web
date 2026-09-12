"use client";

import React, { useState } from "react";
import { ContactIcon, ShieldIcon, ZapIcon } from "@/app/_components/icons";
import { submitContact } from "@/src/lib/api/contacts";
import Alert from "@/src/components/common/Alert";
import GsapWaveText from "@/app/_components/GsapWaveText";

const CONTENT = {
  title: "Bạn đang có bài toán cần giải quyết?",
  description:
    "Để lại thông tin, chuyên gia của ADA Group sẽ liên hệ và tư vấn giải pháp phù hợp.",
  submitLabel: "Gửi yêu cầu tư vấn",
};

const BENEFITS = [
  {
    Icon: ContactIcon,
    title: "Tư vấn miễn phí",
    description:
      "Đội ngũ chuyên gia sẽ tư vấn giải pháp phù hợp với nhu cầu của bạn.",
  },
  {
    Icon: ZapIcon,
    title: "Phản hồi nhanh chóng",
    description: "Chúng tôi cam kết phản hồi trong vòng 24 giờ.",
  },
  {
    Icon: ShieldIcon,
    title: "Bảo mật thông tin",
    description: "Thông tin của bạn được bảo mật tuyệt đối.",
  },
];

// Validation
const PHONE_REGEX = /^\+?[0-9]{1,4}[\s\-.]?\(?[0-9]{1,4}\)?[\s\-.]?[0-9]{1,4}[\s\-.]?[0-9]{1,9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

function validateForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name.trim()) {
    errors.name = "Vui lòng nhập họ và tên.";
  } else if (data.name.trim().length < 2) {
    errors.name = "Họ và tên phải có ít nhất 2 ký tự.";
  } else if (data.name.trim().length > 100) {
    errors.name = "Họ và tên không được vượt quá 100 ký tự.";
  }

  if (!data.email.trim()) {
    errors.email = "Vui lòng nhập địa chỉ email.";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Địa chỉ email không hợp lệ (ví dụ: example@domain.com).";
  }

  const phoneDigits = data.phone.trim().replace(/[\s\-.()+]/g, "");
  if (!data.phone.trim()) {
    errors.phone = "Vui lòng nhập số điện thoại.";
  } else if (!PHONE_REGEX.test(data.phone.trim()) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = "Số điện thoại không hợp lệ. (ví dụ: 0912345678 hoặc +84912345678).";
  }

  if (!data.message.trim()) {
    errors.message = "Vui lòng nhập nội dung liên hệ.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Nội dung phải có ít nhất 10 ký tự.";
  } else if (data.message.trim().length > 2000) {
    errors.message = "Nội dung không được vượt quá 2000 ký tự.";
  }

  return errors;
}

// Styles
const baseInputClass =
  "w-full bg-white border rounded-lg lg:rounded-xl px-4 py-3 text-[14px] outline-none transition-all placeholder:text-zinc-400 shadow-[0_2px_10px_rgb(0,0,0,0.01)]";
const normalInputClass = `${baseInputClass} border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20`;
const errorInputClass = `${baseInputClass} border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 bg-red-50/40`;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-start gap-1.5 text-[12.5px] text-red-600 mt-1" role="alert">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5 mt-0.5 shrink-0"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span>{message}</span>
    </p>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertInfo, setAlertInfo] = useState<{
    type: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (touched[name]) {
      const errors = validateForm(updated);
      setFieldErrors((prev) => ({
        ...prev,
        [name]: errors[name as keyof FieldErrors],
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errors = validateForm(formData);
    setFieldErrors((prev) => ({
      ...prev,
      [name]: errors[name as keyof FieldErrors],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertInfo(null);

    setTouched({ name: true, email: true, phone: true, message: true });
    const errors = validateForm(formData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstKey = Object.keys(errors)[0];
      document.getElementById(`cf-${firstKey}`)?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitContact({
        customerFullname: formData.name,
        customerEmail: formData.email || null,
        customerPhone: formData.phone || null,
        message: formData.message,
      });

      if (response.success) {
        setAlertInfo({
          type: "success",
          title: "Gửi thành công!",
          message:
            "Cảm ơn bạn đã gửi thông tin. Chuyên gia của ADA Group sẽ liên hệ với bạn sớm nhất.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
        setFieldErrors({});
        setTouched({});
      } else {
        setAlertInfo({
          type: "error",
          title: "Đã xảy ra lỗi",
          message:
            response.error || "Có lỗi xảy ra khi gửi. Vui lòng thử lại.",
        });
      }
    } catch (error) {
      console.error("Submit contact error:", error);
      setAlertInfo({
        type: "error",
        title: "Đã xảy ra lỗi",
        message:
          "Chúng tôi không thể kết nối tới máy chủ lúc này. Vui lòng kiểm tra lại đường truyền mạng hoặc thử lại sau ít phút.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-y bg-blue-50 relative">
      {alertInfo && (
        <Alert
          type={alertInfo.type}
          title={alertInfo.title}
          description={alertInfo.message}
          onClose={() => setAlertInfo(null)}
          actionText="Đóng"
        />
      )}

      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <GsapWaveText
            text={CONTENT.title}
            as="h2"
            className="text-[28px] leading-[1.2] font-semibold tracking-tight text-zinc-900 lg:text-[44px] lg:leading-[1.1]"
          />
          <p className="mt-(--heading-space) text-[14px] lg:text-[16px] leading-relaxed text-zinc-600">
            {CONTENT.description}
          </p>
        </div>

        <div className="mt-(--inner-space) grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4"
            >
              {/* Họ và tên */}
              <div className="flex flex-col gap-1">
                <label htmlFor="cf-name" className="text-[14px] font-semibold text-zinc-800">
                  Họ và tên <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="cf-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Nhập họ và tên"
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? "cf-name-error" : undefined}
                  className={fieldErrors.name ? errorInputClass : normalInputClass}
                />
                <span id="cf-name-error">
                  <FieldError message={fieldErrors.name} />
                </span>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="cf-email" className="text-[14px] font-semibold text-zinc-800">
                  Email <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="cf-email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Nhập email"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "cf-email-error" : undefined}
                  className={fieldErrors.email ? errorInputClass : normalInputClass}
                />
                <span id="cf-email-error">
                  <FieldError message={fieldErrors.email} />
                </span>
              </div>

              {/* Số điện thoại */}
              <div className="flex flex-col gap-1">
                <label htmlFor="cf-phone" className="text-[14px] font-semibold text-zinc-800">
                  Số điện thoại <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="cf-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Nhập số điện thoại (ví dụ: 0912345678 hoặc +1234567890)"
                  aria-invalid={!!fieldErrors.phone}
                  aria-describedby={fieldErrors.phone ? "cf-phone-error" : undefined}
                  className={fieldErrors.phone ? errorInputClass : normalInputClass}
                />
                <span id="cf-phone-error">
                  <FieldError message={fieldErrors.phone} />
                </span>
              </div>

              {/* Nội dung */}
              <div className="flex flex-col gap-1">
                <label htmlFor="cf-message" className="text-[14px] font-semibold text-zinc-800">
                  Nội dung <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Nhập nội dung liên hệ của bạn..."
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={fieldErrors.message ? "cf-message-error" : undefined}
                  className={
                    (fieldErrors.message ? errorInputClass : normalInputClass) +
                    " resize-none"
                  }
                />
                <div className="flex items-start justify-between gap-2">
                  <span id="cf-message-error" className="flex-1">
                    <FieldError message={fieldErrors.message} />
                  </span>
                  <span className="text-[11px] text-zinc-400 shrink-0 mt-1">
                    {formData.message.length}/2000
                  </span>
                </div>
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#002A64] hover:bg-[#002A64]/90 text-white font-semibold text-[14px] leading-none px-8 py-3.5 rounded-lg flex items-center gap-1.5 transition-colors w-fit disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Đang gửi..." : <span>{CONTENT.submitLabel}</span>}
                </button>
              </div>

              <div className="flex items-center gap-2 mt-2 text-[12.5px] text-zinc-400">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Thông tin của bạn được bảo mật và chỉ sử dụng để phản hồi liên hệ.</span>
              </div>
            </form>
          </div>

          <div className="hidden space-y-6 lg:block lg:mt-(--inner-space)">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D8E2FF]">
                  <benefit.Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-zinc-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

