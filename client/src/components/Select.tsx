import type { SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <select
      className={twMerge(
        `
          border
          rounded
          border-gray-300
          px-3
          py-2     
               

          bg-white

          transition

          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent

          disabled:opacity-50
          disabled:cursor-not-allowed
        `,
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
