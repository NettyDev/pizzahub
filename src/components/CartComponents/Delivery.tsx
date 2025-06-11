"use client";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { RadioGroupItem, RadioGroup } from "@radix-ui/react-radio-group";
import { CircleCheck, Truck, CalendarDays, FastForward, Store, Utensils } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Controller, useFormContext } from "react-hook-form";

const delivery_options = [
  { value: "delivery", icon: Truck, label: "Dostawa" },
  { value: "pickup", icon: Store, label: "Odbiór osobisty" },
  { value: "restaurant", icon: Utensils, label: "Zjem na miejscu" }
];

const delivery_time_options = [
  { value: "now", icon: FastForward, label: "Jak najszybciej" },
  { value: "later", icon: CalendarDays, label: "Wybierz termin" }
];
export const available_hours = [
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00"
];

export default function DeliveryMethod() {
  const { control, watch } = useFormContext();

  const [deliveryTime, deliveryDate] = watch(["deliveryTime", "deliveryDate"]);

  return (
    <>
      <div>
        <h2 className="text-lg sm:text-xl mb-4 text-shadow-xs">Sposób dostarczenia</h2>
        <Controller
          name="deliveryMethod"
          control={control}
          render={({ field: { value, onChange } }) => (
            <RadioGroup value={value} onValueChange={onChange} className="w-full grid grid-cols-1 gap-4">
              {delivery_options.map((option) => (
                <RadioGroupItem
                  key={option.value}
                  value={option.value}
                  id={`delivery-${option.value}`}
                  className={cn(
                    "relative group ring-1 ring-stone-300 p-4 text-left rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md flex flex-col justify-between min-h-[90px]",
                    "data-[state=checked]:ring-2 data-[state=checked]:ring-red-600 data-[state=checked]:bg-red-50"
                  )}
                >
                  <CircleCheck className="absolute top-2.5 right-2.5 h-5 w-5 text-red-600 fill-white group-data-[state=unchecked]:hidden" />
                  {/* <Truck className="mb-2 h-7 w-7 text-stone-500" /> */}
                  <option.icon className="mb-2 h-7 w-7 text-stone-500" />
                  <Label
                    htmlFor={`delivery-${option.value}`}
                    className="text-sm font-semibold tracking-tight cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </RadioGroupItem>
              ))}
            </RadioGroup>
          )}
        />
      </div>

      <div>
        <h2 className="text-lg sm:text-xl mb-4 text-shadow-xs">Termin realizacji</h2>
        <Controller
          name="deliveryTime"
          control={control}
          render={({ field: { value, onChange } }) => (
            <RadioGroup value={value} onValueChange={onChange} className="w-full grid grid-cols-1 gap-4">
              {delivery_time_options.map((option) => (
                <RadioGroupItem
                  key={option.value}
                  value={option.value}
                  id={`time-${option.value}`}
                  className={cn(
                    "relative group ring-1 ring-stone-300 p-4 text-left rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md flex flex-col justify-between min-h-[90px]",
                    "data-[state=checked]:ring-2 data-[state=checked]:ring-red-600 data-[state=checked]:bg-red-50"
                  )}
                >
                  <CircleCheck className="absolute top-2.5 right-2.5 h-5 w-5 text-red-600 fill-white group-data-[state=unchecked]:hidden" />
                  {/* <CalendarDays className="mb-2 h-7 w-7 text-stone-500" /> */}
                  <option.icon className="mb-2 h-7 w-7 text-stone-500" />
                  <Label
                    htmlFor={`time-${option.value}`}
                    className="text-sm font-semibold tracking-tight cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </RadioGroupItem>
              ))}
            </RadioGroup>
          )}
        />

        {deliveryTime === "later" && (
          <div className="mt-4 space-y-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal border-stone-300 hover:border-stone-400 text-sm h-11",
                    !deliveryDate && "text-stone-500"
                  )}
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {deliveryDate ? format(deliveryDate, "PPP", { locale: pl }) : <span>Wybierz datę</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                side="bottom"
                align="start"
                className="bg-white shadow-xl rounded-md border border-stone-200 p-0 w-auto z-50"
              >
                <Controller
                  name="deliveryDate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Calendar
                      mode="single"
                      selected={value}
                      onSelect={onChange}
                      disabled={(date: Date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                      initialFocus
                    />
                  )}
                />
              </PopoverContent>
            </Popover>
            <Controller
              name="deliveryHour"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="w-full border-stone-300 hover:border-stone-400 text-sm h-11">
                    <SelectValue placeholder="Wybierz godzinę" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-xl rounded-md border border-stone-200 z-50">
                    {available_hours.map((hour) => (
                      <SelectItem key={hour} value={hour} className="text-sm">
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}
      </div>
    </>
  );
}
