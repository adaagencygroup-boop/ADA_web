import apiClient, { unwrap } from "@/src/lib/api/client";
import type { PageResponse } from "@/src/lib/api/types";

export type ContactStatus = "pending" | "responded";

export type Contact = {
  id: string;
  customerFullname: string;
  customerPhone: string | null;
  customerEmail: string | null;
  message: string;
  status: ContactStatus;
  feedbackContent: string | null;
  feedbackAttachmentURL: string | null;
  feedbackSentAt: string | null;
  note: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GetContactsParams = {
  page?: number;
  size?: number;
  status?: ContactStatus;
  search?: string;
  fromDate?: string;
  toDate?: string;
};

export type ExportContactsParams = {
  status?: ContactStatus;
  search?: string;
  fromDate?: string;
  toDate?: string;
};

export type RespondContactPayload = {
  feedbackContent: string;
  feedbackAttachmentURL?: string | null;
};

export function getContacts(params: GetContactsParams, signal?: AbortSignal) {
  return unwrap<PageResponse<Contact>>(
    apiClient.get("/admin/contacts", { params, signal })
  );
}

export async function exportContactsExcel(
  params: ExportContactsParams,
  signal?: AbortSignal
) {
  const response = await apiClient.get("/admin/contacts/exportExcel", {
    params,
    signal,
    responseType: "blob",
  });
  return response.data as Blob;
}

export function getContactById(id: string, signal?: AbortSignal) {
  return unwrap<Contact>(apiClient.get(`/admin/contacts/${id}`, { signal }));
}

export function respondContact(id: string, payload: RespondContactPayload) {
  return unwrap<Contact>(
    apiClient.post(`/admin/contacts/${id}/respond`, payload)
  );
}

export function updateContactNote(id: string, note: string) {
  return unwrap<Contact>(
    apiClient.patch(`/admin/contacts/${id}/note`, { note })
  );
}

export function deleteContact(id: string) {
  return unwrap<void>(apiClient.delete(`/admin/contacts/${id}`));
}
