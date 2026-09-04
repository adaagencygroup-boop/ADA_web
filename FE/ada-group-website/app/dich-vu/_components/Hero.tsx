import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  badge: string;
  title: string;
  desc: string;
  imagePlaceholder: string;
}

export default function Hero({ badge, title, desc, imagePlaceholder }: HeroProps) {
  return (
    <section className=" section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-(--inner-space) items-center">
          {/* Left: Content */}
          <div className="flex flex-col gap-(--heading-space) lg:col-span-5">
            {/* Badge */}
            <div className="hidden md:inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 lg:text-[12px] font-semibold uppercase tracking-wider text-blue-900">
              {badge}
            </div>
            <div className="inline-flex md:hidden w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-[12px] font-semibold text-zinc-900">
              {badge}
            </div>

            {/* Title */}
            <h1 className="text-[28px] leading-[1.2] font-semibold tracking-tight text-black sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
              {title}
            </h1>

            {/* Description */}
            <p className="text-[14px] lg:text-[16px] leading-relaxed text-zinc-600 whitespace-pre-line text-justify">
              {desc}
            </p>

            {/* CTA */}
            <div className="mt-(--inner-space)">
              <Link
                href="/lien-he"
                className="inline-flex w-full md:w-auto items-center justify-center gap-2 font-semibold text-white transition-colors 
                rounded-lg bg-[#1A4182] px-6 py-3 text-[15px] hover:bg-[#153468] 
                md:rounded-md md:text-sm"
              >
                Trao đổi về dự án &rarr;
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="lg:col-span-7 mt-4 lg:mt-0">
            <div className="relative aspect-692/393 w-full overflow-hidden rounded-4xl bg-slate-100 flex items-center justify-center border border-slate-200">
              <Image src={imagePlaceholder} alt={title} fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
