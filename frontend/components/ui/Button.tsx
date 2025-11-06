interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  type = "button",
  className = "",
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
