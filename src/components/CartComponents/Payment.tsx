import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@radix-ui/react-radio-group";
import { Banknote, CircleCheck, CircleDollarSign, CreditCard, Nfc } from "lucide-react";
import { createElement } from "react";

const pay_options = [
  { value: "payu", icon: Nfc, label: "PayU", description: "Szybka płatność online" },
  { value: "card", icon: CreditCard, label: "Karta kredytowa", description: "Płatność kartą kredytową" },
  { value: "cash", icon: Banknote, label: "Gotówka", description: "Płatność przy odbiorze" }
];

export default function PaymentMethod() {
  return (
    <RadioGroup
      defaultValue={pay_options[0].value}
      className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      {pay_options.map((option) => (
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
          {createElement(option.icon, { className: "mb-2 h-7 w-7 text-stone-500" })}
          <div>
            <Label
              htmlFor={`pay-${option.value}`}
              className="font-poppins-bold text-sm font-semibold tracking-tight text-stone-800 cursor-pointer"
            >
              {option.label}
            </Label>
            <p className="text-xs text-stone-600 mt-0.5">{option.description}</p>
          </div>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
