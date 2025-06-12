"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import clsx from "clsx";

interface Pizza {
  id: number;
  name: string;
  image: string;
  orderCount?: number;
}

// const topPizzasData: Pizza[] = [
//   {
//     id: 1,
//     name: "Królowa Margherita",
//     imageUrl: "/pizzas/miss-klasyki.png",
//     description: "Klasyka z sosem pomidorowym, mozzarellą i bazylią.",
//     rank: 1
//   },
//   {
//     id: 2,
//     name: "Pepperoni Hit",
//     imageUrl: "/pizzas/miss-klasyki.png",
//     description: "Ostry smak pepperoni na chrupiącym cieście.",
//     rank: 2
//   },
//   {
//     id: 3,
//     name: "Capricciosa Bogata",
//     imageUrl: "/pizzas/miss-klasyki.png",
//     description: "Szynka, pieczarki, oliwki - pełnia smaku.",
//     rank: 3
//   }
// ].sort((a, b) => {
//   if (a.rank === 2) return -1;
//   if (b.rank === 2) return 1;
//   return a.rank - b.rank;
// });

export default function Ranking() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [currentSnap, setCurrentSnap] = React.useState(0);
  const [carouselReady, setCarouselReady] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;
    setCarouselReady(true);
    setCurrentSnap(api.selectedScrollSnap());
    const handleSelect = () => setCurrentSnap(api.selectedScrollSnap());
    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return "border-yellow-400 border-4 bg-yellow-50 shadow-xl";
      case 0:
        return "border-slate-400 border-2 bg-slate-50 shadow-lg";
      case 2:
        return "border-orange-400 border-2 bg-orange-50 shadow-md";
      default:
        return "bg-white";
    }
  };

  const getRankBadge = (idx: number) => {
    let badgeText = `#${idx == 2 ? 3 : idx == 0 ? 2 : 1}`;
    let badgeColorClasses = "";

    if (idx === 1) {
      badgeText = "TOP 1";
      badgeColorClasses = "bg-yellow-500 text-white";
    } else if (idx === 0) {
      badgeText = "#2";
      badgeColorClasses = "bg-slate-500 text-white";
    } else if (idx === 2) {
      badgeText = "#3";
      badgeColorClasses = "bg-orange-500 text-white";
    }

    return (
      <Badge
        className={cn(
          clsx(
            "absolute z-20",
            "transform rotate-6",
            "px-2 py-1 text-xs font-semibold transition-all duration-300 ease-in-out",
            badgeColorClasses,
            idx == 1 ? "-top-2.5 -right-2.5" : hoverArray[idx] ? "top-5 -right-1" : "top-9 right-2.5"
          )
        )}
      >
        {badgeText}
      </Badge>
    );
  };

  const [hoverArray, setHoverArray] = React.useState<boolean[]>([false, false, false]);

  const [pizzaData, setPizzaData] = React.useState<Pizza[]>([]);
  React.useEffect(() => {
    fetch("/api/top")
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 1) {
          setPizzaData([{}, ...data, {}]);
        } else if (data.length === 2) {
          setPizzaData([...data, {}]);
        } else {
          setPizzaData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching pizza data:", error);
      });
  }, []);

  return (
    <div className="w-full flex justify-between align-top">
      {/* <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          loop: true,
          align: "center"
        }}
      >
        <CarouselContent className="py-4 -ml-2 md:-ml-4">
          {topPizzasData.map((pizza, index) => (
            <CarouselItem
              key={pizza.id}
              className={cn("pl-2 md:pl-4", "basis-[70%] sm:basis-[60%] md:basis-1/2 lg:basis-1/3", "py-4")}
            >
              <div className="relative h-full">
                {getRankBadge(pizza.rank)}
                <Card
                  className={cn(
                    "p-0 overflow-hidden gap-0 transition-all duration-300 ease-in-out h-full flex flex-col",
                    // "min-h-[320px] sm:min-h-[360px] md:min-h-[380px]",
                    getRankStyles(pizza.rank),
                    carouselReady && index === currentSnap
                      ? "scale-100 opacity-100 z-10"
                      : "scale-90 sm:scale-85 opacity-70 sm:opacity-60 hover:opacity-90 hover:scale-95 z-0"
                  )}
                >
                  <CardHeader className="p-0 relative aspect-square">
                    <Image
                      src={pizza.imageUrl}
                      alt={pizza.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-md"
                      priority={index < 3}
                      sizes="(max-width: 640px) 70vw, (max-width: 768px) 60vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4 flex-grow flex flex-col justify-start">
                    <div>
                      <CardTitle className="text-sm sm:text-base md:text-lg font-semibold mb-1 leading-tight line-clamp-2">
                        {pizza.name}
                      </CardTitle> */}
      {/* <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3">
                        {pizza.description}
                      </p> */}
      {/* </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent> */}
      {/* <div className="hidden md:block">
          <CarouselPrevious className="absolute left-[-20px] xl:left-[-35px] top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-[-20px] xl:right-[-35px] top-1/2 -translate-y-1/2" />
        </div> */}
      {/* </Carousel> */}
      {/* {api && (
        <div className="flex justify-center gap-2 mt-6">
          {topPizzasData.map((_, index) => (
            <button
              key={index}
              onClick={() => api.scrollTo(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                index === currentSnap ? "bg-red-700 scale-125 w-3 h-3" : "bg-gray-300 hover:bg-gray-400"
              )}
              aria-label={`Przejdź do slajdu ${index + 1}`}
            />
          ))}
        </div>
      )} */}
      {pizzaData.map((pizza, index) => (
        <div
          key={pizza.id}
          className={cn(clsx("pl-2 md:pl-4", "basis-[70%] sm:basis-[60%] md:basis-1/2 lg:basis-1/3", "py-4"))}
        >
          <div className={clsx("relative", index !== 1 && "pt-5")}>
            {getRankBadge(index)}
            <Card
              className={cn(
                "relative p-0 overflow-hidden gap-0 transition-all duration-300 ease-in-out h-full flex flex-col",
                // "min-h-[320px] sm:min-h-[360px] md:min-h-[380px]",
                getRankStyles(index),
                // carouselReady && index === currentSnap
                index == 1
                  ? "scale-100 opacity-100 z-10"
                  : "scale-90 sm:scale-85 opacity-70 sm:opacity-60 sm:hover:opacity-90 sm:hover:scale-95 z-0"
              )}
              onMouseEnter={() => {
                setHoverArray((prev) => {
                  const newArray = [...prev];
                  newArray[index] = true;
                  return newArray;
                });
              }}
              onMouseLeave={(e) => {
                setHoverArray((prev) => {
                  const newArray = [...prev];
                  newArray[index] = false;
                  return newArray;
                });
              }}
            >
              <CardHeader className="p-0 relative aspect-square">
                <Image
                  src={pizza.image}
                  alt={pizza.name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-t-md"
                  priority={index < 3}
                  sizes="(max-width: 640px) 70vw, (max-width: 768px) 60vw, (max-width: 1024px) 50vw, 33vw"
                />
              </CardHeader>
              <CardContent className="p-3 sm:p-4 flex-grow flex flex-col justify-start">
                <div>
                  <CardTitle className="text-sm sm:text-base md:text-lg font-semibold mb-1 leading-tight line-clamp-2">
                    {pizza.name}
                  </CardTitle>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-3">
                    Zamówiono: {pizza.ordersCount} razy
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
}
