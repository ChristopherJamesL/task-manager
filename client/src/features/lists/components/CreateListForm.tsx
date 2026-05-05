import { useState } from "react";

export default function CreateListForm({
  onCreate,
  isPending,
}: {
  onCreate: (name: string) => void;
  isPending: boolean;
}) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    onCreate(name);

    setName("");
  };

  return (
    <form className="flex mb-2 justify-between" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border min-w-2xs"
        value={name}
        placeholder="New list name"
        onChange={(e) => setName(e.target.value)}
      />

      <button
        className="border bg-blue-400 cursor-pointer"
        type="submit"
        disabled={isPending}
      >
        Create
      </button>
    </form>
  );
}
