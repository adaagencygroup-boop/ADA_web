import Link from "next/link";
import Image from "next/image";

export default function AIHeroSection() {
  const heroData = [
    {
      badge: "AI & Automation",
      title:
        "Ứng dụng AI và tự động hóa vào những bài toán thực tế",
      desc:
        "ADA Group hỗ trợ doanh nghiệp ứng dụng trí tuệ nhân tạo và tự động hóa để khai thác thông tin, cải thiện quy trình và nâng cao hiệu quả hoạt động. Mỗi dự án bắt đầu từ bài toán thực tế, dữ liệu hiện có và giá trị doanh nghiệp muốn đạt được, sau đó mới lựa chọn công nghệ phù hợp.",
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
              <div className="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-blue-900 mb-2">
                {data.badge}
              </div>

              {/* Title */}
              <h1 className="text-[2rem] leading-[1.2] font-semibold tracking-tight text-black sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                {data.title}
              </h1>

              {/* Description */}
              <p className="text-[15px] leading-relaxed text-zinc-600 mt-2 lg:mt-3 text-justify indent-4">
                {data.desc}
              </p>

              {/* CTA */}
              <div className="pt-2 lg:pt-3">
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
                  alt="Ứng dụng AI và tự động hóa"
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
