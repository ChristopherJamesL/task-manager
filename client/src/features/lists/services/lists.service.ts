import {
  httpGetAllLists,
  httpGetListById,
  httpCreateList,
  httpUpdateList,
  httpDeleteList,
} from "../api/lists.api";
import type {
  ListType,
  CreateListProps,
  UpdateListProps,
} from "../types/lists.types";

export const listService = {
  async getLists(): Promise<ListType[]> {
    const res = await httpGetAllLists();
    return res.lists;
  },

  async getListById(listId: string): Promise<ListType> {
    return httpGetListById(listId);
  },

  async createList(data: CreateListProps): Promise<ListType> {
    return httpCreateList(data);
  },

  async updateList({ listId, name }: UpdateListProps): Promise<ListType> {
    return httpUpdateList({ listId, name });
  },

  async deleteList(listId: string) {
    return httpDeleteList(listId);
  },
};
