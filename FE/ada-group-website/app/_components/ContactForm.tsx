"use client";

import { ContactIcon, ShieldIcon, ZapIcon } from "@/app/_components/icons";

const CONTENT = {
  title: "Bạn đang có bài toán cần giải quyết?",
  description:
    "Để lại thông tin, chuyên gia của ADA Group sẽ liên hệ và tư vấn giải pháp phù hợp.",
  submitLabel: "Gửi yêu cầu tư vấn",
};

const FIELDS = {
  fullName: { label: "Họ và tên *", placeholder: "Nhập họ và tên" },
  company: { label: "Công ty", placeholder: "Nhập tên công ty" },
  phone: { label: "Số điện thoại *", placeholder: "Nhập số điện thoại" },
  email: { label: "Email *", placeholder: "Nhập địa chỉ email" },
  solution: {
    label: "Bạn quan tâm đến giải pháp nào? *",
    placeholder: "Chọn giải pháp",
  },
  message: {
    label: "Mô tả nhu cầu / vấn đề bạn đang gặp phải",
    placeholder: "Nhập mô tả chi tiết...",
  },
};

const SOLUTION_OPTIONS = [
  { value: "web", label: "Web & Web Application" },
  { value: "mobile", label: "Mobile Application" },
  { value: "enterprise", label: "Hệ thống doanh nghiệp" },
  { value: "ai", label: "AI & Automation" },
];

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
  "mt-1.5 w-full rounded-lg border border-zinc-300 bg-[#FFFCF7] px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-600 focus:outline-none";

export default function ContactForm() {
  return (
    <section className="section-y bg-blue-50">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            {CONTENT.title}
          </h2>
          <p className="mt-(--heading-space) text-sm leading-relaxed text-zinc-600 sm:text-base">
            {CONTENT.description}
          </p>
        </div>

        <div className="mt-(--inner-space) grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
          <form
            onSubmit={(event) => event.preventDefault()}
            className="space-y-4 rounded-2xl p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700">
                  {FIELDS.fullName.label}
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder={FIELDS.fullName.placeholder}
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-zinc-700">
                  {FIELDS.company.label}
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder={FIELDS.company.placeholder}
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-700">
                  {FIELDS.phone.label}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder={FIELDS.phone.placeholder}
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                  {FIELDS.email.label}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={FIELDS.email.placeholder}
                  className={inputClassName}
                />
              </div>
            </div>

            <div>
              <label htmlFor="solution" className="block text-sm font-medium text-zinc-700">
                {FIELDS.solution.label}
              </label>
              <select
                id="solution"
                name="solution"
                defaultValue=""
                required
                className={inputClassName}
              >
                <option value="" disabled>
                  {FIELDS.solution.placeholder}
                </option>
                {SOLUTION_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700">
                {FIELDS.message.label}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder={FIELDS.message.placeholder}
                className={inputClassName}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              {CONTENT.submitLabel}
            </button>
          </form>

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
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">
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
