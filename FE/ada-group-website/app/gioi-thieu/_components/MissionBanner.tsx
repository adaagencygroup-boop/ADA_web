const CONTENT = {
  eyebrow: "SỨ MỆNH CỦA CHÚNG TÔI",
  quote:
    "“Ứng dụng công nghệ để tạo ra những giải pháp thiết thực cho doanh nghiệp Việt.”",
};

export default function MissionBanner() {
  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-360 lg:px-8">
        <div className="bg-[#002A64] lg:rounded-2xl">
          <div className="flex flex-col items-center gap-4 p-6 text-center lg:rounded-2xl lg:px-56 lg:py-16 lg:shadow-xl">
            <span className="text-[12px] font-semibold uppercase leading-5 text-blue-100 lg:text-[12px] lg:tracking-wider lg:text-blue-200">
              {CONTENT.eyebrow}
            </span>
            <span className="h-0.5 w-10 bg-blue-600 lg:bg-blue-400" />
            <p className="text-[28px] font-semibold leading-[1.2] text-white lg:max-w-4xl lg:text-[36px] lg:font-medium lg:leading-[1.2]">
              {CONTENT.quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
