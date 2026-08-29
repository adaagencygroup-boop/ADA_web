import Link from"next/link";

export default function EnterpriseCTASection() {
  return (
    <section className="bg-[#002A64] section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-center flex flex-col items-center">
          <h2 className="text-[1.75rem] font-semibold leading-snug tracking-tight text-white sm:text-3xl lg:text-[2.5rem] mb-(--inner-space) max-w-4xl">
            Bạn đang muốn cải thiện hoạt động nào trong doanh nghiệp?
          </h2>
          <p className="text-[15px] sm:text-base leading-relaxed text-blue-100 max-w-2xl mb-(--heading-space)">
            Điểm bắt đầu đôi khi chỉ là một quy trình đang mất nhiều thời gian, dữ liệu nằm ở nhiều nơi hoặc một hoạt động cần được quản lý hiệu quả hơn.
          </p>
          <p className="text-sm leading-relaxed text-blue-200/80 max-w-2xl mb-(--inner-space)">
            Hãy chia sẻ bài toán với ADA Group. Chúng tôi sẽ cùng bạn tìm hiểu nhu cầu và xác định hướng triển khai phù hợp với hoạt động thực tế.
          </p>
          <div className="flex flex-col w-full px-4 sm:px-0 sm:w-auto sm:flex-row items-center justify-center gap-(--inner-space) pt-(--heading-space)">
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
