export type ApiResponse<T> = {
  success: boolean;
  data: T;
};

export type ApiErrorResponse = {
  success: false;
  error: {
    message: string;
    field?: string | null;
  };
};

export type PaginatedMeta = {
  nextCursor: {
    value: string;
    id: number;
  } | null;
  hasNextPage: boolean;
};

export type PaginatedResponse<T> = ApiResponse<T> & {
  meta: PaginatedMeta;
};
