export default function WebCoreValues() {
  const values = [
    {
      title: "Trải nghiệm tốt",
      description: "Thiết kế giao diện rõ ràng, trực quan và thuận tiện, phù hợp với nhu cầu của từng nhóm người dùng.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      )
    },
    {
      title: "Phát triển linh hoạt",
      description: "Cấu trúc và chức năng được xây dựng dựa trên mục tiêu, quy mô và yêu cầu thực tế của từng dự án.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      )
    },
    {
      title: "Kết nối hệ thống",
      description: "Sẵn sàng kết nối với API, cơ sở dữ liệu và các nền tảng doanh nghiệp đang sử dụng.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      )
    },
    {
      title: "Đồng hành lâu dài",
      description: "Hỗ trợ vận hành, bảo trì, nâng cấp và tiếp tục phát triển sản phẩm khi nhu cầu thay đổi.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="m11 17 2 2a1 1 0 1 0 3-3" />
          <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-4.24 4.24a3 3 0 0 0 0 4.24l3.88 3.88a1 1 0 1 0 3-3" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#f9fafb] section-y max-md:py-5!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl lg:max-w-5xl text-center mb-10 md:mb-14">
          <h2 className="text-[1.75rem] font-semibold leading-tight text-zinc-900 sm:text-3xl lg:text-[2.5rem] mb-4 md:mb-6">
            Một nền tảng tốt cần tạo ra<br className="md:hidden" /> giá trị lâu dài
          </h2>
          {/* Subtitle Desktop */}
          <p className="hidden md:block text-zinc-500 leading-relaxed max-w-3xl mx-auto">
            Một sản phẩm web tốt không chỉ dừng lại ở giao diện đẹp. Hệ thống cần giải quyết đúng nhu cầu của người dùng, vận hành ổn định, dễ quản lý và có khả năng thích ứng khi doanh nghiệp phát triển.
          </p>
          {/* Subtitle Mobile */}
          <p className="md:hidden text-[15px] text-zinc-600 leading-relaxed px-2">
            Một sản phẩm web tốt không chỉ dừng lại ở giao diện đẹp. Nó cần giải quyết đúng nhu cầu, mang lại trải nghiệm tốt cho người dùng và có khả năng mở rộng trong tương lai.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {values.map((item, index) => (
            <div 
              key={index} 
              className="rounded-2xl p-5 md:p-6 md:bg-[#f4f6f9] md:border-none md:shadow-none bg-white border border-slate-100 shadow-sm"
            >
              <div className="flex items-start md:items-center gap-4 md:mb-4">
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl md:bg-[#1e3a6e] md:text-white bg-[#eef2ff] text-[#1e3a6e] mt-0.5 md:mt-0">
                  {item.icon}
                </div>
                
                {/* Mobile Title & Desc container, Desktop just Title */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[15px] md:text-[17px] font-semibold text-zinc-900 leading-snug">
                    {item.title}
                  </h3>
                  {/* Mobile only desc */}
                  <p className="md:hidden text-sm text-zinc-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
              
              {/* Desktop only desc */}
              <p className="hidden md:block text-[14px] text-zinc-600 leading-[1.6]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
