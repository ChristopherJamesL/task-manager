import type { TextareaHTMLAttributes } from "react";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ className = "", ...props }: TextAreaProps) {
  return (
    <textarea
      className={`
            w-full
            border
            rounded
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
