export default function MobileScalability() {
  const features = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.3884 10.136C16.9268 10.8705 18.0128 12.3063 18.3009 13.9866C18.5889 15.6668 18.0432 17.3823 16.8374 18.5874L11.5874 23.8374C9.53847 25.8863 6.21159 25.8863 4.1627 23.8374C2.11381 21.7885 2.11381 18.4616 4.1627 16.4127L6.21253 14.3629M21.7875 13.6372L23.8374 11.5874C25.8863 9.53847 25.8863 6.21159 23.8374 4.1627C21.7885 2.11381 18.4616 2.11381 16.4127 4.1627L11.1627 9.4127C9.95682 10.6177 9.41111 12.3332 9.6992 14.0135C9.98728 15.6938 11.0733 17.1295 12.6117 17.864" stroke="#1A4182" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title:"Kết nối dịch vụ",
      desc:"Dễ dàng tích hợp API, cổng thanh toán trực tuyến, mạng xã hội và các hệ thống CRM/ERP của bên thứ ba vào ứng dụng.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.25 1.75H9.625C8.17525 1.75 7 2.92525 7 4.375V23.625C7 25.0747 8.17525 26.25 9.625 26.25H18.375C19.8247 26.25 21 25.0747 21 23.625V4.375C21 2.92525 19.8247 1.75 18.375 1.75H15.75M12.25 1.75V3.5H15.75V1.75M12.25 1.75H15.75M12.25 23.625H15.75" stroke="#1A4182" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title:"Khai thác thiết bị",
      desc:"Tận dụng tối đa sức mạnh phần cứng như Camera, GPS, Bluetooth, Push Notification và các cảm biến sinh trắc học.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.5 15.3125C3.5 14.588 4.088 14 4.8125 14H7.4375C8.162 14 8.75 14.588 8.75 15.3125V23.1875C8.75 23.912 8.162 24.5 7.4375 24.5H4.8125C4.08763 24.5 3.5 23.9124 3.5 23.1875V15.3125V15.3125M11.375 10.0625C11.375 9.338 11.963 8.75 12.6875 8.75H15.3125C16.037 8.75 16.625 9.338 16.625 10.0625V23.1875C16.625 23.912 16.037 24.5 15.3125 24.5H12.6875C11.9626 24.5 11.375 23.9124 11.375 23.1875V10.0625V10.0625M19.25 4.8125C19.25 4.088 19.838 3.5 20.5625 3.5H23.1875C23.912 3.5 24.5 4.088 24.5 4.8125V23.1875C24.5 23.912 23.912 24.5 23.1875 24.5H20.5625C19.8376 24.5 19.25 23.9124 19.25 23.1875V4.8125V4.8125" stroke="#1A4182" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title:"Mở rộng hệ thống",
      desc:"Kiến trúc Cloud-native cho phép tự động scale up/down theo tải thực tế, đảm bảo hiệu suất ngay cả khi lượng người dùng tăng vọt.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.625 11.375L19.25 14L16.625 16.625M11.375 16.625L8.75 14L11.375 11.375M7 23.625H21C22.4497 23.625 23.625 22.4497 23.625 21V7C23.625 5.55025 22.4497 4.375 21 4.375H7C5.55025 4.375 4.375 5.55025 4.375 7V21C4.375 22.4497 5.55025 23.625 7 23.625L16.625 11.375" stroke="#1A4182" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title:"Tích hợp công nghệ",
      desc:"Sẵn sàng ứng dụng các xu hướng công nghệ mới như Trí tuệ nhân tạo (AI/ML), IoT, hay Blockchain vào giải pháp của doanh nghiệp.",
    },
  ];

  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-(--section-padding)">
          <h2 className="text-[28px] lg:text-[44px] font-semibold leading-[1.2] tracking-tight text-[#0a1a2f] mb-(--inner-space) max-w-full">
            Sẵn sàng phát triển cùng <br className="hidden md:block" />
            <span className="text-[#1c3a6e]">nhu cầu doanh nghiệp</span>
          </h2>
          <p className="text-[14px] lg:text-[16px] leading-relaxed text-zinc-600 text-justify md:text-center">
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
                <h4 className="font-semibold text-[16px] lg:text-[18px] text-zinc-900 leading-snug">{feature.title}</h4>
              </div>
              <p className="text-[14px] lg:text-[16px] text-zinc-500 leading-relaxed text-justify">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
