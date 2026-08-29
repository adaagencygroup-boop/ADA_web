export default function MobileIntro() {
  return (
    <section className="bg-white section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-(--inner-space) text-blue-600 font-semibold text-xs tracking-widest uppercase mb-(--inner-space)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Giải pháp Mobile hoàn chỉnh
        </div>
        <h2 className="text-[2rem] font-semibold leading-tight tracking-tight text-[#0a1a2f] sm:text-4xl lg:text-[2.75rem] max-w-3xl">
          Giải pháp Mobile phù hợp cho từng doanh nghiệp
        </h2>
      </div>
    </section>
  );
}
