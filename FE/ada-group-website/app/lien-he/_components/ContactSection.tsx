"use client";

import React, { useState } from "react";
import { submitContact } from "@/src/lib/api/contacts";
import Alert from "@/src/components/common/Alert";

const headerData = [
  {
    title: "Liên hệ với ADA",
    subtitle: "Kết nối để kiến tạo giá trị cùng AI",
    description:
      "Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn trong hành trình ứng dụng AI để tạo ra những bước đột phá. Chúng tôi luôn tìm kiếm những cơ hội hợp tác chiến lược để cùng phát triển giải pháp AI phục vụ doanh nghiệp và cộng đồng.",
  },
];

// Chấp nhận số VN (0xxx) và số quốc tế (+countrycode...)
// Tối thiểu 7 chữ số, tối đa 15 chữ số (chuẩn E.164)
const PHONE_REGEX = /^\+?[0-9]{1,4}[\s\-.]?\(?[0-9]{1,4}\)?[\s\-.]?[0-9]{1,4}[\s\-.]?[0-9]{1,9}$/
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
    errors.phone =
      "Số điện thoại không hợp lệ. (ví dụ: 0912345678 hoặc +84912345678).";
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

export default function ContactSection() {
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
    // Re-validate on change once user has already touched the field
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

    // Mark all fields touched & run full validation
    setTouched({ name: true, email: true, phone: true, message: true });
    const errors = validateForm(formData);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      // Focus the first invalid field
      const firstKey = Object.keys(errors)[0];
      document.getElementById(`cs-${firstKey}`)?.focus();
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
          title: "Gửi liên hệ thành công!",
          message:
            "Cảm ơn bạn đã gửi thông tin liên hệ. Chúng tôi sẽ liên hệ với bạn sớm nhất.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
        setFieldErrors({});
        setTouched({});
      } else {
        setAlertInfo({
          type: "error",
          title: "Đã xảy ra lỗi",
          message:
            response.error || "Có lỗi xảy ra khi gửi liên hệ. Vui lòng thử lại.",
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
    <section className="section-y min-h-screen relative">
      {alertInfo && (
        <Alert
          type={alertInfo.type}
          title={alertInfo.title}
          description={alertInfo.message}
          onClose={() => setAlertInfo(null)}
          actionText={alertInfo.type === "success" ? "Về trang chủ" : "Thử lại"}
          actionLink={alertInfo.type === "success" ? "/" : undefined}
        />
      )}
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">

        {/* Header */}
        {headerData.map((item, index) => (
          <div
            key={index}
            className="max-w-xl mb-(--section-padding) flex flex-col gap-(--heading-space)"
          >
            <h1 className="text-[28px] leading-[1.2] font-semibold tracking-tight text-zinc-900 lg:text-[44px] lg:leading-[1.1]">
              {item.title}
            </h1>
            <h2 className="text-[19px] lg:text-[21px] font-semibold text-zinc-900 leading-snug">
              {item.subtitle}
            </h2>
            <p className="text-zinc-500 leading-relaxed text-[14px] lg:text-[16px] text-justify mt-(--inner-space)">
              {item.description}
            </p>
          </div>
        ))}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-(--section-padding)">

          {/* Left Column: Form */}
          <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col gap-(--heading-space)">
            <h3 className="text-[19px] lg:text-[21px] font-semibold text-zinc-900 leading-snug uppercase">
              GỬI CHO CHÚNG TÔI
            </h3>
            <p className="text-[14px] lg:text-[16px] text-zinc-500 leading-relaxed mb-(--inner-space)">
              Hãy điền thông tin, đội ngũ của ADA sẽ phản hồi bạn trong thời gian sớm nhất.
            </p>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-(--inner-space)"
            >
              {/* Họ và tên */}
              <div className="flex flex-col gap-1">
                <label htmlFor="cs-name" className="text-[14px] font-semibold text-zinc-800">
                  Họ và tên <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="cs-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Nhập họ và tên"
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? "cs-name-error" : undefined}
                  className={fieldErrors.name ? errorInputClass : normalInputClass}
                />
                <span id="cs-name-error">
                  <FieldError message={fieldErrors.name} />
                </span>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="cs-email" className="text-[14px] font-semibold text-zinc-800">
                  Email <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="cs-email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Nhập email"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "cs-email-error" : undefined}
                  className={fieldErrors.email ? errorInputClass : normalInputClass}
                />
                <span id="cs-email-error">
                  <FieldError message={fieldErrors.email} />
                </span>
              </div>

              {/* Số điện thoại */}
              <div className="flex flex-col gap-1">
                <label htmlFor="cs-phone" className="text-[14px] font-semibold text-zinc-800">
                  Số điện thoại <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="cs-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Nhập số điện thoại (ví dụ: 0912345678 hoặc +1234567890)"
                  aria-invalid={!!fieldErrors.phone}
                  aria-describedby={fieldErrors.phone ? "cs-phone-error" : undefined}
                  className={fieldErrors.phone ? errorInputClass : normalInputClass}
                />
                <span id="cs-phone-error">
                  <FieldError message={fieldErrors.phone} />
                </span>
              </div>

              {/* Nội dung */}
              <div className="flex flex-col gap-1">
                <label htmlFor="cs-message" className="text-[14px] font-semibold text-zinc-800">
                  Nội dung <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="cs-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Nhập nội dung liên hệ của bạn..."
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={fieldErrors.message ? "cs-message-error" : undefined}
                  className={
                    (fieldErrors.message ? errorInputClass : normalInputClass) +
                    " resize-none"
                  }
                />
                <div className="flex items-start justify-between gap-2">
                  <span id="cs-message-error" className="flex-1">
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
                  {isSubmitting ? "Đang gửi..." : <span>Gửi liên hệ</span>}
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

          {/* Right Column: Map */}
          <div className="flex flex-col h-full min-h-100 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.4580862917574!2d105.74528907587147!3d20.97426688964681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134532cc803c8e5%3A0x91a5747dcb3419e6!2sAn%20Ph%C3%BA%20Building!5e0!3m2!1svi!2s!4v1788494095357!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl shadow-sm border border-slate-200 flex-1"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
