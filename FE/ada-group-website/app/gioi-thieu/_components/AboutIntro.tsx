import Image from "next/image";
import GsapHeroReveal from "@/app/_components/GsapHeroReveal";

const CONTENT = {
  title: "Về ADA Group",
  paragraphs: [
    "Công nghệ không chỉ là những dòng mã phức tạp khó đọc, mà là công cụ để tạo ra những giải pháp thiết thực cho cuộc sống và công việc. Tại ADA Group, chúng tôi tin rằng công nghệ có giá trị nhất khi có thể giải quyết những vấn đề thực tế và tạo ra trải nghiệm đơn giản, hiệu quả cho mọi người.",
    "Chúng tôi phát triển các giải pháp công nghệ toàn diện, linh hoạt và bảo mật, phục vụ cá nhân, hộ kinh doanh, startup, tổ chức và doanh nghiệp. Từ tự động hóa quy trình đến ứng dụng AI và các nền tảng số, ADA Group đồng hành cùng khách hàng trong việc biến ý tưởng thành giải pháp thực tế và thúc đẩy đổi mới.",
  ],
};

const IMAGE = {
  src: "/images/gioi-thieu/AboutIntro.webp",
  alt: "Giới thiệu về công ty ADA Group",
};

export default function AboutIntro() {
  return (
    <GsapHeroReveal>
      <section className="section-y">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-x-16 lg:grid-cols-2">
            <div className="hero-text-left flex flex-col justify-center">
              <h1 className="text-[28px] leading-[1.2] font-semibold tracking-tight text-zinc-900 lg:text-[44px] lg:leading-[1.1]">
                {CONTENT.title}
              </h1>
              <span className="mt-4 block h-1 w-11 rounded-full bg-blue-800" />

              <div className="mt-(--inner-space)">
                {CONTENT.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[14px] lg:text-[16px] text-justify leading-relaxed text-zinc-600 [&+&]:mt-6"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="hero-image-right relative mt-(--inner-space) hidden aspect-512/279 w-full overflow-hidden rounded-2xl lg:mt-0 lg:block">
              <Image
                src={IMAGE.src}
                alt={IMAGE.alt}
                fill
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>
    </GsapHeroReveal>
  );
}
