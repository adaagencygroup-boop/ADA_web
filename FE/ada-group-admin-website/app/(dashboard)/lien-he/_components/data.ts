export type ContactStatus = "pending" | "answered";

export type ContactReply = {
  content: string;
  attachmentName?: string;
  attachmentSize?: string;
  sentAt: string;
};

export type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
  sentAt: string;
  message: string;
  status: ContactStatus;
  reply?: ContactReply;
  note?: string;
};

const NAMES = [
  "Nguyễn Hoàng An",
  "Trần Minh Khoa",
  "Lê Thị Mai",
  "Phạm Đức Long",
  "Hoàng Phương Linh",
  "Đỗ Văn Nam",
  "Nguyễn Thu Hà",
  "Vũ Anh Tuấn",
  "Bùi Thị Ngọc",
  "Đặng Quốc Bảo",
  "Phan Thị Hương",
  "Lý Văn Đạt",
];

const MESSAGES = [
  "Tôi quan tâm đến các giải pháp AI của công ty. Doanh nghiệp chúng tôi đang tìm kiếm giải pháp để tự động hóa quy trình và phân tích dữ liệu. Vui lòng tư vấn chi tiết hơn. Cảm ơn!",
  "Chúng tôi cần báo giá cho dịch vụ phát triển website doanh nghiệp. Mong nhận được phản hồi sớm.",
  "Xin chào, tôi muốn tìm hiểu thêm về dịch vụ tích hợp hệ thống ERP của ADA Group.",
  "Công ty tôi đang có nhu cầu xây dựng ứng dụng di động, mong được tư vấn giải pháp phù hợp.",
];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function buildContacts(count: number): Contact[] {
  return Array.from({ length: count }, (_, i) => {
    const name = NAMES[i % NAMES.length];
    const date = new Date(2025, 4, 20 - i);
    const status: ContactStatus = i % 3 === 0 ? "pending" : "answered";
    const sentAt = `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(
      9 + (i % 8)
    )}:${pad((i * 7) % 60)}`;
    const lastName = name.split(" ").pop()?.toLowerCase() ?? "khach";

    return {
      id: String(i + 1),
      name,
      phone: `09${pad(10 + i)} ${pad((100 + i * 7) % 1000)} ${pad(
        (200 + i * 3) % 1000
      )}`,
      email: `${lastName}${i === 0 ? "" : i}@gmail.com`,
      sentAt,
      message: MESSAGES[i % MESSAGES.length],
      status,
      reply:
        status === "answered"
          ? {
              content:
                "Cảm ơn Anh/Chị đã quan tâm đến các giải pháp AI của ADA Group.\n\nChúng tôi đã nhận được thông tin và sẽ liên hệ lại để tư vấn chi tiết trong thời gian sớm nhất.",
              attachmentName:
                i % 2 === 0 ? "brochure-ai-solutions.pdf" : undefined,
              attachmentSize: i % 2 === 0 ? "1.25 MB" : undefined,
              sentAt: `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} 11:05`,
            }
          : undefined,
    };
  });
}

export const INITIAL_CONTACTS: Contact[] = buildContacts(24);
