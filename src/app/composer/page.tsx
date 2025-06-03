"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
    PlusCircle, MinusCircle, ShoppingCart, Beef, Vegan, Pizza, } from "lucide-react";
import { pizzaSizes, pizzaSauces, pizzaToppings, PizzaSize, PizzaSauce, PizzaTopping } from "@/components/PizzaComposer/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";

const THICK_CRUST_EXTRA_COST = 5; 

function formatPrice(price: number) {
  if (typeof price !== 'number' || isNaN(price)) {
    return '0,00 zł';
  }
  return price.toFixed(2).replace('.', ',') + " zł";
}

interface CartPizzaItem {
  id: string;
  name: string;
  size: PizzaSize["id"];
  crust: "thin" | "thick";
  sauce: PizzaSauce;
  toppings: PizzaTopping[];
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageSrc?: string;
}

export default function ComposerPage() {
  const [selectedSize, setSelectedSize] = useState<PizzaSize>(pizzaSizes[1]);
  const [selectedCrust, setSelectedCrust] = useState<"thin" | "thick">("thin");
  const [selectedSauce, setSelectedSauce] = useState<PizzaSauce>(pizzaSauces[0]);
  const [selectedToppings, setSelectedToppings] = useState<PizzaTopping[]>([]);
  const [quantity, setQuantity] = useState(1);


  const handleSizeChange = (sizeId: PizzaSize["id"]) => {
    const newSize = pizzaSizes.find(s => s.id === sizeId);
    if (newSize) setSelectedSize(newSize);
  };

  const handleCrustChange = (crustType: "thin" | "thick") => {
    setSelectedCrust(crustType);
  };

  const handleSauceChange = (sauceId: PizzaSauce["id"]) => {
    const newSauce = pizzaSauces.find(s => s.id === sauceId);
    if (newSauce) setSelectedSauce(newSauce);
  };

  const handleToppingToggle = (topping: PizzaTopping) => {
    setSelectedToppings(prev =>
      prev.find(t => t.id === topping.id)
        ? prev.filter(t => t.id !== topping.id)
        : [...prev, topping]
    );
  };

  const handleAddToCart = () => {
    const cartItem: CartPizzaItem = {
      id: `custom-${Date.now()}`,
      name: "Pizza Skomponowana",
      size: selectedSize.id,
      crust: selectedCrust,
      sauce: selectedSauce,
      toppings: selectedToppings,
      quantity,
      unitPrice: totalPrice / quantity,
      totalPrice,
      imageSrc: selectedSize.imageSrc,
    };
    console.log("Dodano do koszyka:", cartItem);
    toast.success("Pizza skomponowana i dodana do koszyka!", {
      description: `Rozmiar: ${selectedSize.name}, Ciasto: ${selectedCrust === 'thin' ? 'Cienkie' : 'Grube'}, Cena: ${formatPrice(totalPrice)}`,
    });
  };

  const totalPrice = useMemo(() => {
    const sizePrice = selectedSize?.basePrice ?? 0;
    const crustPrice = selectedCrust === "thick" ? THICK_CRUST_EXTRA_COST : 0;
    const saucePrice = selectedSauce?.price ?? 0;
    const toppingsPrice = selectedToppings.reduce((sum, t) => sum + (t.price ?? 0), 0);
    return (sizePrice + crustPrice + saucePrice + toppingsPrice) * quantity;
  }, [selectedSize, selectedCrust, selectedSauce, selectedToppings, quantity]);

  const getCategoryIcon = (category: PizzaTopping['category']): React.ReactNode => {
    switch (category) {
      case "meat": return <Beef className="inline-block h-5 w-5 text-red-600 mr-1.5" />;
      case "cheese": return <Pizza className="inline-block h-5 w-5 text-yellow-500 mr-1.5" />;
      case "vegetable": return <Vegan className="inline-block h-5 w-5 text-green-600 mr-1.5" />;
    }
  };
  const toppingCategories = ["meat", "cheese", "vegetable", "other"] as const;

  const PizzaVisualizer = () => {
    const itemsToVisualize: Array<PizzaSauce | PizzaTopping> = [];
    if (selectedSauce && selectedSauce.imageSrc) {
      itemsToVisualize.push(selectedSauce);
    }
    itemsToVisualize.push(...selectedToppings.filter(t => t.imageSrc));
    
    const sortedVisualItems = itemsToVisualize.sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));

    return (
      <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px] xl:max-w-[480px] mx-auto rounded-full overflow-hidden">
        {selectedSize && selectedSize.imageSrc && (
          <Image
            src={selectedSize.imageSrc}
            alt={`Ciasto ${selectedSize.name} ${selectedCrust === 'thick' ? 'grube' : 'cienkie'}`}
            layout="fill"
            objectFit="contain"
            priority
            className="z-0 transition-transform duration-300 ease-in-out"
          />
        )}
        {sortedVisualItems.map((item) => (
          <div
            key={item.id}
            className="absolute inset-0 transition-opacity duration-300 ease-in-out"
            style={{ zIndex: item.zIndex || 10 }}
          >
            <Image
              src={item.imageSrc!}
              alt={item.name}
              layout="fill"
              objectFit="contain"
              className="animate-fadeIn"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-[url(/pizza-pattern.png)] flex justify-center min-h-screen">
      <div className="bg-white w-full max-w-7xl shadow-2xl flex flex-col">
        <div className="bg-red-700 text-white text-center py-8 sm:py-10 px-4 sm:px-6 shadow-md">
          <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Skomponuj własną pizzę
          </h1>
          <p className="mt-2 text-white text-sm sm:text-base max-w-2xl mx-auto">
            Zostań szefem kuchni i stwórz idealną kompozycję smaków!
          </p>
        </div>

        <div className="flex-grow flex flex-col lg:flex-row p-4 sm:p-6 md:p-8 gap-6 md:gap-8">
          <div className="lg:w-1/2 xl:w-3/5 flex flex-col items-center justify-start pt-4 lg:pt-15 lg:sticky lg:top-28 lg:h-[calc(100vh-7rem-var(--header-height,80px))]">
            <div className="w-full">
                {selectedSize && <PizzaVisualizer />}
            </div>
            <div className="mt-4 text-center lg:hidden">
                <span className="text-lg text-red-700">Do zapłaty: </span>
                <span className="text-2xl font-bold text-red-700">{(typeof totalPrice === "number" ? totalPrice : 0) > 0 ? formatPrice(typeof totalPrice === "number" ? totalPrice : 0) : formatPrice(0)}</span>
            </div>
          </div>
          <aside className="lg:w-1/2 xl:w-2/5 flex flex-col">
            <Card className="w-full shadow-xl flex-grow flex flex-col border border-stone-200 rounded-xl overflow-hidden">
              <CardHeader className="bg-stone-50 border-b p-5">
                <CardTitle className="text-xl text-red-700">Twoja kompozycja</CardTitle>
              </CardHeader>
              <ScrollArea className="flex-grow pretty-scrollbar">
                <CardContent className="p-5 space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-2.5 block">Rozmiar pizzy</Label>
                    <RadioGroup
                      value={selectedSize?.id}
                      onValueChange={(value) => handleSizeChange(value as PizzaSize["id"])}
                      className="grid grid-cols-3 gap-2 sm:gap-3"
                    >
                      {pizzaSizes.map((size) => (
                        <div key={size.id}>
                          <RadioGroupItem value={size.id} id={`size-${size.id}`} className="sr-only" />
                          <Label
                            htmlFor={`size-${size.id}`}
                            className={cn(
                              "flex flex-col items-center justify-center rounded-md border-2 p-3 text-center cursor-pointer transition-all text-xs sm:text-sm h-full",
                              selectedSize?.id === size.id
                                ? "border-red-600 bg-red-50 ring-2 ring-red-500"
                                : "border-stone-200 hover:border-red-400"
                            )}
                          >
                            <span className="font-semibold capitalize">{size.name}</span>
                            <span className="font-bold text-red-600 mt-0.5">{formatPrice(size.basePrice)}</span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Separator />
                  <div>
                    <Label className="text-base font-semibold mb-2.5 block">Rodzaj ciasta</Label>
                    <RadioGroup
                      value={selectedCrust}
                      onValueChange={(value) => handleCrustChange(value as "thin" | "thick")}
                      className="grid grid-cols-2 gap-3"
                    >
                      <div>
                        <RadioGroupItem value="thin" id="crust-thin" className="sr-only" />
                        <Label
                          htmlFor="crust-thin"
                          className={cn(
                            "flex flex-col items-center justify-center rounded-md border-2 p-3 text-center cursor-pointer transition-all h-full text-sm",
                            selectedCrust === "thin"
                              ? "border-red-600 bg-red-50 ring-2 ring-red-500"
                              : "border-stone-200 hover:border-red-400"
                          )}
                        >
                          <span className="font-semibold capitalize">Cienkie</span>
                          <span className="text-xs mt-0.5">(Klasyczne)</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="thick" id="crust-thick" className="sr-only" />
                        <Label
                          htmlFor="crust-thick"
                           className={cn(
                            "flex flex-col items-center justify-center rounded-md border-2 p-3 text-center cursor-pointer transition-all h-full text-sm",
                            selectedCrust === "thick"
                              ? "border-red-600 bg-red-50 ring-2 ring-red-500"
                              : "border-stone-200 hover:border-red-400"
                          )}
                        >
                          <span className="font-semibold capitalize">Grube</span>
                          <span className="text-xs mt-0.5">{`(+ ${formatPrice(THICK_CRUST_EXTRA_COST)})`}</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base font-semibold mb-2.5 block">Wybierz sos</Label>
                    <RadioGroup
                      value={selectedSauce?.id}
                      onValueChange={(value) => handleSauceChange(value as PizzaSauce["id"])}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3"
                    >
                      {pizzaSauces.map((sauce) => (
                         <div key={sauce.id}>
                          <RadioGroupItem value={sauce.id} id={`sauce-${sauce.id}`} className="sr-only" />
                          <Label
                            htmlFor={`sauce-${sauce.id}`}
                            className={cn(
                              "flex flex-col items-center justify-center rounded-md border-2 p-3 text-center cursor-pointer transition-all h-full",
                              selectedSauce?.id === sauce.id
                                ? "border-red-600 bg-red-50 ring-2 ring-red-500"
                                : "border-stone-200 hover:border-red-400"
                            )}
                          >
                            {sauce.imageSrc && <Image src={sauce.imageSrc} alt={sauce.name} width={36} height={36} className="mb-1"/>}
                            <span className="font-medium text-xs leading-tight mt-1">{sauce.name}</span>
                            {sauce.price > 0 && <span className="text-xxs mt-0.5">(+ {formatPrice(sauce.price)})</span>}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Separator />
                  
                  <div>
                    <Label className="text-base font-semibold mb-2.5 block">Wybierz dodatki</Label>
                    {toppingCategories.map(category => {
                      const toppingsInCategory = pizzaToppings.filter(t => t.category === category);
                      if (toppingsInCategory.length === 0) return null;
                      return (
                        <div key={category} className="mb-5">
                          <h4 className="text-sm font-semibold mb-2.5 flex items-center gap-2 border-b pb-1.5">
                            {getCategoryIcon(category)}
                            <span className="uppercase tracking-wider">
                                {category === "meat" ? "Mięsne" : category === "cheese" ? "Sery" : category === "vegetable" ? "Warzywne" : "Pozostałe"}
                            </span>
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                            {toppingsInCategory.map((topping) => (
                              <div key={topping.id}
                                className={cn(
                                  "flex flex-col items-center justify-center rounded-md border-2 p-2.5 text-center cursor-pointer transition-all h-full",
                                  selectedToppings.find(t => t.id === topping.id)
                                    ? "border-red-600 bg-red-50 ring-2 ring-red-500"
                                    : "border-stone-200 hover:border-red-400"
                                )}
                                onClick={() => handleToppingToggle(topping)}
                              >
                                {topping.iconSrc && <Image src={topping.iconSrc} alt={topping.name} width={40} height={40} className="mb-1.5"/>}
                                <span className="font-medium text-xs leading-tight">{topping.name}</span>
                                <span className="text-xxs mt-0.5">(+ {formatPrice(topping.price)})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </ScrollArea>
              <CardFooter className="p-5 border-t bg-stone-50 flex-shrink-0">
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-base font-semibold">Ilość:</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-stone-300 hover:border-red-500" onClick={() => setQuantity(q => Math.max(1, q - 1))} aria-label="Zmniejsz ilość"> <MinusCircle className="h-5 w-5" /> </Button>
                      <span className="text-lg font-semibold w-10 text-center">{quantity}</span>
                      <Button variant="outline" size="icon" className="h-9 w-9 rounded-full border-stone-300 hover:border-red-500" onClick={() => setQuantity(q => q + 1)} aria-label="Zwiększ ilość"> <PlusCircle className="h-5 w-5" /> </Button>
                    </div>
                  </div>
                  <Separator/>
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-red-700">Do zapłaty:</span>
                    <span className="text-2xl font-bold text-red-700">{ (typeof totalPrice === "number" ? totalPrice : 0) > 0 ? formatPrice(typeof totalPrice === "number" ? totalPrice : 0) : formatPrice(0)}</span>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-base py-3 shadow-md hover:shadow-lg rounded-lg"
                    onClick={handleAddToCart}
                    disabled={(typeof totalPrice === "number" ? totalPrice : 0) <= 0 && quantity <=0}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" /> Dodaj do koszyka
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}