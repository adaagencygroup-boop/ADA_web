"use client";

import React, { useState } from "react";
import { ContactIcon, ShieldIcon, ZapIcon } from "@/app/_components/icons";
import { submitContact } from "@/src/lib/api/contacts";
import Alert from "@/src/components/common/Alert";

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

const inputClassName =
  "w-full bg-white border border-slate-200 rounded-lg lg:rounded-xl px-4 py-3 text-[14px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400 shadow-[0_2px_10px_rgb(0,0,0,0.01)]";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAlertInfo(null);

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
          <h2 className="text-[28px] leading-[1.2] font-semibold tracking-tight text-zinc-900 lg:text-[44px] lg:leading-[1.1]">
            {CONTENT.title}
          </h2>
          <p className="mt-(--heading-space) text-[14px] lg:text-[16px] leading-relaxed text-zinc-600">
            {CONTENT.description}
          </p>
        </div>

        <div className="mt-(--inner-space) grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-10">
          <form
            suppressHydrationWarning
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="cf-name" className="text-[14px] font-semibold text-zinc-800">
                Họ và tên *
              </label>
              <input
                suppressHydrationWarning
                id="cf-name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập họ và tên"
                className={inputClassName}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cf-email" className="text-[14px] font-semibold text-zinc-800">
                Email *
              </label>
              <input
                suppressHydrationWarning
                id="cf-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email"
                className={inputClassName}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cf-phone" className="text-[14px] font-semibold text-zinc-800">
                Số điện thoại *
              </label>
              <input
                suppressHydrationWarning
                id="cf-phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại"
                className={inputClassName}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cf-message" className="text-[14px] font-semibold text-zinc-800">
                Nội dung *
              </label>
              <textarea
                suppressHydrationWarning
                id="cf-message"
                name="message"
                rows={4}
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Nhập nội dung liên hệ của bạn..."
                className={inputClassName}
              />
            </div>

            <div className="mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#002A64] hover:bg-[#002A64]/90 text-white font-semibold text-[14px] px-8 py-3.5 rounded-lg flex items-center gap-2 transition-colors uppercase tracking-wide w-fit disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "ĐANG GỬI..." : <>{CONTENT.submitLabel} &rarr;</>}
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
