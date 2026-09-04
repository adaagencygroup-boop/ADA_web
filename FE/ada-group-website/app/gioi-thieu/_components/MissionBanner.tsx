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
            <span className="text-xl font-semibold uppercase leading-[29px] text-blue-100 lg:text-sm lg:font-semibold lg:leading-5 lg:tracking-wider lg:text-blue-200">
              {CONTENT.eyebrow}
            </span>
            <span className="h-0.5 w-10 bg-blue-600 lg:bg-blue-400" />
            <p className="text-xl font-semibold leading-7 text-white lg:max-w-4xl lg:text-4xl lg:font-medium lg:leading-10">
              {CONTENT.quote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
