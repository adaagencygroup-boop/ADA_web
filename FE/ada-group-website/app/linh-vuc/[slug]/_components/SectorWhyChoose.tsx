import { STAT_ICONS } from "@/app/linh-vuc/_lib/stat-icons";
import type { Sector, SectorStat } from "@/app/linh-vuc/_types/sector";

function StatCard({ stat }: { stat: SectorStat }) {
  const Icon = STAT_ICONS[stat.icon];
  return (
    <div className="flex flex-1 flex-col items-center gap-1 rounded-lg bg-white p-4 text-center lg:items-start lg:gap-4 lg:rounded-2xl lg:border lg:border-slate-100 lg:p-8 lg:text-left lg:shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <Icon className="hidden h-10 w-10 text-[#2563EB] lg:block" />
      <span className="text-2xl leading-8.75 font-semibold text-[#002A64] lg:leading-10 lg:text-[#1E3A8A]">
        {stat.value}
      </span>
      <p className="text-[11px] leading-4 text-slate-400 lg:text-sm lg:leading-5 lg:text-[#64748B]">
        {stat.label}
      </p>
    </div>
  );
}

export default function SectorWhyChoose({ sector }: { sector: Sector }) {
  const { whyChoose } = sector;
  if (!whyChoose) return null;

  return (
    <section className="section-y pt-0!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl leading-7.25 font-semibold text-[#0F172A] lg:text-center lg:text-3xl lg:leading-9 lg:font-bold">
          Tại sao <span className="hidden lg:inline">ADA Group </span>chọn{" "}
          {sector.title}?
        </h2>

        <div className="mt-(--inner-space) flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-(--inner-space)">
          <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 lg:border-none lg:bg-transparent lg:p-0">
            <p className="text-base leading-6 font-semibold text-[#0F172A] lg:text-2xl lg:leading-9 lg:font-semibold lg:text-[#1E293B]">
              <span
                aria-hidden="true"
                className="hidden font-serif text-[#DBEAFE] lg:inline-block lg:scale-[2]"
              >
                “
              </span>
              {" "}{whyChoose.quoteBefore}
              <span className="text-[#2563EB]">
                {whyChoose.quoteHighlight}
              </span>
              {whyChoose.quoteAfter}{" "}
              <span
                aria-hidden="true"
                className="hidden font-serif text-[#DBEAFE] lg:inline-block lg:scale-[2]"
              >
                ”
              </span>
            </p>
            <p className="mt-(--heading-space) hidden max-w-xl text-base leading-6.5 text-[#475569] lg:block">
              {whyChoose.paragraph}
            </p>
          </div>

          <div className="flex gap-3 lg:gap-6">
            {whyChoose.stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
