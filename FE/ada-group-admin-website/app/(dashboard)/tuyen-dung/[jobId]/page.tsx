import { notFound } from "next/navigation";
import { getJobDetail } from "@/app/(dashboard)/tuyen-dung/[jobId]/_components/data";
import JobDetailView from "@/app/(dashboard)/tuyen-dung/[jobId]/_components/JobDetailView";

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const job = getJobDetail(jobId);

  if (!job) notFound();

  return <JobDetailView job={job} />;
}
