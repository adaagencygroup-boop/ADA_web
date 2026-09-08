import { apiPost } from "@/src/lib/api/http";
import type { SubmitContactDTO } from "@/src/types/contacts";

export async function submitContact(
  data: SubmitContactDTO,
): Promise<{ success: boolean; error?: string }> {
  try {
    await apiPost<void>("/public/contacts", data);
    return { success: true };
  } catch (error: unknown) {
    console.error("Error submitting contact:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Đã xảy ra lỗi khi gửi lời nhắn.";
    return { success: false, error: errorMessage };
  }
}
