import Link from "next/link";
import Image from "next/image";

export default function EnterpriseHeroSection() {
  const heroData = [
    {
      badge: "Enterprise System",
      title: "Số hóa quy trình, kết nối hoạt động doanh nghiệp",
      desc:
        "ADA Group thiết kế và phát triển các hệ thống phần mềm giúp doanh nghiệp quản lý thông tin, chuẩn hóa quy trình và kết nối các hoạt động trên một nền tảng thống nhất. Từ một công cụ phục vụ một bộ phận đến hệ thống kết nối nhiều quy trình trong doanh nghiệp, mỗi giải pháp được xây dựng dựa trên cách tổ chức thực sự vận hành, hướng tới việc giảm thao tác thủ công, tập trung dữ liệu và nâng cao hiệu quả quản lý.",
      imagePlaceholder: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
    },
  ];

  return (
    <section className="bg-white section-y max-md:py-5!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        {heroData.map((data, index) => (
          <div
            key={index}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-(--inner-space) items-center"
          >
            {/* Left: Content */}
            <div className="flex flex-col gap-(--heading-space) lg:col-span-5">
              {/* Badge */}
              <div className="hidden md:inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-900 mb-2">
                {data.badge}
              </div>
              <div className="inline-flex md:hidden w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-zinc-900 mb-2">
                {data.badge}
              </div>

              {/* Title */}
              <h1 className="text-[2rem] leading-[1.2] font-semibold tracking-tight text-black sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                {data.title}
              </h1>

              {/* Description */}
              <p className="text-[15px] md:text-base leading-relaxed text-zinc-600 mt-2 lg:mt-4 whitespace-pre-line text-justify px-3 lg:px-0 lg:pl-3">
                {data.desc}
              </p>

              {/* CTA */}
              <div className="pt-2 lg:pt-4">
                <Link
                  href="/lien-he"
                  className="inline-flex w-full md:w-auto items-center justify-center gap-2 font-semibold text-white transition-colors 
                  rounded-lg bg-[#004bb4] px-6 py-3 text-[15px] hover:bg-blue-700 
                  md:rounded-md md:bg-[#1e3a6e] md:text-sm md:hover:bg-blue-900"
                >
                  Trao đổi về dự án &rarr;
                </Link>
              </div>
            </div>

            {/* Right: Image */}
            <div className="lg:col-span-7 mt-4 lg:mt-0">
              <div className="relative aspect-692/393 w-full overflow-hidden rounded-4xl bg-slate-100 flex items-center justify-center border border-slate-200">
                <Image
                  src={data.imagePlaceholder}
                  alt={data.title}
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
