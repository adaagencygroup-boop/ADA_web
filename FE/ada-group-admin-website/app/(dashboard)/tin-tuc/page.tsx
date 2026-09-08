import Link from "next/link";
import { ChevronRight } from "lucide-react";
import NewsListCard, {
  NewsToolbarActions,
} from "@/app/(dashboard)/tin-tuc/_components/NewsListCard";

export default function TinTucPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-2 text-sm text-[#434750]">
            <Link href="/" className="hover:text-[#1C1B1B]">
              Dashboard
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-medium text-[#1C1B1B]">
              Quản lý tin tức
            </span>
          </nav>
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">
            Quản lý tin tức
          </h1>
        </div>

        <NewsToolbarActions />
      </div>

      <NewsListCard />
    </div>
  );
}
