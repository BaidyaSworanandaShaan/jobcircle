import { Field, ErrorMessage } from "formik";

interface InputProps {
  name: string;
  type?: string;
  placeholder?: string;
  label: string;
}

export default function Input({
  name,
  type = "text",
  placeholder,
  label,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ErrorMessage
        name={name}
        component="p"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
}
