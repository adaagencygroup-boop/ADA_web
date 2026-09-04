import Link from"next/link";

export default function MobileCTASection() {
  return (
    <section className="bg-[#002A64] section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-center flex flex-col items-center">
          <h2 className="text-[28px] lg:text-[36px] font-semibold leading-[1.2] tracking-tight text-white mb-(--inner-space) max-w-4xl px-2 md:px-0">
            Bạn đang có một ý tưởng cho ứng dụng Mobile?
          </h2>
          
          <p className="text-[14px] lg:text-[16px] font-medium text-white mb-(--inner-space)">
            Biến ý tưởng thành sản phẩm số hoàn chỉnh
          </p>
          
          <p className="text-[14px] lg:text-[16px] leading-relaxed text-blue-100 max-w-2xl mb-(--section-padding) px-4 md:px-0">
            Từ một ý tưởng ban đầu đến một hệ thống Mobile hoàn chỉnh, ADA Group sẵn sàng cùng bạn xác định nhu cầu và lựa chọn hướng triển khai phù hợp.
          </p>
          
          <div className="flex flex-col w-full px-4 sm:px-0 sm:w-auto sm:flex-row items-center justify-center gap-(--inner-space)">
            <Link
              href="/lien-he"
              className="inline-flex w-full sm:w-auto min-w-50 items-center justify-center rounded-lg bg-[#004bb4] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-blue-600 shadow-sm"
            >
              Trao đổi về dự án
            </Link>
            <Link
              href="/linh-vuc"
              className="inline-flex w-full sm:w-auto min-w-50 items-center justify-center rounded-lg border border-white/40 bg-transparent px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              Xem các sản phẩm
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
