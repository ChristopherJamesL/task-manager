export type UpdateListProps = {
  listId: ListIdProps;
  name: CreateListProps;
};

export type CreateListProps = {
  name: string;
};

export type ListIdProps = number;

export type ListType = {
  id: number;
  name: string;
  createdAt: string;
};

export type GetAllListsResponse = {
  lists: ListType[];
};

export type DeleteListResponse = {
  id: number;
  name: string;
};
