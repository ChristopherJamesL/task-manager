import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
  return (
    <input
      {...props}
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
