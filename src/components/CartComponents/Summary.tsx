import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartSummaryData } from "./types";

interface SummaryProps {
  summaryData: CartSummaryData;
}

const formatPrice = (price: number) => {
  return price.toFixed(2).replace('.', ',') + " zł";
};

export default function Summary({ summaryData }: SummaryProps) {
  const { items, subTotal, deliveryCost, total, deliveryInfo } = summaryData;

  if (!items || items.length === 0) {
    return (
      <div className="text-center text-stone-500 py-8">
        <img src="/cart.png" alt="Koszyk jest pusty" className="w-3/4 sm:w-2/3 md:w-full max-w-xs sm:max-w-sm md:max-w-md" />
        <p>Twój koszyk jest pusty.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 mb-6 pb-6 border-b border-stone-300">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-start">
            <div>
              <p className="text-base font-poppins font-semibold text-stone-800">
                {item.name} (x{item.quantity})
              </p>
              {item.description && (
                <p className="text-xs text-stone-500">{item.description}</p>
              )}
            </div>
            <span className="text-base font-semibold text-stone-800 whitespace-nowrap">
              {formatPrice(item.pricePerUnit * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between">
          <span className="text-sm font-poppins text-stone-600">Suma częściowa</span>
          <span className="text-sm font-medium text-stone-700">{formatPrice(subTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-poppins text-stone-600">Koszty dostawy</span>
          <span className="text-sm font-medium text-stone-700">{formatPrice(deliveryCost)}</span>
        </div>
      </div>

      <div className="w-full border-t-2 border-red-500 pt-6">
        <div className="flex justify-between items-center p-3 bg-red-50 rounded-md">
          <span className="text-lg font-bold font-poppins-bold text-red-700 tracking-wide">
            DO ZAPŁATY
          </span>
          <span className="text-xl font-bold text-red-700">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="text-center mt-8">
        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-poppins-bold text-base py-3.5 shadow-md hover:shadow-lg transition-shadow"
          disabled={total === 0}>
          Zamów i zapłać
        </Button>
      </div>

      {deliveryInfo && (
        <div className="text-center mt-5">
          <Popover>
            <PopoverTrigger className="text-xs font-poppins text-stone-500 hover:text-stone-700 underline flex items-center justify-center gap-1">
              <Info className="w-3.5 h-3.5" />
              Szczegóły kosztów
            </PopoverTrigger>
            <PopoverContent className="bg-white shadow-xl p-4 rounded-lg border border-stone-200 w-64 sm:w-72 z-50" sideOffset={8}>
              <p className="text-xs font-poppins text-stone-700 leading-relaxed">
                {deliveryInfo}
              </p>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );
}