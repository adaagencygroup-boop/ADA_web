import Image from"next/image";
import Link from"next/link";

export default function MobileAdminCMS() {
  const headerContent = [
    {
      tag:"ADMIN & CMS",
      title:"Mobile App & Web Admin",
      subtitle:"Quản lý và vận hành ứng dụng trên một nền tảng tập trung",
      description1:"Bên cạnh Mobile App dành cho người dùng, ADA Group có thể phát triển hệ thống Web Admin giúp doanh nghiệp quản lý nội dung, dữ liệu và các hoạt động vận hành của ứng dụng trên một nền tảng tập trung.",
      description2:"Web Admin được xây dựng phù hợp với nghiệp vụ thực tế, giúp đội ngũ quản trị dễ dàng theo dõi, cập nhật và kiểm soát hệ thống, đồng thời tạo sự kết nối xuyên suốt giữa hoạt động trên Mobile App và quy trình quản lý phía sau."
    }
  ];

  return (
    <section className="bg-white section-y max-md:py-5! md:pt-(--heading-space)!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Card / Desktop Top Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-(--section-padding) lg:items-center lg:mb-(--section-padding) bg-white lg:bg-transparent rounded-4xl lg:rounded-none border border-slate-100 lg:border-none shadow-[0_2px_15px_rgb(0,0,0,0.03)] lg:shadow-none overflow-hidden lg:overflow-visible">
          <div className="relative w-full min-h-64 lg:min-h-0 lg:aspect-16/10 bg-slate-100 lg:rounded-3xl overflow-hidden shadow-none lg:shadow-sm border-b lg:border border-slate-100 order-1">
            <Image src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg" alt="Web Admin" fill className="object-cover" unoptimized />
          </div>

          {/* Right Column: Content (Bottom on Mobile) */}
          {headerContent.map((item, index) => (
            <div key={index} className="flex flex-col p-6 sm:p-8 lg:p-0 order-2">
              <div className="flex items-center gap-(--inner-space) mb-(--inner-space)">
                <span className="text-slate-500 lg:text-blue-700 font-semibold text-[11px] lg:text-[13px] tracking-widest uppercase">
                  {item.tag}
                </span>
              </div>
              
              <h2 className="text-[1.35rem] font-bold lg:font-semibold leading-snug tracking-tight text-zinc-900 lg:text-[#0a1a2f] sm:text-4xl lg:text-[2.75rem] mb-(--inner-space)">
                {item.title}
              </h2>
              <p className="text-[15px] lg:text-[17px] font-medium text-blue-600 mb-(--inner-space)">
                {item.subtitle}
              </p>
              <p className="text-[14px] lg:text-[15px] leading-relaxed text-zinc-500 lg:text-zinc-600 mb-(--inner-space) text-justify">
                {item.description1}
              </p>
              {item.description2 && (
                <p className="hidden lg:block text-[15px] leading-relaxed text-zinc-600 text-justify">
                  {item.description2}
                </p>
              )}

              <Link href="/lien-he" className="mt-(--inner-space) inline-flex items-center gap-(--inner-space) text-blue-600 font-semibold text-[14px] lg:text-[14.5px] hover:text-blue-800 transition-colors w-fit">
                Trao đổi chi tiết &rarr;
              </Link>
            </div>
          ))}
        </div>

        {/* Middle Section: 3 Columns with Mockups (Hidden on Mobile) */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-(--inner-space) mb-(--inner-space)">
          
          {/* Column 1: Quản lý hoạt động */}
          <div className="bg-[#f8fafc] rounded-3xl p-6 lg:p-8 border border-slate-100 flex flex-col items-center text-center">
            <div className="flex items-center gap-(--inner-space) mb-(--inner-space)">
              <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-600">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h4 className="font-semibold text-[16px] text-zinc-900 leading-snug">Quản lý hoạt động</h4>
            </div>
            <p className="text-[13px] text-zinc-500 leading-relaxed mb-(--inner-space) max-w-62.5">
              Tập trung các hoạt động quản trị quan trọng của ứng dụng trên một nền tảng duy nhất.
            </p>
            {/* Mockup 1: Table */}
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] w-full max-w-[320px] p-5 text-left border border-slate-100/50 mt-auto">
              <div className="flex items-center justify-between mb-(--inner-space)">
                <span className="text-[12px] font-semibold text-slate-800">Người dùng</span>
                <div className="bg-blue-600 text-white text-[9px] px-2 py-1 rounded font-semibold">+ Thêm mới</div>
              </div>
              <div className="grid grid-cols-3 gap-(--inner-space) pb-(--heading-space) border-b border-slate-100 mb-(--heading-space)">
                <span className="text-[9px] text-slate-400 font-medium">Tên</span>
                <span className="text-[9px] text-slate-400 font-medium text-center">Vai trò</span>
                <span className="text-[9px] text-slate-400 font-medium text-right">Trạng thái</span>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-(--inner-space) items-center">
                  <span className="text-[10px] text-slate-700 font-semibold truncate">Nguyễn Văn A</span>
                  <span className="text-[9px] text-slate-500 text-center">Quản trị viên</span>
                  <span className="text-[9px] text-emerald-500 font-medium text-right">Hoạt động</span>
                </div>
                <div className="grid grid-cols-3 gap-(--inner-space) items-center">
                  <span className="text-[10px] text-slate-700 font-semibold truncate">Trần Thị B</span>
                  <span className="text-[9px] text-slate-500 text-center">Biên tập viên</span>
                  <span className="text-[9px] text-emerald-500 font-medium text-right">Hoạt động</span>
                </div>
                <div className="grid grid-cols-3 gap-(--inner-space) items-center">
                  <span className="text-[10px] text-slate-700 font-semibold truncate">Lê Văn C</span>
                  <span className="text-[9px] text-slate-500 text-center">Nhân viên</span>
                  <span className="text-[9px] text-red-500 font-medium text-right">Tạm khóa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Quản lý nội dung & dữ liệu */}
          <div className="bg-[#f8fafc] rounded-3xl p-6 lg:p-8 border border-slate-100 flex flex-col items-center text-center">
            <div className="flex items-center gap-(--inner-space) mb-(--inner-space)">
              <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-600">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" x2="8" y1="13" y2="13" />
                  <line x1="16" x2="8" y1="17" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h4 className="font-semibold text-[16px] text-zinc-900 leading-snug">Quản lý nội dung & dữ liệu</h4>
            </div>
            <p className="text-[13px] text-zinc-500 leading-relaxed mb-(--inner-space) max-w-62.5">
              Hỗ trợ doanh nghiệp chủ động cập nhật và tổ chức thông tin, dữ liệu trong quá trình vận hành.
            </p>
            {/* Mockup 2: List */}
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] w-full max-w-[320px] p-5 text-left border border-slate-100/50 mt-auto">
              <div className="flex items-center justify-between mb-(--inner-space)">
                <span className="text-[12px] font-semibold text-slate-800">Danh mục sản phẩm</span>
                <div className="bg-blue-600 text-white text-[9px] px-2 py-1 rounded font-semibold">+ Thêm mới</div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-(--inner-space)">
                  <div className="w-8 h-8 rounded bg-slate-200 shrink-0"></div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] text-slate-700 font-semibold">Sản phẩm mới</span>
                    <span className="text-[9px] text-slate-400">12 sản phẩm</span>
                  </div>
                  <span className="text-slate-300">...</span>
                </div>
                <div className="flex items-center gap-(--inner-space)">
                  <div className="w-8 h-8 rounded bg-slate-200 shrink-0"></div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] text-slate-700 font-semibold">Bộ sưu tập</span>
                    <span className="text-[9px] text-slate-400">08 sản phẩm</span>
                  </div>
                  <span className="text-slate-300">...</span>
                </div>
                <div className="flex items-center gap-(--inner-space)">
                  <div className="w-8 h-8 rounded bg-slate-200 shrink-0"></div>
                  <div className="flex flex-col flex-1">
                    <span className="text-[10px] text-slate-700 font-semibold">Phụ kiện</span>
                    <span className="text-[9px] text-slate-400">15 sản phẩm</span>
                  </div>
                  <span className="text-slate-300">...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Theo dõi & đánh giá */}
          <div className="bg-[#f8fafc] rounded-3xl p-6 lg:p-8 border border-slate-100 flex flex-col items-center text-center">
            <div className="flex items-center gap-(--inner-space) mb-(--inner-space)">
              <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-600">
                  <path d="M3 3v18h18" />
                  <path d="M18 17V9" />
                  <path d="M13 17V5" />
                  <path d="M8 17v-3" />
                </svg>
              </div>
              <h4 className="font-semibold text-[16px] text-zinc-900 leading-snug">Theo dõi & đánh giá</h4>
            </div>
            <p className="text-[13px] text-zinc-500 leading-relaxed mb-(--inner-space) max-w-62.5">
              Cung cấp góc nhìn tổng quan giúp doanh nghiệp nắm bắt tình trạng hoạt động của sản phẩm.
            </p>
            {/* Mockup 3: Chart */}
            <div className="bg-white rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.05)] w-full max-w-[320px] p-5 text-left border border-slate-100/50 mt-auto">
              <div className="grid grid-cols-3 gap-(--inner-space) mb-(--inner-space)">
                <div className="flex flex-col">
                  <span className="text-[7px] text-slate-400 uppercase">Người dùng</span>
                  <span className="text-[11px] font-semibold text-slate-800">12.458</span>
                  <span className="text-[8px] text-emerald-500">+12.5%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] text-slate-400 uppercase">Đơn hàng</span>
                  <span className="text-[11px] font-semibold text-slate-800">3.245</span>
                  <span className="text-[8px] text-emerald-500">+8.7%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[7px] text-slate-400 uppercase">Doanh thu</span>
                  <span className="text-[11px] font-semibold text-slate-800">1.25 tỷ</span>
                  <span className="text-[8px] text-emerald-500">+15.2%</span>
                </div>
              </div>
              <span className="text-[9px] font-semibold text-slate-800 block mb-(--heading-space)">Biểu đồ hoạt động</span>
              <div className="w-full h-16 bg-slate-50 rounded-lg relative overflow-hidden flex items-end">
                <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-12 text-blue-500 stroke-current drop-shadow-md" fill="none" strokeWidth="2.5">
                  <path d="M0 35 Q10 20 20 25 T40 15 T60 30 T80 5 T100 20" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner (Hidden on Mobile) */}
        <div className="hidden lg:flex bg-[#eef4ff] rounded-2xl p-4 lg:p-6 items-center justify-between border border-[#d6e5ff]">
          <div className="flex items-center gap-(--inner-space)">
            <div className="shrink-0 text-blue-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-slate-900 mb-(--heading-space).5">Bảo mật & phân quyền</span>
              <span className="text-[12px] text-slate-600">Hệ thống bảo mật nhiều lớp, phân quyền linh hoạt, đảm bảo an toàn dữ liệu và kiểm soát truy cập hiệu quả.</span>
            </div>
          </div>
          <div className="bg-white rounded-full p-2 shadow-sm shrink-0 hidden sm:block">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-600">
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
