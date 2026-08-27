import type {
  NewsArticle,
  NewsCategoryCount,
  NewsPaginationItem,
} from "@/src/types/news";

export const ALL_CATEGORY = "Tất cả";
export const PAGE_SIZE = 4;
export const NEWS_BASE_PATH = "/tin-tuc";
export const NEWS_LISTING_ANCHOR = "tin-tuc-listing";

function slugify(title: string) {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const RAW_ARTICLES: Omit<NewsArticle, "slug">[] = [
  {
    category: "Tin tức công ty",
    title:
      "ADA Group mở đợt tuyển dụng quy mô lớn, tìm kiếm nhân tài AI trên toàn quốc",
    excerpt:
      "Đồng hành cùng chiến lược phát triển hệ sinh thái AI giai đoạn 2026-2030, ADA Group mở rộng...",
    content:
      "Đồng hành cùng chiến lược phát triển hệ sinh thái AI giai đoạn 2026-2030, ADA Group mở rộng quy mô tuyển dụng trên toàn quốc, tìm kiếm những nhân tài xuất sắc trong lĩnh vực trí tuệ nhân tạo để cùng xây dựng các sản phẩm công nghệ Make in Vietnam.",
    date: "03/07/2026",
    imageUrl: "https://picsum.photos/seed/ada-news-recruit/700/500",
    featured: true,
  },
  {
    category: "Tin tức công ty",
    title:
      "ADA Group khai trương văn phòng mới tại Hà Nội, mở rộng quy mô hoạt động",
    excerpt:
      "Sáng ngày 03/07/2026, trong không khí hân hoan, ADA Group chính thức khai trương văn phòng mới...",
    content:
      "Sáng ngày 03/07/2026, trong không khí hân hoan, ADA Group chính thức khai trương văn phòng mới tại Hà Nội, đánh dấu bước mở rộng quan trọng trong chiến lược phát triển của công ty tại khu vực miền Bắc.",
    date: "03/07/2026",
    imageUrl: "https://picsum.photos/seed/ada-news-office/700/500",
    featured: true,
  },
  {
    category: "Tin tức công ty",
    title: "ADA Group đón tiếp đối tác công nghệ đến thăm quan và làm việc",
    excerpt:
      "Sáng ngày 02/07/2026, đoàn chuyên gia quốc tế đến từ Solutions Inc về giải pháp và việc chuyển giao...",
    content:
      "Sáng ngày 02/07/2026, đoàn chuyên gia quốc tế đến từ Solutions Inc đã có buổi làm việc với ADA Group để trao đổi về giải pháp công nghệ và kế hoạch chuyển giao trong thời gian tới.",
    date: "02/07/2026",
    imageUrl: "https://picsum.photos/seed/ada-news-partner/700/500",
    featured: false,
  },
  {
    category: "Công nghệ",
    title: "AI Agent – Xu hướng công nghệ đột phá trong năm 2026",
    excerpt:
      "AI Agent đang trở thành một trong những xu hướng công nghệ nổi bật nhất, giúp doanh nghiệp...",
    content:
      "AI Agent đang trở thành một trong những xu hướng công nghệ nổi bật nhất, giúp doanh nghiệp tự động hóa quy trình vận hành và ra quyết định nhanh chóng hơn dựa trên dữ liệu thời gian thực.",
    date: "28/06/2026",
    imageUrl: "https://picsum.photos/seed/ada-news-aiagent/700/500",
    featured: true,
  },
  {
    category: "Sự kiện",
    title:
      "ADA Group Innovation Day 2026: Kết nối cộng đồng công nghệ AI Việt Nam",
    excerpt:
      "Sự kiện quy tụ hơn 500 chuyên gia, doanh nghiệp và nhà đầu tư cùng thảo luận về xu hướng AI...",
    content:
      "Sự kiện quy tụ hơn 500 chuyên gia, doanh nghiệp và nhà đầu tư cùng thảo luận về xu hướng AI, mở ra nhiều cơ hội hợp tác và kết nối trong cộng đồng công nghệ Việt Nam.",
    date: "25/06/2026",
    imageUrl: "https://picsum.photos/seed/ada-news-innovationday/700/500",
    featured: false,
  },
  {
    category: "Dự án",
    title:
      "ADA Group hoàn thành triển khai hệ thống AI cho chuỗi bán lẻ toàn quốc",
    excerpt:
      "Dự án chuyển đổi số quy mô lớn giúp khách hàng tối ưu vận hành và nâng cao trải nghiệm mua sắm...",
    content:
      "Dự án chuyển đổi số quy mô lớn giúp khách hàng tối ưu vận hành và nâng cao trải nghiệm mua sắm thông qua các giải pháp AI được ADA Group triển khai trên toàn bộ hệ thống chuỗi bán lẻ.",
    date: "20/06/2026",
    imageUrl: "https://picsum.photos/seed/ada-news-retailproject/700/500",
    featured: false,
  },
  {
    category: "Tuyển dụng",
    title: "ADA Group tuyển dụng vị trí AI Engineer và Data Scientist cấp cao",
    excerpt:
      "Cơ hội gia nhập đội ngũ kỹ sư AI hàng đầu, trực tiếp xây dựng các sản phẩm ứng dụng thực tế...",
    content:
      "Cơ hội gia nhập đội ngũ kỹ sư AI hàng đầu, trực tiếp xây dựng các sản phẩm ứng dụng thực tế phục vụ hàng triệu người dùng, với môi trường làm việc chuyên nghiệp và lộ trình phát triển rõ ràng.",
    date: "18/06/2026",
    imageUrl: "https://picsum.photos/seed/ada-news-hiring/700/500",
    featured: false,
  },
  {
    category: "Tin tức công ty",
    title:
      "ADA Group ký kết hợp tác chiến lược với tập đoàn công nghệ quốc tế",
    excerpt:
      "Thỏa thuận hợp tác mở ra cơ hội chuyển giao công nghệ và mở rộng thị trường quốc tế...",
    content:
      "Thỏa thuận hợp tác mở ra cơ hội chuyển giao công nghệ và mở rộng thị trường quốc tế, đánh dấu bước tiến quan trọng trong chiến lược toàn cầu hóa của ADA Group.",
    date: "15/06/2026",
    imageUrl: "https://picsum.photos/seed/ada-news-partnership/700/500",
    featured: false,
  },
  {
    category: "Công nghệ",
    title: "Ứng dụng Computer Vision trong giám sát chất lượng sản xuất",
    excerpt:
      "Giải pháp giúp doanh nghiệp phát hiện lỗi sản phẩm theo thời gian thực, giảm chi phí kiểm định...",
    content:
      "Giải pháp giúp doanh nghiệp phát hiện lỗi sản phẩm theo thời gian thực, giảm chi phí kiểm định thủ công và nâng cao độ chính xác trong quy trình kiểm soát chất lượng sản xuất.",
    date: "12/06/2026",
    imageUrl: "https://picsum.photos/seed/ada-news-computervision/700/500",
    featured: false,
  },
  {
    category: "Sự kiện",
    title: "ADA Group tham dự hội nghị công nghệ quốc tế Tech Summit Asia",
    excerpt:
      "Đại diện ADA Group chia sẻ về hành trình xây dựng hệ sinh thái AI thuần Việt trước cộng đồng...",
    content:
      "Đại diện ADA Group chia sẻ về hành trình xây dựng hệ sinh thái AI thuần Việt trước cộng đồng công nghệ quốc tế tại sự kiện Tech Summit Asia năm nay.",
    date: "08/06/2026",
    imageUrl: "https://picsum.photos/seed/ada-news-techsummit/700/500",
    featured: false,
  },
  {
    category: "Dự án",
    title:
      "Khởi động dự án AI hỗ trợ nông dân canh tác thông minh tại Đồng bằng sông Cửu Long",
    excerpt:
      "Dự án hợp tác cùng địa phương ứng dụng AI và IoT vào canh tác, hướng tới nông nghiệp bền vững...",
    content:
      "Dự án hợp tác cùng địa phương ứng dụng AI và IoT vào canh tác, hướng tới nông nghiệp bền vững và nâng cao thu nhập cho người nông dân tại khu vực Đồng bằng sông Cửu Long.",
    date: "05/06/2026",
    imageUrl: "https://picsum.photos/seed/ada-news-agriproject/700/500",
    featured: false,
  },
];

const ARTICLES: NewsArticle[] = RAW_ARTICLES.map((article) => ({
  ...article,
  slug: slugify(article.title),
}));

export function getCategoryLabels(): string[] {
  return Array.from(new Set(ARTICLES.map((article) => article.category)));
}

export function getCategoryCounts(): NewsCategoryCount[] {
  return [
    { label: ALL_CATEGORY, count: ARTICLES.length },
    ...getCategoryLabels().map((label) => ({
      label,
      count: ARTICLES.filter((article) => article.category === label).length,
    })),
  ];
}

export async function getArticles(options: {
  category?: string;
  page?: number;
}) {
  const activeCategory = getCategoryLabels().includes(options.category ?? "")
    ? (options.category as string)
    : ALL_CATEGORY;

  const filtered =
    activeCategory === ALL_CATEGORY
      ? ARTICLES
      : ARTICLES.filter((article) => article.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const requestedPage = options.page ?? 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);

  const articles = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return { articles, activeCategory, currentPage, totalPages };
}

export async function getFeaturedArticles(): Promise<NewsArticle[]> {
  return ARTICLES.filter((article) => article.featured);
}

export async function getArticleBySlug(
  slug: string,
): Promise<NewsArticle | undefined> {
  return ARTICLES.find((article) => article.slug === slug);
}

export function buildNewsHref(category: string, page: number) {
  const params = new URLSearchParams();
  if (category !== ALL_CATEGORY) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return `${NEWS_BASE_PATH}${query ? `?${query}` : ""}#${NEWS_LISTING_ANCHOR}`;
}

export function getPaginationItems(
  currentPage: number,
  totalPages: number,
): NewsPaginationItem[] {
  const keep = new Set(
    [1, totalPages, currentPage - 1, currentPage, currentPage + 1].filter(
      (page) => page >= 1 && page <= totalPages,
    ),
  );
  const sorted = Array.from(keep).sort((a, b) => a - b);

  const items: NewsPaginationItem[] = [];
  let previous = 0;
  for (const page of sorted) {
    if (previous && page - previous > 1) items.push("ellipsis");
    items.push(page);
    previous = page;
  }
  return items;
}
