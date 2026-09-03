type IconProps = { className?: string };

function SearchIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function GlobeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </svg>
  );
}

function ChevronDownIcon({ className = "h-3 w-3" }: IconProps) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function SearchBar() {
  return (
    <section className="bg-white pt-8 pb-2">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
          <div className="flex flex-1 items-stretch overflow-hidden rounded-md bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
            <input
              type="text"
              placeholder="Tìm kiếm tin tức..."
              className="flex-1 px-4 py-3 text-base text-zinc-900 placeholder:text-gray-500 focus:outline-none"
            />
            <button
              type="button"
              aria-label="Tìm kiếm"
              className="flex w-16 items-center justify-center bg-[#1961E6] text-white transition-colors hover:bg-blue-700"
            >
              <SearchIcon className="h-4 w-4" />
            </button>
          </div>

          <div className="relative sm:w-32">
            <GlobeIcon className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <select
              defaultValue="vi"
              aria-label="Chọn ngôn ngữ"
              className="h-full w-full appearance-none rounded-md border border-gray-200 bg-white py-2 pr-8 pl-10 text-base text-gray-700 shadow-[0_1px_2px_rgba(0,0,0,0.05)] focus:outline-none"
            >
              <option value="vi">VN</option>
              <option value="en">EN</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 h-3 w-3 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
