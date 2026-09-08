import Image from "next/image";
import type { Sector } from "@/app/linh-vuc/_types/sector";

export default function SectorHero({ sector }: { sector: Sector }) {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:flex lg:items-center lg:gap-(--inner-space) lg:px-8">
        <div className="flex flex-col items-start gap-2 lg:max-w-139 lg:shrink-0 lg:gap-(--heading-space)">
          <span className="text-xs font-semibold tracking-wide text-[#2563EB] uppercase lg:hidden">
            Chi tiết lĩnh vực
          </span>
          <h1 className="text-[28px] lg:text-[44px] font-semibold leading-[1.2] lg:leading-[1.1] text-[#0F172A]">
            {sector.title}
          </h1>
          <p className="text-[14px] lg:text-[16px] leading-relaxed text-[#475569]">
            {sector.content}
          </p>
        </div>

        <div className="relative mt-(--inner-space) aspect-358/200 w-full overflow-hidden rounded-xl lg:mt-0 lg:aspect-681/430 lg:flex-1">
          <Image
            src={sector.imageUrl}
            alt={sector.title}
            fill
            sizes="(min-width: 1024px) 681px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
