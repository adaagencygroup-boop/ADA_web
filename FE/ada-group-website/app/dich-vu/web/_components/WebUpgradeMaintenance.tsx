export default function WebUpgradeMaintenance() {
  const upgradeFeatures = [
    "Thiết kế lại giao diện (UI/UX Redesign)",
    "Chuyển đổi công nghệ mới (Migration)",
    "Tối ưu tốc độ tải trang & hiệu năng",
    "Tối ưu hóa cơ sở dữ liệu",
    "Phát triển thêm tính năng (Feature Development)",
    "Tái cấu trúc mã nguồn (Code Refactoring)",
  ];

  const maintenanceFeatures = [
    "Theo dõi hoạt động hệ thống (Monitoring) 24/7",
    "Bảo trì máy chủ & Xử lý sự cố",
    "Sao lưu dữ liệu định kỳ (Backup)",
    "Cập nhật bản vá bảo mật",
    "Quản trị nội dung & Hỗ trợ sử dụng",
    "SLA cam kết thời gian phản hồi (Support Ticket)",
  ];

  return (
    <section className="bg-[#F7F9FB] section-y max-md:py-5!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Nâng cấp hệ thống hiện có */}
          <div className="bg-[#C4C6D24D] rounded-3xl lg:rounded-4xl p-6 lg:p-8 xl:p-10 flex flex-col border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.8rem] bg-[#0b246a] text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                </svg>
              </div>
              <h3 className="text-[1.35rem] lg:text-[1.65rem] font-bold text-zinc-900 leading-tight">
                Nâng cấp hệ thống hiện có
              </h3>
            </div>
            <p className="text-[14.5px] lg:text-[15.5px] text-zinc-600 mb-8 leading-relaxed max-w-lg">
              Bạn đã có một hệ thống nhưng nó quá cũ, chậm chạp hoặc không còn đáp ứng được nhu cầu kinh doanh? Chúng tôi cung cấp dịch vụ tái cấu trúc (Refactoring) và nâng cấp toàn diện.
            </p>
            <ul className="flex flex-col gap-4 lg:gap-5 mt-auto">
              {upgradeFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14.5px] lg:text-[15px] text-zinc-800 font-medium leading-snug">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-zinc-400 mt-0.5 shrink-0">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Duy trì & Hỗ trợ kỹ thuật */}
          <div className="bg-[#C4C6D24D] rounded-3xl lg:rounded-4xl p-6 lg:p-8 xl:p-10 flex flex-col border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.8rem] bg-[#0b246a] text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <h3 className="text-[1.35rem] lg:text-[1.65rem] font-bold text-zinc-900 leading-tight">
                Duy trì & Hỗ trợ kỹ thuật
              </h3>
            </div>
            <p className="text-[14.5px] lg:text-[15.5px] text-zinc-600 mb-8 leading-relaxed max-w-lg">
              Đảm bảo hệ thống của bạn luôn online, an toàn và hoạt động trơn tru để bạn tập trung vào kinh doanh cốt lõi.
            </p>
            <ul className="flex flex-col gap-4 lg:gap-5 mt-auto">
              {maintenanceFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[14.5px] lg:text-[15px] text-zinc-800 font-medium leading-snug">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-zinc-400 mt-0.5 shrink-0">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
