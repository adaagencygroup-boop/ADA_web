"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { MOCK_RECRUITMENTS, formatEmploymentType } from "@/src/lib/api/recruitments";
import { submitApplication } from "@/src/lib/api/candidates";

export default function JobApplicationPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const job = MOCK_RECRUITMENTS.find((j) => j.slug === slug);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    message: "",
    agreeTerm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!job) {
    notFound();
  }

  const postDate = new Date(job.createdAt).toLocaleDateString("vi-VN");
  const expireDate = job.expiresAt ? new Date(job.expiresAt).toLocaleDateString("vi-VN") : "Đang mở";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const validateAndSetFile = (selectedFile: File) => {
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = selectedFile.name.toLowerCase();
    
    if (!validExtensions.some(ext => fileName.endsWith(ext))) {
      alert("Chỉ chấp nhận file định dạng PDF, DOC hoặc DOCX!");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("Dung lượng file không được vượt quá 5MB!");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerm) {
      alert("Vui lòng đồng ý với điều khoản sử dụng thông tin!");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitApplication({
        recruitmentId: job.id,
        fullname: formData.fullname,
        email: formData.email || null,
        phone: formData.phone || null,
        message: formData.message || null,
        resumeUrl: null, // Handle file upload later
      });

      if (response.success) {
        alert("Nộp hồ sơ thành công! (Dữ liệu đã được lưu vào hệ thống mock)");
        setFormData({ fullname: "", email: "", phone: "", message: "", agreeTerm: false });
        setFile(null);
      } else {
        alert(response.error || "Có lỗi xảy ra khi nộp hồ sơ.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Đã xảy ra lỗi hệ thống.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumb Area */}
      <div className="bg-white py-4 border-b border-slate-100">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-[10px] sm:text-[11px] md:text-[13px] text-zinc-500 font-medium whitespace-nowrap overflow-x-auto no-scrollbar">
            <Link href="/" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 md:w-3.75 md:h-3.75 -mt-px"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              Trang chủ
            </Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 mx-1.5 md:mx-2 text-zinc-400 shrink-0"><polyline points="9 18 15 12 9 6" /></svg>
            <Link href="/tuyen-dung" className="hover:text-blue-600 transition-colors shrink-0">Tuyển dụng</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 mx-1.5 md:mx-2 text-zinc-400 shrink-0"><polyline points="9 18 15 12 9 6" /></svg>
            <Link href={`/tuyen-dung/${slug}`} className="hover:text-blue-600 transition-colors shrink-0">{job.jobTitle}</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 mx-1.5 md:mx-2 text-zinc-400 shrink-0"><polyline points="9 18 15 12 9 6" /></svg>
            <span className="text-zinc-900 font-semibold shrink-0">Ứng tuyển</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative w-full bg-[#002A64] py-16 lg:py-24 overflow-hidden">
        {job.coverImageUrl && (
          <Image 
            src={job.coverImageUrl} 
            alt={job.jobTitle} 
            fill 
            className="object-cover" 
            unoptimized 
          />
        )}
        <div className="absolute inset-0 bg-[#002A64]/65"></div>
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="relative z-10 mx-auto max-w-360 px-4 sm:px-6 lg:px-8 text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full font-semibold text-[11px] uppercase tracking-wider mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
            Tuyển dụng
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Ứng tuyển vị trí {job.jobTitle}
          </h1>
          <p className="text-blue-100/90 text-[14.5px] lg:text-[16px] mb-8">
            Vui lòng điền thông tin bên dưới để gửi hồ sơ ứng tuyển của bạn.
          </p>

          <div className="pt-6 border-t border-white/20 flex flex-wrap items-center gap-6 text-[13px] text-blue-100/80">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
              Đăng ngày: {postDate}
            </div>
            <div className="flex items-center gap-2 text-red-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              Hạn ứng tuyển: {expireDate}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-y max-md:pb-8! max-md:pt-8!">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Form) */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                
                {/* 1. THÔNG TIN ỨNG VIÊN */}
                <div>
                  <h2 className="text-[16px] font-bold text-[#002A64] uppercase flex items-center gap-3 mb-5 border-b border-slate-100 pb-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                    Thông tin ứng viên
                  </h2>
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">Họ và tên <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type="text" name="fullname" value={formData.fullname} onChange={handleInputChange} required placeholder="Nhập họ và tên của bạn" className="w-full border border-slate-200 rounded-lg px-4 py-3 pl-10 text-[14px] outline-none focus:border-blue-500 transition-colors" />
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Nhập email của bạn" className="w-full border border-slate-200 rounded-lg px-4 py-3 pl-10 text-[14px] outline-none focus:border-blue-500 transition-colors" />
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">Số điện thoại <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="Nhập số điện thoại của bạn" className="w-full border border-slate-200 rounded-lg px-4 py-3 pl-10 text-[14px] outline-none focus:border-blue-500 transition-colors" />
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. HỒ SƠ */}
                <div>
                  <h2 className="text-[16px] font-bold text-[#002A64] uppercase flex items-center gap-3 mb-5 border-b border-slate-100 pb-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" /></svg>
                    Hồ sơ
                  </h2>
                  <div>
                    <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">CV / Resume <span className="text-red-500">*</span></label>
                    <div 
                      onClick={handleFileClick}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      className="border-2 border-dashed border-blue-200 rounded-xl p-8 flex flex-col items-center justify-center bg-blue-50/50 hover:bg-blue-50 transition-colors cursor-pointer group"
                    >
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept=".pdf,.doc,.docx"
                      />
                      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>
                      </div>
                      {file ? (
                        <p className="text-[14px] font-semibold text-[#002A64] mb-1">{file.name}</p>
                      ) : (
                        <p className="text-[14px] font-medium text-zinc-700 mb-1">Kéo thả file vào đây hoặc</p>
                      )}
                      {!file && (
                        <button type="button" className="text-[13px] font-bold text-white bg-[#002A64] hover:bg-[#002A64]/90 px-4 py-2 rounded-lg mt-2 transition-colors">
                          Chọn file
                        </button>
                      )}
                    </div>
                    <p className="text-[12px] text-zinc-400 mt-2">Hỗ trợ định dạng: PDF, DOC, DOCX. (Tối đa 5MB)</p>
                  </div>
                </div>

                {/* 3. LỜI NHẮN */}
                <div>
                  <h2 className="text-[16px] font-bold text-[#002A64] uppercase flex items-center gap-3 mb-5 border-b border-slate-100 pb-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg>
                    Lời nhắn (Không bắt buộc)
                  </h2>
                  <div>
                    <textarea 
                      name="message" 
                      value={formData.message} 
                      onChange={handleInputChange} 
                      rows={4} 
                      placeholder="Giới thiệu bản thân hoặc gửi lời nhắn đến nhà tuyển dụng..." 
                      className="w-full border border-slate-200 rounded-lg p-4 text-[14px] outline-none focus:border-blue-500 transition-colors resize-y"
                    ></textarea>
                    <p className="text-[12px] text-zinc-400 text-right mt-1">0 / 500</p>
                  </div>
                </div>

                {/* Submit Area */}
                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3 mb-6">
                    <input type="checkbox" id="agree" name="agreeTerm" checked={formData.agreeTerm} onChange={handleInputChange} className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <label htmlFor="agree" className="text-[13px] text-zinc-600 leading-relaxed cursor-pointer select-none">
                      Tôi đồng ý với việc sử dụng thông tin cá nhân cho <a href="#" className="text-blue-600 font-medium hover:underline">mục đích tuyển dụng</a>.
                    </label>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#002A64] text-white rounded-lg font-bold text-[14px] hover:bg-[#002A64]/90 transition-colors shadow-md group disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? (
                      "Đang gửi..."
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                        Gửi hồ sơ ứng tuyển
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-24">
            
            {/* Box 1: Thông tin tuyển dụng */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h3 className="text-[16px] font-bold text-zinc-900 uppercase flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>
                Thông tin tuyển dụng
              </h3>
              
              <h4 className="font-bold text-[#002A64] text-[17px] mb-4">{job.jobTitle}</h4>
              
              <table className="w-full text-[13.5px] text-zinc-600 mb-6 border-collapse">
                <tbody>
                  <tr className="border-b border-slate-50">
                    <td className="py-2.5 flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-zinc-400"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg> Phòng ban</td>
                    <td className="py-2.5 text-right font-medium text-zinc-800">{job.department || "Khác"}</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-2.5 flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-zinc-400"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg> Địa điểm</td>
                    <td className="py-2.5 text-right font-medium text-zinc-800">{job.location}</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-2.5 flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-zinc-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Hình thức làm việc</td>
                    <td className="py-2.5 text-right font-medium text-zinc-800">{formatEmploymentType(job.employmentType)}</td>
                  </tr>
                  <tr className="border-b border-slate-50">
                    <td className="py-2.5 flex items-center gap-2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-zinc-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg> Đăng ngày</td>
                    <td className="py-2.5 text-right font-medium text-zinc-800">{postDate}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 flex items-center gap-2 text-red-500 font-medium"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg> Hạn ứng tuyển</td>
                    <td className="py-2.5 text-right font-medium text-red-500">{expireDate}</td>
                  </tr>
                </tbody>
              </table>

              <Link href={`/tuyen-dung/${slug}`} className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-blue-600 font-medium text-[13px] hover:bg-slate-50 hover:border-blue-200 transition-colors group">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" /></svg>
                Quay lại tin tuyển dụng
              </Link>
            </div>

            {/* Box 2: Cần hỗ trợ? */}
            <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 shadow-sm">
              <h3 className="text-[15px] font-bold text-zinc-900 uppercase flex items-center gap-2 mb-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                Cần hỗ trợ?
              </h3>
              <p className="text-[13px] text-zinc-600 mb-4 leading-relaxed">
                Nếu bạn cần hỗ trợ trong quá trình ứng tuyển, vui lòng liên hệ với chúng tôi.
              </p>
              <div className="flex flex-col gap-3 text-[13px] text-zinc-800 font-medium">
                <a href="tel:0243456678" className="flex items-center gap-3 hover:text-blue-600 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  (+84) 024 345 678
                </a>
                <a href="mailto:hr@adagroup.vn" className="flex items-center gap-3 hover:text-blue-600 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-blue-500"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  hr@adagroup.vn
                </a>
                <div className="flex items-center gap-3 text-zinc-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-zinc-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Thứ 2 – Thứ 6 (8:30 – 17:30)
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
