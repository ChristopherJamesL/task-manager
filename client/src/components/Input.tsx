export type InputProps = {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
            w-full
            border
            border-gray-300
            p-2
            rounded
            mb-3
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
        "
    />
  );
}
