import type { Sector } from "@/app/linh-vuc/_types/sector";

function slugify(title: string) {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const RAW_SECTORS: Omit<Sector, "slug">[] = [
  {
    eyebrow: "HEALTHCARE",
    title: "Y tế",
    code: "ADAMECT",
    description:
      "Trợ lý AI chuyên biệt hỗ trợ bác sĩ trong việc đọc ảnh y khoa, phân tích chỉ số máu và chẩn đoán sớm các bệnh lý phức tạp.",
    content:
      "ADA Group đặt y tế là lĩnh vực ưu tiên hàng đầu với sản phẩm ADAMECT - hệ thống AI hỗ trợ bác sĩ đọc ảnh X-quang, MRI, xét nghiệm và chẩn đoán nhanh, chính xác hơn.",
    imageUrl: "https://picsum.photos/seed/ada-healthcare/1200/800",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight:
        "rút ngắn thời gian chẩn đoán từ vài giờ xuống vài phút",
      quoteAfter:
        ", giúp bệnh viện tuyến tỉnh tiếp cận năng lực chuyên gia tuyến trung ương...",
      paragraph:
        "Chúng tôi tin rằng AI là chìa khóa để thu hẹp khoảng cách này, mang lại cơ hội chẩn đoán chính xác và kịp thời cho hàng triệu bệnh nhân Việt Nam.",
      stats: [
        {
          icon: "people",
          value: "24 %",
          label: "bệnh viện tuyến tỉnh thiếu bác sĩ chẩn đoán hình ảnh.",
        },
        {
          icon: "clock",
          value: "2-3 giờ",
          label:
            "là thời gian trung bình để có kết quả chẩn đoán hình ảnh phức tạp.",
        },
      ],
    },
  },
  {
    eyebrow: "AGRICULTURE",
    title: "Nông nghiệp",
    code: "ADAFARM",
    description:
      "Giải pháp kết hợp Computer Vision, IoT và Blockchain giúp nông dân tối ưu hóa năng suất, giám sát dịch bệnh và minh bạch nguồn gốc nông sản.",
    content:
      "ADA Group tập trung vào nông nghiệp với sản phẩm ADAFARM - giải pháp kết hợp Computer Vision, IoT và Blockchain giúp nông dân tối ưu năng suất và minh bạch nguồn gốc nông sản.",
    imageUrl: "https://picsum.photos/seed/ada-agriculture/1200/800",
  },
  {
    eyebrow: "LEGAL & AI LAW",
    title: "Luật & Pháp lý",
    code: "ADALAW",
    description:
      "Mạng xã hội luật đầu tiên ứng dụng AI để hỗ trợ tra cứu văn bản, phân tích án lệ và kết nối luật sư với người dùng một cách hiệu quả.",
    content:
      "ADA Group phát triển lĩnh vực pháp lý với sản phẩm ADALAW - mạng xã hội luật ứng dụng AI hỗ trợ tra cứu văn bản, phân tích án lệ và kết nối luật sư với người dùng.",
    imageUrl: "https://picsum.photos/seed/ada-legal/1200/800",
  },
  {
    eyebrow: "E-COMMERCE",
    title: "Thương mại điện tử",
    code: "ADATIK, ADAWORLD, ADAMART",
    description:
      "Hệ sinh thái TMĐT thế hệ mới, tích hợp AI Livestream cá nhân hóa và giải pháp thanh toán thông minh cho thị trường xuyên biên giới.",
    content:
      "ADA Group xây dựng hệ sinh thái thương mại điện tử với các sản phẩm ADATIK, ADAWORLD, ADAMART - tích hợp AI Livestream cá nhân hóa và thanh toán thông minh cho thị trường xuyên biên giới.",
    imageUrl: "https://picsum.photos/seed/ada-ecommerce/1200/800",
  },
  {
    eyebrow: "LOGISTICS",
    title: "Logistics & Vận tải",
    code: "ADACAR",
    description:
      "Nền tảng ghép xe thông minh, tối ưu hóa lộ trình và giảm xe rỗng chạy ngược chiều trên toàn quốc, giúp tiết kiệm chi phí và bảo vệ môi trường.",
    content:
      "ADA Group đầu tư vào logistics và vận tải với sản phẩm ADACAR - nền tảng ghép xe thông minh giúp tối ưu lộ trình, giảm xe rỗng chạy ngược chiều và tiết kiệm chi phí.",
    imageUrl: "https://picsum.photos/seed/ada-logistics/1200/800",
  },
  {
    eyebrow: "SOCIAL",
    title: "Mạng xã hội",
    code: "ADALOVE",
    description:
      "Mạng xã hội kết nối tri thức và tình cảm, ứng dụng AI để gợi ý những mối quan hệ chất lượng, có chiều sâu và đảm bảo an toàn tuyệt đối cho người dùng.",
    content:
      "ADA Group phát triển mạng xã hội với sản phẩm ADALOVE - nền tảng ứng dụng AI để gợi ý những mối quan hệ chất lượng, có chiều sâu và đảm bảo an toàn cho người dùng.",
    imageUrl: "https://picsum.photos/seed/ada-social/1200/800",
  },
  {
    eyebrow: "HEALTH & WELLNESS",
    title: "Sức khỏe & Lối sống",
    code: "ADAHEALTH",
    description:
      "Trợ lý AI dinh dưỡng, vận động và sàn thực phẩm sạch truy vết QR.",
    content:
      "ADA Group đồng hành cùng sức khỏe và lối sống với sản phẩm ADAHEALTH - trợ lý AI dinh dưỡng, vận động và sàn thực phẩm sạch truy vết nguồn gốc qua mã QR.",
    imageUrl: "https://picsum.photos/seed/ada-wellness/1200/800",
  },
  {
    eyebrow: "SECURITY",
    title: "An ninh & Cảm biến",
    code: "ADACAMRA",
    description: "Camera xuyên tường dựa trên tín hiệu Wi-Fi.",
    content:
      "ADA Group ứng dụng AI vào an ninh và cảm biến với sản phẩm ADACAMRA - giải pháp camera xuyên tường dựa trên tín hiệu Wi-Fi.",
    imageUrl: "https://picsum.photos/seed/ada-security/1200/800",
  },
  {
    eyebrow: "FINANCE",
    title: "Tài chính & Đầu tư",
    code: "ADAFIN, ADACOIN, ADASTOCK",
    description: "Bộ ba quản lý chi tiêu, crypto và chứng khoán.",
    content:
      "ADA Group phát triển bộ sản phẩm tài chính ADAFIN, ADACOIN, ADASTOCK - hỗ trợ người dùng quản lý chi tiêu, crypto và chứng khoán một cách thông minh.",
    imageUrl: "https://picsum.photos/seed/ada-finance/1200/800",
  },
  {
    eyebrow: "TRAVEL",
    title: "Du lịch & Lữ hành",
    code: "ADAGO",
    description:
      "AI tư vấn cá nhân hóa, vé máy bay tối ưu giá và dịch giọng nói thời gian thực.",
    content:
      "ADA Group ứng dụng AI vào du lịch và lữ hành với sản phẩm ADAGO - tư vấn hành trình cá nhân hóa, tìm vé máy bay tối ưu giá và dịch giọng nói thời gian thực.",
    imageUrl: "https://picsum.photos/seed/ada-travel/1200/800",
  },
  {
    eyebrow: "REAL ESTATE",
    title: "Bất động sản",
    code: "ADALAND",
    description:
      "Nền tảng kết nối môi giới và khách hàng, mở rộng sang dự án & công nghiệp.",
    content:
      "ADA Group phát triển lĩnh vực bất động sản với sản phẩm ADALAND - nền tảng kết nối môi giới và khách hàng, mở rộng sang dự án và bất động sản công nghiệp.",
    imageUrl: "https://picsum.photos/seed/ada-realestate/1200/800",
  },
  {
    eyebrow: "ENTERPRISE",
    title: "Hệ sinh thái Doanh nghiệp",
    code: "ADAWORK, ADAWEB, ADASHOP",
    description: "Bộ công cụ vận hành toàn diện cho SME Việt.",
    content:
      "ADA Group xây dựng hệ sinh thái doanh nghiệp với các sản phẩm ADAWORK, ADAWEB, ADASHOP - bộ công cụ vận hành toàn diện dành cho doanh nghiệp vừa và nhỏ tại Việt Nam.",
    imageUrl: "https://picsum.photos/seed/ada-enterprise/1200/800",
  },
  {
    eyebrow: "FOUNDATION AI",
    title: "AI nền tảng",
    code: "ADA LLM & ADA VIDEO",
    description: "Mô hình ngôn ngữ và sinh video do ADA Group tự phát triển.",
    content:
      "ADA Group đầu tư vào AI nền tảng với sản phẩm ADA LLM và ADA VIDEO - mô hình ngôn ngữ và sinh video do ADA Group tự nghiên cứu và phát triển.",
    imageUrl: "https://picsum.photos/seed/ada-foundation/1200/800",
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://picsum.photos/seed/ada-llm-workflow/1200/650",
          paragraph:
            "Mô hình được huấn luyện trên dữ liệu chất lượng cao tiếng Việt, hiểu sâu ngữ cảnh và chuyên ngành như pháp lý, y tế, tài chính...",
          checklist: [
            "Đọc hiểu văn bản pháp lý, hợp đồng, công văn",
            "Trích xuất thông tin, trả lời câu hỏi chính xác",
            "Tóm tắt, phân tích & hỗ trợ ra quyết định",
          ],
        },
      ],
    },
  },
  {
    eyebrow: "EDUCATION",
    title: "Giáo dục",
    code: "ADAKID",
    description: "Robot đồ chơi tích hợp AI giáo dục cho trẻ em Việt.",
    content:
      "ADA Group ứng dụng AI vào giáo dục với sản phẩm ADAKID - robot đồ chơi tích hợp AI giáo dục, giúp trẻ em Việt Nam tiếp cận công nghệ từ sớm.",
    imageUrl: "https://picsum.photos/seed/ada-education/1200/800",
  },
];

const SECTORS: Sector[] = RAW_SECTORS.map((sector) => ({
  ...sector,
  slug: slugify(sector.title),
}));

export function getSectors(): Sector[] {
  return SECTORS;
}

export function getSectorBySlug(slug: string): Sector | undefined {
  return SECTORS.find((sector) => sector.slug === slug);
}
