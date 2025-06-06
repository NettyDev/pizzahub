"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleSlash, Flame, Info, Plus, Filter, X, Pizza } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import CustomizationDialog, { CustomizedPizzaData } from "@/components/CustomizationDialog";
import { toast } from "sonner";
import SpinnerCircle4 from "@/components/ui/spinner";

interface MenuItemData {
  id: number;
  name: string;
  image: string;
  spice: number;
  ingredients: string[];
  price: {
    small: number;
    medium: number;
    large: number;
  };
  baseIngredients?: string[];
  availableToppings?: { name: string; price: number }[];
}

function SpiceMeter({ level, size = "normal" }: { level: number; size?: "small" | "normal" }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4].map((i) => (
        <Flame
          key={i}
          size={size === "small" ? 14 : 18}
          className={clsx(
            "transition-colors",
            level >= i
              ? level === 1
                ? "fill-green-400 text-green-500"
                : level === 2
                  ? "fill-yellow-400 text-yellow-500"
                  : level === 3
                    ? "fill-orange-500 text-orange-600"
                    : "fill-red-500 text-red-600"
              : "text-stone-300"
          )}
        />
      ))}
    </div>
  );
}

export default function MenuPage() {
  const [spiceLevel, setSpiceLevel] = useState<number>(0);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isFiltersOpenMobile, setIsFiltersOpenMobile] = useState(false);

  const [isCustomizationDialogOpen, setIsCustomizationDialogOpen] = useState(false);
  const [selectedPizzaForCustomization, setSelectedPizzaForCustomization] = useState<MenuItemData | null>(null);

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/products")
      .then((value) => value.json())
      .then((data) => [setMenuItemsData(data.newProducts), setLoading(false)]);
  }, []);

  const [menuItemsData, setMenuItemsData] = useState<MenuItemData[]>([]);

  const allIngredients = () => {
    const ingredients: string[] = [];
    menuItemsData.forEach((v) => {
      v.ingredients.forEach((ing) => {
        if (!ingredients.includes(ing)) {
          ingredients.push(ing);
        }
      });
    });
    return ingredients.sort();
  };

  const ingredientsForm = useForm<{ [key: string]: boolean }>({
    defaultValues: allIngredients().reduce(
      (acc, ingredient) => {
        acc[ingredient] = false;
        return acc;
      },
      {} as { [key: string]: boolean }
    )
  });

  useEffect(() => {
    const subscription = ingredientsForm.watch((value) => {
      const currentlySelected = Object.entries(value)
        .filter(([_, isSelected]) => isSelected)
        .map(([ingredientName, _]) => ingredientName);
      setSelectedIngredients(currentlySelected);
    });
    return () => subscription.unsubscribe();
  }, [ingredientsForm, ingredientsForm.watch]);

  const filteredMenuItems = menuItemsData
    .filter((item) => {
      if (spiceLevel === 0) return true;
      return item.spice === spiceLevel;
    })
    .filter((item) => {
      if (selectedIngredients.length === 0) return true;
      return selectedIngredients.every((selectedIng) => item.ingredients.includes(selectedIng));
    });

  const resetFilters = () => {
    setSpiceLevel(0);
    setSelectedIngredients([]);
    allIngredients().forEach((ing) => ingredientsForm.setValue(ing, false));
  };

  const handleOpenCustomizationDialog = (pizza: MenuItemData) => {
    setSelectedPizzaForCustomization(pizza);
    setIsCustomizationDialogOpen(true);
  };

  const FilterPanelContent = () => (
    <>
      <div>
        <h3 className="text-lg mb-3">Poziom ostrości</h3>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button
            variant={spiceLevel === 0 ? "destructive" : "outline"}
            size="icon"
            className={clsx(
              "rounded-full h-9 w-9 transition-all",
              spiceLevel !== 0 && "border-stone-300 hover:border-red-500"
            )}
            onClick={() => setSpiceLevel(0)}
            aria-label="Brak filtra ostrości"
          >
            <CircleSlash size={18} />
          </Button>
          {[1, 2, 3, 4].map((level) => (
            <Button
              key={level}
              variant={spiceLevel === level ? "default" : "outline"}
              size="icon"
              className={clsx(
                "rounded-full h-9 w-9 transition-all",
                spiceLevel === level
                  ? level === 1
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : level === 2
                      ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                      : level === 3
                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                        : "bg-red-600 hover:bg-red-700 text-white"
                  : "border-stone-300 hover:border-red-500"
              )}
              onClick={() => setSpiceLevel(level)}
              aria-label={`Poziom ostrości ${level}`}
            >
              <Flame size={18} className={clsx(spiceLevel === level && "fill-white")} />
            </Button>
          ))}
        </div>
      </div>
      <Separator className="my-6" />
      <div>
        <h3 className="text-lg mb-4">Składniki</h3>
        <Form {...ingredientsForm}>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {allIngredients().map((ingredient) => (
              <FormField
                control={ingredientsForm.control}
                name={ingredient}
                key={ingredient}
                render={({ field }) => (
                  <FormItem
                    className="flex flex-row items-center space-x-3 space-y-0 p-2.5 rounded-md hover:bg-stone-50 transition-colors cursor-pointer border border-transparent hover:border-stone-200"
                    onClick={() => field.onChange(!field.value)}
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id={`filter-${ingredient}`}
                        className="border-stone-400 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 focus:ring-offset-0 focus:ring-2 focus:ring-red-500"
                      />
                    </FormControl>
                    <FormLabel htmlFor={`filter-${ingredient}`} className="text-sm cursor-pointer select-none flex-1">
                      {ingredient[0].toUpperCase() + ingredient.slice(1)}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </Form>
      </div>
    </>
  );

  const handleAddToCart = (customizedPizzaData: CustomizedPizzaData) => {
    console.log("Dodano do koszyka (z modala):", customizedPizzaData);
    toast.success(`${customizedPizzaData.basePizzaName} (${customizedPizzaData.selectedSize}) dodana do koszyka!`, {
      description: `Ilość: ${customizedPizzaData.quantity}, Cena: ${customizedPizzaData.finalPrice.toFixed(2).replace(".", ",")} zł`,
      action: {
        label: "Koszyk",
        onClick: () => {
          console.log("Przejdź do koszyka");
        }
      }
    });
    setIsCustomizationDialogOpen(false);
  };

  return (
    <>
      <div className="w-full bg-[url(/pizza-pattern.png)] flex justify-center">
        <div className="bg-white w-full max-w-7xl shadow-2xl">
          <div className="bg-red-700 text-white text-center py-8 sm:py-10 px-4 sm:px-6 shadow-md">
            <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">Odkryj nasze menu </h1>
            <p className="mt-2 text-white text-sm sm:text-base max-w-2xl mx-auto">
              Starannie przygotowane dania, które zaspokoją każde podniebienie. Wybierz coś dla siebie!
            </p>
          </div>

          {isLoading ? (
            <div className="h-50 w-full flex flex-col gap-2 justify-center items-center">
              <SpinnerCircle4 />
              <p className="text-xl flex gap-2">
                Ładowanie pizz <Pizza />
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-6 md:p-8 lg:p-10 ">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-16">
                <aside className="hidden lg:block w-full lg:w-[30%] xl:w-1/4">
                  <div className="bg-white rounded-lg shadow-xl p-6 border border-stone-200 lg:sticky lg:top-47">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl sm:text-2xl text-shadow-xs">Filtruj</h2>
                      {(spiceLevel !== 0 || selectedIngredients.length > 0) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={resetFilters}
                          className="text-xs text-red-600 hover:text-red-700 px-2"
                        >
                          <X className="h-4 w-4 mr-1" /> Wyczyść wszystko
                        </Button>
                      )}
                    </div>
                    <FilterPanelContent />
                  </div>
                </aside>

                <main className="w-full lg:w-[70%] xl:w-3/4">
                  <div className="lg:hidden mb-6 flex justify-end">
                    <Sheet open={isFiltersOpenMobile} onOpenChange={setIsFiltersOpenMobile}>
                      <SheetTrigger asChild>
                        <Button variant="outline" className="border-stone-300 hover:border-red-500 hover:text-red-600">
                          <Filter className="h-5 w-5 mr-2" /> Filtry
                        </Button>
                      </SheetTrigger>
                      <SheetContent side="left" className="w-[320px] sm:w-[360px] p-0 flex flex-col">
                        <SheetHeader className="p-4 border-b flex-shrink-0">
                          <div className="flex justify-between items-center">
                            <SheetTitle className="text-xl">Filtruj</SheetTitle>
                            {(spiceLevel !== 0 || selectedIngredients.length > 0) && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  resetFilters();
                                  setIsFiltersOpenMobile(false);
                                }}
                                className="text-xs text-red-600 hover:text-red-700"
                              >
                                <X className="h-3 w-3 mr-1" /> Wyczyść
                              </Button>
                            )}
                          </div>
                        </SheetHeader>
                        <div className="p-6 overflow-y-auto flex-grow">
                          <FilterPanelContent />
                        </div>
                        <SheetClose asChild className="p-4 border-t mt-auto flex-shrink-0">
                          <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Pokaż wyniki</Button>
                        </SheetClose>
                      </SheetContent>
                    </Sheet>
                  </div>

                  {filteredMenuItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                      {filteredMenuItems.map((item) => (
                        <Card
                          key={item.name}
                          className="py-0 gap-0 flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-stone-200"
                        >
                          <CardHeader className="p-0">
                            <div className="aspect-w-16 aspect-h-9">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="object-cover w-full h-full rounded-t-lg"
                                loading="lazy"
                              />
                            </div>
                          </CardHeader>
                          <div className="p-5 flex flex-col flex-grow">
                            <CardTitle className="text-xl mb-2">{item.name}</CardTitle>
                            <div className="mb-3">
                              <h4 className="text-xs font-medium mb-1.5">Główne składniki:</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {item.ingredients.slice(0, 3).map((ing) => (
                                  <Badge key={ing} variant="secondary" className="font-normal">
                                    {ing}
                                  </Badge>
                                ))}
                                {item.ingredients.length > 3 && (
                                  <Badge variant="outline" className="font-normal border-stone-300 text-stone-500">
                                    +{item.ingredients.length - 3} więcej
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm mt-auto pt-3">
                              <span>Ostrość:</span>
                              <SpiceMeter level={item.spice} size="small" />
                            </div>
                          </div>
                          <CardFooter className="p-4 bg-stone-50 border-t flex items-center justify-between gap-2">
                            <div className="text-left">
                              <p className="text-xs">Cena od</p>
                              <p className="text-lg text-red-700">{item.price.small.toFixed(2).replace(".", ",")} zł</p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                className="rounded-full bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-shadow"
                                onClick={() => handleOpenCustomizationDialog(item)}
                              >
                                <Plus />
                              </Button>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="rounded-full border-stone-300 hover:border-red-500 hover:text-red-600"
                                  >
                                    <Info />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-64 text-sm p-5">
                                  <p className="text-lg mb-3">{item.name}</p>
                                  <div className="flex items-center gap-2 mb-3">
                                    <span>Ostrość:</span> <SpiceMeter level={item.spice} size="small" />
                                  </div>
                                  <div className="mb-3">
                                    <p className="font-medium mb-1">Pełna lista składników:</p>
                                    <ul className="list-disc list-inside pl-1 space-y-0.5 text-xs">
                                      {item.ingredients.map((ing) => (
                                        <li key={ing}>{ing[0].toUpperCase() + ing.slice(1)}</li>
                                      ))}
                                    </ul>
                                  </div>
                                  <Separator className="my-4" />
                                  <p className="mb-1.5">Ceny:</p>
                                  <ul className="text-xs space-y-1">
                                    <li>
                                      Mała:{" "}
                                      <span className="font-semibold">
                                        {item.price.small.toFixed(2).replace(".", ",")} zł
                                      </span>
                                    </li>
                                    <li>
                                      Średnia:{" "}
                                      <span className="font-semibold">
                                        {item.price.medium.toFixed(2).replace(".", ",")} zł
                                      </span>
                                    </li>
                                    <li>
                                      Duża:{" "}
                                      <span className="font-semibold">
                                        {item.price.large.toFixed(2).replace(".", ",")} zł
                                      </span>
                                    </li>
                                  </ul>
                                </PopoverContent>
                              </Popover>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 col-span-full">
                      <CircleSlash className="h-20 w-20 text-stone-300 mx-auto mb-6" />
                      <p className="text-2xl">Brak dań spełniających kryteria.</p>
                      <p className="text-base mt-2">
                        Spróbuj zmienić wybrane filtry lub{" "}
                        <Button variant="link" onClick={resetFilters} className="text-red-600 p-0 h-auto">
                          wyczyść wszystkie
                        </Button>
                        .
                      </p>
                    </div>
                  )}
                </main>
              </div>
            </div>
          )}
          <div className="border-t-10 border border-red-700"></div>
          <section className="bg-stone-50 text-center py-12 md:py-16 px-6">
            <Pizza className="h-16 w-16 text-red-600 mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl mb-3">Nie możesz znaleźć czegoś idealnego dla siebie?</h2>
            <p className="max-w-xl mx-auto mb-8 text-base md:text-lg">
              Żaden problem! Skorzystaj z naszego kompozytora i stwórz pizzę dokładnie taką, jak lubisz. Wybierz ciasto,
              sos, ulubione składniki i ciesz się smakiem idealnie dopasowanym do Ciebie!
            </p>
            <Link href="/composer">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold text-base px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                Skomponuj własną pizzę
                <Pizza className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:rotate-[30deg]" />
              </Button>
            </Link>
          </section>
        </div>
      </div>
      {selectedPizzaForCustomization && (
        <CustomizationDialog
          isOpen={isCustomizationDialogOpen}
          onOpenChange={setIsCustomizationDialogOpen}
          pizzaData={selectedPizzaForCustomization}
          onAddToCart={handleAddToCart}
        />
      )}
    </>
  );
}
