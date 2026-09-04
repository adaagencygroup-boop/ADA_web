import Link from"next/link";
import Image from"next/image";

export default function AIEcosystem() {
  const contentData = [
    {
      tag:"AI & AUTOMATION TRONG MỘT GIẢI PHÁP HOÀN CHỈNH",
      title:"Công nghệ tạo ra giá trị khi trở thành một phần của hệ thống",
      description:"Giá trị thực sự xuất hiện khi AI, tự động hóa, dữ liệu và phần mềm được kết nối với cách doanh nghiệp đang vận hành. Công nghệ khi đó không tồn tại như một công cụ riêng biệt mà trở thành một phần trong sản phẩm, quy trình và trải nghiệm của người dùng.",
    },
  ];

  return (
    <section className="bg-white section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0a2347] rounded-3xl lg:rounded-4xl px-8 py-12 lg:p-16 flex flex-col lg:flex-row items-center gap-(--section-padding) shadow-lg">
          
          {/* Left Column: Content */}
          <div className="flex flex-col flex-1">
            {contentData.map((item, index) => (
              <div key={index}>
                <span className="text-[12px] font-semibold uppercase tracking-widest text-blue-300 mb-(--inner-space) block">
                  {item.tag}
                </span>
                <h2 className="text-[28px] lg:text-[36px] font-semibold leading-[1.2] tracking-tight text-white mb-(--inner-space) text-justify">
                  {item.title}
                </h2>
                <p className="text-[14px] lg:text-[16px] leading-relaxed text-blue-100/80 mb-(--inner-space) text-justify">
                  {item.description}
                </p>
              </div>
            ))}
            
            <Link href="/lien-he" className="inline-flex items-center gap-(--inner-space) text-white font-semibold text-[14px] hover:text-blue-200 transition-colors w-fit">
              Tìm hiểu thêm <span className="text-lg leading-none">&rarr;</span>
            </Link>
          </div>

          {/* Right Column: Image Diagram */}
          <div className="flex-1 w-full lg:w-1/2">
            <div className="relative w-full aspect-video lg:aspect-16/10 bg-[#020e1f] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
              <Image 
                src="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg" 
                alt="System Ecosystem Diagram" 
                fill 
                className="object-cover opacity-90" 
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
