import Link from "next/link";

type IconProps = { className?: string };

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

export default function Breadcrumb({ current }: { current?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="bg-white py-4">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center gap-2 text-sm">
          <li className="shrink-0 whitespace-nowrap">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Trang chủ
            </Link>
          </li>
          <li className="flex shrink-0 items-center gap-2 whitespace-nowrap">
            <ChevronRightIcon className="h-3 w-3 shrink-0 text-gray-500" />
            {current ? (
              <Link href="/tin-tuc" className="text-gray-500 hover:text-gray-700">
                Tin tức
              </Link>
            ) : (
              <span className="font-medium text-gray-700">Tin tức</span>
            )}
          </li>
          {current && (
            <li className="flex min-w-0 items-center gap-2">
              <ChevronRightIcon className="h-3 w-3 shrink-0 text-gray-500" />
              <span className="min-w-0 truncate font-medium text-gray-700">
                {current}
              </span>
            </li>
          )}
        </ol>
      </div>
    </nav>
  );
}
