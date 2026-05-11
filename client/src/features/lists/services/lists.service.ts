import {
  httpGetAllLists,
  httpGetListById,
  httpCreateList,
  httpUpdateList,
  httpDeleteList,
} from "../api/lists.api";
import type {
  List,
  CreateListProps,
  UpdateListProps,
  DeletedList,
} from "../types/lists.types";

export const listService = {
  async getLists(): Promise<List[]> {
    const res = await httpGetAllLists();
    console.log("response: ", res);
    return res.data.lists;
  },

  async getListById(listId: number): Promise<List> {
    const res = await httpGetListById(listId);
    return res.data.list;
  },

  async createList(data: CreateListProps): Promise<List> {
    const res = await httpCreateList(data);
    return res.data.list;
  },

  async updateList({ listId, name }: UpdateListProps): Promise<List> {
    const res = await httpUpdateList({ listId, name });
    return res.data.list;
  },

  async deleteList(listId: number): Promise<DeletedList> {
    const res = await httpDeleteList(listId);
    return res.data;
  },
};
