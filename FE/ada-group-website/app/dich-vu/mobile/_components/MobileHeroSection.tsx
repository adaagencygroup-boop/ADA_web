import Link from "next/link";
import Image from "next/image";

export default function MobileHeroSection() {
  const heroData = [
    {
      badge: "Mobile Application",
      title: "Đưa sản phẩm và dịch vụ đến gần người dùng hơn",
      descDesktop:
        "ADA Group thiết kế và phát triển ứng dụng di động phục vụ khách hàng, nhân viên và hoạt động kinh doanh của doanh nghiệp.\nTừ ứng dụng dịch vụ, thương mại đến các ứng dụng quản lý nội bộ, chúng tôi xây dựng sản phẩm hướng tới trải nghiệm trực quan, hoạt động ổn định và khả năng phát triển lâu dài.",
      descMobile:
        "ADA Group thiết kế và phát triển ứng dụng di động phục vụ khách hàng, nhân viên và hoạt động kinh doanh của doanh nghiệp. Từ ứng dụng dịch vụ, thương mại đến các ứng dụng quản lý nội bộ, chúng tôi luôn hướng tới trải nghiệm trực quan và ổn định.",
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
              <h1 className="text-[2.25rem] leading-[1.1] font-semibold tracking-tight text-black sm:text-5xl lg:text-[2.75rem]">
                {data.title}
              </h1>

              {/* Description Desktop */}
              <p className="hidden md:block text-base leading-relaxed text-zinc-600 max-w-lg mt-2 lg:mt-4 whitespace-pre-line">
                {data.descDesktop}
              </p>

              {/* Description Mobile */}
              <p className="md:hidden text-[15px] leading-relaxed text-zinc-600 mt-2 whitespace-pre-line">
                {data.descMobile}
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
                <Image src={data.imagePlaceholder} alt="ADA Group Hero" fill className="object-cover" unoptimized priority />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
