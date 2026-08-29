import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/app/_components/icons";
import { getSectors } from "@/app/linh-vuc/_lib/sectors";

export default function SectorsGrid() {
  const sectors = getSectors();

  return (
    <section className="section-y pt-0! bg-white">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector) => (
            <Link
              key={sector.slug}
              href={`/linh-vuc/${sector.slug}`}
              className="flex flex-col overflow-hidden rounded-2xl border border-[#C4C6D2]/20 bg-white transition-shadow shadow-sm hover:shadow-lg"
            >
              <div className="relative aspect-417/224 w-full bg-zinc-200">
                <Image
                  src={sector.imageUrl}
                  alt={sector.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col items-start p-6 lg:p-8">
                <span className="text-xs tracking-[1.2px] text-[#002A64] uppercase">
                  {sector.eyebrow}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-[#191C1E] lg:text-2xl">
                  {sector.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-6 text-[#434750] lg:text-base">
                  <span className="font-semibold text-[#002A64]">
                    {sector.code}
                  </span>{" "}
                  — {sector.description}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-base font-semibold text-[#002A64] lg:text-base">
                  Khám phá thêm
                  <ArrowRightIcon className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
