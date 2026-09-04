import Image from "next/image";
import type { Sector } from "@/app/linh-vuc/_types/sector";

function CheckIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function SectorApproach({ sector }: { sector: Sector }) {
  const { approach } = sector;
  if (!approach) return null;

  return (
    <section className="section-y pt-0!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center text-2xl leading-10 font-bold text-[#001D4A] lg:text-3xl">
            {approach.heading}
          </h2>
          <span className="h-1 w-16 bg-[#2563EB]" />
        </div>

        <div className="mt-(--inner-space) flex flex-col gap-10">
          {approach.blocks.map((block, index) => (
            <div
              key={block.paragraph}
              className={`flex flex-col items-center gap-8 lg:flex-row lg:gap-(--inner-space) ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="w-full rounded-2xl border border-[#F3F4F6] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] lg:w-157.5 lg:shrink-0 lg:p-8">
                <div className="relative aspect-628/342 w-full overflow-hidden rounded-lg">
                  <Image
                    src={block.imageUrl}
                    alt={approach.heading}
                    fill
                    sizes="(min-width: 1024px) 630px, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex min-w-0 flex-col items-start gap-6">
                <p className="text-base leading-6.5 text-[#4B5563]">
                  {block.paragraph}
                </p>
                <ul className="flex flex-col items-start gap-4">
                  {block.checklist.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className="text-base font-medium text-[#374151]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
