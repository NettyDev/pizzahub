"use client";
import { useContext, createContext, useState, type PropsWithChildren, useEffect } from "react";

interface Toppings {
  id: number;
  name: string;
  price: number;
}

interface Pizza {
  id: number;
  name: string;
  price: number;
  quantity: number;
  crust: string;
  size: string;
  toppings: Toppings[];
}

interface CompositionSauce {
  id: number;
  name: string;
  price: number;
}

interface Composition {
  name: string;
  sauce: CompositionSauce | undefined;
  toppings: Toppings[];
  size: string;
  crust: string;
  price: number;
  quantity: number;
}

interface ICartContext {
  cart: (Pizza | Composition)[];
  totalPrice: number;
  deliveryIncluded: boolean;
  add: (data: Pizza | Composition) => void;
  remove: (idx: number) => void;
  changeAmount: (action: "inc" | "dec", idx: number) => void;
  clear: () => void;
}
// @ts-ignore
const context = createContext<ICartContext>();

export const useCartState = () => useContext(context);

export const CartProvider = ({
  deliveryTreshhold = 70,
  children
}: PropsWithChildren & { deliveryTreshhold?: number }) => {
  const [cart, setCart] = useState<(Pizza | Composition)[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    setTotalPrice(
      cart
        .map((v) =>
          v.crust == "thick"
            ? (v.price + 5 + v.toppings.reduce((a, b) => a + b.price, 0)) * v.quantity
            : (v.price + v.toppings.reduce((a, b) => a + b.price, 0)) * v.quantity
        )
        .reduce((a, b) => a + b, 0)
    );
  }, [cart]);

  const add: ICartContext["add"] = (data) => {
    setCart((v) => [...v, data]);
  };

  const remove: ICartContext["remove"] = (idx) => {
    setCart((v) => v.filter((v, i) => i !== idx));
  };

  const changeAmount: ICartContext["changeAmount"] = (action, idx) => {
    setCart((v) => {
      const copy = Array.from(v);
      switch (action) {
        case "dec":
          if (copy[idx].quantity > 1) copy[idx].quantity--;
          break;
        case "inc":
          if (copy[idx].quantity < 5) copy[idx].quantity++;
          break;
      }
      return copy;
    });
  };

  const clear = () => setCart([]);

  return (
    <context.Provider
      value={{
        cart,
        totalPrice,
        deliveryIncluded: totalPrice > deliveryTreshhold,
        add,
        remove,
        changeAmount,
        clear
      }}
    >
      {children}
    </context.Provider>
  );
};
