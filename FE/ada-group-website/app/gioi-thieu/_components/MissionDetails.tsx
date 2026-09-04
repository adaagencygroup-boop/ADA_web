const BLOCKS = [
  {
    title: "Cách chúng tôi tạo ra mỗi sản phẩm?",
    paragraph:
      "Mỗi sản phẩm tại ADA Group bắt đầu từ việc tìm hiểu bài toán và nhu cầu thực tế. Chúng tôi cùng khách hàng xác định mục tiêu, người dùng và những vấn đề cần giải quyết trước khi lựa chọn công nghệ. Từ đó, đội ngũ thiết kế và phát triển giải pháp phù hợp với từng dự án — từ website, ứng dụng web, ứng dụng di động đến các hệ thống quản lý và nền tảng chuyên biệt. Chúng tôi ưu tiên những sản phẩm dễ sử dụng, ổn định và có khả năng mở rộng theo sự phát triển của doanh nghiệp.",
    imageOnLeft: false,
  },
  {
    title: "Công nghệ phù hợp cho từng bài toán",
    paragraph: (
      <>
        Không có một công nghệ phù hợp với mọi vấn đề. Vì vậy, ADA Group lựa
        chọn công nghệ dựa trên mục tiêu, quy mô và yêu cầu thực tế của từng
        sản phẩm. Từ Web, Mobile, Cloud đến Data, AI và Automation, các công
        nghệ được kết hợp khi cần thiết để tạo nên một hệ thống hiệu quả, dễ
        vận hành và có khả năng phát triển lâu dài. Với chúng tôi, công nghệ
        là công cụ —{" "}
        <strong className="font-semibold text-zinc-900">
          giá trị mà sản phẩm tạo ra mới là mục tiêu cuối cùng.
        </strong>
      </>
    ),
    imageOnLeft: true,
  },
];

export default function MissionDetails() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-360 space-y-(--inner-space) px-4 sm:px-6 lg:px-8">
        {BLOCKS.map((block) => (
          <div
            key={block.title}
            className="grid grid-cols-1 items-center gap-2 sm:gap-10 lg:grid-cols-2"
          >
            <div className={block.imageOnLeft ? "lg:order-2" : "lg:order-1"}>
              <h3 className="text-[28px] lg:text-[36px] font-semibold leading-[1.2] text-zinc-900">
                {block.title}
              </h3>
              <p className="mt-(--heading-space) text-justify text-[14px] lg:text-[16px] leading-relaxed text-gray-600">
                {block.paragraph}
              </p>
            </div>

            <div
              className={`aspect-630/256 w-full rounded-xl bg-[#E6E8EA] ${block.imageOnLeft ? "lg:order-1" : "lg:order-2"}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
