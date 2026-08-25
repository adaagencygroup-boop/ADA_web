import Link from "next/link";
import { ArrowRightIcon } from "@/app/_components/icons";

const CONTENT = {
  paragraph:
    "Chúng tôi tin rằng, với một định hướng phát triển rõ ràng, nguồn lực vững mạnh và một tập thể đoàn kết, ADA Group sẽ tiếp tục gặt hái được nhiều thành công hơn nữa trong tương lai, trở thành đối tác tin cậy và sự lựa chọn hàng đầu của khách hàng trong lĩnh vực công nghệ thông tin tại Việt Nam và trên thế giới.",
  ctaLabel: "Cùng ADA Group hiện thực hóa ý tưởng",
  ctaHref: "/lien-he",
};

export default function ClosingStatement() {
  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#F6F3F5] p-8 text-center shadow-inner lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none">
          <p className="text-lg leading-relaxed text-gray-600 lg:mx-auto lg:max-w-5xl lg:text-2xl lg:leading-10">
            {CONTENT.paragraph}
          </p>

          <Link
            href={CONTENT.ctaHref}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#003384] px-8 py-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#002a6b] lg:rounded-full lg:bg-[#002A64] lg:px-8 lg:py-3.5 lg:text-lg lg:font-medium lg:shadow-lg lg:hover:bg-blue-900"
          >
            {CONTENT.ctaLabel}
            <ArrowRightIcon className="hidden h-3.5 w-3.5 lg:inline" />
          </Link>
        </div>
      </div>
    </section>
  );
}
