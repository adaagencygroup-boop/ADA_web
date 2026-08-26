import Link from "next/link";
import Image from "next/image";

export default function AIEcosystem() {
  const contentData = [
    {
      tag: "AI & AUTOMATION TRONG MỘT GIẢI PHÁP HOÀN CHỈNH",
      title: "Công nghệ tạo ra giá trị khi trở thành một phần của hệ thống",
      description: "Giá trị thực sự xuất hiện khi AI, tự động hóa, dữ liệu và phần mềm được kết nối với cách doanh nghiệp đang vận hành. Công nghệ khi đó không tồn tại như một công cụ riêng biệt mà trở thành một phần trong sản phẩm, quy trình và trải nghiệm của người dùng.",
    },
  ];

  return (
    <section className="bg-white py-0">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0a2347] rounded-3xl lg:rounded-4xl px-8 py-12 lg:p-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 shadow-lg">
          
          {/* Left Column: Content */}
          <div className="flex flex-col flex-1">
            {contentData.map((item, index) => (
              <div key={index}>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-blue-300 mb-4 block">
                  {item.tag}
                </span>
                <h2 className="text-[2rem] font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.25rem] mb-5 max-w-xl">
                  {item.title}
                </h2>
                <p className="text-[14px] lg:text-[15px] leading-relaxed text-blue-100/80 mb-8 max-w-xl">
                  {item.description}
                </p>
              </div>
            ))}
            
            <Link href="/lien-he" className="inline-flex items-center gap-2 text-white font-semibold text-[14.5px] hover:text-blue-200 transition-colors w-fit">
              Tìm hiểu thêm <span className="text-lg leading-none">&rarr;</span>
            </Link>
          </div>

          {/* Right Column: Image Diagram */}
          <div className="flex-1 w-full lg:w-1/2">
            <div className="relative w-full aspect-video lg:aspect-16/10 bg-[#020e1f] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
              <Image 
                src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg" 
                alt="System Ecosystem Diagram" 
                fill 
                className="object-cover opacity-90" 
                unoptimized 
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
