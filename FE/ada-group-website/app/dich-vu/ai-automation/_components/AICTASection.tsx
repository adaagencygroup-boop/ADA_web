import Link from"next/link";

export default function AICTASection() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-(--inner-space)">
          <h2 className="text-[28px] lg:text-[36px] font-semibold leading-[1.2] tracking-tight text-[#0a1a2f] px-2 md:px-0">
            Bạn đang muốn <span className="text-[#004bb4]">AI & Automation</span><br className="hidden md:block" />
            giúp bạn cải thiện điều gì?
          </h2>
          
          <p className="text-[14px] lg:text-[16px] leading-relaxed text-zinc-500 max-w-4xl mb-(--inner-space) px-2 md:px-0">
            Có thể đó là một công việc đang mất quá nhiều thời gian, lượng thông tin khó khai thác, dữ liệu chưa được sử dụng hiệu quả hoặc một quy trình còn phụ thuộc nhiều vào thao tác thủ công. Hãy bắt đầu bằng việc chia sẻ bài toán. ADA Group sẽ cùng bạn tìm hiểu nhu cầu, đánh giá khả năng ứng dụng công nghệ và lựa chọn hướng triển khai phù hợp với hoạt động thực tế.
          </p>
          
          <div className="pt-(--heading-space) w-full px-4 sm:px-0 flex justify-center">
            <Link
              href="/lien-he"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-(--inner-space) font-semibold text-white transition-all rounded-full bg-[#0a2347] px-8 py-3 text-[14px] hover:bg-[#163a73] shadow-md hover:shadow-lg"
            >
              Trao đổi ngay với ADA Group <span className="text-lg leading-none">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
