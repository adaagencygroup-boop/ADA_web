import Image from "next/image";
import type { Sector } from "@/app/linh-vuc/_types/sector";

export default function SectorHero({ sector }: { sector: Sector }) {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:flex lg:items-center lg:gap-(--inner-space) lg:px-8">
        <div className="flex flex-col items-start gap-2 lg:max-w-139 lg:shrink-0 lg:gap-(--heading-space)">
          <span className="text-xs font-bold tracking-wide text-[#2563EB] uppercase lg:hidden">
            Chi tiết lĩnh vực
          </span>
          <h1 className="text-[32px] leading-[1.47] font-semibold text-[#0F172A] lg:text-5xl lg:leading-22.5 lg:font-bold">
            {sector.title}
          </h1>
          <p className="text-sm leading-[1.57] text-[#475569] lg:text-lg lg:leading-[1.6]">
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
