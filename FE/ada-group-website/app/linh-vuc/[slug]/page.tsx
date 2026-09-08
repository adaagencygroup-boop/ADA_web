import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSectorBySlug, getSectors } from "@/app/linh-vuc/_lib/sectors";
import SectorApproach from "@/app/linh-vuc/[slug]/_components/SectorApproach";
import SectorHero from "@/app/linh-vuc/[slug]/_components/SectorHero";
import SectorWhyChoose from "@/app/linh-vuc/[slug]/_components/SectorWhyChoose";

type SectorPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getSectors().map((sector) => ({ slug: sector.slug }));
}

export async function generateMetadata({
  params,
}: SectorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);

  if (!sector) return { title: "Lĩnh vực | ADA Group" };

  return {
    title: `${sector.title} | Lĩnh vực | ADA Group`,
    description: sector.description,
  };
}

export default async function SectorDetailPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);

  if (!sector) notFound();

  return (
    <>
      <SectorHero sector={sector} />
      <SectorWhyChoose sector={sector} />
      <SectorApproach sector={sector} />
    </>
  );
}
