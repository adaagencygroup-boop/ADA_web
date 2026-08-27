import Link from "next/link";
import Image from "next/image";
import React from "react";

const mainUseCases = [
  {
    id: "01",
    badge: "01 — TRỢ LÝ AI",
    title: "Giúp người dùng tiếp cận thông tin tự nhiên hơn",
    descriptions: [
      "Khi lượng thông tin ngày càng lớn, việc tìm kiếm đúng nội dung có thể trở nên mất thời gian đối với cả khách hàng và nhân viên.",
      "ADA Group phát triển các giải pháp trợ lý AI giúp người dùng tương tác, tìm kiếm và khai thác thông tin thuận tiện hơn, đồng thời có thể được tích hợp trực tiếp vào website, ứng dụng hoặc hệ thống nội bộ.",
      "Mục tiêu không chỉ là tạo ra một giao diện hội thoại, mà là giúp người dùng tiếp cận đúng nguồn thông tin trong bối cảnh họ đang làm việc."
    ],
    note: "Giải pháp có thể được tích hợp trên website, ứng dụng di động hoặc hệ thống nội bộ, tùy theo nhu cầu của doanh nghiệp.",
    image: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
  },
  {
    id: "02",
    badge: "02 — KHAI THÁC TÀI LIỆU",
    title: "Biến tài liệu thành nguồn thông tin có thể sử dụng",
    descriptions: [
      "Một lượng lớn thông tin doanh nghiệp vẫn tồn tại dưới dạng tài liệu, hồ sơ và nội dung văn bản. Khi quy mô tăng lên, việc tìm kiếm và tổng hợp thông tin thủ công ngày càng khó khăn.",
      "ADA Group ứng dụng công nghệ để hỗ trợ tổ chức, tìm kiếm và khai thác nội dung từ tài liệu, từ đó giúp thông tin dễ tiếp cận hơn và có thể tiếp tục được sử dụng trong các hệ thống hoặc quy trình nghiệp vụ."
    ],
    image: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
  },
  {
    id: "03",
    badge: "03 — TỰ ĐỘNG HÓA",
    title: "Giảm những thao tác lặp lại trong hoạt động hằng ngày",
    descriptions: [
      "Không phải mọi công việc đều cần con người thực hiện thủ công từ đầu đến cuối. ADA Group giúp doanh nghiệp xác định những bước có thể được đơn giản hóa hoặc tự động hóa bằng phần mềm, đồng thời ứng dụng AI tại những điểm mà công nghệ này mang lại giá trị phù hợp.",
      "Tự động hóa có thể bắt đầu từ một phần nhỏ của quy trình và tiếp tục phát triển khi doanh nghiệp nhận thấy hiệu quả trong thực tế."
    ],
    image: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
  },
  {
    id: "04",
    badge: "04 — KHAI THÁC DỮ LIỆU",
    title: "Giúp dữ liệu trở nên dễ tiếp cận và hữu ích hơn",
    descriptions: [
      "Doanh nghiệp có thể sở hữu nhiều dữ liệu nhưng vẫn gặp khó khăn trong việc tìm kiếm, tổng hợp và sử dụng thông tin khi cần thiết.",
      "ADA Group kết hợp các phương pháp xử lý dữ liệu với AI khi phù hợp để tổ chức và khai thác thông tin hiệu quả hơn, giúp dữ liệu có thể hỗ trợ tốt hơn cho hoạt động vận hành và quản lý."
    ],
    image: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
  }
];

const splitUseCases = [
  {
    id: "05",
    badge: "05 — AI CHO HÌNH ẢNH",
    title: "Khai thác thêm giá trị từ dữ liệu trực quan",
    descriptions: [
      "Tùy theo bài toán và nguồn dữ liệu, ADA Group có thể nghiên cứu ứng dụng công nghệ xử lý hình ảnh để hỗ trợ nhận biết, phân loại và khai thác thông tin trực quan. Giải pháp có thể trở thành một phần của ứng dụng, hệ thống quản lý hoặc các sản phẩm chuyên biệt."
    ],
    image: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
  },
  {
    id: "06",
    badge: "06 — AI TRONG SẢN PHẨM HIỆN CÓ",
    title: "Bổ sung khả năng mới mà không cần xây dựng lại từ đầu",
    descriptions: [
      "Ứng dụng AI không nhất thiết đồng nghĩa với việc doanh nghiệp phải xây dựng một sản phẩm hoàn toàn mới. Trong nhiều trường hợp, giá trị có thể được tạo ra bằng cách bổ sung những khả năng AI phù hợp vào website, ứng dụng di động hoặc hệ thống doanh nghiệp đang vận hành.",
      "AI có thể trở thành một phần của sản phẩm hiện có, hỗ trợ người dùng tiếp cận thông tin thuận tiện hơn, khai thác dữ liệu hiệu quả hơn hoặc cải thiện những hoạt động đang tốn nhiều thời gian và nguồn lực. Việc tích hợp được thực hiện dựa trên nhu cầu thực tế, dữ liệu sẵn có và cách hệ thống hiện tại đang hoạt động, thay vì thay đổi toàn bộ nền tảng chỉ để ứng dụng một công nghệ mới.",
      "Cách tiếp cận này giúp doanh nghiệp tận dụng những khoản đầu tư công nghệ đã có, đồng thời từng bước bổ sung các khả năng mới khi nhu cầu phát triển. AI từ đó trở thành một phần tự nhiên của sản phẩm và quy trình vận hành, thay vì tồn tại như một công cụ độc lập bên ngoài hệ thống."
    ],
    image: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
  }
];

const CustomFlowchart = () => (
  <div className="flex flex-col sm:flex-row items-center justify-between w-full h-full gap-2 sm:gap-4 py-8 lg:py-0">
    <div className="bg-white w-full sm:w-1/3 aspect-square max-w-35 rounded-2xl flex flex-col items-center justify-center p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-1 transition-transform cursor-default">
      <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" x2="8" y1="13" y2="13" />
          <line x1="16" x2="8" y1="17" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>
      <span className="text-[12px] font-semibold text-slate-700 text-center">Tiếp nhận</span>
    </div>
    
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-300 hidden sm:block">
      <polyline points="9 18 15 12 9 6" />
    </svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-300 sm:hidden rotate-90">
      <polyline points="9 18 15 12 9 6" />
    </svg>

    <div className="bg-white w-full sm:w-1/3 aspect-square max-w-35 rounded-2xl flex flex-col items-center justify-center p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-1 transition-transform cursor-default">
      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <path d="M12 2v20M17 5l-5-3-5 3M17 19l-5 3-5-3M2 12h20M5 7l-3 5 3 5M19 7l3 5-3 5" />
        </svg>
      </div>
      <span className="text-[12px] font-semibold text-blue-600 text-center">Xử lý tự động</span>
    </div>

    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-300 hidden sm:block">
      <polyline points="9 18 15 12 9 6" />
    </svg>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-300 sm:hidden rotate-90">
      <polyline points="9 18 15 12 9 6" />
    </svg>

    <div className="bg-white w-full sm:w-1/3 aspect-square max-w-35 rounded-2xl flex flex-col items-center justify-center p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-1 transition-transform cursor-default">
      <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      </div>
      <span className="text-[12px] font-semibold text-slate-700 text-center leading-tight">Cập nhật kết quả</span>
    </div>
  </div>
);

export default function AIUseCases() {
  return (
    <section className="bg-white section-y max-md:py-5!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
              <path d="M12 2v20M17 5l-5-3-5 3M17 19l-5 3-5-3M2 12h20M5 7l-3 5 3 5M19 7l3 5-3 5" />
            </svg>
            AI & Automation
          </div>
          <h2 className="text-[2rem] font-semibold leading-tight tracking-tight text-[#0a1a2f] sm:text-4xl lg:text-[2.75rem] mb-6">
            Ứng dụng AI vào những hoạt động tạo ra giá trị
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-[15px] leading-relaxed text-zinc-600">
            Mỗi giải pháp được xây dựng dựa trên nhu cầu thực tế, dữ liệu hiện có và cách người dùng làm việc, để công nghệ không chỉ tạo ra khả năng mới mà còn mang lại giá trị có thể sử dụng trong thực tế.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:gap-12">
          
          {/* Main Use Cases (1-4) */}
          {mainUseCases.map((item) => {
            const isOdd = item.id === "01" || item.id === "03";
            const bg = isOdd ? "bg-[#f8fafc]" : "bg-white";
            const border = isOdd ? "" : "border border-slate-200 shadow-sm";
            const layout = item.id === "03" ? "custom" : (item.id === "02" || item.id === "04" ? "right-text" : "left-text");
            const imageBadge = item.id === "02" ? "Từ tài liệu rời rạc đến nguồn thông tin có thể sử dụng" : undefined;

            return (
            <div key={item.id} className={`${bg} rounded-3xl lg:rounded-[2.5rem] p-6 lg:p-12 ${border}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                
                {/* Content Block */}
                <div className={`flex flex-col order-2 ${layout === 'right-text' ? 'lg:order-2' : 'lg:order-1'}`}>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 mb-3 block">
                    {item.badge}
                  </span>
                  <h3 className={`text-[1.5rem] font-semibold leading-tight tracking-tight text-[#0a1a2f] sm:text-3xl lg:text-[2rem] mb-4 lg:mb-6 ${layout === 'custom' ? 'pr-4' : ''}`}>
                    {item.title}
                  </h3>
                  
                  {item.descriptions.map((desc, idx) => (
                    <p key={idx} className={`text-[15px] leading-relaxed text-zinc-600 ${idx === item.descriptions.length - 1 && !item.note ? 'mb-6 lg:mb-8' : 'mb-4'} ${idx > 0 ? 'hidden md:block' : ''}`}>
                      {desc}
                    </p>
                  ))}
                  
                  {item.note && (
                    <div className="hidden md:block">
                      <div className="bg-slate-200/50 h-px w-full mb-6"></div>
                      <p className="text-[14px] text-zinc-500 mb-6 italic">
                        {item.note}
                      </p>
                    </div>
                  )}

                  <Link href="/lien-he" className="inline-flex items-center gap-2 text-blue-600 font-semibold text-[14.5px] hover:text-blue-800 transition-colors w-fit">
                    Trao đổi chi tiết &rarr;
                  </Link>
                </div>

                {/* Media or Custom Block */}
                {layout === 'custom' ? (
                  <>
                    <div className="order-1 lg:order-2 hidden lg:block">
                      <CustomFlowchart />
                    </div>
                    {item.image && (
                      <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden bg-slate-100 order-1 lg:hidden">
                        <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                      </div>
                    )}
                  </>
                ) : (
                  <div className={`relative w-full min-h-64 lg:min-h-0 ${item.id === '01' ? 'lg:aspect-4/3' : 'lg:aspect-16/10'} rounded-2xl overflow-hidden ${item.id === '01' ? 'shadow-lg border border-slate-200/50' : 'bg-slate-100'} order-1 ${layout === 'right-text' ? 'lg:order-1' : 'lg:order-2'}`}>
                    {item.image && (
                      <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                    )}
                    {imageBadge && (
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2">
                        <span className="text-[12px] font-semibold text-slate-800 hidden sm:block">{imageBadge}</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-blue-600">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                )}
                
              </div>
            </div>
            );
          })}

          {/* Split Container (5 & 6) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {splitUseCases.map((item) => {
              const bg = item.id === "05" ? "bg-[#f8fafc]" : "bg-white";
              const border = item.id === "05" ? "border border-slate-100" : "border border-slate-200 shadow-sm";

              return (
              <div key={item.id} className={`${bg} rounded-3xl lg:rounded-[2.5rem] p-6 lg:p-12 ${border} flex flex-col`}>
                
                {item.image && (
                  <div className={`relative w-full min-h-64 lg:min-h-0 lg:aspect-4/3 rounded-2xl overflow-hidden mb-6 lg:mb-0 lg:mt-auto order-1 ${item.id === '06' ? 'lg:hidden' : 'lg:order-3'}`}>
                    <Image src={item.image} alt={item.title} fill className="object-cover" unoptimized />
                  </div>
                )}

                <div className="order-2 flex flex-col flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 mb-3 block">
                    {item.badge}
                  </span>
                  <h3 className="text-[1.5rem] font-semibold leading-tight tracking-tight text-[#0a1a2f] sm:text-2xl mb-4 lg:mb-6">
                    {item.title}
                  </h3>
                  
                  {item.descriptions.map((desc, idx) => (
                    <p key={idx} className={`text-[14.5px] leading-relaxed text-zinc-600 ${idx === item.descriptions.length - 1 ? 'mb-6 lg:mb-8' : 'mb-4'} ${idx > 0 ? 'hidden md:block' : ''}`}>
                      {desc}
                    </p>
                  ))}
                  
                  <Link href="/lien-he" className={`inline-flex items-center gap-2 text-blue-600 font-semibold text-[14.5px] hover:text-blue-800 transition-colors w-fit ${item.id === '05' ? 'lg:mb-8' : ''}`}>
                    Trao đổi chi tiết &rarr;
                  </Link>
                </div>
                
              </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
}
