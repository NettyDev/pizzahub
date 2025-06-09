"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Info, X as XIcon, ShoppingBag, MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartSummaryData } from "./types";
import { toast } from "sonner";
import Link from "next/link";
import clsx from "clsx";
import { Composition, Pizza, useCartState } from "../CartContext";
import { useEffect, useState } from "react";

interface SummaryProps {
  isDelivery: boolean;
}

const formatPrice = (price: number) => {
  return price.toFixed(2).replace(".", ",") + " zł";
};

export default function Summary({ isDelivery }: SummaryProps) {
  const { cart, totalPrice, deliveryIncluded, remove, changeAmount } = useCartState();
  // const { deliveryCost, total, deliveryInfo } = summaryData;
  const [deliveryInfo, setDeliveryInfo] = useState<string>("");
  const [deliveryCost, setDeliveryCost] = useState(0);

  const total = totalPrice + deliveryCost;

  useEffect(() => {
    if (isDelivery) {
      if (deliveryIncluded) {
        setDeliveryCost(0);
        setDeliveryInfo("Dostawa gratis! (zamówienie powyżej 70,00 zł)");
      } else {
        const cost = 10;
        setDeliveryCost(cost);
        setDeliveryInfo(
          `Koszt dostawy: ${cost.toFixed(2).replace(".", ",")} zł. Min. zamówienie dla darmowej dostawy: 70,00 zł.`
        );
      }
    } else {
      setDeliveryCost(0);
      setDeliveryInfo("Wybrano opcję bez kosztów dostawy.");
    }
  }, [cart, deliveryIncluded, isDelivery]);

  if (!cart || cart.length === 0) {
    return (
      <div className="text-center py-10 sm:py-16 px-4">
        <ShoppingBag className="w-24 h-24 sm:w-32 sm:h-32 text-red-700 mx-auto mb-6" />
        <h3 className="text-xl font-semibold mb-2">Twój koszyk jest pusty.</h3>
        <p className="text-sm mb-6 max-w-xs mx-auto">
          Wygląda na to, że nic jeszcze nie dodałeś. Czas na pyszne zakupy!
        </p>
        <Link href="/menu" passHref>
          <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 rounded-md">
            Przeglądaj menu
          </Button>
        </Link>
      </div>
    );
  }

  const handleRemove = (itemId: number, itemName: string) => {
    remove(itemId);
    toast.success(`Usunięto "${itemName}" z koszyka.`);
  };

  const isComposition = (item: Pizza | Composition): boolean => {
    return "sauce" in item;
  };

  return (
    <>
      <div className="space-y-4 mb-6 pb-6 border-b border-stone-200">
        {cart.map((item, idx) => (
          <div key={idx} className={clsx("flex flex-col items-start p-3 rounded-lg transition-colors")}>
            <div className="flex w-full justify-between items-start">
              <p className="text-base font-semibold leading-tight">{item.name}</p>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-stone-400 hover:text-red-600 hover:bg-red-50/50 mt-1 px-1.5 py-0.5 h-auto"
                onClick={() => handleRemove(idx, item.name)}
                aria-label={`Usuń ${item.name} z koszyka`}
              >
                <XIcon className="w-3.5 h-3.5 mr-1" /> Usuń
              </Button>
            </div>
            <div className="w-full text-xs pt-1 pl-2">
              <p>
                <b>Rozmiar: </b>
                {(item.size == "small" ? "mała" : item.size == "medium" ? "średnia" : "duża") +
                  ` (${formatPrice(item.price)})`}
              </p>
              <p>
                <b>Ciasto: </b>
                {item.crust == "thick" ? `grube (+${formatPrice(5)})` : "cienkie"}
              </p>
              {isComposition(item) && (
                <p>
                  <b>Sos: </b>
                  {"sauce" in item && item.sauce?.name.split(" ")[1]}
                </p>
              )}
              {item.toppings && item.toppings.length > 0 && (
                <>
                  {isComposition(item) ? <b>Składniki:</b> : <b>Dodatki:</b>}
                  <ul className="pl-6 list-disc">
                    {item.toppings.map((v, i) => (
                      <li>
                        <p>
                          {v.name} {!isComposition(item) && `(+${formatPrice(v.price)})`}
                        </p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="flex w-full justify-between items-end">
              <div className="flex items-center gap-2 mt-1.5">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:text-red-600 hover:bg-red-50 rounded-full"
                  onClick={() => changeAmount(item.quantity - 1, idx)}
                  aria-label={`Zmniejsz ilość ${item.name}`}
                >
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium0 w-6 text-center">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:text-green-600 hover:bg-green-50 rounded-full"
                  onClick={() => changeAmount(item.quantity + 1, idx)}
                  aria-label={`Zwiększ ilość ${item.name}`}
                >
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-base font-semibold whitespace-nowrap">
                {formatPrice(
                  (item.price +
                    (item.crust == "thick" ? 5 : 0) +
                    (item.toppings && item.toppings.length > 0 && !("sauce" in item)
                      ? item.toppings.reduce((a, b) => a + b.price, 0)
                      : 0)) *
                    item.quantity
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2.5 mb-6">
        <div className="flex justify-between">
          <span className="text-sm">Suma częściowa</span>
          <span className="text-sm font-medium">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Koszty dostawy</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{formatPrice(deliveryCost)}</span>
            {deliveryInfo && deliveryCost > 0 && (
              <Popover>
                <PopoverTrigger className="text-stone-400 hover:text-stone-600 transition-colors">
                  <Info className="w-3.5 h-3.5" />
                </PopoverTrigger>
                <PopoverContent
                  className="bg-white shadow-xl p-3 rounded-lg border text-xs text-stone-700 leading-relaxed w-auto max-w-[280px] z-50"
                  sideOffset={5}
                  align="end"
                >
                  {deliveryInfo}
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>

      <div className="w-full border-t-2 border-stone-200 pt-5 pb-1">
        <div className="flex justify-between items-center p-3">
          <span className="text-lg font-bold text-red-700 tracking-wide">DO ZAPŁATY</span>
          <span className="text-xl sm:text-2xl font-bold text-red-700">{formatPrice(total)}</span>
        </div>
      </div>

      <div className="text-center mt-8">
        <Button
          size="lg"
          className="w-full bg-red-600 hover:bg-red-700 text-white text-base py-3 shadow-lg hover:shadow-xl active:shadow-md transition-all duration-150 rounded-lg"
          disabled={total === 0}
          onClick={() => toast.info("Przechodzenie do płatności...")}
        >
          Zamów i zapłać
        </Button>
      </div>

      {deliveryInfo && deliveryCost === 0 && (
        <div className="text-center mt-5">
          <p className="text-xs flex items-center justify-center gap-1">
            <Info className="w-3.5 h-3.5" />
            {deliveryInfo}
          </p>
        </div>
      )}
    </>
  );
}
