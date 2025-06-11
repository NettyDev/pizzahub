import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@radix-ui/react-radio-group";
import { Banknote, CircleCheck, CircleDollarSign, CreditCard, Nfc } from "lucide-react";

interface PaymentMethodProps {
  onChange?: (value: string) => void;
  selectedValue?: string;
  payOptions: {
    value: string;
    icon: React.ElementType;
    label: string;
    description: string;
  }[];
}

export default function PaymentMethod({ onChange, selectedValue, payOptions }: PaymentMethodProps) {
  return (
    <RadioGroup
      value={selectedValue}
      className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      onValueChange={onChange}
    >
      {payOptions.map((option) => (
        <RadioGroupItem
          key={option.value}
          value={option.value}
          id={`pay-${option.value}`}
          className={cn(
            "relative group ring-1 ring-stone-300 p-4 text-left rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md flex flex-col justify-between min-h-[110px]",
            "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2",
            "data-[state=checked]:ring-2 data-[state=checked]:ring-red-600 data-[state=checked]:bg-red-50"
          )}
        >
          <CircleCheck className="absolute top-2.5 right-2.5 h-5 w-5 text-red-600 fill-white group-data-[state=unchecked]:hidden" />
          {/* <CircleDollarSign className="mb-2 h-7 w-7 text-stone-500" /> */}
          <option.icon className="mb-2 h-7 w-7 text-stone-500" />
          <div>
            <Label htmlFor={`pay-${option.value}`} className="text-sm font-semibold tracking-tightcursor-pointer">
              {option.label}
            </Label>
            <p className="text-xs mt-0.5">{option.description}</p>
          </div>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
