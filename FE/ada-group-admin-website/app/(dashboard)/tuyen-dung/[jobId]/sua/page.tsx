import { notFound } from "next/navigation";
import { getJobDetail } from "@/app/(dashboard)/tuyen-dung/[jobId]/_components/data";
import JobForm from "@/app/(dashboard)/tuyen-dung/_components/job-form/JobForm";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  const job = getJobDetail(jobId);

  if (!job) notFound();

  return <JobForm mode="edit" jobId={jobId} />;
}
