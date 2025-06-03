"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { X, Info, CheckCircleIcon, TruckIcon, XCircleIcon, ClockIcon, ShoppingBag, Star } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';
import StarRating from './StarRating';


const sampleOrders = [
    {
    id: "#1",
    date: "2025-01-16",
    items: [
      { name: "Pizza Margherita", quantity: 1, price: 25.00 },
    ],
    totalPrice: 25.00,
    status: "Dostarczone",
    userRating: 0,
  },
  {
    id: "#666",
    date: "2025-02-14",
    items: [
      { name: "Hawajska Pokusa", quantity: 1, price: 30.00 },
      { name: "Pizza Margherita", quantity: 1, price: 25.00 },
    ],
    totalPrice: 55.00,
    status: "W trakcie realizacji",
    userRating: 0,
  },
  {
    id: "#11223",
    date: "2025-12-01",
    items: [
      { name: "Pepperoni", quantity: 1, price: 22.00 },
    ],
    totalPrice: 22.00,
    status: "Anulowane",
    userRating: 0,
  },

];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(amount);
};


type OrderStatusProps = { status: string };

const OrderStatus = ({ status }: OrderStatusProps) => {
  let iconComponent;
  let textColorClass = "text-stone-700";
  let bgColorClass = "bg-stone-100"; 

  switch (status) {
    case "Dostarczone":
      iconComponent = <CheckCircleIcon className="h-4 w-4" />;
      textColorClass = "text-green-700";
      bgColorClass = "bg-green-100";
      break;
    case "W trakcie realizacji":
      iconComponent = <TruckIcon className="h-4 w-4" />;
      textColorClass = "text-blue-700";
      bgColorClass = "bg-blue-100";
      break;
    case "Anulowane":
      iconComponent = <XCircleIcon className="h-4 w-4" />;
      textColorClass = "text-red-700";
      bgColorClass = "bg-red-100";
      break;
    case "Oczekujące na płatność":
      iconComponent = <ClockIcon className="h-4 w-4" />;
      textColorClass = "text-yellow-700";
      bgColorClass = "bg-yellow-100";
      break;
    default:
      iconComponent = <Info className="h-4 w-4" />;
      textColorClass = "text-stone-600";
      bgColorClass = "bg-stone-200";
  }

  return (
    <span className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        textColorClass,
        bgColorClass
    )}>
      {iconComponent}
      <span className="truncate">{status}</span>
    </span>
  );
};


export default function Orders() {
  type OrderItem = { name: string; quantity: number; price: number };
  type Order = {
    id: string;
    date: string;
    items: OrderItem[];
    totalPrice: number;
    status: string;
    userRating: number;
  };
  
  const [orders, setOrders] = React.useState<Order[]>(sampleOrders);

  const handleRatingChange = (orderId: string, rating: number) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, userRating: rating } : order
      )
    );
    console.log(`Zamówienie ${orderId} ocenione na ${rating} gwiazdek`);
  };


  if (orders.length === 0) {
    return (
      <div className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 flex flex-col items-center justify-center text-center min-h-[calc(100vh-200px)] ">
        <ShoppingBag className="h-20 w-20 mb-6" />
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">Nie masz jeszcze żadnych zamówień</h2>
        <p className="mb-8 max-w-md">
          Wygląda na to, że Twoja historia zamówień jest pusta. Zamów swoją ulubioną pizzę i wróć tutaj, aby zobaczyć swoje zamówienia i je ocenić!
        </p>
        <div>
          <Link href="/menu">
            <Button
              size="lg"
              className="bg-red-600 text-white hover:bg-red-700 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Przeglądaj menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="flex items-center mb-4">
          <div className="flex flex-col items-start w-full">
          <h2 className="text-3xl font-semibold text-shadow-xs">Twoje zamówienia</h2>
          <p className="text-sm mt-6 text-stone-600">
          Poniżej znajdziesz historię swoich zamówień. Możesz ocenić każde zamówienie po jego dostarczeniu.
          Kliknij na zamówienie, aby zobaczyć szczegóły i ocenić produkty.
        </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
        <div className="flex flex-col gap-6 lg:gap-8 xl:gap-10">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-lg p-5 sm:p-6 border border-stone-200 flex flex-col hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 pb-4 border-b border-red-700">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider">Zamówienie</p>
                  <p className="text-lg font-semibold">{order.id}</p>
                </div>
                <div className="mt-3 sm:mt-0 sm:text-right">
                  <p className="text-xs mb-0.5">Data złożenia</p>
                  <p className="text-sm font-medium">
                    {new Date(order.date).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-5">
                  <OrderStatus status={order.status} />
              </div>
              <div className="mb-5 flex-grow">
                <h4 className="text-sm font-semibold mb-2.5">Zamówione produkty:</h4>
                <ul className="space-y-2 text-sm max-h-48 overflow-y-auto pr-2">
                  {order.items.map((item, index) => (
                    <li key={index} className="flex justify-between items-start p-2.5 rounded-md">
                      <div className="flex-grow pr-2">
                        <p className="font-medium break-words leading-snug">{item.name}</p>
                        <p className="text-xs">Ilość: {item.quantity}</p>
                      </div>
                      <p className="font-semibold whitespace-nowrap">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>
                {order.status === "Dostarczone" && (
                  <div className="mt-5">
                    <p className="text-xs mb-1 text-center sm:text-left">Twoja ocena:</p>
                    <StarRating
                      initialRating={order.userRating}
                      onRatingChange={(rating) => handleRatingChange(order.id, rating)}
                      size={22}
                      readonly={order.userRating > 0}
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-red-700 mt-auto">
                <div className=" sm:flex-row justify-between items-center mb-4 gap-3">

                  <div className="text-center sm:text-right">
                    <p className="text-sm font-medium">Łączna kwota:</p>
                    <p className="text-xl font-bold text-red-600">
                      {formatCurrency(order.totalPrice)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow rounded-md"
                  >
                      Zamów ponownie
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}