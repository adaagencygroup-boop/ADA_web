"use client";

import { useRef } from "react";

type IconProps = { className?: string };

function ChevronLeftIcon({ className = "h-3 w-3" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-3 w-3" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

const CONTENT = {
  title: "Đội ngũ lãnh đạo",
  description: "Những chuyên gia tâm huyết dẫn dắt ADA Group.",
};

const LEADERS = [
  { name: "Ông Andrew", role: "Chủ tịch Hội đồng quản trị" },
  { name: "Bà Louisa", role: "Giám đốc Điều hành" },
  { name: "Ông Thomas", role: "Giám đốc Công nghệ" },
  { name: "Ông Andre", role: "Chủ tịch Hội đồng quản trị" },
  { name: "Bà Louis", role: "Giám đốc Điều hành" },
  { name: "Ông Thoma", role: "Giám đốc Công nghệ" },
];

export default function LeadershipTeam() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 1 | -1) => {
    const track = scrollRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : track.clientWidth;
    track.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  return (
    <section className="section-y pt-0! bg-white">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 border-b border-zinc-300/40 pb-4 lg:border-none lg:pb-0">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900">
              {CONTENT.title}
            </h2>
            <p className="mt-1 mx-2 text-base text-gray-600">
              {CONTENT.description}
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Xem lãnh đạo trước"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition-colors hover:bg-zinc-50"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Xem lãnh đạo tiếp theo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-900 transition-colors hover:bg-zinc-50"
            >
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-(--inner-space) flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {LEADERS.map((leader) => (
            <div
              key={leader.name}
              className="w-70 shrink-0 snap-start rounded-lg border border-zinc-200/60 bg-[#FCF8FB] shadow-sm lg:w-[calc((100%-48px)/3)] lg:border-0 lg:bg-transparent lg:shadow-none"
            >
              <div className="relative aspect-417/368 w-full overflow-hidden rounded-t-lg bg-zinc-200 lg:rounded-lg lg:shadow-sm" />

              <div className="border-t border-[#003384]/20 p-4 text-center lg:border-none lg:px-0 lg:pt-4">
                <h3 className="text-sm font-semibold text-zinc-900">
                  {leader.name}
                </h3>
                <p className="mt-1 text-xs text-[#002A64]">{leader.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
