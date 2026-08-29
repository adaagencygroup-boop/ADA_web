export type CandidateStatus = 'new' | 'reviewing' | 'interviewing' | 'rejected' | 'hired';

export interface Candidate {
  id: string;
  recruitmentId: string;
  fullname: string;
  email: string | null;
  phone: string | null;
  resumeUrl: string | null;
  message: string | null;
  note: string | null;
  status: CandidateStatus;
  appliedAt: string;
  updatedAt: string;
}

export interface ApplyCandidateDTO {
  recruitmentId: string;
  fullname: string;
  email: string | null;
  phone: string | null;
  resumeUrl: string | null;
  message: string | null;
}
