import type { InputHTMLAttributes } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`
        w-full
        border
        border-gray-300
        p-2
        rounded        
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        transition
        ${className}
     `}
      {...props}
    />
  );
}
