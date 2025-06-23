"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Pizza,
  Star,
  LoaderCircle,
  TrendingUp,
  Clock,
  ChefHat,
  CheckCircle,
  DollarSign,
  UtensilsCrossed
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface OrderItemStats {
  id: number;
  name: string;
  quantity: number;
  totalSpent: number;
  image?: string;
}

interface UserStatsData {
  ordersQuantity: number;
  pizzaQuantity: number;
  totalSpent: number;
  averageSpent: number;
  savedTime?: number;
  topSelect?: OrderItemStats;
}

const fetchUserStats = async (): Promise<UserStatsData> => {
  try {
    const response = await fetch("/api/profile/stats");
    const json = await response.json();
    if (!response.ok || !json || !json.result) {
      throw new Error("Failed to fetch user stats");
    }
    return json.result;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return {
      ordersQuantity: 0,
      pizzaQuantity: 0,
      totalSpent: 0,
      averageSpent: 0,
      savedTime: 0,
      topSelect: undefined
    };
  }
};

const StatCard = ({
  title,
  value,
  icon: Icon,
  unit,
  description,
  className
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  unit?: string;
  description?: string;
  className?: string;
}) => (
  <Card
    className={cn(
      "border-stone-200/75 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 flex flex-col justify-between",
      className
    )}
  >
    <div>
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
        <Icon className="h-6 w-6 text-red-500" />
      </div>
      <p className="text-3xl font-bold text-red-600">
        {value}
        {unit && <span className="text-base font-medium text-red-500/80 ml-1">{unit}</span>}
      </p>
    </div>
    {description && <p className="text-xs mt-2">{description}</p>}
  </Card>
);

export default function StatsComponent() {
  const [stats, setStats] = useState<UserStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      const data = await fetchUserStats();
      setStats(data);
      setLoading(false);
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6 sm:p-8 md:p-10 text-center min-h-[300px] flex flex-col justify-center items-center">
        <LoaderCircle className="h-16 w-16 text-red-400 mx-auto mb-4 animate-spin" />
        <p className="font-semibold text-lg">Ładowanie Twoich statystyk...</p>
        <p className="text-sm">Chwileczkę, analizujemy Twoje pizzowe wybory!</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 sm:p-8 md:p-10 text-center min-h-[300px] flex flex-col justify-center items-center">
        <UtensilsCrossed className="h-16 w-16 mx-auto mb-4" />
        <p className="font-semibold text-lg">Ups! Coś poszło nie tak.</p>
        <p className="text-sm">Nie udało się załadować Twoich statystyk. Spróbuj ponownie później.</p>
      </div>
    );
  }

  const timeSavedHours = stats.savedTime ? Math.floor(stats.savedTime / 60) : 0;
  const timeSavedRemainingMinutes = stats.savedTime ? stats.savedTime % 60 : 0;

  return (
    <div className="space-y-10 md:space-y-12 py-8 px-4 sm:px-5 md:px-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-red-700 text-center mb-2">Twoje Królestwo Pizzy</h2>
      <p className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
        Zobacz podsumowanie swoich kulinarnych podbojów w PizzaHub! Oto, jak wyglądają Twoje statystyki.
      </p>

      <div className="w-full">
        {/* {stats.favoritePizza && (
          <Card className="py-0 gap-0 bg-white rounded-xl shadow-xl border-2 border-red-700 flex flex-col overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <CardHeader className="bg-red-700 text-white p-5">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 fill-white text-white" />
                <div>
                  <CardTitle className="text-2xl font-bold">Twoja ulubiona pizza</CardTitle>
                  <CardDescription className="text-white">Pizza, którą oceniłeś najwyżej!</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 sm:p-6 text-center flex-grow flex flex-col items-center justify-center">
              {stats.favoritePizza.image && (
                <img
                  src={stats.favoritePizza.image}
                  alt={stats.favoritePizza.name}
                  className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full mx-auto mb-4 shadow-lg border-4 border-white"
                />
              )}
              <p className="text-2xl sm:text-3xl font-bold">{stats.favoritePizza.name}</p>
              <div className="flex justify-center items-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${i < Math.round(stats.favoritePizza!.rating) ? "text-yellow-400 fill-yellow-400" : "text-black"}`}
                  />
                ))}
                <span className="ml-2 text-base font-semibold">({stats.favoritePizza.rating.toFixed(1)})</span>
              </div>
            </CardContent>
          </Card>
        )} */}

        {stats.topSelect && (
          <Card className="py-0 flex-col gap-0 bg-white rounded-xl shadow-xl border border-stone-200 flex overflow-hidden hover:scale-[1.02] transition-transform duration-300">
            <CardHeader className="bg-red-700 text-white p-5 border-b">
              <div className="flex items-center gap-3">
                <ChefHat className="h-8 w-8 text-white" />
                <div>
                  <CardTitle className="text-2xl font-bold">Mistrz wyboru</CardTitle>
                  <CardDescription className="text-white">
                    Pizza, która najczęściej gości na Twoim stole.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-2 sm:p-3 flex-grow flex flex-col lg:gap-4 lg:flex-row justify-center">
              {stats.topSelect.image && (
                <img
                  src={stats.topSelect.image}
                  alt={stats.topSelect.name}
                  className="w-40 h-40 sm:w-48 sm:h-48 object-cover rounded-full mx-auto lg:mx-0 mb-4 shadow-lg border-4 border-white"
                />
              )}
              <div className="lg:w-1/2">
                <p className="text-2xl sm:text-3xl font-bold mb-3 text-center">{stats.topSelect.name}</p>
                <div className="text-sm space-y-1.5 p-4 rounded-lg">
                  <div className="flex justify-between border-b py-2">
                    <span>Zamówiona:</span> <span className="font-semibold">{stats.topSelect.quantity} razy</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span>Łącznie wydano:</span>{" "}
                    <span className="font-semibold">{stats.topSelect.totalSpent.toFixed(2)} zł</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span>Średnia ocena:</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.round(3.9) ? "text-yellow-400 fill-yellow-400" : "text-stone-300"}`}
                        />
                      ))}
                      <span className="ml-1.5 text-xs font-semibold">({(3.9).toFixed(1)})</span>
                    </div>
                  </div>
                  {/* {stats.topSelect.averageRating && (
                    <div className="flex items-center justify-center pt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${i < Math.round(stats.topSelect!.averageRating!) ? "text-yellow-400 fill-yellow-400" : "text-stone-300"}`}
                        />
                      ))}
                      <span className="ml-1.5 text-xs font-semibold">
                        ({stats.topSelect.averageRating.toFixed(1)})
                      </span>
                    </div>
                  )} */}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {stats.topSelect && <Separator className="my-10 md:my-12" />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
        <StatCard
          title="Twoje Zamówienia"
          value={stats.ordersQuantity}
          icon={CheckCircle}
          description="Liczba wszystkich zrealizowanych zamówień."
        />
        <StatCard
          title="Pizze na Koncie"
          value={stats.pizzaQuantity}
          icon={Pizza}
          description="Tyle pysznych pizz już za Tobą!"
        />
        <StatCard
          title="Wydatki na szczęście"
          value={stats.totalSpent.toFixed(2)}
          unit="zł"
          icon={DollarSign}
          description="Suma inwestycji w doskonały smak."
        />
        <StatCard
          title="Średnio na zamówienie"
          value={stats.averageSpent.toFixed(2)}
          unit="zł"
          icon={TrendingUp}
          description="Przeciętna wartość Twoich pizzowych uczt."
        />
        {stats.savedTime !== undefined && stats.savedTime > 0 && (
          <StatCard
            title="Czas dla Ciebie"
            value={`${timeSavedHours}h ${timeSavedRemainingMinutes}m`}
            icon={Clock}
            description="Szacunkowo tyle czasu zyskałeś, wybierając nas!"
          />
        )}
      </div>
    </div>
  );
}
