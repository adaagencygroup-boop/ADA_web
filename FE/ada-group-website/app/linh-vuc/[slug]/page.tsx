import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GsapScrollReveal from "@/app/_components/GsapScrollReveal";
import { getSectorBySlug, getSectors } from "@/app/linh-vuc/_lib/sectors";
import SectorApproach from "@/app/linh-vuc/[slug]/_components/SectorApproach";
import SectorHero from "@/app/linh-vuc/[slug]/_components/SectorHero";
import SectorWhyChoose from "@/app/linh-vuc/[slug]/_components/SectorWhyChoose";
import SectorProducts from "@/app/linh-vuc/[slug]/_components/SectorProducts";
import SectorCTA from "@/app/linh-vuc/[slug]/_components/SectorCTA";

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

  if (!sector) return { title: "Lĩnh vực" };

  const title = `${sector.title} | Lĩnh vực`;

  return {
    title,
    description: sector.description,
    alternates: {
      canonical: `/linh-vuc/${slug}`,
    },
    openGraph: {
      title,
      description: sector.description,
      url: `/linh-vuc/${slug}`,
      siteName: "ADA Group",
      locale: "vi_VN",
      type: "website",
      images: [
        {
          url: sector.imageUrl,
          width: 1200,
          height: 630,
          alt: sector.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: sector.description,
      images: [sector.imageUrl],
    },
  };
}

export default async function SectorDetailPage({ params }: SectorPageProps) {
  const { slug } = await params;
  const sector = getSectorBySlug(slug);

  if (!sector) notFound();

  return (
    <>
      <SectorHero sector={sector} />
      <GsapScrollReveal>
        <SectorWhyChoose sector={sector} />
      </GsapScrollReveal>
      <GsapScrollReveal>
        <SectorApproach sector={sector} />
      </GsapScrollReveal>
      {sector.products && sector.products.length > 0 && (
        <GsapScrollReveal>
          <SectorProducts products={sector.products} />
        </GsapScrollReveal>
      )}
      <GsapScrollReveal>
        <SectorCTA sectorName={sector.title} />
      </GsapScrollReveal>
    </>
  );
}
