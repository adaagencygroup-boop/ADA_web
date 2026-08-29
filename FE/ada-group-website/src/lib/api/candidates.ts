import { Candidate, ApplyCandidateDTO } from "@/src/types/candidates";

/**
 * Mock function to submit a candidate application.
 * In the future, this will be replaced with an actual API call (e.g., fetch('/api/candidates', ...))
 * using Prisma to insert into PostgreSQL.
 */
export async function submitApplication(data: ApplyCandidateDTO): Promise<{ success: boolean; data?: Candidate; error?: string }> {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Basic validation matching the NOT NULL constraint in SQL
    if (!data.recruitmentId || !data.fullname) {
      return { success: false, error: "Thiếu thông tin bắt buộc (recruitmentId, fullname)." };
    }

    const newCandidate: Candidate = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      recruitmentId: data.recruitmentId,
      fullname: data.fullname,
      email: data.email || null,
      phone: data.phone || null,
      resumeUrl: data.resumeUrl || null,
      message: data.message || null,
      note: null,
      status: 'new',
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Log to console to simulate successful DB insertion
    console.log("Mock submitted candidate:", newCandidate);

    return { success: true, data: newCandidate };
  } catch (error: unknown) {
    console.error("Error submitting application:", error);
    const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi khi gửi hồ sơ.";
    return { success: false, error: errorMessage };
  }
}
