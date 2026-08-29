export default function EnterpriseCoreValues() {
  const values = [
    {
      title: "Phù hợp quy trình",
      description: "Giải pháp được xây dựng dựa trên cách doanh nghiệp thực sự làm việc thay vì buộc doanh nghiệp thích nghi với một mô hình cố định.",
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
      title: "Dữ liệu tập trung",
      description: "Thông tin từ nhiều hoạt động có thể được tổ chức và quản lý trên một nền tảng thống nhất.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      )
    },
    {
      title: "Kết nối hoạt động",
      description: "Các bộ phận và quy trình có thể chia sẻ dữ liệu để giảm những bước xử lý rời rạc.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
          <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
          <line x1="6" x2="6.01" y1="6" y2="6" />
          <line x1="6" x2="6.01" y1="18" y2="18" />
        </svg>
      )
    },
    {
      title: "Phát triển lâu dài",
      description: "Doanh nghiệp có thể bắt đầu từ những bài toán cần thiết và tiếp tục mở rộng hệ thống theo từng giai đoạn.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-[#f9fafb] section-y max-md:py-5!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl lg:max-w-5xl text-center mb-10 md:mb-14">
          <h2 className="text-[1.75rem] font-semibold leading-tight text-zinc-900 sm:text-3xl lg:text-[2.5rem] mb-4 md:mb-6">
            Công nghệ bắt đầu từ cách doanh nghiệp vận hành
          </h2>
          {/* Subtitle Desktop */}
          <p className="hidden md:block text-[15px] text-zinc-600 leading-relaxed max-w-4xl mx-auto whitespace-pre-line">
            Không có một hệ thống duy nhất phù hợp với mọi doanh nghiệp. Quy mô, cách tổ chức, quy trình và nhu cầu quản lý của mỗi đơn vị đều khác nhau.{"\n"}Vì vậy, ADA Group không bắt đầu bằng việc đưa thật nhiều chức năng vào sản phẩm. Chúng tôi tìm hiểu doanh nghiệp đang vận hành như thế nào, thông tin đang được quản lý ở đâu và đâu là những điểm công nghệ có thể tạo ra thay đổi rõ ràng.
          </p>
          {/* Subtitle Mobile */}
          <p className="md:hidden text-[14.5px] text-zinc-600 leading-relaxed px-2">
            Không có một hệ thống duy nhất phù hợp với mọi doanh nghiệp. Vì vậy, ADA Group bắt đầu từ việc tìm hiểu cách doanh nghiệp vận hành để tạo ra những thay đổi rõ ràng bằng công nghệ.
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
                  <p className="md:hidden text-sm text-zinc-600 leading-relaxed text-justify">
                    {item.description}
                  </p>
                </div>
              </div>
              
              {/* Desktop only desc */}
              <p className="hidden md:block text-[14px] text-zinc-600 leading-[1.6] text-justify">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
