export type ContactStatus = 'pending' | 'processing' | 'resolved';

export interface Contact {
  id: string;
  customerFullname: string;
  customerPhone: string | null;
  customerEmail: string | null;
  message: string;
  note: string | null;
  status: ContactStatus;
  feedbackContent: string | null;
  feedbackAttachmentUrl: string | null;
  feedbackSentAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface SubmitContactDTO {
  customerFullname: string;
  customerPhone: string | null;
  customerEmail: string | null;
  message: string;
}
