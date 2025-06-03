"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, MinusCircle, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MenuItemData {
  name: string;
  imageSrc: string;
  spice: number;
  ingredients: string[];
  price: {
    small: number;
    medium: number;
    large: number;
  };
  baseIngredients?: string[];
  availableToppings?: Array<{ name: string; price: number }>;
}

export interface CustomizedPizzaData {
  basePizzaName: string;
  selectedCrust: "thin" | "thick";
  selectedSize: "small" | "medium" | "large";
  selectedToppings: Array<{ name: string; price: number }>;
  quantity: number;
  finalPrice: number;
  imageSrc?: string;
}

interface PizzaCustomizationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  pizzaData: MenuItemData | null;
  onAddToCart: (customizedPizza: CustomizedPizzaData) => void;
}

const formatPrice = (price: number) => {
  return price.toFixed(2).replace('.', ',') + " zł";
};

const THICK_CRUST_EXTRA_COST = 5; // dopłata za grube ciasto

export default function PizzaCustomizationDialog({
  isOpen,
  onOpenChange,
  pizzaData,
  onAddToCart,
}: PizzaCustomizationDialogProps) {
  const [selectedSize, setSelectedSize] = useState<"small" | "medium" | "large">("medium");
  const [selectedCrust, setSelectedCrust] = useState<"thin" | "thick">("thin");
  const [selectedToppings, setSelectedToppings] = useState<Array<{ name: string; price: number }>>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (pizzaData) {
      setSelectedSize("medium");
      setSelectedCrust("thin");
      setSelectedToppings([]);
      setQuantity(1);
    }
  }, [pizzaData]);

  const handleToppingChange = (topping: { name: string; price: number }, checked: boolean) => {
    setSelectedToppings((prevToppings) =>
      checked
        ? [...prevToppings, topping]
        : prevToppings.filter((t) => t.name !== topping.name)
    );
  };

  const handleIncreaseQuantity = () => setQuantity((q) => q + 1);
  const handleDecreaseQuantity = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const calculatedPrice = useMemo(() => {
    if (!pizzaData) return 0;
    let currentPrice = pizzaData.price[selectedSize];
    
    if (selectedCrust === "thick") {
      currentPrice += THICK_CRUST_EXTRA_COST;
    }

    const toppingsPrice = selectedToppings.reduce((sum, topping) => sum + topping.price, 0);
    return (currentPrice + toppingsPrice) * quantity;
  }, [pizzaData, selectedSize, selectedCrust, selectedToppings, quantity]);

  const handleSubmit = () => {
    if (!pizzaData) return;
    const customizedPizza: CustomizedPizzaData = {
      basePizzaName: pizzaData.name,
      selectedCrust,
      selectedSize,
      selectedToppings,
      quantity,
      finalPrice: calculatedPrice,
      imageSrc: pizzaData.imageSrc,
    };
    onAddToCart(customizedPizza);
    onOpenChange(false);
  };

  if (!pizzaData) return null;

  const baseIngredientsList = pizzaData.baseIngredients || [];
  const availableToppingsList = pizzaData.availableToppings || [];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg md:max-w-xl lg:max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-2xl">
            Dostosuj: <span className="text-red-600">{pizzaData.name}</span>
          </DialogTitle>
          <DialogDescription>
            Wybierz rozmiar, ciasto i dodaj ulubione składniki!
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Wybierz rozmiar:</Label>
              <RadioGroup
                value={selectedSize}
                onValueChange={(value) => setSelectedSize(value as "small" | "medium" | "large")}
                className="grid grid-cols-3 gap-3"
              >
                {(["small", "medium", "large"] as const).map((size) => (
                  <div key={size}>
                    <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                    <Label
                      htmlFor={`size-${size}`}
                      className={cn(`flex flex-col items-center justify-center rounded-md border-2 p-3 hover:border-red-500 cursor-pointer transition-all`,
                        selectedSize === size ? "border-red-600 bg-red-50 ring-2 ring-red-600" : "border-stone-200")}
                    >
                      <span className="font-semibold text-sm capitalize">
                        {size === "small" ? "Mała" : size === "medium" ? "Średnia" : "Duża"}
                      </span>
                      <span className="text-xs">
                        {formatPrice(pizzaData.price[size])}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="text-base font-semibold">Wybierz rodzaj ciasta:</Label>
              <RadioGroup
                value={selectedCrust}
                onValueChange={(value) => setSelectedCrust(value as "thin" | "thick")}
                className="grid grid-cols-2 gap-3"
              >
                <div>
                  <RadioGroupItem value="thin" id="crust-thin" className="sr-only" />
                  <Label
                    htmlFor="crust-thin"
                    className={cn(`flex flex-col items-center justify-center rounded-md border-2 p-3 hover:border-red-500 cursor-pointer transition-all h-full`,
                      selectedCrust === "thin" ? "border-red-600 bg-red-50 ring-2 ring-red-600" : "border-stone-200")}
                  >
                    <span className="font-semibold text-sm">Cienkie</span>
                    <span className="text-xs">(Klasyczne)</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="thick" id="crust-thick" className="sr-only" />
                  <Label
                    htmlFor="crust-thick"
                    className={cn(`flex flex-col items-center justify-center rounded-md border-2 p-3 hover:border-red-500 cursor-pointer transition-all h-full`,
                      selectedCrust === "thick" ? "border-red-600 bg-red-50 ring-2 ring-red-600" : "border-stone-200")}
                  >
                    <span className="font-semibold text-sm">Grube</span>
                    <span className="text-xs">(+ {formatPrice(THICK_CRUST_EXTRA_COST)})</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {baseIngredientsList.length > 0 && (
                <div className="space-y-2">
                <Label className="text-base font-semibold">Składniki bazowe:</Label>
                <div className="flex flex-wrap gap-2">
                    {baseIngredientsList.map((ingredient) => (
                    <Badge key={ingredient} variant="secondary" className="font-normal text-sm bg-stone-200">
                        {ingredient}
                    </Badge>
                    ))}
                </div>
                </div>
            )}
            
            {availableToppingsList.length > 0 && (
              <div className="space-y-3">
                <Label className="text-base font-semibold">Dodatkowe składniki:</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 max-h-60 pr-2 overflow-y-auto pretty-scrollbar">
                  {availableToppingsList.map((topping) => (
                    <div key={topping.name} className="flex items-center justify-between p-2.5 rounded-md hover:bg-stone-50 border border-stone-200 transition-colors">
                        <div className="flex items-center space-x-3">
                            <Checkbox
                                id={`topping-${topping.name.replace(/\s+/g, '-')}`}
                                checked={selectedToppings.some(st => st.name === topping.name)}
                                onCheckedChange={(checked) => handleToppingChange(topping, checked as boolean)}
                                className="border-stone-400 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 focus:ring-offset-0 focus:ring-2 focus:ring-red-500"
                            />
                            <Label htmlFor={`topping-${topping.name.replace(/\s+/g, '-')}`} className="text-sm font-medium cursor-pointer select-none">
                                {topping.name}
                            </Label>
                        </div>
                      <span className="text-sm whitespace-nowrap">
                        + {formatPrice(topping.price)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Separator />
            
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Ilość:</Label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-stone-300 hover:border-red-500" onClick={handleDecreaseQuantity} disabled={quantity <= 1} aria-label="Zmniejsz ilość"> <MinusCircle className="h-4 w-4" /> </Button>
                <span className="text-lg font-semibold w-10 text-center">{quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-stone-300 hover:border-red-500" onClick={handleIncreaseQuantity} aria-label="Zwiększ ilość"> <PlusCircle className="h-4 w-4" /> </Button>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-6 pt-4 border-t bg-stone-50 sm:justify-between items-center">
          <div className="text-left mb-4 sm:mb-0">
            <p className="text-xs">Cena całkowita:</p>
            <p className="text-2xl font-bold text-red-700">{formatPrice(calculatedPrice)}</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <DialogClose asChild>
              <Button variant="outline" className="w-full sm:w-auto border-stone-300 hover:border-stone-400">Anuluj</Button>
            </DialogClose>
            <Button
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg"
              disabled={calculatedPrice <= 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" /> Dodaj do koszyka
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}