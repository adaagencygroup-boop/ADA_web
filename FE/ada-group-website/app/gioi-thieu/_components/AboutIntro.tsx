import Image from "next/image";

const CONTENT = {
  title: "Về ADA Group",
  paragraphs: [
    "Công nghệ không chỉ là những dãy mã máy khô khan, nó là nền tảng để kiến tạo tương lai. Tại ADA Group, chúng tôi tin rằng sức mạnh của công nghệ nằm ở khả năng giải quyết các vấn đề thực tiễn của doanh nghiệp.",
    "Chúng tôi xây dựng các giải pháp CNTT toàn diện, linh hoạt và bảo mật cao, tập trung vào việc tối ưu hóa quy trình, nâng cao hiệu suất và thúc đẩy đổi mới sáng tạo, giúp khách hàng tự tin bứt phá trong kỷ nguyên số.",
  ],
};

const IMAGE = {
  src: "https://picsum.photos/1024/558",
  alt: "Sơ đồ hạ tầng mạng lưới công nghệ toàn cầu",
};

export default function AboutIntro() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-x-16 lg:grid-cols-2">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              {CONTENT.title}
            </h1>
            <span className="mt-4 block h-1 w-11 rounded-full bg-blue-800" />

            <div className="mt-(--inner-space)">
              {CONTENT.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base text-justify leading-relaxed text-zinc-600 [&+&]:mt-6"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="relative mt-(--inner-space) hidden aspect-512/279 w-full overflow-hidden rounded-2xl lg:mt-0 lg:block">
            <Image
              src={IMAGE.src}
              alt={IMAGE.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
