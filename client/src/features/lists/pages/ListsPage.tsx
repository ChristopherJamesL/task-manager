import { useNavigate, Link } from "react-router";
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
    <div className="w-full max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-semibold text-2xl">Lists</h1>

        <Link
          to="/dashboard"
          className=" 
            rounded 
            bg-green-500 
            text-white 
            px-3 
            py-1 
            text-sm 
            hover:bg-green-600 
            cursor-pointer"
          onClick={handleNavigate}
        >
          Dashboard
        </Link>
      </div>

      <CreateListForm
        onCreate={(name) => createList.mutate({ name })}
        isPending={createList.isPending}
      />

      {lists?.length === 0 ? (
        <div className="border rounded p-6 text-center text-gray-500">
          No lists yet
        </div>
      ) : (
        <ul className="space-y-3">
          {lists?.map((list) => {
            return <ListCard key={list.id} list={list} />;
          })}
        </ul>
      )}
    </div>
  );
}
