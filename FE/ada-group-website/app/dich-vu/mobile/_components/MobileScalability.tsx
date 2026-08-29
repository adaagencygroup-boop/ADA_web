export default function MobileScalability() {
  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#0a1a2f]">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
      title:"Kết nối dịch vụ",
      desc:"Dễ dàng tích hợp API, cổng thanh toán trực tuyến, mạng xã hội và các hệ thống CRM/ERP của bên thứ ba vào ứng dụng.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#0a1a2f]">
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      ),
      title:"Khai thác thiết bị",
      desc:"Tận dụng tối đa sức mạnh phần cứng như Camera, GPS, Bluetooth, Push Notification và các cảm biến sinh trắc học.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#0a1a2f]">
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      ),
      title:"Mở rộng hệ thống",
      desc:"Kiến trúc Cloud-native cho phép tự động scale up/down theo tải thực tế, đảm bảo hiệu suất ngay cả khi lượng người dùng tăng vọt.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[#0a1a2f]">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      title:"Tích hợp công nghệ",
      desc:"Sẵn sàng ứng dụng các xu hướng công nghệ mới như Trí tuệ nhân tạo (AI/ML), IoT, hay Blockchain vào giải pháp của doanh nghiệp.",
    },
  ];

  return (
    <section className="bg-white section-y max-md:py-5! md:pt-(--heading-space)!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-(--section-padding)">
          <h2 className="text-[2rem] font-semibold leading-tight tracking-tight text-[#0a1a2f] sm:text-4xl lg:text-[2.5rem] mb-(--inner-space)">
            Sẵn sàng phát triển cùng <br className="hidden md:block" />
            <span className="text-[#1c3a6e]">nhu cầu doanh nghiệp</span>
          </h2>
          <p className="text-[15px] leading-relaxed text-zinc-600">
            Mỗi ứng dụng có yêu cầu và định hướng phát triển khác nhau. Nền tảng của chúng tôi được thiết kế với kiến trúc linh hoạt, sẵn sàng mở rộng và tích hợp các công nghệ mới nhất để đáp ứng mục tiêu kinh doanh của bạn.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-(--inner-space)">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex flex-col">
              <div className="flex items-center gap-(--inner-space) mb-(--inner-space)">
                <div className="bg-[#f1f5f9] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-[15px] text-zinc-900 leading-snug">{feature.title}</h4>
              </div>
              <p className="text-[13px] text-zinc-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
