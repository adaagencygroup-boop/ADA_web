"use client";

import { use } from "react";
import { useCandidateById } from "@/src/hooks/useCandidates";
import CandidateCvViewer from "@/app/(dashboard)/tuyen-dung/ung-vien/[candidateId]/cv/_components/CandidateCvViewer";

export default function CandidateCvPage({
  params,
}: {
  params: Promise<{ candidateId: string }>;
}) {
  const { candidateId } = use(params);
  const { data: candidate, isLoading, isError } = useCandidateById(candidateId);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-sm text-[#64748B]">
        Đang tải CV ứng viên...
      </div>
    );
  }

  if (isError || !candidate) {
    return (
      <div className="flex flex-1 items-center justify-center py-20 text-sm text-red-600">
        Không thể tải thông tin ứng viên. Vui lòng thử lại.
      </div>
    );
  }

  return <CandidateCvViewer candidate={candidate} />;
}
