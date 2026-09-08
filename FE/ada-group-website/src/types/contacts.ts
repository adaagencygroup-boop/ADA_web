export interface SubmitContactDTO {
  customerFullname: string;
  customerPhone: string | null;
  customerEmail: string | null;
  message: string;
}
