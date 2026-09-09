import Link from "next/link";

interface SectorCTAProps {
  sectorName: string;
}

export default function SectorCTA({ sectorName }: SectorCTAProps) {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="bg-[#002A64] rounded-3xl sm:rounded-4xl px-8 py-10 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left flex-1">
            <h2 className="text-[28px] lg:text-[36px] font-semibold leading-[1.2] tracking-tight text-white text-center md:text-left mb-4">
              Hợp tác trong lĩnh vực {sectorName}
            </h2>
            <p className="text-[14px] lg:text-[16px] leading-relaxed text-blue-100 text-center md:text-left">
              Cùng ADA Group đưa AI vào ngành của bạn
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center bg-white text-[#002A64] text-[14px] font-semibold px-6 py-3.5 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
            >
              Liên hệ hợp tác
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
