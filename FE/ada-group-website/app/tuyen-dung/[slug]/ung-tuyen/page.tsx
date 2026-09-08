import { notFound } from "next/navigation";
import { getRecruitmentBySlug } from "@/src/lib/api/recruitments";
import ApplyForm from "./_components/ApplyForm";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function JobApplicationPage({ params }: PageProps) {
  const { slug } = await params;
  const job = await getRecruitmentBySlug(slug);

  if (!job) {
    notFound();
  }

  return <ApplyForm job={job} slug={slug} />;
}
