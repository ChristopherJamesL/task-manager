import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`
        w-full 
        bg-blue-600 
        text-white 
        p-2 
        rounded 
        font-medium 
        cursor-pointer
        transition
        hover:bg-blue-700
        active:scale-[0.98]
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
