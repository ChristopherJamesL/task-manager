export type UpdateListProps = {
  listId: ListIdProps;
  name: CreateListProps;
};

export type CreateListProps = {
  name: string;
};

export type ListIdProps = string;

export type ListType = {
  id: string;
  name: string;
  created_at: string;
};

export type GetAllListsResponse = {
  lists: ListType[];
};

export type DeleteListResponse = {
  id: string;
  name: string;
};
