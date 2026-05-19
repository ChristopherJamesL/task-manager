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
        inline-flex
        items-center
        justify-center
        rounded 
        px-4
        py-2 
        font-medium 
        transition
        cursor-pointer

        bg-blue-600 
        text-white 

        hover:bg-blue-700
        active:scale-[0.98]

        disabled:opacity-50
        disabled:cursor-not-allowed

        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:ring-offset-2
        
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
