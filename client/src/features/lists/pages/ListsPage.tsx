import { useNavigate } from "react-router";
import { useListsQuery } from "../queries/useListsQuery";
import { useCreateListMutation } from "../queries/useCreateListMutation";
import ListCard from "../components/ListCard";
import CreateListForm from "../components/CreateListForm";

export default function ListsPage() {
  const navigate = useNavigate();

  const { data: lists, isLoading, isError } = useListsQuery();

  const createList = useCreateListMutation();

  if (isLoading) return <div>Loading lists...</div>;
  if (isError) return <div>Something went wrong</div>;

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-w-2xl">
      <div className="flex justify-between mb-2 ">
        <h1>Lists</h1>
        <button
          className="border bg-amber-600 cursor-pointer"
          onClick={handleNavigate}
        >
          Dashboard
        </button>
      </div>

      <CreateListForm
        onCreate={(name) => createList.mutate({ name })}
        isPending={createList.isPending}
      />

      {lists?.length === 0 ? (
        <p>No lists yet</p>
      ) : (
        <ul className="flex flex-col">
          {lists?.map((list) => {
            return <ListCard key={list.id} list={list} />;
          })}
        </ul>
      )}
    </div>
  );
}
