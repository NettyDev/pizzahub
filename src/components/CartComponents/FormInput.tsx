import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import clsx from "clsx";

interface FormInputProps {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  className?: string;
  value?: string;
  disabled?: boolean;
  error?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  label,
  id,
  placeholder,
  type = "text",
  required = false,
  className = "",
  value,
  disabled = false,
  error = false,
  onChange
}: FormInputProps) {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      <Label htmlFor={id} className="font-poppins-bold mb-1.5 text-sm text-shadow-xs">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        required={required}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={clsx(
          disabled && "bg-stone-100 cursor-not-allowed",
          error ? "border-2 border-red-500" : "border-stone-300",
          "border  rounded-md p-2.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
        )}
      />
    </div>
  );
}
