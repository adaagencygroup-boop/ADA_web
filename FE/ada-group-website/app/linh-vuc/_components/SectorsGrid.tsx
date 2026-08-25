import Image from "next/image";
import { ArrowRightIcon } from "@/app/_components/icons";

const SECTORS = [
  {
    eyebrow: "HEALTHCARE",
    title: "Y tế",
    code: "ADAMECT",
    description:
      "Trợ lý AI chuyên biệt hỗ trợ bác sĩ trong việc đọc ảnh y khoa, phân tích chỉ số máu và chẩn đoán sớm các bệnh lý phức tạp.",
    imageUrl: "https://picsum.photos/seed/ada-healthcare/800/600",
  },
  {
    eyebrow: "AGRICULTURE",
    title: "Nông nghiệp",
    code: "ADAFARM",
    description:
      "Giải pháp kết hợp Computer Vision, IoT và Blockchain giúp nông dân tối ưu hóa năng suất, giám sát dịch bệnh và minh bạch nguồn gốc nông sản.",
    imageUrl: "https://picsum.photos/seed/ada-agriculture/800/600",
  },
  {
    eyebrow: "LEGAL & AI LAW",
    title: "Luật & Pháp lý",
    code: "ADALAW",
    description:
      "Mạng xã hội luật đầu tiên ứng dụng AI để hỗ trợ tra cứu văn bản, phân tích án lệ và kết nối luật sư với người dùng một cách hiệu quả.",
    imageUrl: "https://picsum.photos/seed/ada-legal/800/600",
  },
  {
    eyebrow: "E-COMMERCE",
    title: "Thương mại điện tử",
    code: "ADATIK, ADAWORLD, ADAMART",
    description:
      "Hệ sinh thái TMĐT thế hệ mới, tích hợp AI Livestream cá nhân hóa và giải pháp thanh toán thông minh cho thị trường xuyên biên giới.",
    imageUrl: "https://picsum.photos/seed/ada-ecommerce/800/600",
  },
  {
    eyebrow: "LOGISTICS",
    title: "Logistics & Vận tải",
    code: "ADACAR",
    description:
      "Nền tảng ghép xe thông minh, tối ưu hóa lộ trình và giảm xe rỗng chạy ngược chiều trên toàn quốc, giúp tiết kiệm chi phí và bảo vệ môi trường.",
    imageUrl: "https://picsum.photos/seed/ada-logistics/800/600",
  },
  {
    eyebrow: "SOCIAL",
    title: "Mạng xã hội",
    code: "ADALOVE",
    description:
      "Mạng xã hội kết nối tri thức và tình cảm, ứng dụng AI để gợi ý những mối quan hệ chất lượng, có chiều sâu và đảm bảo an toàn tuyệt đối cho người dùng.",
    imageUrl: "https://picsum.photos/seed/ada-social/800/600",
  },
  {
    eyebrow: "HEALTH & WELLNESS",
    title: "Sức khỏe & Lối sống",
    code: "ADAHEALTH",
    description:
      "Trợ lý AI dinh dưỡng, vận động và sàn thực phẩm sạch truy vết QR.",
    imageUrl: "https://picsum.photos/seed/ada-wellness/800/600",
  },
  {
    eyebrow: "SECURITY",
    title: "An ninh & Cảm biến",
    code: "ADACAMRA",
    description: "Camera xuyên tường dựa trên tín hiệu Wi-Fi.",
    imageUrl: "https://picsum.photos/seed/ada-security/800/600",
  },
  {
    eyebrow: "FINANCE",
    title: "Tài chính & Đầu tư",
    code: "ADAFIN, ADACOIN, ADASTOCK",
    description: "Bộ ba quản lý chi tiêu, crypto và chứng khoán.",
    imageUrl: "https://picsum.photos/seed/ada-finance/800/600",
  },
  {
    eyebrow: "TRAVEL",
    title: "Du lịch & Lữ hành",
    code: "ADAGO",
    description:
      "AI tư vấn cá nhân hóa, vé máy bay tối ưu giá và dịch giọng nói thời gian thực.",
    imageUrl: "https://picsum.photos/seed/ada-travel/800/600",
  },
  {
    eyebrow: "REAL ESTATE",
    title: "Bất động sản",
    code: "ADALAND",
    description:
      "Nền tảng kết nối môi giới và khách hàng, mở rộng sang dự án & công nghiệp.",
    imageUrl: "https://picsum.photos/seed/ada-realestate/800/600",
  },
  {
    eyebrow: "ENTERPRISE",
    title: "Hệ sinh thái Doanh nghiệp",
    code: "ADAWORK, ADAWEB, ADASHOP",
    description: "Bộ công cụ vận hành toàn diện cho SME Việt.",
    imageUrl: "https://picsum.photos/seed/ada-enterprise/800/600",
  },
  {
    eyebrow: "FOUNDATION AI",
    title: "AI nền tảng",
    code: "ADA LLM & ADA VIDEO",
    description: "Mô hình ngôn ngữ và sinh video do ADA Group tự phát triển.",
    imageUrl: "https://picsum.photos/seed/ada-foundation/800/600",
  },
  {
    eyebrow: "EDUCATION",
    title: "Giáo dục",
    code: "ADAKID",
    description: "Robot đồ chơi tích hợp AI giáo dục cho trẻ em Việt.",
    imageUrl: "https://picsum.photos/seed/ada-education/800/600",
  },
];

export default function SectorsGrid() {
  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((sector) => (
            <div
              key={sector.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#C4C6D2]/20 bg-white"
            >
              <div className="relative aspect-417/224 w-full bg-zinc-200">
                <Image
                  src={sector.imageUrl}
                  alt={sector.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col items-start p-6 lg:p-8">
                <span className="text-xs tracking-[1.2px] text-[#002A64] uppercase">
                  {sector.eyebrow}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-[#191C1E] lg:text-2xl">
                  {sector.title}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-6 text-[#434750] lg:text-base">
                  <span className="font-semibold text-[#002A64]">
                    {sector.code}
                  </span>{" "}
                  — {sector.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-[#002A64] lg:text-base">
                  Khám phá thêm
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
