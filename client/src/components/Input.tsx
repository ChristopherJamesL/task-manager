import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input(
  { className = "", ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      className={twMerge(
        `
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
      `,
        className,
      )}
      {...props}
    />
  );
}

export default forwardRef(Input);
