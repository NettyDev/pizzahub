"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { X, Info, CheckCircleIcon, TruckIcon, XCircleIcon, ClockIcon } from 'lucide-react';
import Link from 'next/link';


const sampleOrders = [
  {
    id: "#1",
    date: "2025-01-16",
    items: [
      { name: "Pizza Margherita", quantity: 1, price: 25.00 },
    ],
    totalPrice: 25.00,
    status: "Dostarczone",
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
  },
  {
    id: "#11223",
    date: "2025-12-01",
    items: [
      { name: "Pepperoni", quantity: 1, price: 22.00 },
    ],
    totalPrice: 22.00,
    status: "Anulowane",
  },

];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(amount);
};

type OrderStatusProps = { status: string };

const OrderStatus = ({ status }: OrderStatusProps) => {
  let iconComponent;
  let textColorClass = "text-stone-700";

  switch (status) {
    case "Dostarczone":
      iconComponent = <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 shrink-0" />;
      textColorClass = "text-green-600";
      break;
    case "W trakcie realizacji":
      iconComponent = <TruckIcon className="h-5 w-5 text-blue-500 mr-2 shrink-0" />;
      textColorClass = "text-blue-600";
      break;
    case "Anulowane":
      iconComponent = <XCircleIcon className="h-5 w-5 text-red-500 mr-2 shrink-0" />;
      textColorClass = "text-red-600";
      break;
    case "Oczekujące na płatność":
      iconComponent = <ClockIcon className="h-5 w-5 text-yellow-500 mr-2 shrink-0" />;
      textColorClass = "text-yellow-600";
      break;
    default:
      iconComponent = <Info className="h-5 w-5 text-stone-500 mr-2 shrink-0" />;
  }

  return (
    <div className={`flex items-center font-medium ${textColorClass}`}>
      {iconComponent}
      <span className="truncate">{status}</span>
    </div>
  );
};


export default function Orders() {
  const [orders, setOrders] = React.useState(sampleOrders);

  if (orders.length === 0) {
    return (
      <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center text-center min-h-[300px] bg-stone-50 rounded-lg">
        <X className="h-16 w-16 mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Nie masz jeszcze żadnych zamówień</h2>
        <p className="mb-6">
          Wygląda na to, że Twoja historia zamówień jest pusta. <br />
          Zamów swoją ulubioną pizzę i wróć tutaj, aby zobaczyć swoje zamówienia.
        </p>
        <div>
          <Link href="/menu">
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Zobacz menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-3xl font-semibold mb-4 text-shadow-xs">Twoje zamówienia</h2>
      </div>

      <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md border border-stone-200">
        <table className="w-full min-w-[640px] sm:min-w-[700px] md:min-w-[768px] text-sm text-left">
          <thead className="text-xs uppercase bg-stone-50 border-b border-stone-200">
            <tr>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">ID zamówienia</th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">Data</th>
              <th scope="col" className="px-4 py-3 min-w-[200px]">Szczegóły</th>
              <th scope="col" className="px-4 py-3 text-right whitespace-nowrap">Cena całkowita</th>
              <th scope="col" className="px-4 py-3 whitespace-nowrap">Status</th>
              <th scope="col" className="px-4 py-3 text-center whitespace-nowrap">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="bg-white border-b border-stone-200 last:border-b-0 hover:bg-stone-50/75 transition-colors duration-150">
                <td className="px-4 py-4 font-medium whitespace-nowrap">
                  {order.id}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {new Date(order.date).toLocaleDateString('pl-PL')}
                </td>
                <td className="px-4 py-4">
                  <ul className="list-disc list-inside text-xs space-y-0.5">
                    {order.items.map((item, index) => (
                      <li key={index} className="whitespace-normal break-words">
                        {item.name} (x{item.quantity}) - {formatCurrency(item.price * item.quantity)}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-4 text-right font-semibold whitespace-nowrap">
                  {formatCurrency(order.totalPrice)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <OrderStatus status={order.status} />
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-stone-300 hover:bg-stone-100 hover:text-stone-800">
                    Zamów ponownie
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}