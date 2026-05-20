import type { ApiResponse } from "../../../types/api.types";

export type AllListsPayload = { lists: List[] };

export type ListPayload = { list: List };

export type DeletedList = {
  id: number;
  name: string;
};

export type UpdateListProps = {
  listId: number;
  name: string;
};

export type CreateListProps = {
  name: string;
};

export type ListIdProps = number;

export type List = {
  id: number;
  name: string;
  createdAt: string;
};

export type GetAllListsResponse = ApiResponse<AllListsPayload>;

export type SingleListResponse = ApiResponse<ListPayload>;

export type DeleteListResponse = ApiResponse<DeletedList>;
