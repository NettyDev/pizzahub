import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  className?: string;
  value?: string;
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
        onChange={onChange}
        className="border border-stone-300 rounded-md p-2.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
      />
    </div>
  );
}