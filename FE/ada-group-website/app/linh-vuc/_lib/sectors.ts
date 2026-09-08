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
    imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/y-te.jpg",
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
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/y-te.jpg",
          paragraph:
            "Sử dụng AI phân tích hình ảnh và dữ liệu y khoa để mang lại kết quả chẩn đoán tham khảo chuẩn xác và nhanh chóng nhất cho các y bác sĩ.",
          checklist: [
            "Hỗ trợ đọc và phân tích ảnh X-Quang, MRI, CT",
            "Tự động cảnh báo các vùng tổn thương bất thường",
            "Đồng bộ hóa dữ liệu y tế trên nền tảng đám mây an toàn",
          ],
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
    imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/nong-nghiep.jpg",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "nâng cao năng suất và chất lượng nông sản",
      quoteAfter: ", giúp bà con nông dân bắt kịp xu hướng nông nghiệp thông minh toàn cầu...",
      paragraph: "Công nghệ của chúng tôi đóng vai trò như một người kỹ sư nông nghiệp 24/7, luôn đồng hành và hỗ trợ người nông dân trên mọi cánh đồng.",
      stats: [
        {
          icon: "leaf",
          value: "30%",
          label: "sản lượng nông sản được tối ưu hóa nhờ giám sát tự động.",
        },
        {
          icon: "chart",
          value: "100%",
          label: "quy trình sản xuất được truy xuất nguồn gốc minh bạch.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/nong-nghiep.jpg",
          paragraph: "Chúng tôi mang công nghệ AI và IoT đến gần hơn với người nông dân, thông qua giao diện đơn giản và trực quan nhất.",
          checklist: [
            "Phát hiện sâu bệnh và cảnh báo sớm qua camera thông minh",
            "Điều khiển tưới tiêu và bón phân tự động",
            "Truy xuất nguồn gốc bằng công nghệ Blockchain",
          ],
        },
      ],
    },
  },
  {
    eyebrow: "LEGAL & AI LAW",
    title: "Luật & Pháp lý",
    code: "ADALAW",
    description:
      "Mạng xã hội luật đầu tiên ứng dụng AI để hỗ trợ tra cứu văn bản, phân tích án lệ và kết nối luật sư với người dùng một cách hiệu quả.",
    content:
      "ADA Group phát triển lĩnh vực pháp lý với sản phẩm ADALAW - mạng xã hội luật ứng dụng AI hỗ trợ tra cứu văn bản, phân tích án lệ và kết nối luật sư với người dùng.",
    imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/luat-phap-ly.jpg",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "dân chủ hóa kiến thức pháp luật",
      quoteAfter: ", để mỗi người dân và doanh nghiệp đều có thể dễ dàng bảo vệ quyền lợi hợp pháp của mình.",
      paragraph: "Với nền tảng ADALAW, chúng tôi biến những văn bản luật khô khan, phức tạp thành những tư vấn dễ hiểu và thiết thực.",
      stats: [
        {
          icon: "scale",
          value: "90%",
          label: "thời gian tra cứu luật được rút ngắn nhờ AI.",
        },
        {
          icon: "people",
          value: "24/7",
          label: "hỗ trợ pháp lý mọi lúc mọi nơi.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/luat-phap-ly.jpg",
          paragraph: "ADALAW kết hợp kho dữ liệu pháp luật đồ sộ của Việt Nam cùng mô hình LLM chuyên biệt để đưa ra những phân tích pháp lý chuẩn xác.",
          checklist: [
            "Tra cứu và tóm tắt văn bản luật tự động",
            "Soạn thảo hợp đồng và rà soát điều khoản pháp lý",
            "Kết nối luật sư chuyên môn cao với khách hàng",
          ],
        },
      ],
    },
  },
  {
    eyebrow: "E-COMMERCE",
    title: "Thương mại điện tử",
    code: "ADATIK, ADAWORLD, ADAMART",
    description:
      "Hệ sinh thái TMĐT thế hệ mới, tích hợp AI Livestream cá nhân hóa và giải pháp thanh toán thông minh cho thị trường xuyên biên giới.",
    content:
      "ADA Group xây dựng hệ sinh thái thương mại điện tử với các sản phẩm ADATIK, ADAWORLD, ADAMART - tích hợp AI Livestream cá nhân hóa và thanh toán thông minh cho thị trường xuyên biên giới.",
    imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/thuong-mai-dien-tu.jpg",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "tối ưu hóa trải nghiệm mua sắm",
      quoteAfter: ", biến mỗi lượt truy cập thành một hành trình khám phá sản phẩm đầy thú vị.",
      paragraph: "Hệ sinh thái TMĐT của ADA Group mang tới các công cụ AI cá nhân hóa giúp doanh nghiệp tăng trưởng đột phá doanh thu.",
      stats: [
        {
          icon: "globe",
          value: "150%",
          label: "tăng tỷ lệ chuyển đổi nhờ Livestream AI.",
        },
        {
          icon: "chart",
          value: "Top 1",
          label: "xu hướng mua sắm qua nội dung video và livestream.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/thuong-mai-dien-tu.jpg",
          paragraph: "Chúng tôi thay đổi cách người tiêu dùng tương tác với sản phẩm bằng các AI Livestreamer hoạt động liên tục.",
          checklist: [
            "MC ảo Livestream bán hàng chuyên nghiệp 24/7",
            "Gợi ý sản phẩm siêu cá nhân hóa dựa trên hành vi",
            "Hệ thống thanh toán và logistics tích hợp xuyên biên giới",
          ],
        },
      ],
    },
  },
  {
    eyebrow: "LOGISTICS",
    title: "Logistics & Vận tải",
    code: "ADACAR",
    description:
      "Nền tảng ghép xe thông minh, tối ưu hóa lộ trình và giảm xe rỗng chạy ngược chiều trên toàn quốc, giúp tiết kiệm chi phí và bảo vệ môi trường.",
    content:
      "ADA Group đầu tư vào logistics và vận tải với sản phẩm ADACAR - nền tảng ghép xe thông minh giúp tối ưu lộ trình, giảm xe rỗng chạy ngược chiều và tiết kiệm chi phí.",
    imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/logistics-van-tai.jpg",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "xóa bỏ lãng phí trong vận tải",
      quoteAfter: ", mang lại lợi ích kép cho cả chủ hàng, chủ xe và môi trường sống.",
      paragraph: "ADACAR tự hào là giải pháp đi đầu trong việc số hóa ngành vận tải, giúp hàng hóa lưu thông nhanh chóng và hiệu quả hơn bao giờ hết.",
      stats: [
        {
          icon: "truck",
          value: "40%",
          label: "giảm chi phí vận tải nhờ ghép chuyến thông minh.",
        },
        {
          icon: "leaf",
          value: "Hàng tấn",
          label: "khí thải CO2 được cắt giảm mỗi năm.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/logistics-van-tai.jpg",
          paragraph: "Sử dụng thuật toán tối ưu hóa đa mục tiêu để giải bài toán định tuyến và ghép hàng theo thời gian thực.",
          checklist: [
            "Ghép xe tiện chuyến, giảm thiểu xe chạy rỗng",
            "Theo dõi lộ trình và giám sát nhiên liệu thông minh",
            "Tự động hóa thủ tục giao nhận và thanh toán",
          ],
        },
      ],
    },
  },
  {
    eyebrow: "SOCIAL",
    title: "Mạng xã hội",
    code: "ADALOVE",
    description:
      "Mạng xã hội kết nối tri thức và tình cảm, ứng dụng AI để gợi ý những mối quan hệ chất lượng, có chiều sâu và đảm bảo an toàn tuyệt đối cho người dùng.",
    content:
      "ADA Group phát triển mạng xã hội với sản phẩm ADALOVE - nền tảng ứng dụng AI để gợi ý những mối quan hệ chất lượng, có chiều sâu và đảm bảo an toàn cho người dùng.",
    imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/mang-xa-hoi.jpg",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "kết nối những tâm hồn đồng điệu",
      quoteAfter: ", xây dựng một cộng đồng trực tuyến văn minh, an toàn và chân thành.",
      paragraph: "Khác với những mạng xã hội truyền thống, ADALOVE đặt chất lượng của mối quan hệ lên hàng đầu bằng việc thấu hiểu tính cách người dùng.",
      stats: [
        {
          icon: "heart",
          value: "3x",
          label: "tăng mức độ tương tác sâu sắc giữa những người dùng.",
        },
        {
          icon: "shield",
          value: "100%",
          label: "tài khoản được xác thực và bảo mật thông tin.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/mang-xa-hoi.jpg",
          paragraph: "Chúng tôi áp dụng mô hình phân tích tính cách và hành vi để tạo ra những gợi ý kết nối phù hợp nhất.",
          checklist: [
            "Thuật toán ghép đôi dựa trên AI Matching tâm lý học",
            "Không gian tương tác ảo an toàn, chống lừa đảo",
            "Hỗ trợ xây dựng cộng đồng và nhóm sở thích chuyên sâu",
          ],
        },
      ],
    },
  },
  {
    eyebrow: "HEALTH & WELLNESS",
    title: "Sức khỏe & Lối sống",
    code: "ADAHEALTH",
    description:
      "Trợ lý AI dinh dưỡng, vận động và sàn thực phẩm sạch truy vết QR.",
    content:
      "ADA Group đồng hành cùng sức khỏe và lối sống với sản phẩm ADAHEALTH - trợ lý AI dinh dưỡng, vận động và sàn thực phẩm sạch truy vết nguồn gốc qua mã QR.",
    imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/suc-khoe-loi-song.png",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "nâng tầm chất lượng sống",
      quoteAfter: ", giúp mọi người dễ dàng duy trì lối sống lành mạnh thông qua sức mạnh của công nghệ.",
      paragraph: "Sức khỏe không chỉ là việc chữa bệnh, mà là hành trình chăm sóc mỗi ngày. ADAHEALTH mang đến giải pháp toàn diện từ bữa ăn đến giấc ngủ.",
      stats: [
        {
          icon: "heart",
          value: "1/2",
          label: "thời gian để thiết kế thực đơn phù hợp mỗi tuần.",
        },
        {
          icon: "bulb",
          value: "24/7",
          label: "theo dõi chỉ số và đưa ra cảnh báo sức khỏe.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/suc-khoe-loi-song.png",
          paragraph: "Phân tích dữ liệu cá nhân hóa để cung cấp các kế hoạch chăm sóc sức khỏe chuẩn y khoa và dễ thực hiện nhất.",
          checklist: [
            "Trợ lý ảo gợi ý thực đơn và bài tập cá nhân hóa",
            "Sàn thực phẩm sạch truy vết nguồn gốc 100%",
            "Tích hợp IoT đeo tay đo lường chỉ số sinh tồn",
          ],
        },
      ],
    },
  },
  {
    eyebrow: "SECURITY",
    title: "An ninh & Cảm biến",
    code: "ADACAMRA",
    description: "Camera xuyên tường dựa trên tín hiệu Wi-Fi.",
    content:
      "ADA Group ứng dụng AI vào an ninh và cảm biến với sản phẩm ADACAMRA - giải pháp camera xuyên tường dựa trên tín hiệu Wi-Fi.",
    imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/an-ninh-cam-bien.png",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "bảo vệ an toàn tuyệt đối",
      quoteAfter: ", nâng cao cảnh giác với các công nghệ cảm biến phi truyền thống đột phá.",
      paragraph: "ADACAMRA tạo ra bước ngoặt mới trong ngành an ninh với khả năng nhận diện vượt qua các rào cản vật lý thông thường.",
      stats: [
        {
          icon: "camera",
          value: "24/7",
          label: "giám sát an ninh trong mọi điều kiện ánh sáng.",
        },
        {
          icon: "shield",
          value: "0",
          label: "điểm mù, nhờ khả năng phân tích sóng không dây.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/an-ninh-cam-bien.png",
          paragraph: "Chúng tôi nghiên cứu các giải pháp AI xử lý tín hiệu Wi-Fi và Radio để nhận diện chuyển động mà không cần quang học.",
          checklist: [
            "Cảm biến xuyên tường phát hiện hô hấp và chuyển động",
            "Cảnh báo xâm nhập theo thời gian thực",
            "Đảm bảo quyền riêng tư không dùng hình ảnh quang học",
          ],
        },
      ],
    },
  },
  {
    eyebrow: "FINANCE",
    title: "Tài chính & Đầu tư",
    code: "ADAFIN, ADACOIN, ADASTOCK",
    description: "Bộ ba quản lý chi tiêu, crypto và chứng khoán.",
    content:
      "ADA Group phát triển bộ sản phẩm tài chính ADAFIN, ADACOIN, ADASTOCK - hỗ trợ người dùng quản lý chi tiêu, crypto và chứng khoán một cách thông minh.",
    imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/tai-chinh-dau-tu.png",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "tối đa hóa hiệu quả đầu tư",
      quoteAfter: ", mang các công cụ tài chính chuyên nghiệp đến với tất cả mọi người.",
      paragraph: "Cho dù bạn là nhà đầu tư mới hay chuyên gia, hệ sinh thái tài chính của ADA cung cấp đủ thông tin và dự báo để đưa ra quyết định sáng suốt.",
      stats: [
        {
          icon: "coin",
          value: "Top 5%",
          label: "hiệu suất đầu tư cải thiện nhờ tín hiệu AI.",
        },
        {
          icon: "chart",
          value: "Real-time",
          label: "phân tích dữ liệu thị trường và báo cáo biến động.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/tai-chinh-dau-tu.png",
          paragraph: "Sử dụng Big Data và Machine Learning để dự báo xu hướng dòng tiền và quản trị rủi ro tự động.",
          checklist: [
            "Bot AI tự động báo động xu hướng chứng khoán, crypto",
            "Ứng dụng quản lý tài chính cá nhân thông minh",
            "Giao dịch và tái cơ cấu danh mục tự động",
          ],
        },
      ],
    },
  },
  {
    eyebrow: "TRAVEL",
    title: "Du lịch & Lữ hành",
    code: "ADAGO",
    description:
      "AI tư vấn cá nhân hóa, vé máy bay tối ưu giá và dịch giọng nói thời gian thực.",
    content:
      "ADA Group ứng dụng AI vào du lịch và lữ hành với sản phẩm ADAGO - tư vấn hành trình cá nhân hóa, tìm vé máy bay tối ưu giá và dịch giọng nói thời gian thực.",
    imageUrl: "https://picsum.photos/seed/travel/1200/800",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "trải nghiệm du lịch không giới hạn",
      quoteAfter: ", xóa bỏ rào cản ngôn ngữ và tối ưu hóa mọi chuyến đi của bạn.",
      paragraph: "Với ADAGO, mọi công đoạn từ lên kế hoạch, đặt vé đến giao tiếp tại nước ngoài đều trở nên liền mạch và dễ dàng.",
      stats: [
        {
          icon: "globe",
          value: "10+",
          label: "ngôn ngữ được dịch thuật theo thời gian thực.",
        },
        {
          icon: "clock",
          value: "5 phút",
          label: "để hoàn thiện một kế hoạch du lịch chi tiết.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://picsum.photos/seed/travel/1200/800",
          paragraph: "Tích hợp công nghệ AI sinh tạo và nhận diện giọng nói để trở thành người hướng dẫn viên ảo đáng tin cậy.",
          checklist: [
            "Lên lịch trình du lịch cá nhân hóa tự động",
            "Thiết bị phiên dịch giọng nói đa ngôn ngữ siêu tốc",
            "Săn vé và đặt phòng khách sạn tối ưu chi phí",
          ],
        },
      ],
    },
  },
  {
    eyebrow: "REAL ESTATE",
    title: "Bất động sản",
    code: "ADALAND",
    description:
      "Nền tảng kết nối môi giới và khách hàng, mở rộng sang dự án & công nghiệp.",
    content:
      "ADA Group phát triển lĩnh vực bất động sản với sản phẩm ADALAND - nền tảng kết nối môi giới và khách hàng, mở rộng sang dự án và bất động sản công nghiệp.",
    imageUrl: "https://picsum.photos/seed/realestate/1200/800",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "minh bạch hóa thị trường bất động sản",
      quoteAfter: ", kết nối đúng cung cầu với thông tin chính xác và tin cậy nhất.",
      paragraph: "ADALAND giải quyết nỗi đau của ngành môi giới truyền thống bằng cách loại bỏ thông tin ảo và tối ưu quy trình giao dịch.",
      stats: [
        {
          icon: "home",
          value: "100%",
          label: "tin đăng được AI xác thực và làm sạch dữ liệu.",
        },
        {
          icon: "briefcase",
          value: "50%",
          label: "giảm thời gian tìm kiếm dự án phù hợp.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://picsum.photos/seed/realestate/1200/800",
          paragraph: "Áp dụng định giá tự động và bản đồ nhiệt thông minh để giúp nhà đầu tư thấy rõ tiềm năng của từng khu vực.",
          checklist: [
            "Môi giới ảo AI hỗ trợ tìm nhà và tư vấn pháp lý 24/7",
            "Định giá bất động sản trực tuyến bằng Big Data",
            "Phân tích xu hướng thị trường bất động sản công nghiệp",
          ],
        },
      ],
    },
  },
  {
    eyebrow: "ENTERPRISE",
    title: "Hệ sinh thái Doanh nghiệp",
    code: "ADAWORK, ADAWEB, ADASHOP",
    description: "Bộ công cụ vận hành toàn diện cho SME Việt.",
    content:
      "ADA Group xây dựng hệ sinh thái doanh nghiệp với các sản phẩm ADAWORK, ADAWEB, ADASHOP - bộ công cụ vận hành toàn diện dành cho doanh nghiệp vừa và nhỏ tại Việt Nam.",
    imageUrl: "https://picsum.photos/seed/enterprise/1200/800",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "chuyển đổi số toàn diện cho SME",
      quoteAfter: ", cung cấp vũ khí công nghệ để doanh nghiệp Việt vươn tầm cạnh tranh.",
      paragraph: "Hệ sinh thái quản trị của ADA giúp tự động hóa quy trình, tiết kiệm nguồn lực và nâng cao năng lực ra quyết định.",
      stats: [
        {
          icon: "briefcase",
          value: "30%",
          label: "chi phí vận hành được tiết giảm trong năm đầu.",
        },
        {
          icon: "chart",
          value: "10x",
          label: "hiệu suất làm việc của nhân sự với công cụ AI.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://picsum.photos/seed/enterprise/1200/800",
          paragraph: "Tích hợp sâu các mô hình LLM vào các phần mềm quản trị ERP, CRM và HRM để biến chúng thành những trợ lý kinh doanh thực thụ.",
          checklist: [
            "Hệ thống quản lý công việc và tự động hóa quy trình",
            "Trợ lý ảo hỗ trợ chăm sóc khách hàng và marketing",
            "Xây dựng website và gian hàng trực tuyến trong 5 phút",
          ],
        },
      ],
    },
  },
  {
    eyebrow: "FOUNDATION AI",
    title: "AI nền tảng",
    code: "ADA LLM & ADA VIDEO",
    description: "Mô hình ngôn ngữ và sinh video do ADA Group tự phát triển.",
    content:
      "ADA Group đầu tư vào AI nền tảng với sản phẩm ADA LLM và ADA VIDEO - mô hình ngôn ngữ và sinh video do ADA Group tự nghiên cứu và phát triển.",
    imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/ai-nen-tang.jpg",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "tự chủ công nghệ lõi",
      quoteAfter: ", tạo nền tảng vững chắc để xây dựng các giải pháp ứng dụng mang đậm bản sắc Việt Nam.",
      paragraph: "Việc tự phát triển mô hình ngôn ngữ lớn (LLM) và hệ thống sinh video giúp ADA Group chủ động hoàn toàn về dữ liệu, bảo mật và khả năng tùy biến.",
      stats: [
        {
          icon: "bulb",
          value: "100%",
          label: "làm chủ công nghệ và bảo vệ an toàn dữ liệu nội bộ.",
        },
        {
          icon: "camera",
          value: "Tiên phong",
          label: "phát triển nền tảng Video AI sinh tạo tại Việt Nam.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/ai-nen-tang.jpg",
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
    imageUrl: "https://picsum.photos/seed/education/1200/800",
    whyChoose: {
      quoteBefore: "Mục tiêu là ",
      quoteHighlight: "cá nhân hóa hành trình học tập",
      quoteAfter: ", khơi dậy niềm đam mê khám phá và phát triển tư duy sáng tạo cho trẻ em.",
      paragraph: "ADAKID không chỉ là một món đồ chơi, mà là một người bạn thông minh cùng trẻ lớn lên, học hỏi và phát triển các kỹ năng tương lai.",
      stats: [
        {
          icon: "graduationCap",
          value: "1 kèm 1",
          label: "phương pháp giáo dục tương tác riêng biệt.",
        },
        {
          icon: "people",
          value: "Hàng ngàn",
          label: "trẻ em được tiếp cận giáo dục STEM từ sớm.",
        },
      ],
    },
    approach: {
      heading: "Cách tiếp cận của ADA Group",
      blocks: [
        {
          imageUrl: "https://picsum.photos/seed/education/1200/800",
          paragraph: "Tích hợp công nghệ nhận diện giọng nói và NLP thân thiện với trẻ em để tạo ra môi trường giao tiếp tự nhiên và an toàn.",
          checklist: [
            "Robot AI hỗ trợ học ngoại ngữ và kỹ năng mềm",
            "Chương trình học linh hoạt thích ứng theo năng lực",
            "Kiểm soát an toàn và báo cáo cho phụ huynh",
          ],
        },
      ],
    },
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
