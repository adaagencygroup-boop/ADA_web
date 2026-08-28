import { Contact, SubmitContactDTO } from "@/src/types/contacts";

/**
 * Mock function to submit a contact message.
 * In the future, this will be replaced with an actual API call (e.g., fetch('/api/contacts', ...))
 * using Prisma to insert into PostgreSQL.
 */
export async function submitContact(data: SubmitContactDTO): Promise<{ success: boolean; data?: Contact; error?: string }> {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Basic validation matching the NOT NULL constraint in SQL
    if (!data.customerFullname || !data.message) {
      return { success: false, error: "Thiếu thông tin bắt buộc (Họ tên, Nội dung)." };
    }

    const newContact: Contact = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      customerFullname: data.customerFullname,
      customerPhone: data.customerPhone || null,
      customerEmail: data.customerEmail || null,
      message: data.message,
      note: null,
      status: 'pending',
      feedbackContent: null,
      feedbackAttachmentUrl: null,
      feedbackSentAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      deletedAt: null,
    };

    // Log to console to simulate successful DB insertion
    console.log("Mock submitted contact:", newContact);

    return { success: true, data: newContact };
  } catch (error: unknown) {
    console.error("Error submitting contact:", error);
    const errorMessage = error instanceof Error ? error.message : "Đã xảy ra lỗi khi gửi lời nhắn.";
    return { success: false, error: errorMessage };
  }
}
