import Link from"next/link";
import Image from"next/image";
import React from"react";

const mainUseCases = [
  {
    id:"01",
    badge:"01 — TRỢ LÝ AI",
    title:"Giúp người dùng tiếp cận thông tin tự nhiên hơn",
    descriptions: [
"Khi lượng thông tin ngày càng lớn, việc tìm kiếm đúng nội dung có thể trở nên mất thời gian đối với cả khách hàng và nhân viên.",
"ADA Group phát triển các giải pháp trợ lý AI giúp người dùng tương tác, tìm kiếm và khai thác thông tin thuận tiện hơn, đồng thời có thể được tích hợp trực tiếp vào website, ứng dụng hoặc hệ thống nội bộ.",
"Mục tiêu không chỉ là tạo ra một giao diện hội thoại, mà là giúp người dùng tiếp cận đúng nguồn thông tin trong bối cảnh họ đang làm việc."
    ],
    note:"Giải pháp có thể được tích hợp trên website, ứng dụng di động hoặc hệ thống nội bộ, tùy theo nhu cầu của doanh nghiệp.",
    image:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
  },
  {
    id:"02",
    badge:"02 — KHAI THÁC TÀI LIỆU",
    title:"Biến tài liệu thành nguồn thông tin có thể sử dụng",
    descriptions: [
"Một lượng lớn thông tin doanh nghiệp vẫn tồn tại dưới dạng tài liệu, hồ sơ và nội dung văn bản. Khi quy mô tăng lên, việc tìm kiếm và tổng hợp thông tin thủ công ngày càng khó khăn.",
"ADA Group ứng dụng công nghệ để hỗ trợ tổ chức, tìm kiếm và khai thác nội dung từ tài liệu, từ đó giúp thông tin dễ tiếp cận hơn và có thể tiếp tục được sử dụng trong các hệ thống hoặc quy trình nghiệp vụ."
    ],
    image:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
  },
  {
    id:"03",
    badge:"03 — TỰ ĐỘNG HÓA",
    title:"Giảm những thao tác lặp lại trong hoạt động hằng ngày",
    descriptions: [
"Không phải mọi công việc đều cần con người thực hiện thủ công từ đầu đến cuối. ADA Group giúp doanh nghiệp xác định những bước có thể được đơn giản hóa hoặc tự động hóa bằng phần mềm, đồng thời ứng dụng AI tại những điểm mà công nghệ này mang lại giá trị phù hợp.",
"Tự động hóa có thể bắt đầu từ một phần nhỏ của quy trình và tiếp tục phát triển khi doanh nghiệp nhận thấy hiệu quả trong thực tế."
    ],
    image:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
  },
  {
    id:"04",
    badge:"04 — KHAI THÁC DỮ LIỆU",
    title:"Giúp dữ liệu trở nên dễ tiếp cận và hữu ích hơn",
    descriptions: [
"Doanh nghiệp có thể sở hữu nhiều dữ liệu nhưng vẫn gặp khó khăn trong việc tìm kiếm, tổng hợp và sử dụng thông tin khi cần thiết.",
"ADA Group kết hợp các phương pháp xử lý dữ liệu với AI khi phù hợp để tổ chức và khai thác thông tin hiệu quả hơn, giúp dữ liệu có thể hỗ trợ tốt hơn cho hoạt động vận hành và quản lý."
    ],
    image:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
  }
];

const splitUseCases = [
  {
    id:"05",
    badge:"05 — AI CHO HÌNH ẢNH",
    title:"Khai thác thêm giá trị từ dữ liệu trực quan",
    descriptions: [
"Tùy theo bài toán và nguồn dữ liệu, ADA Group có thể nghiên cứu ứng dụng công nghệ xử lý hình ảnh để hỗ trợ nhận biết, phân loại và khai thác thông tin trực quan. Giải pháp có thể trở thành một phần của ứng dụng, hệ thống quản lý hoặc các sản phẩm chuyên biệt."
    ],
    image:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
  },
  {
    id:"06",
    badge:"06 — AI TRONG SẢN PHẨM HIỆN CÓ",
    title:"Bổ sung khả năng mới mà không cần xây dựng lại từ đầu",
    descriptions: [
"Ứng dụng AI không nhất thiết đồng nghĩa với việc doanh nghiệp phải xây dựng một sản phẩm hoàn toàn mới. Trong nhiều trường hợp, giá trị có thể được tạo ra bằng cách bổ sung những khả năng AI phù hợp vào website, ứng dụng di động hoặc hệ thống doanh nghiệp đang vận hành.",
"AI có thể trở thành một phần của sản phẩm hiện có, hỗ trợ người dùng tiếp cận thông tin thuận tiện hơn, khai thác dữ liệu hiệu quả hơn hoặc cải thiện những hoạt động đang tốn nhiều thời gian và nguồn lực. Việc tích hợp được thực hiện dựa trên nhu cầu thực tế, dữ liệu sẵn có và cách hệ thống hiện tại đang hoạt động, thay vì thay đổi toàn bộ nền tảng chỉ để ứng dụng một công nghệ mới.",
"Cách tiếp cận này giúp doanh nghiệp tận dụng những khoản đầu tư công nghệ đã có, đồng thời từng bước bổ sung các khả năng mới khi nhu cầu phát triển. AI từ đó trở thành một phần tự nhiên của sản phẩm và quy trình vận hành, thay vì tồn tại như một công cụ độc lập bên ngoài hệ thống."
    ],
    image:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
  }
];

const CustomFlowchart = () => (
  <div className="flex flex-col sm:flex-row items-center justify-between w-full h-full gap-(--inner-space) sm:gap-(--inner-space) py-8 lg:py-0">
    <div className="bg-white w-full sm:w-1/3 aspect-square max-w-35 rounded-2xl flex flex-col items-center justify-center p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:-translate-y-1 transition-transform cursor-default">
      <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-(--inner-space)">
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
      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-(--inner-space)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-800">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
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
      <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mb-(--inner-space)">
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
    <section className="section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-(--section-padding)">
          <div className="inline-flex items-center gap-(--inner-space) rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 mb-(--inner-space)">
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0.8C8 0.358468 7.64153 0 7.2 0C6.75847 0 6.4 0.358468 6.4 0.8V1.6C6.4 2.04153 6.75847 2.4 7.2 2.4C7.64153 2.4 8 2.04153 8 1.6V0.8ZM11.7256 3.0056C12.0288 2.6917 12.0244 2.19273 11.7159 1.88415C11.4073 1.57556 10.9083 1.57122 10.5944 1.8744L10.0288 2.44C9.72562 2.7539 9.72996 3.25287 10.0385 3.56146C10.3471 3.87004 10.8461 3.87438 11.16 3.5712L11.7256 3.0056ZM13.6 6.4C13.6 6.84153 13.2415 7.2 12.8 7.2H12C11.5585 7.2 11.2 6.84153 11.2 6.4C11.2 5.95847 11.5585 5.6 12 5.6H12.8C13.2415 5.6 13.6 5.95847 13.6 6.4ZM11.7256 9.7944C12.0379 10.1068 12.0379 10.6132 11.7256 10.9256L11.16 11.4912C10.9591 11.6992 10.6617 11.7826 10.382 11.7094C10.1023 11.6361 9.88385 11.4177 9.81064 11.138C9.73743 10.8583 9.82084 10.5609 10.0288 10.36L10.5944 9.7944C10.9068 9.48209 11.4132 9.48209 11.7256 9.7944ZM7.2 12.8C6.75847 12.8 6.4 12.4415 6.4 12V11.2C6.4 10.7585 6.75847 10.4 7.2 10.4C7.64153 10.4 8 10.7585 8 11.2V12C8 12.4415 7.64153 12.8 7.2 12.8ZM3.8056 10.9256C3.4932 11.2379 2.9868 11.2379 2.6744 10.9256L2.1088 10.36C1.90083 10.1591 1.81743 9.8617 1.89064 9.58199C1.96385 9.30229 2.18229 9.08385 2.46199 9.01064C2.7417 8.93743 3.03914 9.02083 3.24 9.2288L3.8056 9.7944C4.11791 10.1068 4.11791 10.6132 3.8056 10.9256ZM2.4 6.4C2.4 6.84153 2.04153 7.2 1.6 7.2H0.8C0.358468 7.2 0 6.84153 0 6.4C0 5.95847 0.358468 5.6 0.8 5.6H1.6C2.04153 5.6 2.4 5.95847 2.4 6.4ZM4.3712 3.0056C4.67438 2.6917 4.67004 2.19273 4.36145 1.88415C4.05287 1.57556 3.5539 1.57122 3.24 1.8744L2.6744 2.44C2.46643 2.64086 2.38303 2.9383 2.45624 3.21801C2.52945 3.49771 2.74789 3.71615 3.02759 3.78936C3.3073 3.86257 3.60474 3.77917 3.8056 3.5712L4.3712 3.0056Z" fill="#2563EB"/>
            </svg>
            AI & Automation
          </div>
          <h2 className="text-[2rem] font-semibold leading-tight tracking-tight text-[#0a1a2f] sm:text-4xl lg:text-[2.75rem] mb-(--inner-space)">
            Ứng dụng AI vào những hoạt động tạo ra giá trị
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-(--inner-space)"></div>
          <p className="text-[15px] leading-relaxed text-zinc-600">
            Mỗi giải pháp được xây dựng dựa trên nhu cầu thực tế, dữ liệu hiện có và cách người dùng làm việc, để công nghệ không chỉ tạo ra khả năng mới mà còn mang lại giá trị có thể sử dụng trong thực tế.
          </p>
        </div>

        <div className="flex flex-col gap-(--section-padding)">
          
          {/* Main Use Cases (1-4) */}
          {mainUseCases.map((item) => {
            const bg = "bg-white";
            const border = "border border-slate-200 shadow-sm";
            const layout = item.id ==="03" ?"custom" : (item.id ==="02" || item.id ==="04" ?"right-text" :"left-text");
            const imageBadge = item.id ==="02" ?"Từ tài liệu rời rạc đến nguồn thông tin có thể sử dụng" : undefined;

            return (
            <div key={item.id} className={`${bg} rounded-3xl lg:rounded-[2.5rem] p-6 lg:p-12 ${border}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-(--section-padding) items-center">
                
                {/* Content Block */}
                <div className={`flex flex-col order-2 ${layout === 'right-text' ? 'lg:order-2' : 'lg:order-1'}`}>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 mb-(--heading-space) block">
                    {item.badge}
                  </span>
                  <h3 className={`text-[1.5rem] font-semibold leading-tight tracking-tight text-[#0a1a2f] sm:text-3xl lg:text-[2rem] mb-(--inner-space) ${layout === 'custom' ? 'pr-4' : ''} text-justify`}>
                    {item.title}
                  </h3>
                  
                  {item.descriptions.map((desc, idx) => (
                    <p key={idx} className={`text-[15px] leading-relaxed text-zinc-600 ${idx === item.descriptions.length - 1 && !item.note ? 'mb-(--inner-space)' : 'mb-(--inner-space)'} ${idx > 0 ? 'hidden md:block' : ''} text-justify`}>
                      {desc}
                    </p>
                  ))}
                  
                  {item.note && (
                    <div className="hidden md:block">
                      <div className="bg-slate-200/50 h-px w-full mb-(--inner-space)"></div>
                      <p className="text-[14px] text-zinc-500 mb-(--inner-space) italic">
                        {item.note}
                      </p>
                    </div>
                  )}

                  <Link href="/lien-he" className="inline-flex items-center gap-(--inner-space) text-blue-600 font-semibold text-[14.5px] hover:text-blue-800 transition-colors w-fit">
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
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                    )}
                  </>
                ) : (
                  <div className={`relative w-full min-h-64 lg:min-h-0 ${item.id === '01' ? 'lg:aspect-4/3' : 'lg:aspect-16/10'} rounded-2xl overflow-hidden ${item.id === '01' ? 'shadow-lg border border-slate-200/50' : 'bg-slate-100'} order-1 ${layout === 'right-text' ? 'lg:order-1' : 'lg:order-2'}`}>
                    {item.image && (
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    )}
                    {imageBadge && (
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2.5 rounded-xl shadow-lg border border-slate-100 flex items-center gap-(--inner-space)">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-(--inner-space)">
            {splitUseCases.map((item) => {
              const bg = "bg-white";
              const border = "border border-slate-200 shadow-sm";

              return (
              <div key={item.id} className={`${bg} rounded-3xl lg:rounded-[2.5rem] p-6 lg:p-12 ${border} flex flex-col`}>
                
                {item.image && (
                  <div className={`relative w-full min-h-64 lg:min-h-0 lg:aspect-4/3 rounded-2xl overflow-hidden mb-(--inner-space) lg:mt-auto order-1 ${item.id === '06' ? 'lg:hidden' : 'lg:order-3'}`}>
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                )}

                <div className="order-2 flex flex-col flex-1">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600 mb-(--heading-space) block">
                    {item.badge}
                  </span>
                  <h3 className="text-[1.5rem] font-semibold leading-tight tracking-tight text-[#0a1a2f] sm:text-2xl mb-(--inner-space) text-justify">
                    {item.title}
                  </h3>
                  
                  {item.descriptions.map((desc, idx) => (
                    <p key={idx} className={`text-[14.5px] leading-relaxed text-zinc-600 ${idx === item.descriptions.length - 1 ? 'mb-(--inner-space)' : 'mb-(--inner-space)'} ${idx > 0 ? 'hidden md:block' : ''} text-justify`}>
                      {desc}
                    </p>
                  ))}
                  
                  <Link href="/lien-he" className={`inline-flex items-center gap-(--inner-space) text-blue-600 font-semibold text-[14.5px] hover:text-blue-800 transition-colors w-fit ${item.id === '05' ? 'lg:mb-(--inner-space)' : ''}`}>
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
