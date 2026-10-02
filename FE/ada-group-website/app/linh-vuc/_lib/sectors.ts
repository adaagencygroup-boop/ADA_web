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
      "ADA Group phát triển các giải pháp AI hỗ trợ đội ngũ y tế phân tích hình ảnh và dữ liệu y khoa, góp phần rút ngắn thời gian xử lý thông tin và nâng cao hiệu quả trong quá trình đánh giá chuyên môn.",
    content:
      "ADA Group xác định Y tế là một trong những lĩnh vực trọng tâm trong chiến lược ứng dụng trí tuệ nhân tạo. Thông qua ADAMECT, chúng tôi phát triển các giải pháp AI hỗ trợ đội ngũ y tế phân tích hình ảnh và dữ liệu y khoa, góp phần rút ngắn thời gian xử lý thông tin và nâng cao hiệu quả trong quá trình đánh giá chuyên môn. Đồng thời, hệ thống hướng tới việc chuẩn hóa quy trình làm việc, hỗ trợ khai thác dữ liệu hiệu quả hơn và mở rộng khả năng tiếp cận các công cụ hỗ trợ y tế hiện đại tại nhiều cơ sở khám chữa bệnh.",
    imageUrl: "/images/linh-vuc/y-te/y-te1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "rút ngắn thời gian chẩn đoán từ vài giờ xuống còn vài phút",
      quoteAfter: ", đồng thời hỗ trợ các bệnh viện tuyến tỉnh tiếp cận hiệu quả hơn với năng lực chuyên môn từ tuyến trung ương.",
      paragraph:
        "Chúng tôi tin rằng AI có thể góp phần thu hẹp khoảng cách về năng lực chuyên môn giữa các cơ sở y tế, giúp nhiều bệnh nhân tiếp cận quá trình chẩn đoán kịp thời và hiệu quả hơn.",
      stats: [
        {
          icon: "people",
          value: "24%",
          label: "bệnh viện tuyến tỉnh đang thiếu nguồn lực chuyên môn về chẩn đoán hình ảnh.",
        },
        {
          icon: "clock",
          value: "2–3 giờ",
          label: "thời gian trung bình để xử lý và đưa ra kết quả cho một ca chẩn đoán hình ảnh phức tạp.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/y-te/y-te2.webp",
          paragraph:
            "ADA Group ứng dụng AI trong phân tích hình ảnh và dữ liệu y khoa, hỗ trợ bác sĩ rút ngắn thời gian xử lý, phát hiện sớm các dấu hiệu bất thường và nâng cao hiệu quả đánh giá chuyên môn.",
          checklist: [
            "Hỗ trợ đọc và phân tích ảnh X-quang, MRI, CT",
            "Tự động phát hiện và cảnh báo các vùng bất thường",
            "Hỗ trợ tổng hợp dữ liệu phục vụ đánh giá chuyên môn",
            "Tích hợp linh hoạt với hệ thống quản lý y tế hiện có",
            "Đồng bộ và lưu trữ dữ liệu y tế trên nền tảng đám mây an toàn",
          ],
        },
      ],
    },
    products: [
      {
        badge: "HEALTHCARE",
        title: "ADAMEC",
        description:
          "AI hỗ trợ bác sĩ đọc và phân tích hình ảnh y khoa như X-quang, CT và MRI, giúp phát hiện các dấu hiệu bất thường, hỗ trợ đánh giá chuyên môn và tối ưu quy trình xử lý dữ liệu hình ảnh.",
        features: [
          "Hỗ trợ phát hiện và khoanh vùng các dấu hiệu bất thường",
          "Phân tích dữ liệu hình ảnh X-quang, CT và MRI",
          "Tích hợp linh hoạt với hệ thống PACS/RIS",
          "Hỗ trợ tạo báo cáo và rút ngắn thời gian xử lý",
          "Quản lý, lưu trữ và đồng bộ dữ liệu y khoa tập trung",
        ],
        imageSrc: "/images/linh-vuc/y-te/y-te3.webp",
        mockup: {
          appName: "ADAMEC",
          userName: "BN. Nguyễn Văn A",
          stats: [
            { label: "XÁC SUẤT BẤT THƯỜNG", value: "92%" },
            { label: "VỊ TRÍ PHÁT HIỆN", value: "Thùy chẩm trái" },
          ],
        },
      },
    ],
  },
  {
    eyebrow: "AGRICULTURE",
    title: "Nông nghiệp",
    code: "ADAFARM",
    description:
      "ADA Group kết hợp Computer Vision, IoT và Blockchain để hỗ trợ giám sát cây trồng, tối ưu quy trình sản xuất, nâng cao năng suất và tăng tính minh bạch trong truy xuất nguồn gốc nông sản.",
    content:
      "ADA Group xác định Nông nghiệp là một trong những lĩnh vực trọng tâm trong chiến lược ứng dụng công nghệ. Thông qua ADAFARM, chúng tôi kết hợp Computer Vision, IoT và Blockchain để hỗ trợ giám sát cây trồng, tối ưu quy trình sản xuất, nâng cao năng suất và tăng tính minh bạch trong truy xuất nguồn gốc nông sản. Đồng thời, giải pháp hướng tới việc số hóa dữ liệu canh tác, tự động hóa các công việc lặp lại và hỗ trợ người nông dân đưa ra quyết định nhanh chóng, chính xác hơn dựa trên dữ liệu thực tế.",
    imageUrl: "/images/linh-vuc/nong-nghiep/nong-nghiep1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "nâng cao năng suất, cải thiện chất lượng nông sản",
      quoteAfter: " và hỗ trợ người nông dân từng bước tiếp cận mô hình nông nghiệp thông minh, hiện đại và bền vững.",
      paragraph: "Công nghệ của ADA Group đóng vai trò như một trợ lý nông nghiệp thông minh 24/7, hỗ trợ theo dõi cây trồng, phân tích dữ liệu và cung cấp thông tin cần thiết để người nông dân đưa ra quyết định nhanh chóng, chính xác và hiệu quả hơn.",
      stats: [
        {
          icon: "leaf",
          value: "30%",
          label: "khả năng tối ưu năng suất thông qua giám sát và phân tích dữ liệu theo thời gian thực.",
        },
        {
          icon: "chart",
          value: "100%",
          label: "dữ liệu trong quy trình sản xuất được số hóa, hỗ trợ truy xuất nguồn gốc minh bạch.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/nong-nghiep/nong-nghiep2.webp",
          paragraph: "ADA Group kết hợp AI, Computer Vision, IoT và Blockchain để xây dựng các giải pháp nông nghiệp thông minh, giúp người nông dân theo dõi cây trồng, tự động hóa quy trình canh tác và quản lý dữ liệu sản xuất một cách trực quan, dễ sử dụng.",
          checklist: [
            "Phát hiện sâu bệnh và cảnh báo sớm thông qua camera thông minh",
            "Theo dõi tình trạng cây trồng và các chỉ số môi trường theo thời gian thực",
            "Tự động hóa tưới tiêu và bón phân theo nhu cầu thực tế",
            "Phân tích dữ liệu hỗ trợ tối ưu năng suất và nguồn lực sản xuất",
            "Truy xuất nguồn gốc nông sản minh bạch bằng công nghệ Blockchain",
          ],
        },
      ],
    },
    products: [
      {
        badge: "SMART FARM",
        title: "ADAFARM",
        description:
          "Giải pháp nông nghiệp thông minh ứng dụng AI, Computer Vision và IoT để giám sát cây trồng, tự động hóa quy trình canh tác và hỗ trợ người nông dân đưa ra quyết định dựa trên dữ liệu.",
        features: [
          "Theo dõi độ ẩm, nhiệt độ và các chỉ số môi trường theo thời gian thực",
          "Phát hiện và cảnh báo sớm dấu hiệu sâu bệnh qua Camera AI",
          "Tự động điều khiển tưới tiêu theo điều kiện thực tế",
          "Phân tích dữ liệu hỗ trợ tối ưu năng suất và nguồn lực",
          "Truy xuất nguồn gốc nông sản minh bạch bằng Blockchain",
        ],
        imageSrc: "/images/linh-vuc/nong-nghiep/nong-nghiep3.webp",
        mockup: {
          appName: "ADAFARM",
          userName: "Nông trại Xanh",
          stats: [
            { label: "ĐỘ ẨM ĐẤT", value: "65%" },
            { label: "TÌNH TRẠNG", value: "Tốt" },
          ],
        },
      },
    ],
  },
  {
    eyebrow: "LEGAL & AI LAW",
    title: "Luật & Pháp lý",
    code: "ADALAW",
    description:
      "ADA Group xây dựng nền tảng pháp lý thông minh hỗ trợ tra cứu văn bản, phân tích án lệ, tiếp cận thông tin pháp luật và kết nối với đội ngũ luật sư thuận tiện hơn.",
    content:
      "ADA Group xác định Luật & Pháp lý là một trong những lĩnh vực giàu tiềm năng trong quá trình ứng dụng trí tuệ nhân tạo. Thông qua ADALAW, chúng tôi xây dựng nền tảng pháp lý thông minh hỗ trợ tra cứu văn bản, phân tích án lệ, tiếp cận thông tin pháp luật và kết nối với đội ngũ luật sư thuận tiện hơn. Hệ thống giúp đơn giản hóa quá trình khai thác dữ liệu pháp lý, tiết kiệm thời gian và nâng cao khả năng tiếp cận thông tin cho cá nhân, doanh nghiệp, hướng tới một hệ sinh thái pháp lý số minh bạch và hiệu quả hơn.",
    imageUrl: "/images/linh-vuc/luat/luat-phap-ly1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "đưa kiến thức pháp luật đến gần hơn với mọi cá nhân và doanh nghiệp",
      quoteAfter: ", giúp người dùng chủ động tiếp cận thông tin và bảo vệ quyền, lợi ích hợp pháp của mình.",
      paragraph: "Thông qua nền tảng ADALAW, ADA Group ứng dụng AI để đơn giản hóa quá trình tra cứu, phân tích và tiếp cận các nội dung pháp lý, biến những văn bản phức tạp thành thông tin dễ hiểu và thiết thực hơn.",
      stats: [
        {
          icon: "scale",
          value: "90%",
          label: "thời gian tra cứu và tổng hợp thông tin pháp lý có thể được rút ngắn với sự hỗ trợ của AI.",
        },
        {
          icon: "people",
          value: "24/7",
          label: "khả năng tiếp cận thông tin và hỗ trợ pháp lý mọi lúc, mọi nơi.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/luat/luat-phap-ly2.webp",
          paragraph: "ADALAW kết hợp kho dữ liệu pháp luật Việt Nam với các mô hình AI và LLM chuyên biệt nhằm hỗ trợ người dùng tra cứu, phân tích và xử lý thông tin pháp lý nhanh chóng, dễ hiểu và có hệ thống hơn.",
          checklist: [
            "Tra cứu và tóm tắt văn bản pháp luật tự động",
            "Phân tích, đối chiếu các quy định và án lệ liên quan",
            "Hỗ trợ soạn thảo hợp đồng và rà soát điều khoản pháp lý",
            "Gợi ý thông tin pháp lý phù hợp với từng nhu cầu tra cứu",
            "Kết nối người dùng với luật sư theo lĩnh vực chuyên môn",
          ],
        },
      ],
    },
    products: [
      {
        badge: "LEGAL TECH",
        title: "ADALAW",
        description:
          "Nền tảng pháp lý ứng dụng AI hỗ trợ cá nhân và doanh nghiệp tra cứu thông tin, phân tích văn bản và xử lý các nhu cầu pháp lý nhanh chóng, thuận tiện hơn.",
        features: [
          "Tóm tắt văn bản pháp luật và án lệ tự động",
          "Phân tích, đối chiếu các quy định pháp lý liên quan",
          "Hỗ trợ soạn thảo hợp đồng theo nhu cầu",
          "Rà soát điều khoản và phát hiện rủi ro pháp lý",
          "Kết nối người dùng với luật sư theo lĩnh vực chuyên môn",
        ],
        imageSrc: "/images/linh-vuc/luat/luat-phap-ly3.webp",
        mockup: {
          appName: "ADALAW",
          userName: "Luật sư Trí tuệ",
          stats: [
            { label: "MỨC ĐỘ RỦI RO", value: "Thấp" },
            { label: "VĂN BẢN KHỚP", value: "NĐ 13/2023" },
          ],
        },
      },
    ],
  },
  {
    eyebrow: "E-COMMERCE",
    title: "Thương mại điện tử",
    code: "ADATIK, ADAWORLD, ADAMART",
    description:
      "ADA Group phát triển các nền tảng mua sắm tích hợp AI, livestream và công nghệ thanh toán thông minh, hướng tới trải nghiệm cá nhân hóa và kết nối người bán với khách hàng hiệu quả hơn.",
    content:
      "ADA Group xác định Thương mại điện tử là một trong những lĩnh vực trọng tâm trong chiến lược xây dựng hệ sinh thái số. Thông qua ADATIK, ADAWORLD và ADAMART, chúng tôi phát triển các nền tảng mua sắm tích hợp AI, livestream và công nghệ thanh toán thông minh, hướng tới trải nghiệm cá nhân hóa và kết nối người bán với khách hàng hiệu quả hơn. Đồng thời, hệ sinh thái được định hướng mở rộng khả năng tiếp cận thị trường xuyên biên giới, tối ưu hoạt động kinh doanh và tạo ra trải nghiệm thương mại liền mạch trên nhiều nền tảng.",
    imageUrl: "/images/linh-vuc/thuong-mai/thuong-mai1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "tối ưu trải nghiệm mua sắm số",
      quoteAfter: ", giúp mỗi lượt truy cập trở thành một hành trình khám phá sản phẩm trực quan, cá nhân hóa và thuận tiện hơn.",
      paragraph: "Hệ sinh thái thương mại điện tử của ADA Group ứng dụng AI để phân tích hành vi người dùng, cá nhân hóa nội dung, hỗ trợ livestream và tối ưu hành trình mua sắm, qua đó giúp doanh nghiệp nâng cao hiệu quả tiếp cận và chuyển đổi khách hàng.",
      stats: [
        {
          icon: "globe",
          value: "150%",
          label: "mức tăng tỷ lệ chuyển đổi kỳ vọng khi ứng dụng Livestream AI và nội dung cá nhân hóa.",
        },
        {
          icon: "chart",
          value: "Top xu hướng",
          label: "mua sắm qua video ngắn và livestream đang trở thành một trong những hình thức tiếp cận khách hàng nổi bật trong thương mại điện tử.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/thuong-mai/thuong-mai2.webp",
          paragraph: "ADA Group ứng dụng AI, Livestream, dữ liệu hành vi và công nghệ thanh toán số để xây dựng trải nghiệm thương mại điện tử liền mạch, cá nhân hóa và có khả năng mở rộng trên nhiều thị trường.",
          checklist: [
            "AI Livestreamer hỗ trợ bán hàng và tương tác với khách hàng 24/7",
            "Cá nhân hóa nội dung và gợi ý sản phẩm dựa trên hành vi người dùng",
            "Phân tích dữ liệu hỗ trợ tối ưu hành trình và tỷ lệ chuyển đổi",
            "Tích hợp thanh toán thông minh, thuận tiện trên nhiều nền tảng",
            "Kết nối logistics và hỗ trợ vận hành thương mại xuyên biên giới",
          ],
        },
      ],
    },
    products: [
      {
        badge: "E-COMMERCE",
        title: "ADATIK",
        description:
          "Giải pháp AI Livestream hỗ trợ doanh nghiệp tự động hóa hoạt động bán hàng trên các nền tảng thương mại điện tử, với người dẫn ảo có khả năng tương tác và phản hồi khách hàng theo thời gian thực.",
        features: [
          "AI Livestreamer hoạt động liên tục 24/7",
          "Tự động tương tác và phản hồi bình luận trong phiên livestream",
          "Hỗ trợ giới thiệu sản phẩm và tư vấn theo ngữ cảnh",
          "Cá nhân hóa nội dung dựa trên hành vi người xem",
          "Hỗ trợ tối ưu tỷ lệ chuyển đổi và hiệu quả bán hàng",
        ],
        imageSrc: "/images/linh-vuc/thuong-mai/thuong-mai3.webp",
        mockup: {
          appName: "ADATIK",
          userName: "Livestreamer AI",
          stats: [
            { label: "TỶ LỆ CHUYỂN ĐỔI", value: "150%" },
            { label: "ĐƠN HÀNG / GIỜ", value: "320+" },
          ],
        },
      },
    ],
  },
  {
    eyebrow: "LOGISTICS",
    title: "Logistics & Vận tải",
    code: "ADACAR",
    description:
      "ADA Group phát triển nền tảng ghép xe thông minh giúp kết nối nhu cầu vận chuyển, tối ưu lộ trình và nâng cao hiệu suất khai thác phương tiện, giảm tỷ lệ xe chạy rỗng và tiết kiệm chi phí vận hành.",
    content:
      "ADA Group xác định Logistics & Vận tải là một trong những lĩnh vực trọng tâm trong chiến lược ứng dụng công nghệ vào vận hành chuỗi cung ứng. Thông qua ADACAR, chúng tôi phát triển nền tảng ghép xe thông minh giúp kết nối nhu cầu vận chuyển, tối ưu lộ trình và nâng cao hiệu suất khai thác phương tiện. Đồng thời, giải pháp hướng tới việc giảm tỷ lệ xe chạy rỗng, tiết kiệm chi phí vận hành và hỗ trợ doanh nghiệp quản lý hoạt động vận tải linh hoạt, hiệu quả hơn.",
    imageUrl: "/images/linh-vuc/logistics/logistics1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "giảm lãng phí trong vận tải, tối ưu năng lực khai thác phương tiện",
      quoteAfter: " và tạo ra giá trị đồng thời cho chủ hàng, chủ xe và môi trường.",
      paragraph: "Thông qua ADACAR, ADA Group ứng dụng công nghệ để số hóa quá trình kết nối vận chuyển, tối ưu lộ trình và nâng cao hiệu quả lưu thông hàng hóa, giúp hoạt động logistics trở nên linh hoạt, tiết kiệm và bền vững hơn.",
      stats: [
        {
          icon: "truck",
          value: "40%",
          label: "khả năng tối ưu chi phí vận tải nhờ ghép chuyến và khai thác phương tiện hiệu quả hơn.",
        },
        {
          icon: "leaf",
          value: "Giảm phát thải",
          label: "hạn chế quãng đường xe chạy rỗng, góp phần cắt giảm lượng CO₂ phát sinh trong quá trình vận chuyển.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/logistics/logistics2.webp",
          paragraph: "ADA Group ứng dụng AI, dữ liệu thời gian thực và thuật toán tối ưu đa mục tiêu để nâng cao hiệu quả vận hành logistics, từ ghép chuyến, định tuyến đến theo dõi phương tiện và xử lý giao nhận.",
          checklist: [
            "Ghép xe thông minh, tận dụng chiều về và giảm tỷ lệ xe chạy rỗng",
            "Tối ưu lộ trình vận chuyển theo thời gian thực",
            "Theo dõi hành trình, trạng thái phương tiện và mức tiêu hao nhiên liệu",
            "Phân tích dữ liệu hỗ trợ nâng cao hiệu suất khai thác đội xe",
            "Tự động hóa quy trình giao nhận, đối soát và thanh toán",
          ],
        },
      ],
    },
    products: [
      {
        badge: "TRANSPORT",
        title: "ADACAR",
        description:
          "Nền tảng vận tải thông minh hỗ trợ kết nối chủ hàng và chủ xe, tối ưu lộ trình, ghép chuyến hiệu quả và theo dõi hành trình theo thời gian thực nhằm giảm chi phí và nâng cao hiệu suất vận hành.",
        features: [
          "Tối ưu lộ trình vận chuyển bằng AI",
          "Ghép chuyến thông minh, hạn chế xe chạy rỗng",
          "Theo dõi hành trình và vị trí phương tiện theo thời gian thực",
          "Hỗ trợ quản lý đơn hàng, giao nhận và đối soát",
          "Tích hợp hợp đồng điện tử và thanh toán vận tải",
        ],
        imageSrc: "/images/linh-vuc/logistics/logistics3.webp",
        mockup: {
          appName: "ADACAR",
          userName: "Hệ thống Vận tải",
          stats: [
            { label: "TIẾT KIỆM CHI PHÍ", value: "40%" },
            { label: "TỈ LỆ XE RỖNG", value: "0%" },
          ],
        },
      },
    ],
  },
  {
    eyebrow: "SOCIAL",
    title: "Mạng xã hội",
    code: "ADALOVE",
    description:
      "ADA Group phát triển ADALOVE – nền tảng mạng xã hội ứng dụng công nghệ AI nhằm hỗ trợ người dùng khám phá và xây dựng những mối quan hệ phù hợp dựa trên sở thích, mối quan tâm và những điểm tương đồng.",
    content:
      "ADA Group phát triển ADALOVE – nền tảng mạng xã hội ứng dụng công nghệ AI nhằm hỗ trợ người dùng khám phá và xây dựng những mối quan hệ phù hợp. Dựa trên sở thích, mối quan tâm và những điểm tương đồng, ADALOVE mang đến trải nghiệm kết nối cá nhân hóa, giúp người dùng dễ dàng tìm thấy những cuộc trò chuyện và tương tác có ý nghĩa. Nền tảng đồng thời hướng tới việc xây dựng một môi trường kết nối an toàn, tích cực và tôn trọng trải nghiệm riêng của mỗi người.",
    imageUrl: "/images/linh-vuc/mang-xa-hoi/mang-xa-hoi1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "kết nối những tâm hồn đồng điệu, xây dựng một cộng đồng trực tuyến văn minh, an toàn và chân thành",
      quoteAfter: ", nơi mỗi người đều có thể tự tin chia sẻ và kết nối.",
      paragraph:
        "Khác với những mạng xã hội truyền thống, ADALOVE đặt chất lượng của mối quan hệ lên hàng đầu bằng việc thấu hiểu tính cách, sở thích và nhu cầu của người dùng.",
      stats: [
        {
          icon: "heart",
          value: "3x",
          label: "Tăng khả năng tạo ra những tương tác phù hợp, tự nhiên và sâu sắc hơn giữa người dùng, giúp mỗi kết nối trở nên có ý nghĩa.",
        },
        {
          icon: "shield",
          value: "100%",
          label: "Hướng tới xây dựng môi trường kết nối an toàn, văn minh và tôn trọng, đồng thời chú trọng bảo vệ thông tin và trải nghiệm riêng tư của người dùng.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/mang-xa-hoi/mang-xa-hoi2.webp",
          paragraph:
            "Chúng tôi áp dụng mô hình phân tích tính cách, sở thích và hành vi để tạo ra những gợi ý kết nối phù hợp nhất, giúp người dùng dễ dàng tìm thấy những mối quan hệ có sự đồng điệu và tương tác tự nhiên hơn.",
          checklist: [
            "Thuật toán ghép đôi dựa trên AI Matching và tâm lý học, hỗ trợ tìm kiếm những kết nối phù hợp với đặc điểm và sở thích của người dùng",
            "Phân tích tính cách và hành vi người dùng, từ đó đưa ra các đề xuất kết nối mang tính cá nhân hóa hơn",
            "Không gian tương tác an toàn, chú trọng bảo vệ người dùng và hạn chế các hành vi lừa đảo, nội dung không phù hợp",
            "Hỗ trợ xây dựng cộng đồng và nhóm sở thích chuyên sâu, giúp người dùng kết nối dựa trên những mối quan tâm chung",
            "Tạo trải nghiệm kết nối tự nhiên và có chiều sâu, hướng tới những tương tác chất lượng thay vì chỉ tập trung vào số lượng kết nối",
          ],
        },
      ],
    },
    products: [
      {
        badge: "SOCIAL NETWORK",
        title: "ADALOVE",
        description:
          "Mạng xã hội hẹn hò và kết nối tri thức ứng dụng công nghệ AI, hướng tới việc tạo ra những kết nối phù hợp, an toàn và mang lại trải nghiệm cá nhân hóa cho từng người dùng.",
        features: [
          "Phân tích MBTI và sở thích để gợi ý những đối tượng có mức độ tương đồng và phù hợp cao",
          "Xác thực eKYC nhằm hạn chế tài khoản giả, tăng độ tin cậy và an toàn cho cộng đồng người dùng",
          "AI hỗ trợ tư vấn tình cảm, cung cấp những gợi ý phù hợp dựa trên thông tin và nhu cầu của người dùng",
          "Cá nhân hóa trải nghiệm kết nối, giúp người dùng khám phá những mối quan hệ và chủ đề phù hợp với sở thích",
          "Xây dựng cộng đồng kết nối văn minh, khuyến khích tương tác tích cực, tôn trọng và tạo dựng những mối quan hệ có chiều sâu",
        ],
        imageSrc: "/images/linh-vuc/mang-xa-hoi/mang-xa-hoi3.webp",
        mockup: {
          appName: "ADALOVE",
          userName: "Thành viên Verified",
          stats: [
            { label: "MỨC ĐỘ TƯƠNG THÍCH", value: "96%" },
            { label: "XÁC THỰC eKYC", value: "100%" },
          ],
        },
      },
    ],
  },
  {
    eyebrow: "HEALTH & WELLNESS",
    title: "Sức khỏe & Lối sống",
    code: "ADAHEALTH",
    description:
      "ADA Group phát triển ADAHEALTH – nền tảng ứng dụng công nghệ AI nhằm hỗ trợ người dùng chăm sóc sức khỏe, xây dựng chế độ dinh dưỡng và duy trì lối sống lành mạnh kết hợp sàn thực phẩm sạch và truy xuất nguồn gốc qua mã QR.",
    content:
      "ADA Group phát triển ADAHEALTH – nền tảng ứng dụng công nghệ AI nhằm hỗ trợ người dùng chăm sóc sức khỏe, xây dựng chế độ dinh dưỡng và duy trì lối sống lành mạnh. Dựa trên nhu cầu, thói quen ăn uống và mức độ vận động, ADAHEALTH mang đến những gợi ý phù hợp, giúp người dùng chủ động hơn trong việc theo dõi và cải thiện sức khỏe mỗi ngày. Bên cạnh đó, nền tảng kết hợp sàn thực phẩm sạch cùng công nghệ truy xuất nguồn gốc qua mã QR, giúp người dùng dễ dàng tiếp cận thông tin sản phẩm và lựa chọn thực phẩm minh bạch, an toàn hơn.",
    imageUrl: "/images/linh-vuc/suc-khoe-loi-song/suc-khoe1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "nâng tầm chất lượng sống",
      quoteAfter: ", giúp mọi người dễ dàng duy trì lối sống lành mạnh thông qua sức mạnh của công nghệ.",
      paragraph:
        "Sức khỏe không chỉ là việc chữa bệnh, mà là hành trình chăm sóc mỗi ngày. ADAHEALTH hướng tới giải pháp toàn diện từ dinh dưỡng, vận động đến theo dõi sức khỏe, giúp mỗi người chủ động hơn trong việc xây dựng những thói quen phù hợp với bản thân.",
      stats: [
        {
          icon: "heart",
          value: "1/2",
          label: "Thời gian cần thiết để xây dựng thực đơn phù hợp mỗi tuần, dựa trên nhu cầu và thói quen của người dùng.",
        },
        {
          icon: "bulb",
          value: "24/7",
          label: "Theo dõi các chỉ số và cung cấp thông tin, cảnh báo phù hợp để người dùng chủ động quan tâm đến sức khỏe mỗi ngày.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/suc-khoe-loi-song/suc-khoe2.webp",
          paragraph:
            "ADA Group ứng dụng AI, dữ liệu và các thiết bị thông minh để phân tích nhu cầu cá nhân, từ đó cung cấp những giải pháp chăm sóc sức khỏe phù hợp, dễ theo dõi và thuận tiện trong cuộc sống hằng ngày.",
          checklist: [
            "Trợ lý AI gợi ý thực đơn và bài tập cá nhân hóa, dựa trên nhu cầu dinh dưỡng, thói quen sinh hoạt và mục tiêu sức khỏe của từng người",
            "Sàn thực phẩm sạch truy xuất nguồn gốc, cung cấp thông tin minh bạch về sản phẩm thông qua mã QR",
            "Tích hợp thiết bị IoT đeo tay, hỗ trợ theo dõi một số chỉ số sức khỏe và hoạt động thể chất theo thời gian thực",
            "Phân tích dữ liệu sức khỏe, giúp người dùng theo dõi sự thay đổi của các chỉ số và nhận diện những dấu hiệu cần quan tâm",
            "Xây dựng lối sống chủ động, kết hợp dinh dưỡng, vận động và theo dõi sức khỏe để hình thành những thói quen lành mạnh lâu dài",
          ],
        },
      ],
    },
    products: [
      {
        badge: "WELLNESS",
        title: "ADAHEALTH",
        description:
          "ADAHEALTH là trợ lý AI cá nhân hóa, hỗ trợ người dùng xây dựng chế độ dinh dưỡng và vận động phù hợp dựa trên thể trạng, mục tiêu và thói quen sinh hoạt. Nền tảng kết hợp AI, dữ liệu sức khỏe và các thiết bị thông minh để giúp người dùng chủ động theo dõi và duy trì lối sống lành mạnh mỗi ngày.",
        features: [
          "Gợi ý calo và dinh dưỡng theo mục tiêu, hỗ trợ xây dựng thực đơn phù hợp với nhu cầu và thể trạng",
          "Cá nhân hóa bài tập và vận động, giúp người dùng lựa chọn hình thức tập luyện phù hợp với mục tiêu sức khỏe",
          "Kết nối đồng hồ thông minh, hỗ trợ theo dõi nhịp tim và một số chỉ số hoạt động trong quá trình sinh hoạt, vận động",
          "Theo dõi và phân tích dữ liệu sức khỏe, giúp người dùng nhận biết sự thay đổi của các chỉ số theo thời gian",
          "Mua sắm thực phẩm hữu cơ với QR Code, hỗ trợ tra cứu thông tin và nguồn gốc sản phẩm trước khi lựa chọn",
        ],
        imageSrc: "/images/linh-vuc/suc-khoe-loi-song/suc-khoe3.webp",
        mockup: {
          appName: "ADAHEALTH",
          userName: "Trợ lý Dinh dưỡng",
          stats: [
            { label: "CHỈ SỐ SỨC KHỎE", value: "Tối ưu" },
            { label: "KẾ HOẠCH DÀNH CHO BẠN", value: "2,100 kcal/ngày" },
          ],
        },
      },
    ],
  },
  {
    eyebrow: "SECURITY",
    title: "An ninh & Cảm biến",
    code: "ADACAMRA",
    description:
      "ADA Group phát triển các giải pháp AI kết hợp cảm biến thông minh trong lĩnh vực an ninh, tiêu biểu là ADACAMRA – công nghệ sử dụng tín hiệu Wi-Fi và sóng vô tuyến để nhận diện chuyển động và giám sát không gian.",
    content:
      "ADA Group phát triển các giải pháp AI kết hợp cảm biến thông minh trong lĩnh vực an ninh, tiêu biểu là ADACAMRA – công nghệ sử dụng tín hiệu Wi-Fi và sóng vô tuyến để nhận diện chuyển động, hỗ trợ giám sát không gian mà không phụ thuộc hoàn toàn vào hình ảnh quang học. Giải pháp hướng tới nâng cao khả năng phát hiện xâm nhập, theo dõi các dấu hiệu bất thường và bảo vệ an toàn trong nhiều điều kiện môi trường khác nhau.",
    imageUrl: "/images/linh-vuc/an-ninh-cam-bien/an-ninh1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "xây dựng những giải pháp an ninh thông minh, chủ động và tôn trọng quyền riêng tư",
      quoteAfter: " thông qua việc ứng dụng AI cùng các công nghệ cảm biến phi truyền thống.",
      paragraph:
        "Thay vì chỉ dựa vào camera thông thường, ADA Group nghiên cứu cách khai thác tín hiệu không dây để nhận diện sự hiện diện, chuyển động và những thay đổi trong môi trường. Qua đó, ADACAMRA hướng tới một phương thức giám sát linh hoạt hơn, đặc biệt trong những không gian mà camera quang học bị hạn chế.",
      stats: [
        {
          icon: "camera",
          value: "24/7",
          label: "Giám sát an ninh liên tục 24/7, hỗ trợ phát hiện chuyển động và các dấu hiệu bất thường trong nhiều điều kiện ánh sáng.",
        },
        {
          icon: "shield",
          value: "0",
          label: "Hạn chế điểm mù nhờ khả năng phân tích tín hiệu không dây, hỗ trợ nhận diện chuyển động ngay cả khi camera bị hạn chế.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/an-ninh-cam-bien/an-ninh2.webp",
          paragraph:
            "ADA Group tập trung nghiên cứu AI, tín hiệu Wi-Fi và công nghệ cảm biến để xây dựng các giải pháp có khả năng nhận diện chuyển động và những thay đổi trong không gian. Cách tiếp cận này kết hợp giữa khả năng xử lý dữ liệu của AI và cảm biến không dây, hướng tới an ninh chủ động, chính xác và hạn chế tác động đến quyền riêng tư.",
          checklist: [
            "Phát hiện chuyển động và dấu hiệu sinh tồn thông qua tín hiệu cảm biến không dây",
            "Cảnh báo xâm nhập theo thời gian thực, hỗ trợ người dùng phản ứng nhanh trước các tình huống bất thường",
            "Hoạt động trong điều kiện thiếu sáng, giảm phụ thuộc vào camera quang học",
            "Tôn trọng quyền riêng tư, hạn chế việc thu thập hình ảnh trực tiếp",
            "Phân tích dữ liệu bằng AI, hỗ trợ nhận diện và theo dõi các thay đổi trong môi trường",
          ],
        },
      ],
    },
    products: [
      {
        badge: "SMART SECURITY",
        title: "ADACAMRA",
        description:
          "ADACAMRA là giải pháp cảm biến thông minh ứng dụng AI và tín hiệu Wi-Fi, hướng tới khả năng phát hiện sự hiện diện, chuyển động và các dấu hiệu bất thường trong không gian mà không cần phụ thuộc hoàn toàn vào hình ảnh camera. Sản phẩm được định hướng cho các ứng dụng an ninh gia đình, không gian riêng tư và giám sát thông minh.",
        features: [
          "Phát hiện chuyển động và dấu hiệu hô hấp thông qua tín hiệu Wi-Fi",
          "Cảnh báo xâm nhập theo thời gian thực đến thiết bị của người dùng",
          "Hỗ trợ nhận diện trong điều kiện thiếu sáng hoặc không thuận lợi cho camera",
          "Hạn chế thu thập hình ảnh, tăng cường bảo vệ quyền riêng tư",
          "AI phân tích tín hiệu cảm biến, hỗ trợ giám sát và phát hiện bất thường thông minh",
        ],
        imageSrc: "/images/linh-vuc/an-ninh-cam-bien/an-ninh3.webp",
        mockup: {
          appName: "ADACAMRA",
          userName: "Trạm Cảm biến Wi-Fi",
          stats: [
            { label: "BÁN KÍNH PHÁT HIỆN", value: "15m Xuyên tường" },
            { label: "BẢO MẬT RIÊNG TƯ", value: "100%" },
          ],
        },
      },
    ],
  },
  {
    eyebrow: "FINANCE",
    title: "Tài chính & Đầu tư",
    code: "ADAFIN, ADACOIN, ADASTOCK",
    description:
      "ADA Group phát triển hệ sinh thái tài chính ADAFIN, ADACOIN và ADASTOCK, ứng dụng AI và dữ liệu để hỗ trợ người dùng quản lý tài chính cá nhân, theo dõi crypto và phân tích chứng khoán.",
    content:
      "ADA Group phát triển hệ sinh thái tài chính ADAFIN, ADACOIN và ADASTOCK, ứng dụng AI và dữ liệu để hỗ trợ người dùng quản lý tài chính cá nhân, theo dõi thị trường crypto và phân tích chứng khoán. Các sản phẩm hướng tới việc đơn giản hóa những thông tin tài chính phức tạp, giúp người dùng dễ dàng theo dõi dòng tiền, đánh giá rủi ro và đưa ra quyết định phù hợp với mục tiêu của mình.",
    imageUrl: "/images/linh-vuc/tai-chinh-dau-tu/tai-chinh1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "đưa công nghệ tài chính thông minh đến gần hơn với mọi người",
      quoteAfter: ", giúp việc quản lý tài sản và tiếp cận thông tin đầu tư trở nên thuận tiện, minh bạch và dễ hiểu hơn.",
      paragraph:
        "ADA Group tập trung kết hợp AI, Big Data và Machine Learning để phân tích dữ liệu tài chính, nhận diện xu hướng và cung cấp thông tin hỗ trợ người dùng trong quá trình quản lý tài chính. Từ người mới bắt đầu đến những nhà đầu tư có kinh nghiệm, hệ sinh thái ADA hướng tới việc cung cấp các công cụ phù hợp với từng nhu cầu sử dụng.",
      stats: [
        {
          icon: "coin",
          value: "Top 5%",
          label: "Hiệu suất đầu tư có thể được cải thiện nhờ các tín hiệu và phân tích được hỗ trợ bởi công nghệ AI.",
        },
        {
          icon: "chart",
          value: "Real-time",
          label: "Phân tích dữ liệu thị trường theo thời gian thực, đồng thời cung cấp các báo cáo và cảnh báo về những biến động đáng chú ý.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/tai-chinh-dau-tu/tai-chinh2.webp",
          paragraph:
            "ADA Group ứng dụng AI, Big Data và Machine Learning để phân tích dữ liệu thị trường, dòng tiền và hành vi tài chính. Các mô hình phân tích được sử dụng nhằm cung cấp thông tin, cảnh báo và công cụ quản lý phù hợp, giúp người dùng chủ động hơn trong việc theo dõi tài sản và xây dựng chiến lược tài chính.",
          checklist: [
            "AI phân tích xu hướng chứng khoán và crypto, hỗ trợ nhận diện những biến động đáng chú ý",
            "Quản lý tài chính cá nhân thông minh, theo dõi thu chi và dòng tiền",
            "Phân tích và quản lý danh mục đầu tư, hỗ trợ người dùng theo dõi hiệu suất tài sản",
            "Cảnh báo biến động và rủi ro theo thời gian thực, giúp người dùng cập nhật thông tin kịp thời",
            "Báo cáo dữ liệu và phân tích thị trường, cung cấp góc nhìn tổng quan về các yếu tố có thể ảnh hưởng đến thị trường",
          ],
        },
      ],
    },
    products: [
      {
        badge: "FINTECH",
        title: "ADASTOCK",
        description:
          "ADASTOCK là trợ lý AI hỗ trợ phân tích thị trường chứng khoán, kết hợp dữ liệu giá, biểu đồ kỹ thuật và thông tin thị trường để giúp người dùng theo dõi biến động, đánh giá cơ hội và quản lý danh mục đầu tư một cách thuận tiện hơn.",
        features: [
          "AI phân tích biểu đồ kỹ thuật và nhận diện các tín hiệu đáng chú ý",
          "Cảnh báo dòng tiền thông minh (Smart Money) dựa trên dữ liệu thị trường",
          "Quản lý và theo dõi danh mục đầu tư trên một nền tảng tập trung",
          "Cập nhật tin tức và biến động thị trường theo thời gian thực",
          "Báo cáo phân tích thị trường và kinh tế vĩ mô giúp người dùng có thêm thông tin tham khảo khi ra quyết định",
        ],
        imageSrc: "/images/linh-vuc/tai-chinh-dau-tu/tai-chinh3.webp",
        mockup: {
          appName: "ADASTOCK",
          userName: "Nhà đầu tư F0",
          stats: [
            { label: "TÍN HIỆU VNINDEX", value: "Tích cực" },
            { label: "DÒNG TIỀN VÀO", value: "+450 Tỷ" },
          ],
        },
      },
    ],
  },
  {
    eyebrow: "TRAVEL",
    title: "Du lịch & Lữ hành",
    code: "ADAGO",
    description:
      "ADA Group phát triển ADAGO – nền tảng du lịch ứng dụng AI nhằm hỗ trợ người dùng lên kế hoạch, tìm kiếm vé máy bay, khách sạn và dịch giọng nói thời gian thực cá nhân hóa.",
    content:
      "ADA Group phát triển ADAGO – nền tảng du lịch ứng dụng AI nhằm hỗ trợ người dùng lên kế hoạch, tìm kiếm và trải nghiệm chuyến đi theo cách thuận tiện và cá nhân hóa hơn. Dựa trên ngân sách, sở thích và nhu cầu của từng người, ADAGO có thể đề xuất lịch trình phù hợp, hỗ trợ tìm kiếm vé máy bay, khách sạn và cung cấp công cụ dịch giọng nói để giúp việc giao tiếp khi du lịch trở nên dễ dàng hơn.",
    imageUrl: "/images/linh-vuc/du-lich-lu-hanh/du-lich1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "tạo ra trải nghiệm du lịch thuận tiện và linh hoạt hơn",
      quoteAfter: ", giảm bớt những rào cản về ngôn ngữ, thời gian và quá trình chuẩn bị cho mỗi chuyến đi.",
      paragraph:
        "Với ADAGO, người dùng có thể kết hợp nhiều nhu cầu trong một nền tảng, từ xây dựng lịch trình, tìm kiếm phương tiện và nơi lưu trú đến hỗ trợ giao tiếp tại điểm đến. AI giúp phân tích thông tin và sở thích để đưa ra những gợi ý phù hợp với từng hành trình.",
      stats: [
        {
          icon: "globe",
          value: "10+ ngôn ngữ",
          label: "Hỗ trợ dịch và giao tiếp bằng nhiều ngôn ngữ theo thời gian thực, giúp người dùng thuận tiện hơn khi di chuyển và tương tác ở nước ngoài.",
        },
        {
          icon: "clock",
          value: "5 phút",
          label: "Xây dựng một kế hoạch du lịch chi tiết trong thời gian ngắn, dựa trên ngân sách, sở thích và thời gian của người dùng.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/du-lich-lu-hanh/du-lich2.webp",
          paragraph:
            "ADA Group kết hợp AI tạo sinh, dữ liệu du lịch và công nghệ nhận diện giọng nói để xây dựng một trợ lý du lịch thông minh. Hệ thống có khả năng phân tích nhu cầu của người dùng, đề xuất lịch trình và hỗ trợ xử lý các nhu cầu trong suốt hành trình, từ chuẩn bị chuyến đi đến trải nghiệm tại điểm đến.",
          checklist: [
            "Lên lịch trình du lịch cá nhân hóa, dựa trên thời gian, ngân sách và sở thích",
            "Phiên dịch giọng nói đa ngôn ngữ theo thời gian thực, hỗ trợ giao tiếp khi đi du lịch",
            "Tìm kiếm vé máy bay và phòng khách sạn, hỗ trợ so sánh và lựa chọn phù hợp",
            "Gợi ý địa điểm ăn uống, vui chơi và tham quan dựa trên vị trí và sở thích",
            "Cập nhật thông tin hành trình, giúp người dùng dễ dàng theo dõi và điều chỉnh kế hoạch",
          ],
        },
      ],
    },
    products: [
      {
        badge: "SMART TRAVEL",
        title: "ADAGO",
        description:
          "ADAGO là trợ lý du lịch ứng dụng AI, hỗ trợ tự động xây dựng lịch trình cá nhân hóa dựa trên ngân sách, thời gian và sở thích của người dùng. Nền tảng kết hợp các công cụ lập kế hoạch, tìm kiếm dịch vụ và hỗ trợ giao tiếp, giúp người dùng chủ động hơn trong từng chuyến đi.",
        features: [
          "Săn vé máy bay và tìm kiếm lựa chọn phù hợp bằng AI",
          "Phiên dịch giọng nói theo thời gian thực với nhiều ngôn ngữ",
          "Tự động xây dựng lịch trình theo ngân sách và sở thích",
          "Gợi ý nhà hàng, khách sạn và địa điểm tham quan gần người dùng",
          "Cá nhân hóa trải nghiệm du lịch dựa trên nhu cầu và hành vi của từng người",
        ],
        imageSrc: "/images/linh-vuc/du-lich-lu-hanh/du-lich3.webp",
        mockup: {
          appName: "ADAGO",
          userName: "Hướng dẫn viên AI",
          stats: [
            { label: "TIẾT KIỆM VÉ MÁY BAY", value: "-35%" },
            { label: "PHIÊN DỊCH TRỰC TIẾP", value: "10+ Ngôn ngữ" },
          ],
        },
      },
    ],
  },
  {
    eyebrow: "REAL ESTATE",
    title: "Bất động sản",
    code: "ADALAND",
    description:
      "ADA Group phát triển các giải pháp công nghệ chuyên biệt cho lĩnh vực bất động sản, hướng tới xây dựng nền tảng kết nối hiệu quả giữa chủ đầu tư, doanh nghiệp, môi giới và khách hàng.",
    content:
      "ADA Group phát triển các giải pháp công nghệ chuyên biệt cho lĩnh vực bất động sản, hướng tới xây dựng nền tảng kết nối hiệu quả giữa chủ đầu tư, doanh nghiệp, môi giới và khách hàng. Thông qua việc ứng dụng công nghệ vào quản lý, khai thác và phân phối thông tin bất động sản, ADA Group mong muốn góp phần nâng cao trải nghiệm người dùng, tối ưu quy trình vận hành và tạo ra những giá trị bền vững cho các bên tham gia thị trường.",
    imageUrl: "/images/linh-vuc/bat-dong-san/bat-dong-san1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "xây dựng nền tảng bất động sản minh bạch",
      quoteAfter: ", ứng dụng công nghệ để chuẩn hóa thông tin, kết nối đúng nhu cầu và nâng cao hiệu quả giao dịch.",
      paragraph:
        "ADALAND tập trung giải quyết những hạn chế trong hoạt động môi giới truyền thống thông qua việc quản lý và xác thực dữ liệu, giảm thông tin thiếu chính xác, đồng thời hỗ trợ môi giới và khách hàng tìm kiếm, kết nối và xử lý giao dịch thuận tiện hơn.",
      stats: [
        {
          icon: "home",
          value: "100%",
          label: "Thông tin bất động sản được AI hỗ trợ kiểm tra, xác thực và chuẩn hóa dữ liệu, góp phần nâng cao độ chính xác và độ tin cậy của nguồn thông tin trên nền tảng.",
        },
        {
          icon: "briefcase",
          value: "50%",
          label: "Tối ưu thời gian tìm kiếm và kết nối sản phẩm phù hợp, giúp môi giới và khách hàng tiếp cận nhu cầu bất động sản nhanh chóng và thuận tiện hơn.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/bat-dong-san/bat-dong-san2.webp",
          paragraph:
            "ADA Group ứng dụng Big Data và AI để chuẩn hóa dữ liệu, phân tích xu hướng và trực quan hóa thị trường bất động sản, mang lại công cụ hỗ trợ toàn diện cho các bên tham gia giao dịch.",
          checklist: [
            "Định giá bất động sản tự động: Ứng dụng Big Data và AI để phân tích các yếu tố thị trường, hỗ trợ đưa ra mức định giá tham khảo nhanh chóng",
            "Bản đồ nhiệt thị trường: Trực quan hóa giá, nhu cầu và biến động theo khu vực, hỗ trợ nhận diện các thị trường tiềm năng",
            "Môi giới ảo AI 24/7: Hỗ trợ tìm kiếm bất động sản, giải đáp thông tin và cung cấp tư vấn tham khảo về thị trường, thủ tục",
            "Kết nối bất động sản thông minh: Phân tích nhu cầu và dữ liệu sản phẩm để kết nối người mua, chủ nhà và môi giới phù hợp",
            "Phân tích xu hướng thị trường: Tổng hợp dữ liệu và biến động theo khu vực, hỗ trợ theo dõi xu hướng và tiềm năng phát triển của thị trường",
          ],
        },
      ],
    },
    products: [
      {
        badge: "PROP-TECH",
        title: "ADALAND",
        description:
          "Công cụ định giá bất động sản ứng dụng Big Data và AI, kết hợp dữ liệu thị trường và công nghệ phân tích để hỗ trợ người dùng đánh giá giá trị, tìm kiếm và kết nối bất động sản phù hợp.",
        features: [
          "Bản đồ nhiệt giá bất động sản: Trực quan hóa giá và biến động thị trường theo từng khu vực, hỗ trợ nhận diện khu vực tiềm năng",
          "Định giá bất động sản bằng Big Data và AI: Phân tích dữ liệu về vị trí, diện tích, giá và thị trường để đưa ra mức định giá tham khảo",
          "Xác minh tin đăng tự động: Phát hiện tin trùng lặp, thiếu thông tin hoặc bất thường, góp phần nâng cao chất lượng dữ liệu",
          "Trợ lý AI phân tích hợp đồng: Hỗ trợ đọc, tổng hợp và làm rõ các nội dung, điều khoản quan trọng trong hợp đồng",
          "Kết nối chủ nhà, môi giới và khách hàng: Hỗ trợ tìm kiếm và kết nối nhu cầu phù hợp, góp phần nâng cao hiệu quả giao dịch",
        ],
        imageSrc: "/images/linh-vuc/bat-dong-san/bat-dong-san3.webp",
        mockup: {
          appName: "ADALAND",
          userName: "Chuyên viên Môi giới AI",
          stats: [
            { label: "XÁC THỰC TIN ĐĂNG", value: "100% Sạch" },
            { label: "BIẾN ĐỘNG GIÁ", value: "+12%/Năm" },
          ],
        },
      },
    ],
  },
  {
    eyebrow: "ENTERPRISE",
    title: "Hệ sinh thái Doanh nghiệp",
    code: "ADAWORK, ADAWEB, ADASHOP",
    description:
      "ADA Group phát triển hệ sinh thái công nghệ dành cho doanh nghiệp với ADAWORK, ADAWEB và ADASHOP, hỗ trợ quản lý, vận hành và thúc đẩy chuyển đổi số cho SME Việt.",
    content:
      "ADA Group phát triển hệ sinh thái công nghệ dành cho doanh nghiệp với các sản phẩm ADAWORK, ADAWEB và ADASHOP, cung cấp các giải pháp hỗ trợ quản lý, vận hành, xây dựng hiện diện số và phát triển hoạt động kinh doanh. Hệ sinh thái được định hướng phục vụ doanh nghiệp vừa và nhỏ tại Việt Nam, giúp tối ưu quy trình, nâng cao hiệu quả vận hành và từng bước thúc đẩy quá trình chuyển đổi số trong doanh nghiệp.",
    imageUrl: "/images/linh-vuc/he-sinh-thai-doanh-nghiep/he-sinh-thai1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "xây dựng hệ sinh thái công nghệ hỗ trợ doanh nghiệp vừa và nhỏ từng bước chuyển đổi số",
      quoteAfter: ", tối ưu vận hành và nâng cao năng lực cạnh tranh trong môi trường kinh doanh ngày càng số hóa.",
      paragraph:
        "Hệ sinh thái ADA được phát triển với các giải pháp hỗ trợ quản lý, vận hành, bán hàng, xây dựng hiện diện số và khai thác dữ liệu. Việc kết hợp tự động hóa và AI giúp doanh nghiệp giảm bớt các công việc thủ công, tối ưu nguồn lực và có thêm dữ liệu để hỗ trợ quá trình ra quyết định.",
      stats: [
        {
          icon: "briefcase",
          value: "30%",
          label: "Mục tiêu tối ưu chi phí vận hành thông qua tự động hóa quy trình và số hóa các hoạt động quản lý, hướng tới sử dụng nguồn lực hiệu quả hơn.",
        },
        {
          icon: "chart",
          value: "10x",
          label: "Hướng tới nâng cao năng suất làm việc của nhân sự thông qua việc ứng dụng AI và các công cụ công nghệ vào những công việc thường xuyên, lặp lại và cần xử lý dữ liệu.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/he-sinh-thai-doanh-nghiep/he-sinh-thai2.webp",
          paragraph:
            "Tích hợp sâu các mô hình LLM vào hệ sinh thái phần mềm quản trị, giúp doanh nghiệp tự động hóa công việc, khai thác dữ liệu và nâng cao hiệu quả vận hành.",
          checklist: [
            "Quản lý công việc và tự động hóa quy trình: Quản lý tập trung, tự động hóa các bước xử lý và theo dõi tiến độ giữa các phòng ban",
            "Trợ lý AI cho Chăm sóc khách hàng và Marketing: Hỗ trợ trả lời khách hàng, tổng hợp thông tin và tạo nội dung nhanh chóng",
            "Khởi tạo website và gian hàng trực tuyến: Hỗ trợ doanh nghiệp xây dựng website, giới thiệu sản phẩm và triển khai gian hàng nhanh chóng",
            "Phân tích dữ liệu và hỗ trợ ra quyết định: Tổng hợp dữ liệu kinh doanh, cung cấp thông tin trực quan để hỗ trợ quản lý và ra quyết định",
            "Quản lý khách hàng và bán hàng tập trung: Lưu trữ thông tin, theo dõi cơ hội bán hàng và quản lý lịch sử tương tác trên một nền tảng",
          ],
        },
      ],
    },
    products: [
      {
        badge: "SAAS",
        title: "ADAWORK",
        description:
          "Mô hình ngôn ngữ lớn được phát triển theo định hướng phục vụ doanh nghiệp Việt Nam, tập trung vào khả năng xử lý tiếng Việt, bảo mật dữ liệu và triển khai linh hoạt trong môi trường doanh nghiệp. ADA LLM hướng tới giúp doanh nghiệp chủ động hơn trong việc khai thác AI mà không phải phụ thuộc hoàn toàn vào các nền tảng hoặc API bên ngoài.",
        features: [
          "Huấn luyện chuyên sâu trên dữ liệu tiếng Việt: Tối ưu khả năng hiểu ngôn ngữ, văn phong và nghiệp vụ phù hợp với doanh nghiệp Việt Nam",
          "Phản hồi nhanh, chủ động về hạ tầng AI: Xử lý trực tiếp trên hệ thống, giảm phụ thuộc vào API bên ngoài",
          "Triển khai cục bộ tại máy chủ doanh nghiệp: Hỗ trợ kiểm soát dữ liệu, phân quyền và đáp ứng yêu cầu bảo mật",
          "Tùy biến theo dữ liệu và nghiệp vụ: Điều chỉnh giải pháp theo lĩnh vực, dữ liệu và nhu cầu sử dụng của từng doanh nghiệp",
          "Bảo mật và kiểm soát dữ liệu: Quản lý dữ liệu trong hạ tầng riêng, hạn chế đưa thông tin nội bộ ra nền tảng bên ngoài",
        ],
        imageSrc: "/images/linh-vuc/he-sinh-thai-doanh-nghiep/he-sinh-thai3.webp",
        mockup: {
          appName: "ADAWORK",
          userName: "Quản trị viên SME",
          stats: [
            { label: "HIỆU SUẤT CÔNG VIỆC", value: "95%" },
            { label: "TIẾT GIẢM CHI PHÍ", value: "30%" },
          ],
        },
      },
    ],
  },
  {
    eyebrow: "FOUNDATION AI",
    title: "AI nền tảng",
    code: "ADA LLM & ADA VIDEO",
    description:
      "ADA Group tập trung nghiên cứu và phát triển các giải pháp AI nền tảng với các sản phẩm ADA LLM và ADA VIDEO, hướng tới làm chủ công nghệ mô hình ngôn ngữ và công nghệ sinh video.",
    content:
      "ADA Group tập trung nghiên cứu và phát triển các giải pháp AI nền tảng với các sản phẩm ADA LLM và ADA VIDEO, hướng tới làm chủ công nghệ trong lĩnh vực mô hình ngôn ngữ và công nghệ sinh video. Thông qua việc đầu tư vào nghiên cứu, phát triển và ứng dụng AI, ADA Group từng bước xây dựng năng lực công nghệ lõi, tạo nền tảng cho việc phát triển các sản phẩm và giải pháp AI phù hợp với nhu cầu thực tế của doanh nghiệp và thị trường.",
    imageUrl: "/images/linh-vuc/ai-nen-tang/ai-nen-tang1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "xây dựng năng lực công nghệ lõi, chủ động hơn trong việc phát triển các sản phẩm AI",
      quoteAfter: " phù hợp với nhu cầu thực tế tại Việt Nam, kiểm soát tốt về dữ liệu, bảo mật và khả năng tùy biến.",
      paragraph:
        "Thay vì chỉ ứng dụng các nền tảng AI có sẵn, ADA Group hướng tới từng bước xây dựng năng lực nghiên cứu và phát triển riêng, tạo nền tảng để đưa AI vào nhiều sản phẩm và lĩnh vực khác nhau.",
      stats: [
        {
          icon: "bulb",
          value: "100%",
          label: "Chủ động phát triển và kiểm soát công nghệ AI, đồng thời chú trọng bảo mật và an toàn dữ liệu trong quá trình nghiên cứu, phát triển và triển khai sản phẩm.",
        },
        {
          icon: "camera",
          value: "Tiên phong",
          label: "Từng bước nghiên cứu và phát triển công nghệ Video AI sinh tạo, hướng tới xây dựng các sản phẩm AI mang tính ứng dụng cao và phù hợp với thị trường Việt Nam.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/ai-nen-tang/ai-nen-tang2.webp",
          paragraph:
            "Mô hình được định hướng tối ưu cho tiếng Việt, có khả năng xử lý ngữ cảnh và hỗ trợ phân tích nội dung trong nhiều lĩnh vực chuyên môn như pháp lý, y tế, tài chính và quản trị doanh nghiệp.",
          checklist: [
            "Phân tích văn bản chuyên sâu: Hỗ trợ đọc hiểu, xác định thông tin quan trọng và làm rõ các điều khoản, quy định cần lưu ý",
            "Trích xuất thông tin tự động: Nhận diện và tổng hợp dữ liệu cần thiết từ nhiều loại tài liệu, giảm thời gian xử lý thủ công",
            "Hỏi đáp theo ngữ cảnh: Cho phép đặt câu hỏi trực tiếp dựa trên tài liệu, hỗ trợ tìm kiếm và trả lời thông tin nhanh chóng",
            "Tóm tắt và phân tích tài liệu: Tự động tổng hợp ý chính, làm nổi bật nội dung quan trọng và các thông tin cần quan tâm",
            "Hỗ trợ ra quyết định: Đối chiếu và phân tích thông tin, cung cấp góc nhìn tham khảo cho quá trình đánh giá và ra quyết định",
          ],
        },
      ],
    },
    products: [
      {
        badge: "CORE AI",
        title: "ADA LLM",
        description:
          "Mô hình ngôn ngữ lớn tiếng Việt được phát triển theo định hướng phục vụ doanh nghiệp trong nước, tập trung vào khả năng xử lý tiếng Việt, bảo mật dữ liệu và triển khai linh hoạt trên hạ tầng riêng.",
        features: [
          "Huấn luyện chuyên sâu trên dữ liệu tiếng Việt: Tối ưu khả năng hiểu ngôn ngữ, ngữ cảnh và nghiệp vụ phù hợp với nhu cầu của doanh nghiệp Việt Nam",
          "Tốc độ xử lý nhanh, chủ động về hạ tầng: Hỗ trợ xử lý trực tiếp trên hệ thống doanh nghiệp, giảm sự phụ thuộc vào API của bên thứ ba",
          "Triển khai cục bộ tại máy chủ doanh nghiệp: Cho phép vận hành mô hình trong hạ tầng riêng, hỗ trợ kiểm soát dữ liệu và quyền truy cập",
          "Tùy biến theo nhu cầu doanh nghiệp: Có thể định hướng điều chỉnh theo lĩnh vực, dữ liệu và nghiệp vụ cụ thể của từng tổ chức",
          "Bảo mật và kiểm soát dữ liệu: Giúp doanh nghiệp chủ động quản lý dữ liệu nội bộ, hạn chế việc chia sẻ thông tin với các nền tảng AI bên ngoài",
        ],
        imageSrc: "/images/linh-vuc/ai-nen-tang/ai-nen-tang3.webp",
        mockup: {
          appName: "ADA LLM",
          userName: "Mô hình Tiếng Việt",
          stats: [
            { label: "TRIỂN KHAI CỤC BỘ", value: "On-Premise" },
            { label: "TỐC ĐỘ PHẢN HỎI", value: "< 100ms" },
          ],
        },
      },
    ],
  },
  {
    eyebrow: "EDUCATION",
    title: "Giáo dục",
    code: "ADAKID",
    description:
      "ADA Group nghiên cứu và phát triển các giải pháp AI trong giáo dục, tiêu biểu với ADAKID – robot đồ chơi tích hợp AI đồng hành cùng trẻ em học hỏi và khám phá.",
    content:
      "ADA Group nghiên cứu và phát triển các giải pháp ứng dụng trí tuệ nhân tạo trong lĩnh vực giáo dục, tiêu biểu với sản phẩm ADAKID – robot đồ chơi tích hợp công nghệ AI, được định hướng như một người bạn đồng hành hỗ trợ trẻ em học hỏi, khám phá và làm quen với công nghệ từ sớm. Thông qua việc kết hợp giữa công nghệ AI, thiết bị thông minh và nội dung giáo dục, ADA Group hướng tới tạo ra những trải nghiệm học tập trực quan, sinh động và phù hợp với trẻ em Việt Nam, đồng thời góp phần đưa công nghệ trở nên gần gũi hơn trong quá trình học tập và phát triển của trẻ.",
    imageUrl: "/images/linh-vuc/giao-duc/giao-duc1.webp",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "cá nhân hóa trải nghiệm học tập",
      quoteAfter: ", khuyến khích trẻ chủ động khám phá và từng bước phát triển các kỹ năng cần thiết trong tương lai.",
      paragraph:
        "ADAKID được định hướng không chỉ là một sản phẩm đồ chơi thông minh, mà còn là người bạn đồng hành cùng trẻ trong quá trình học hỏi, tương tác và khám phá thế giới. Thông qua việc kết hợp AI, nội dung giáo dục và tương tác trực tiếp, ADA Group hướng tới tạo ra trải nghiệm học tập gần gũi, sinh động và phù hợp hơn với từng trẻ.",
      stats: [
        {
          icon: "graduationCap",
          value: "1:1",
          label: "Trải nghiệm học tập tương tác và cá nhân hóa, giúp nội dung tiếp cận phù hợp hơn với nhu cầu, độ tuổi và khả năng của từng trẻ.",
        },
        {
          icon: "people",
          value: "Hàng ngàn",
          label: "Hướng tới đưa công nghệ giáo dục và phương pháp học tập STEM đến gần hơn với trẻ em Việt Nam ngay từ những năm đầu phát triển.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "/images/linh-vuc/giao-duc/giao-duc2.webp",
          paragraph:
            "Ứng dụng công nghệ nhận diện giọng nói và xử lý ngôn ngữ tự nhiên (NLP) theo hướng thân thiện với trẻ em, tạo môi trường tương tác tự nhiên, trực quan và an toàn trong quá trình học tập.",
          checklist: [
            "Robot AI hỗ trợ học ngoại ngữ và kỹ năng mềm: Tạo môi trường tương tác qua hội thoại, giúp trẻ rèn luyện ngôn ngữ và các kỹ năng giao tiếp cơ bản",
            "Chương trình học linh hoạt theo năng lực: Điều chỉnh nội dung và mức độ học tập dựa trên độ tuổi, khả năng và quá trình tương tác của từng trẻ",
            "Tương tác bằng giọng nói tự nhiên: Hỗ trợ trẻ giao tiếp trực tiếp với robot thông qua giọng nói, giúp việc học trở nên gần gũi và sinh động hơn",
            "Nội dung học tập đa dạng và trực quan: Kết hợp trò chơi, câu chuyện, hình ảnh và hoạt động tương tác để khuyến khích trẻ chủ động khám phá",
            "Kiểm soát an toàn và báo cáo cho phụ huynh: Cung cấp thông tin về quá trình sử dụng và học tập, giúp phụ huynh thuận tiện theo dõi và đồng hành cùng trẻ",
          ],
        },
      ],
    },
    products: [
      {
        badge: "EDTECH",
        title: "ADAKID",
        description:
          "Robot giáo dục thông minh ứng dụng AI, được phát triển như một người bạn đồng hành cùng trẻ trong quá trình học tập, giao tiếp và khám phá. ADAKID kết hợp công nghệ tương tác với nội dung giáo dục, hỗ trợ trẻ phát triển ngôn ngữ, tư duy và các kỹ năng cần thiết trong giai đoạn đầu đời.",
        features: [
          "Nhận diện giọng nói tiếng Việt và tiếng Anh: Hỗ trợ trẻ giao tiếp bằng giọng nói một cách tự nhiên, thuận tiện trong quá trình học tập và tương tác",
          "Học ngoại ngữ thông qua tương tác: Tạo môi trường luyện nghe, phát âm và giao tiếp tiếng Anh thông qua các hoạt động phù hợp với trẻ",
          "Kể chuyện và tương tác thông minh: Kết hợp kể chuyện, câu hỏi và các tình huống tương tác để khuyến khích trẻ chủ động khám phá và học hỏi",
          "Nội dung học tập đa dạng: Hỗ trợ các hoạt động phát triển ngôn ngữ, tư duy, cảm xúc và kỹ năng xã hội thông qua hình thức học tập sinh động",
          "Hỗ trợ phụ huynh quản lý thời gian sử dụng: Cho phép thiết lập thời gian sử dụng phù hợp, đồng thời hỗ trợ phụ huynh theo dõi và đồng hành cùng quá trình học tập của trẻ",
        ],
        imageSrc: "/images/linh-vuc/giao-duc/giao-duc3.webp",
        mockup: {
          appName: "ADAKID",
          userName: "Robot Giáo dục AI",
          stats: [
            { label: "TƯƠNG TÁC 1-KÈM-1", value: "Anh / Việt" },
            { label: "TƯ DUY KỸ NĂNG", value: "EQ & IQ chuẩn" },
          ],
        },
      },
    ],
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
