import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

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
    <form className="flex mb-6 gap-2" onSubmit={handleSubmit}>
      <Input
        type="text"
        value={name}
        placeholder="New list name"
        disabled={isPending}
        onChange={(e) => setName(e.target.value)}
      />

      <Button
        className="w-auto shrink-0 px-4 text-sm"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Creating..." : "Create"}
      </Button>
    </form>
  );
}
