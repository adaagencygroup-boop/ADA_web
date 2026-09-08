"use client";

import { use } from "react";
import { useRecruitmentById } from "@/src/hooks/useRecruitments";
import JobDetailView from "@/app/(dashboard)/tuyen-dung/[jobId]/_components/JobDetailView";

export default function JobDetailPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = use(params);
  const { data: job, isLoading, isError } = useRecruitmentById(jobId);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-sm text-[#64748B]">
        Đang tải tin tuyển dụng...
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-sm text-red-600">
        Không thể tải tin tuyển dụng. Vui lòng thử lại.
      </div>
    );
  }

  return <JobDetailView job={job} />;
}
