import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`
        w-full
        rounded        
        border
        border-gray-300
        px-3
        py-2

        transition

        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-transparent

        disabled:opacity-50
        disabled:cursor-not-allowed

        ${className}
     `}
      {...props}
    />
  );
}
