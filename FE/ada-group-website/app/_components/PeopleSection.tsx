import Image from "next/image";

const CONTENT = {
  title: "Công nghệ vì người Việt, được xây dựng bởi người Việt",
  paragraphs: [
    "AI đang thay đổi cách con người làm việc, học tập và ra quyết định. Chúng tôi tin rằng những công nghệ này nên được xây dựng dựa trên nhu cầu và văn hóa của người dùng Việt.",
    "ADA Group phát triển từ sự lắng nghe người dùng, giúp doanh nghiệp và người dùng tiếp cận trí tuệ nhân tạo một cách cụ thể, hiệu quả và phù hợp với thực tế.",
  ],
};

const IMAGE = {
  src: "https://picsum.photos/1372/737",
  alt: "Đội ngũ ADA Group làm việc cùng nhau",
};

export default function PeopleSection() {
  return (
    <section className="section-y bg-zinc-50">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-x-12 lg:grid-cols-2">
          <h2 className="text-2xl font-medium tracking-tight text-zinc-900 sm:text-4xl lg:hidden">
            {CONTENT.title}
          </h2>

          <Image
            src={IMAGE.src}
            alt={IMAGE.alt}
            width={1372}
            height={737}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="mt-(--inner-space) h-auto w-full lg:col-start-1 lg:row-start-1 lg:mt-0"
          />

          <div className="mt-(--inner-space) lg:col-start-2 lg:row-start-1 lg:mt-0">
            <h2 className="hidden text-2xl font-medium tracking-tight text-zinc-900 sm:text-4xl lg:block">
              {CONTENT.title}
            </h2>
            {CONTENT.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed mt-(--inner-space) text-zinc-600 text-justify [&+&]:mt-4 lg:first-of-type:mt-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
