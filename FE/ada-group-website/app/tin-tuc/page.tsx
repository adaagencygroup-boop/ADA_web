import type { Metadata } from "next";
import Breadcrumb from "@/app/tin-tuc/_components/Breadcrumb";
import CallToAction from "@/app/tin-tuc/_components/CallToAction";
import HeroCarousel from "@/app/tin-tuc/_components/HeroCarousel";
import NewsListing from "@/app/tin-tuc/_components/NewsListing";
import SearchBar from "@/app/tin-tuc/_components/SearchBar";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Tin tức | ADA Group",
  description:
    "Cập nhật tin tức, sự kiện và bài viết công nghệ mới nhất từ ADA Group.",
};

type TinTucPageProps = {
  searchParams: Promise<{ category?: string; page?: string; search?: string }>;
};

export default async function TinTucPage({ searchParams }: TinTucPageProps) {
  const { category, page, search } = await searchParams;

  return (
    <>
      <HeroCarousel />
      <SearchBar category={category} search={search} />
      <Breadcrumb />
      <NewsListing category={category} page={page} search={search} />
      <CallToAction />
    </>
  );
}
