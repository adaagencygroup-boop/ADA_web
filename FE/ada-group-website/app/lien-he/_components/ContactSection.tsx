"use client";

import React, { useState } from "react";
import { submitContact } from "@/src/lib/api/contacts";

const contactInfo = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    title: "ĐỊA CHỈ",
    content: "Tầng 7, Tòa nhà An Phú,\n285 Cách Mạng Tháng 8, Phường 12, Quận 10,\nTP. Hồ Chí Minh, Việt Nam",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    title: "ĐIỆN THOẠI",
    content: "(+84) 28 7300 6464",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    title: "EMAIL",
    content: "contact@adagroup.vn",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
    title: "WEBSITE",
    content: "www.adagroup.vn",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "GIỜ LÀM VIỆC",
    content: "Thứ 2 - Thứ 6: 8:30 - 17:30\n(Nghỉ thứ 7, Chủ nhật và ngày lễ)",
  },
];

const headerData = [
  {
    title: "Liên hệ với ADA",
    subtitle: "Kết nối để kiến tạo giá trị cùng AI",
    description: "Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng bạn trong hành trình ứng dụng AI để tạo ra những bước đột phá. Chúng tôi luôn tìm kiếm những cơ hội hợp tác chiến lược để cùng phát triển giải pháp AI phục vụ doanh nghiệp và cộng đồng."
  }
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await submitContact({
        customerFullname: formData.name,
        customerEmail: formData.email || null,
        customerPhone: formData.phone || null,
        message: formData.message,
      });

      if (response.success) {
        alert("Gửi liên hệ thành công! Chúng tôi sẽ sớm phản hồi lại bạn.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        alert(response.error || "Có lỗi xảy ra khi gửi liên hệ.");
      }
    } catch (error) {
      console.error("Submit contact error:", error);
      alert("Đã xảy ra lỗi hệ thống.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="bg-linear-to-b from-[#F0F7FF] to-[#FFFFFF] section-y min-h-screen">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        {headerData.map((item, index) => (
          <div key={index} className="max-w-xl mb-(--section-padding) flex flex-col gap-(--heading-space)">
            <h1 className="text-[2rem] leading-[1.2] font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
              {item.title}
            </h1>
            <h2 className="text-[19px] lg:text-[21px] font-semibold text-zinc-900 leading-snug">
              {item.subtitle}
            </h2>
            <p className="text-zinc-500 leading-relaxed text-[14.5px] lg:text-[15px] text-justify mt-(--inner-space)">
              {item.description}
            </p>
          </div>
        ))}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-(--section-padding)">
          
          {/* Left Column: Form */}
          <div className="flex flex-col gap-(--heading-space)">
            <h3 className="text-lg lg:text-[1.35rem] font-semibold text-zinc-900 uppercase">
              GỬI CHO CHÚNG TÔI
            </h3>
            <p className="text-[14px] text-zinc-500 leading-relaxed mb-(--inner-space)">
              Hãy điền thông tin, đội ngũ của ADA sẽ phản hồi bạn trong thời gian sớm nhất.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-(--inner-space)">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[14px] font-semibold text-zinc-800">Họ và tên *</label>
                <input 
                  id="name"
                  name="name"
                  type="text" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập họ và tên" 
                  className="w-full bg-white border border-slate-200 rounded-lg lg:rounded-xl px-4 py-3 text-[14px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400 shadow-[0_2px_10px_rgb(0,0,0,0.01)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[14px] font-semibold text-zinc-800">Email *</label>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Nhập email" 
                  className="w-full bg-white border border-slate-200 rounded-lg lg:rounded-xl px-4 py-3 text-[14px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400 shadow-[0_2px_10px_rgb(0,0,0,0.01)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-[14px] font-semibold text-zinc-800">Số điện thoại *</label>
                <input 
                  id="phone"
                  name="phone"
                  type="tel" 
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại" 
                  className="w-full bg-white border border-slate-200 rounded-lg lg:rounded-xl px-4 py-3 text-[14px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400 shadow-[0_2px_10px_rgb(0,0,0,0.01)]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-[14px] font-semibold text-zinc-800">Nội dung *</label>
                <textarea 
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Nhập nội dung liên hệ của bạn..." 
                  className="w-full bg-white border border-slate-200 rounded-lg lg:rounded-xl px-4 py-3 text-[14px] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-zinc-400 resize-none shadow-[0_2px_10px_rgb(0,0,0,0.01)]"
                />
              </div>

              <div className="mt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-[#002A64] hover:bg-[#002A64]/90 text-white font-semibold text-[13px] px-8 py-3.5 rounded-lg flex items-center gap-2 transition-colors uppercase tracking-wide w-fit disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "ĐANG GỬI..." : <>GỬI LIÊN HỆ &rarr;</>}
                </button>
              </div>

              <div className="flex items-center gap-2 mt-2 text-[12.5px] text-zinc-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>Thông tin của bạn được bảo mật và chỉ sử dụng để phản hồi liên hệ.</span>
              </div>
            </form>
          </div>

          {/* Right Column: Contact Info */}
          <div className="flex flex-col gap-(--heading-space)">
            <h3 className="text-lg lg:text-[1.35rem] font-semibold text-zinc-900 uppercase">
              THÔNG TIN LIÊN HỆ
            </h3>
            <p className="text-[14px] text-zinc-500 leading-relaxed mb-(--inner-space)">
              Bạn cũng có thể liên hệ với chúng tôi qua các kênh dưới đây.
            </p>

            <div className="flex flex-col gap-(--inner-space)">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-xl p-5 flex gap-(--inner-space) items-start shadow-[0_2px_20px_rgb(0,0,0,0.02)]">
                  <div className="bg-[#f0f4f9] text-[#2c5282] p-2.5 rounded-full shrink-0 flex items-center justify-center">
                    {info.icon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[12px] font-semibold text-zinc-900 uppercase tracking-wider">{info.title}</h4>
                    <p className="text-[14px] text-zinc-600 leading-relaxed whitespace-pre-line">
                      {info.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
