export type APIResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
};

export type Pagination = {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
};

export type PageResponse<T> = {
  items: T[];
  pagination: Pagination;
};
