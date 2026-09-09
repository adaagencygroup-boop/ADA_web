import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách bảo mật | ADA Group",
  description: "Chính sách bảo mật thông tin và dữ liệu cá nhân của ADA Group, tuân thủ Nghị định 13/2023/NĐ-CP.",
};

const SECTIONS = [
  {
    id: "pham-vi",
    title: "1. Phạm vi và Đối tượng áp dụng",
    content: (
      <div className="space-y-4 text-zinc-600 leading-[1.7] text-[15px] lg:text-[16px]">
        <p>
          Chính sách bảo mật này được lập ra nhằm tuân thủ <strong>Nghị định số 13/2023/NĐ-CP</strong> của Chính phủ về Bảo vệ Dữ liệu Cá nhân (sau đây gọi tắt là &quot;Nghị định 13&quot;). Chính sách này áp dụng đối với mọi tổ chức, cá nhân (sau đây gọi là &quot;Chủ thể dữ liệu&quot;) có tương tác, truy cập hoặc sử dụng các sản phẩm, dịch vụ và nền tảng của ADA Group.
        </p>
      </div>
    )
  },
  {
    id: "loai-du-lieu",
    title: "2. Phân loại dữ liệu thu thập",
    content: (
      <div className="space-y-4 text-zinc-600 leading-[1.7] text-[15px] lg:text-[16px]">
        <p>Chúng tôi chỉ thu thập các dữ liệu cá nhân cơ bản cần thiết cho mục đích kinh doanh hợp pháp, bao gồm:</p>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          <div className="p-5 rounded-xl border border-slate-100 bg-white shadow-sm">
            <h4 className="font-medium text-zinc-900 mb-2">Dữ liệu định danh</h4>
            <p className="text-[14px]">Họ và tên, địa chỉ email, số điện thoại liên hệ, thông tin tổ chức/doanh nghiệp, và chức vụ.</p>
          </div>
          <div className="p-5 rounded-xl border border-slate-100 bg-white shadow-sm">
            <h4 className="font-medium text-zinc-900 mb-2">Dữ liệu kỹ thuật</h4>
            <p className="text-[14px]">Địa chỉ IP tĩnh/động, cookie hệ thống, lịch sử truy cập, thông số trình duyệt và hệ điều hành.</p>
          </div>
        </div>
        <div className="mt-4 p-5 border-l-2 border-green-500 bg-green-50/50">
          <strong className="block mb-1 text-green-900 font-medium">Cam kết đặc biệt:</strong> 
          <p className="text-green-800 text-[14px]">
            ADA Group <strong>KHÔNG</strong> thu thập, xử lý các Dữ liệu cá nhân nhạy cảm (như thông tin y tế, sinh trắc học, xu hướng tính dục, dữ liệu tội phạm) dưới bất kỳ hình thức nào, trừ khi có yêu cầu bằng văn bản từ Cơ quan Nhà nước có thẩm quyền theo quy định của pháp luật.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "muc-dich",
    title: "3. Mục đích xử lý dữ liệu",
    content: (
      <div className="space-y-4 text-zinc-600 leading-[1.7] text-[15px] lg:text-[16px]">
        <p>Tuân thủ Điều 11 Nghị định 13, chúng tôi xử lý dữ liệu của Quý khách theo các mục đích chính đáng sau:</p>
        <ul className="space-y-2.5 mt-2">
          {[
            "Thực hiện, quản lý và hoàn tất các thủ tục ký kết hợp đồng dịch vụ công nghệ.",
            "Xác thực danh tính, hỗ trợ kỹ thuật và giải quyết khiếu nại của khách hàng.",
            "Tối ưu hóa và nâng cấp hiệu năng của website, ứng dụng và trải nghiệm người dùng.",
            "Gửi thông tin cập nhật về chính sách, bảo mật hoặc các ưu đãi dịch vụ (chỉ khi được sự đồng ý trước của Chủ thể dữ liệu).",
            "Thực hiện nghĩa vụ báo cáo, thống kê, nộp thuế theo yêu cầu của cơ quan pháp luật."
          ].map((item, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <span className="text-zinc-400 font-bold shrink-0 mt-0.5">&bull;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  },
  {
    id: "quyen-loi",
    title: "4. Quyền của Chủ thể dữ liệu",
    content: (
      <div className="space-y-4 text-zinc-600 leading-[1.7] text-[15px] lg:text-[16px]">
        <p>Căn cứ Điều 9 Nghị định 13/2023/NĐ-CP, Quý khách với tư cách là Chủ thể dữ liệu sở hữu đầy đủ các quyền sau đây:</p>
        <div className="space-y-4 mt-4">
          {[
            { title: "Quyền được biết và Đồng ý", desc: "Được thông báo rõ ràng về mục đích xử lý dữ liệu và có quyền đồng ý hoặc từ chối xử lý dữ liệu của mình." },
            { title: "Quyền truy cập và Cung cấp dữ liệu", desc: "Có quyền yêu cầu ADA Group trích xuất, cung cấp bản sao dữ liệu cá nhân đang được lưu trữ." },
            { title: "Quyền chỉnh sửa và Xóa dữ liệu", desc: "Có quyền yêu cầu chỉnh sửa dữ liệu sai sót hoặc xóa bỏ hoàn toàn dữ liệu (Right to be forgotten) khi không còn nhu cầu sử dụng dịch vụ." },
            { title: "Quyền rút lại sự đồng ý", desc: "Có quyền rút lại sự đồng ý xử lý dữ liệu bất kỳ lúc nào bằng cách thông báo cho chúng tôi qua các kênh chính thức." }
          ].map((right, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <svg className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <strong className="text-zinc-900 font-medium block">{right.title}</strong>
                <span>{right.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: "bao-mat",
    title: "5. Biện pháp bảo vệ dữ liệu",
    content: (
      <div className="space-y-4 text-zinc-600 leading-[1.7] text-[15px] lg:text-[16px]">
        <p>
          ADA Group triển khai các giải pháp kỹ thuật, quản lý và tổ chức ở tiêu chuẩn cao nhất nhằm chống lại các hành vi vi phạm an toàn thông tin:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li><strong>Mã hóa dữ liệu:</strong> Toàn bộ dữ liệu truyền tải trên hệ thống được mã hóa theo giao thức chuẩn công nghiệp (SSL/TLS).</li>
          <li><strong>Kiểm soát truy cập:</strong> Dữ liệu chỉ được tiếp cận bởi những nhân sự có thẩm quyền trong nội bộ ADA Group thông qua cơ chế phân quyền chặt chẽ.</li>
          <li><strong>Đánh giá định kỳ:</strong> Hệ thống lưu trữ và máy chủ được kiểm tra, rà soát lỗ hổng bảo mật thường xuyên để ngăn chặn rủi ro không gian mạng.</li>
        </ul>
      </div>
    )
  },
  {
    id: "chia-se",
    title: "6. Chia sẻ dữ liệu",
    content: (
      <div className="space-y-4 text-zinc-600 leading-[1.7] text-[15px] lg:text-[16px]">
        <p>Chúng tôi tuyệt đối <strong>KHÔNG BÁN, TRAO ĐỔI</strong> dữ liệu cá nhân của Quý khách cho mục đích trục lợi. Dữ liệu chỉ được chia sẻ trong các trường hợp thật sự cần thiết và hợp pháp:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Chia sẻ với các đối tác cung cấp dịch vụ hạ tầng công nghệ (ví dụ: đối tác Cloud Hosting, hệ thống gửi Email) đã ký kết thỏa thuận bảo mật (NDA) nghiêm ngặt với ADA Group.</li>
          <li>Cung cấp cho các Cơ quan Nhà nước có thẩm quyền của Việt Nam khi có yêu cầu bằng văn bản hợp pháp.</li>
        </ul>
      </div>
    )
  },
  {
    id: "thong-tin-lien-he",
    title: "7. Thông tin liên hệ",
    content: (
      <div className="text-zinc-600 leading-[1.7] text-[15px] lg:text-[16px]">
        <p className="mb-4">
          Để thực hiện các quyền của Chủ thể dữ liệu, rút lại sự đồng ý hoặc báo cáo vi phạm dữ liệu, Quý khách vui lòng liên hệ ngay với <strong>Bộ phận Chuyên trách Bảo vệ Dữ liệu</strong> của chúng tôi:
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

export default function PrivacyPolicyPage() {
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
            <h1 className="text-[28px] md:text-[44px] font-semibold leading-tight tracking-tight text-zinc-900 mb-4 md:mb-6">
              Chính sách bảo mật
            </h1>
            <div className="flex flex-col gap-6">
              {SECTIONS.map((section) => (
                <section 
                  key={section.id} 
                  id={section.id} 
                  className="scroll-mt-32"
                >
                  <h2 className="text-[20px] lg:text-[24px] font-semibold text-black mb-5">
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
