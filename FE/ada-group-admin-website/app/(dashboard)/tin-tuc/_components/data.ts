export type NewsStatus = "published" | "draft";

export type NewsArticle = {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  category: string;
  publishedAt: string;
  status: NewsStatus;
  featured: boolean;
  views: number;
};

const OFFICE_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop";
const TECH_IMAGE =
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop";
const TEAM_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop";

export const CATEGORIES = [
  "Tin tức công ty",
  "Công nghệ",
  "Sự kiện",
  "Tuyển dụng",
];

const BASE_ARTICLES: Omit<NewsArticle, "id">[] = [
  {
    title: "ADA Group khai trương văn phòng mới tại Hà Nội",
    slug: "ada-group-khai-truong-van-phong-moi-tai-ha-noi",
    thumbnail: OFFICE_IMAGE,
    category: "Tin tức công ty",
    publishedAt: "03/07/2026 08:30",
    status: "published",
    featured: true,
    views: 1256,
  },
  {
    title: "AI Agent – Xu hướng công nghệ đột phá 2026",
    slug: "ai-agent-xu-huong-cong-nghe-dot-pha-2026",
    thumbnail: TECH_IMAGE,
    category: "Công nghệ",
    publishedAt: "28/06/2026 14:20",
    status: "published",
    featured: true,
    views: 2340,
  },
  {
    title: "ADA Group đồng hành cùng sinh viên công nghệ",
    slug: "ada-group-dong-hanh-cung-sinh-vien-cong-nghe",
    thumbnail: TEAM_IMAGE,
    category: "Sự kiện",
    publishedAt: "22/06/2026 10:00",
    status: "published",
    featured: false,
    views: 845,
  },
  {
    title: "Tuyển dụng số lượng lớn kỹ sư AI năm 2026",
    slug: "tuyen-dung-so-luong-lon-ky-su-ai-nam-2026",
    thumbnail: TECH_IMAGE,
    category: "Tuyển dụng",
    publishedAt: "20/06/2026 09:15",
    status: "published",
    featured: false,
    views: 1032,
  },
  {
    title: "Văn hóa ADA Group – Con người là trọng tâm",
    slug: "van-hoa-ada-group-con-nguoi-la-trong-tam",
    thumbnail: TEAM_IMAGE,
    category: "Tin tức công ty",
    publishedAt: "18/06/2026 16:30",
    status: "draft",
    featured: false,
    views: 256,
  },
  {
    title: "ADA Group ký kết hợp tác chiến lược với đối tác Nhật Bản",
    slug: "ada-group-ky-ket-hop-tac-chien-luoc-voi-doi-tac-nhat-ban",
    thumbnail: OFFICE_IMAGE,
    category: "Sự kiện",
    publishedAt: "15/06/2026 11:00",
    status: "published",
    featured: false,
    views: 987,
  },
  {
    title: "Xu hướng chuyển đổi số cho doanh nghiệp vừa và nhỏ",
    slug: "xu-huong-chuyen-doi-so-cho-doanh-nghiep-vua-va-nho",
    thumbnail: TECH_IMAGE,
    category: "Công nghệ",
    publishedAt: "10/06/2026 08:45",
    status: "published",
    featured: false,
    views: 1509,
  },
  {
    title: "ADA Group tổ chức chương trình đào tạo nội bộ quý II",
    slug: "ada-group-to-chuc-chuong-trinh-dao-tao-noi-bo-quy-ii",
    thumbnail: TEAM_IMAGE,
    category: "Tin tức công ty",
    publishedAt: "05/06/2026 13:30",
    status: "draft",
    featured: false,
    views: 178,
  },
  {
    title: "Cơ hội nghề nghiệp dành cho sinh viên mới tốt nghiệp",
    slug: "co-hoi-nghe-nghiep-danh-cho-sinh-vien-moi-tot-nghiep",
    thumbnail: TECH_IMAGE,
    category: "Tuyển dụng",
    publishedAt: "01/06/2026 09:00",
    status: "published",
    featured: false,
    views: 632,
  },
  {
    title: "ADA Group tham dự hội nghị công nghệ quốc tế",
    slug: "ada-group-tham-du-hoi-nghi-cong-nghe-quoc-te",
    thumbnail: OFFICE_IMAGE,
    category: "Sự kiện",
    publishedAt: "28/05/2026 15:00",
    status: "published",
    featured: false,
    views: 743,
  },
  {
    title: "Ứng dụng Machine Learning vào vận hành doanh nghiệp",
    slug: "ung-dung-machine-learning-vao-van-hanh-doanh-nghiep",
    thumbnail: TECH_IMAGE,
    category: "Công nghệ",
    publishedAt: "22/05/2026 10:30",
    status: "published",
    featured: false,
    views: 1120,
  },
  {
    title: "ADA Group công bố báo cáo phát triển bền vững 2026",
    slug: "ada-group-cong-bo-bao-cao-phat-trien-ben-vung-2026",
    thumbnail: OFFICE_IMAGE,
    category: "Tin tức công ty",
    publishedAt: "15/05/2026 08:00",
    status: "draft",
    featured: false,
    views: 94,
  },
];

export const NEWS_ARTICLES: NewsArticle[] = BASE_ARTICLES.map((article, i) => ({
  id: i + 1,
  ...article,
}));
