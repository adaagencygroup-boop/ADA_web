"use client";

import React, { useState } from "react";
import { submitContact } from "@/src/lib/api/contacts";
import Alert from "@/src/components/common/Alert";



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
  const [alertInfo, setAlertInfo] = useState<{type: 'success'|'error', title: string, message: string} | null>(null);



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
          type: 'success',
          title: 'Gửi liên hệ thành công!',
          message: 'Cảm ơn bạn đã gửi thông tin liên hệ. Chúng tôi sẽ liên hệ với bạn sớm nhất.'
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setAlertInfo({
          type: 'error',
          title: 'Đã xảy ra lỗi',
          message: response.error || 'Có lỗi xảy ra khi gửi liên hệ. Vui lòng thử lại.'
        });
      }
    } catch (error) {
      console.error("Submit contact error:", error);
      setAlertInfo({
        type: 'error',
        title: 'Đã xảy ra lỗi',
        message: 'Chúng tôi không thể kết nối tới máy chủ lúc này. Vui lòng kiểm tra lại đường truyền mạng hoặc thử lại sau ít phút.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="section-y min-h-screen relative">
      {alertInfo && (
        <Alert 
          type={alertInfo.type}
          title={alertInfo.title}
          description={alertInfo.message}
          onClose={() => setAlertInfo(null)}
          actionText={alertInfo.type === 'success' ? "Về trang chủ" : "Thử lại"}
          actionLink={alertInfo.type === 'success' ? "/" : undefined}
        />
      )}
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
