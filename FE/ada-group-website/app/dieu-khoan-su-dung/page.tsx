import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng | ADA Group",
  description: "Điều khoản và điều kiện sử dụng các dịch vụ và nền tảng của ADA Group theo quy định của pháp luật Việt Nam.",
};

const SECTIONS = [
  {
    id: "chap-thuan",
    title: "1. Chấp thuận điều khoản",
    content: (
      <div className="space-y-4 text-zinc-600 leading-[1.7] text-[15px] lg:text-[16px]">
        <p>
          Chào mừng Quý khách đến với website và các nền tảng dịch vụ của ADA Group. Bằng việc truy cập, duyệt hoặc sử dụng bất kỳ dịch vụ nào trên website này, Quý khách được xem là đã đọc, hiểu rõ và đồng ý chịu sự ràng buộc bởi các Điều khoản sử dụng này, cũng như các quy định của <strong>Pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam</strong> (bao gồm nhưng không giới hạn ở Bộ luật Dân sự 2015, Luật Giao dịch điện tử 2023).
        </p>
        <p>
          Nếu Quý khách không đồng ý với bất kỳ phần nào của các Điều khoản này, xin vui lòng ngay lập tức chấm dứt việc truy cập và sử dụng dịch vụ của chúng tôi.
        </p>
      </div>
    )
  },
  {
    id: "so-huu-tri-tue",
    title: "2. Quyền sở hữu trí tuệ",
    content: (
      <div className="space-y-4 text-zinc-600 leading-[1.7] text-[15px] lg:text-[16px]">
        <p>
          Toàn bộ nội dung, thiết kế, đồ họa, giao diện, mã nguồn, cơ sở dữ liệu, logo, nhãn hiệu và các tài sản vô hình khác trên website này đều thuộc quyền sở hữu hợp pháp của ADA Group và được bảo hộ nghiêm ngặt theo <strong>Luật Sở hữu trí tuệ 2005 (sửa đổi, bổ sung 2022)</strong> của Việt Nam và các điều ước quốc tế có liên quan.
        </p>
        <div className="p-5 mt-4 border-l-2 border-red-500 bg-red-50/50">
          <strong className="block mb-2 font-medium text-red-900">Nghiêm cấm các hành vi:</strong>
          <ul className="list-disc pl-5 space-y-1.5 text-red-800">
            <li>Sao chép, chỉnh sửa, phái sinh, phân phối hoặc tái bản bất kỳ nội dung nào.</li>
            <li>Sử dụng nội dung cho mục đích thương mại hoặc công cộng khi chưa có sự chấp thuận bằng văn bản từ ADA Group.</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: "nghia-vu-nguoi-dung",
    title: "3. Nghĩa vụ của Người dùng",
    content: (
      <div className="space-y-4 text-zinc-600 leading-[1.7] text-[15px] lg:text-[16px]">
        <p>Khi sử dụng các nền tảng của ADA Group, Người dùng có trách nhiệm tuân thủ nghiêm ngặt <strong>Luật An toàn thông tin mạng 2015 và Luật An ninh mạng 2018</strong>. Người dùng cam kết <strong>KHÔNG</strong> thực hiện các hành vi sau:</p>
        <ul className="space-y-3 mt-4">
          {[
            "Tuyên truyền, chống phá Nhà nước CHXHCN Việt Nam; vi phạm pháp luật.",
            "Phát tán mã độc, virus, tấn công mạng (DDoS) nhằm phá hoại hệ thống của ADA Group.",
            "Thu thập trái phép dữ liệu cá nhân của người dùng khác hoặc dữ liệu hệ thống.",
            "Xúc phạm danh dự, nhân phẩm, vu khống tổ chức, cá nhân khác trên nền tảng."
          ].map((item, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <svg className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  },
  {
    id: "mien-tru",
    title: "4. Miễn trừ và Giới hạn trách nhiệm",
    content: (
      <div className="space-y-6 text-zinc-600 leading-[1.7] text-[15px] lg:text-[16px]">
        <div>
          <strong className="text-zinc-900 block mb-1">A. Từ chối bảo đảm</strong>
          <p>
            ADA Group luôn nỗ lực tối đa để đảm bảo hệ thống vận hành liên tục và an toàn. Tuy nhiên, các dịch vụ được cung cấp trên cơ sở &quot;như hiện có&quot; (as-is). Chúng tôi không bảo đảm rằng hệ thống sẽ không bị gián đoạn, không có lỗi kỹ thuật hoặc hoàn toàn miễn nhiễm với các cuộc tấn công an ninh mạng tinh vi.
          </p>
        </div>
        <div>
          <strong className="text-zinc-900 block mb-1">B. Giới hạn trách nhiệm</strong>
          <p>
            Trong phạm vi tối đa được pháp luật Việt Nam cho phép, ADA Group được miễn trừ mọi trách nhiệm bồi thường đối với các thiệt hại trực tiếp, gián tiếp, vô ý hoặc hệ quả phát sinh từ việc sử dụng, hoặc không thể sử dụng website và dịch vụ của chúng tôi do các yếu tố bất khả kháng (thiên tai, dịch bệnh, quyết định của cơ quan nhà nước, sự cố hạ tầng viễn thông quốc gia).
          </p>
        </div>
      </div>
    )
  },
  {
    id: "giai-quyet-tranh-chap",
    title: "5. Giải quyết tranh chấp",
    content: (
      <div className="space-y-4 text-zinc-600 leading-[1.7] text-[15px] lg:text-[16px]">
        <p>
          Bản Điều khoản này được điều chỉnh và diễn giải theo hệ thống <strong>Pháp luật của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam</strong>.
        </p>
        <p>
          Mọi tranh chấp, bất đồng phát sinh từ hoặc liên quan đến việc sử dụng website và dịch vụ của ADA Group sẽ được ưu tiên giải quyết thông qua thương lượng, hòa giải trên tinh thần thiện chí. 
          Trường hợp các bên không thể đạt được thỏa thuận trong vòng 30 ngày kể từ ngày phát sinh tranh chấp, một trong các bên có quyền khởi kiện yêu cầu giải quyết tranh chấp tại <strong>Tòa án nhân dân có thẩm quyền tại Việt Nam</strong> theo quy định của Bộ luật Tố tụng Dân sự.
        </p>
      </div>
    )
  },
  {
    id: "lien-he",
    title: "6. Thông tin liên hệ",
    content: (
      <div className="text-zinc-600 leading-[1.7] text-[15px] lg:text-[16px]">
        <p className="mb-4">
          Mọi thắc mắc về tính pháp lý, khiếu nại vi phạm bản quyền hoặc góp ý về Điều khoản sử dụng này, Quý khách vui lòng liên hệ trực tiếp với bộ phận pháp chế của chúng tôi:
        </p>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
          <strong className="text-zinc-900 block mb-3 font-medium">ADA Group</strong>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-zinc-500 w-20 inline-block font-medium shrink-0 mt-0.5">Địa chỉ:</span> 
              <span>Tầng 7 toà An Phú Building, LK19A-19B, khu tái định cư Dương Nội, đường Lê Trọng Tấn, Phường Dương Nội, TP Hà Nội, Việt Nam</span>
            </li>
            <li><span className="text-zinc-500 w-20 inline-block font-medium">Hotline:</span> <a href="tel:+84924574444" className="text-blue-600 hover:underline">(+84) 924 574 444</a></li>
            <li><span className="text-zinc-500 w-20 inline-block font-medium">Email:</span> <a href="mailto:contact@adagroup.vn" className="text-blue-600 hover:underline">contact@adagroup.vn</a></li>
            <li><span className="text-zinc-500 w-20 inline-block font-medium">Website:</span> <a href="https://www.adagroup.vn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.adagroup.vn</a></li>
          </ul>
        </div>
      </div>
    )
  }
];

export default function TermsOfUsePage() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row gap-(--heading-space) lg:gap-16 items-start">
          {/* Minimal Sidebar Navigation */}
          <aside className="w-full lg:w-1/4 shrink-0 lg:sticky lg:top-32 hidden lg:block">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white">
              <h3 className="font-medium text-zinc-900 mb-4 text-[13px] uppercase tracking-wider">Mục lục</h3>
              <nav className="flex flex-col space-y-3">
                {SECTIONS.map((section) => (
                  <a 
                    key={section.id} 
                    href={`#${section.id}`} 
                    className="text-[14px] text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="w-full lg:w-3/4">
            <h1 className="text-[28px] md:text-[44px] font-semibold leading-tight tracking-tight text-black mb-4 md:mb-6">
              Điều khoản sử dụng
            </h1>
            <div className="flex flex-col gap-6">
              {SECTIONS.map((section) => (
                <section 
                  key={section.id} 
                  id={section.id} 
                  className="scroll-mt-32"
                >
                  <h2 className="text-[20px] lg:text-[24px] font-semibold text-zinc-900 mb-5">
                    {section.title}
                  </h2>
                  {section.content}
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
