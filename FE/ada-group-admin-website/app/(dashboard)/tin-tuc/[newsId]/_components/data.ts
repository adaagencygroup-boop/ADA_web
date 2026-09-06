import {
  getNewsArticle,
  type NewsStatus,
} from "@/app/(dashboard)/tin-tuc/_components/data";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string };

export type ArticleDetail = {
  id: number;
  title: string;
  category: string;
  status: NewsStatus;
  author: string;
  publishedAt: string;
  updatedAt: string;
  views: number;
  featured: boolean;
  thumbnail: string;
  content: ArticleBlock[];
};

const GENERIC_CONTENT: ArticleBlock[] = [
  {
    type: "paragraph",
    text: "Trong bối cảnh AI đang thay đổi thế giới và tại Việt Nam, ADA Group xác định con người là yếu tố cốt lõi trong hành trình chuyển đổi. Với tầm nhìn dài hạn và chiến lược bài bản, chúng tôi đang tăng tốc đầu tư vào đội ngũ – không chỉ để mở rộng quy mô, mà để kiến tạo những giá trị bền vững và đóng góp cho sự phát triển của cộng đồng công nghệ Việt Nam.",
  },
  { type: "heading", text: "Chiến lược phát triển AI của ADA Group" },
  {
    type: "paragraph",
    text: "ADA Group tập trung vào ba trụ cột: Nghiên cứu & ứng dụng AI, giải pháp AI cho doanh nghiệp và phát triển hệ sinh thái công nghệ. Vì vậy, chúng tôi liên tục mở rộng đội ngũ chuyên gia trong các lĩnh vực: kỹ sư AI, data scientist, kỹ sư phần mềm, chuyên viên sản phẩm, chuyên viên tư vấn giải pháp và chuyên viên triển khai.",
  },
  { type: "heading", text: "Cơ hội phát triển cùng ADA Group" },
  {
    type: "paragraph",
    text: "Chúng tôi tin rằng mỗi thành viên chính là nhân tố tạo nên sự khác biệt. Tại ADA Group, bạn sẽ được trao quyền để chủ động sáng tạo, tiếp cận các dự án công nghệ quy mô lớn và làm việc trong môi trường chuyên nghiệp, cởi mở và nhân văn.",
  },
];

export function getArticleDetail(id: number): ArticleDetail | null {
  const article = getNewsArticle(id);
  if (!article) return null;

  return {
    id: article.id,
    title: article.title,
    category: article.category,
    status: article.status,
    author: "Admin",
    publishedAt: article.publishedAt,
    updatedAt: article.publishedAt,
    views: article.views,
    featured: article.featured,
    thumbnail: article.thumbnail,
    content: GENERIC_CONTENT,
  };
}
