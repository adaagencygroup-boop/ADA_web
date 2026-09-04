import { JOB_POSTINGS, type JobStatus } from "@/app/(dashboard)/tuyen-dung/_components/data";

export type JobDetail = {
  id: string;
  code: string;
  title: string;
  department: string;
  location: string;
  type: string;
  category: string;
  status: JobStatus;
  statusLabel: string;
  postedAt: string;
  deadline: string;
  totalSlots: string;
  appliedCount: number;
  viewCount: number;
  heroImage: string;
  description: string[];
  requirements: string[];
  benefits: string[];
  otherInfo: { label: string; value: string }[];
};

const STATUS_LABELS: Record<JobStatus, string> = {
  active: "Đang tuyển",
  closed: "Đã đóng",
  hidden: "Tạm ẩn",
};

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format&fit=crop";

const GENERIC_DESCRIPTION = (title: string) => [
  `Thực hiện các công việc chuyên môn của vị trí ${title} theo phân công của quản lý trực tiếp.`,
  "Phối hợp với các phòng ban liên quan để đảm bảo tiến độ và chất lượng công việc.",
  "Đề xuất cải tiến quy trình làm việc nhằm nâng cao hiệu suất chung.",
];

const GENERIC_REQUIREMENTS = [
  "Tốt nghiệp Đại học chuyên ngành liên quan đến vị trí ứng tuyển.",
  "Có kinh nghiệm làm việc ở vị trí tương đương là một lợi thế.",
  "Khả năng làm việc độc lập và làm việc nhóm tốt.",
  "Chủ động, cẩn thận và có tinh thần trách nhiệm cao trong công việc.",
];

const GENERIC_BENEFITS = [
  "Mức lương cạnh tranh theo năng lực.",
  "Thưởng hiệu quả công việc, thưởng dự án.",
  "Được đào tạo chuyên sâu và lộ trình phát triển rõ ràng.",
  "Gói bảo hiểm sức khỏe và các phúc lợi hấp dẫn khác.",
];

const AI_ENGINEER_DETAIL: JobDetail = {
  id: "1",
  code: "#TD-015",
  title: "AI Engineer",
  department: "Phòng AI",
  location: "Hà Nội",
  type: "Full-time",
  category: "Kỹ thuật",
  status: "active",
  statusLabel: "Đang tuyển",
  postedAt: "01/06/2025 09:30",
  deadline: "31/07/2025",
  totalSlots: "03",
  appliedCount: 16,
  viewCount: 245,
  heroImage: HERO_IMAGE,
  description: [
    "Nghiên cứu, phát triển các mô hình AI phục vụ cho sản phẩm và dịch vụ của công ty.",
    "Xây dựng và triển khai các giải pháp AI vào hệ thống thực tế.",
    "Phối hợp với các bộ phận khác để thu thập yêu cầu và tối ưu hiệu suất mô hình.",
  ],
  requirements: [
    "Tốt nghiệp Đại học chuyên ngành Công nghệ thông tin, Khoa học máy tính, Trí tuệ nhân tạo hoặc các lĩnh vực liên quan.",
    "Có kiến thức vững về Machine Learning, Deep Learning.",
    "Thành thạo Python, TensorFlow, PyTorch, Scikit-learn, NumPy, Pandas,...",
    "Kinh nghiệm làm việc với dữ liệu lớn là một lợi thế.",
    "Khả năng làm việc độc lập và làm việc nhóm tốt.",
    "Có khả năng đọc hiểu tài liệu tiếng Anh chuyên ngành.",
  ],
  benefits: [
    "Mức lương cạnh tranh theo năng lực.",
    "Thưởng hiệu quả công việc, thưởng dự án.",
    "Được đào tạo chuyên sâu và lộ trình phát triển rõ ràng.",
    "Làm việc trong môi trường hiện đại, sáng tạo.",
    "Gói bảo hiểm sức khỏe và các phúc lợi hấp dẫn khác.",
    "Du lịch, team building, các hoạt động nội bộ thú vị.",
  ],
  otherInfo: [
    { label: "Hình thức làm việc", value: "Toàn thời gian" },
    { label: "Cấp bậc", value: "Nhân viên" },
    { label: "Thời gian làm việc", value: "Thứ 2 - Thứ 6 (08:30 - 17:30)" },
    { label: "Phòng ban", value: "R&D" },
    { label: "Nơi làm việc", value: "Tòa nhà ADA, Hà Nội" },
  ],
};

export function getJobDetail(jobId: string): JobDetail | null {
  if (jobId === "1") return AI_ENGINEER_DETAIL;

  const job = JOB_POSTINGS.find((item) => item.id === jobId);
  if (!job) return null;

  return {
    id: job.id,
    code: `#TD-${job.id.padStart(3, "0")}`,
    title: job.title,
    department: job.department,
    location: job.location,
    type: job.type,
    category: "Chung",
    status: job.status,
    statusLabel: STATUS_LABELS[job.status],
    postedAt: "01/06/2025 09:30",
    deadline: job.deadline,
    totalSlots: "01",
    appliedCount: job.candidates,
    viewCount: 0,
    heroImage: HERO_IMAGE,
    description: GENERIC_DESCRIPTION(job.title),
    requirements: GENERIC_REQUIREMENTS,
    benefits: GENERIC_BENEFITS,
    otherInfo: [
      { label: "Hình thức làm việc", value: "Toàn thời gian" },
      { label: "Cấp bậc", value: "Nhân viên" },
      { label: "Thời gian làm việc", value: "Thứ 2 - Thứ 6 (08:30 - 17:30)" },
      { label: "Phòng ban", value: job.department },
      { label: "Nơi làm việc", value: `Tòa nhà ADA, ${job.location}` },
    ],
  };
}
