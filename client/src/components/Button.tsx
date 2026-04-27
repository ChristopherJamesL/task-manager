export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled: boolean;
  type?: "button" | "submit";
};

export default function Button({
  children,
  onClick,
  disabled,
  type = "button",
}: ButtonProps) {
  return (
    <button
      className="
        w-full 
        bg-blue-600 
        text-white 
        p-2 
        rounded 
        font-medium 
        cursor-pointer
        hover:bg-blue-700 
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        "
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
