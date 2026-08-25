import Link from "next/link";

export default function WebCTA() {
  return (
    <section className="bg-[#002A64] section-y max-md:py-5!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-center flex flex-col items-center">
          <h2 className="text-[1.75rem] font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-[2.5rem] mb-6 max-w-4xl px-2 md:px-0">
            Bạn đang có một website cần xây dựng<br className="hidden md:block" /> hay một bài toán cần đưa lên Web?
          </h2>
          
          <p className="text-[15px] lg:text-[17px] font-medium text-white mb-6">
            Biến ý tưởng thành sản phẩm số hoàn chỉnh.
          </p>
          
          <p className="text-[14px] lg:text-[15px] leading-relaxed text-blue-100 max-w-2xl mb-10 px-4 md:px-0">
            Liên hệ với chúng tôi để thảo luận chi tiết về nhu cầu của bạn. Đội ngũ chuyên gia của ADA Group sẽ tư vấn giải pháp web tối ưu nhất.
          </p>
          
          <div className="flex flex-col w-full px-4 sm:px-0 sm:w-auto sm:flex-row items-center justify-center gap-4">
            <Link
              href="/lien-he"
              className="inline-flex w-full sm:w-auto min-w-50 items-center justify-center rounded-lg bg-[#004bb4] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-blue-600 shadow-sm"
            >
              Trao đổi về dự án
            </Link>
            <Link
              href="/linh-vuc"
              className="inline-flex w-full sm:w-auto min-w-50 items-center justify-center rounded-lg border border-white/40 bg-transparent px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Xem các sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
