import { apiClient } from "../../../api/client/client";
import type {
  ListIdProps,
  CreateListProps,
  UpdateListProps,
  ListType,
  GetAllListsResponse,
  DeleteListResponse,
} from "../types/lists.types";

export const httpGetAllLists = async (): Promise<GetAllListsResponse> => {
  const response = await apiClient.get("/lists");
  return response.data.data;
};

export const httpGetListById = async (
  listId: ListIdProps,
): Promise<ListType> => {
  const response = await apiClient.get(`/lists/${listId}`);
  return response.data.data.list;
};

export const httpCreateList = async (
  data: CreateListProps,
): Promise<ListType> => {
  const response = await apiClient.post("/lists", data);
  return response.data.data;
};

export const httpUpdateList = async ({
  listId,
  name,
}: UpdateListProps): Promise<ListType> => {
  const response = await apiClient.patch(`/lists/${listId}`, {
    name,
  });
  return response.data.data;
};

export const httpDeleteList = async (
  listId: ListIdProps,
): Promise<DeleteListResponse> => {
  const response = await apiClient.delete(`/lists/${listId}`);
  return response.data.data;
};
