"use client";

import { use } from "react";
import JobForm from "@/app/(dashboard)/tuyen-dung/_components/job-form/JobForm";

export default function EditJobPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = use(params);

  return <JobForm mode="edit" jobId={jobId} />;
}
