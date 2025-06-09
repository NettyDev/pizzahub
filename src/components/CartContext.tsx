"use client";

import { useContext, createContext, useState, type PropsWithChildren, useEffect } from "react";

interface Toppings {
  id: number;
  name: string;
  price: number;
}

export interface Pizza {
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

export interface Composition {
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
  isLocalStorageUpdated?: boolean;
  add: (data: Pizza | Composition) => void;
  remove: (idx: number) => void;
  changeAmount: (newValue: number, idx: number) => void;
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
  const [isLocalStorageUpdated, setIsLocalStorageUpdated] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setIsLocalStorageUpdated(true);
  }, []);

  useEffect(() => {
    if (!isLocalStorageUpdated) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setTotalPrice(
      cart
        .map((v) => {
          if ("sauce" in v) {
            return v.crust == "thick" ? (v.price + 5) * v.quantity : v.price * v.quantity;
          }
          return v.crust == "thick"
            ? (v.price + 5 + v.toppings.reduce((a, b) => a + b.price, 0)) * v.quantity
            : (v.price + v.toppings.reduce((a, b) => a + b.price, 0)) * v.quantity;
        })
        .reduce((a, b) => a + b, 0)
    );
    // localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const add: ICartContext["add"] = (data: Pizza | Composition) => {
    if ("id" in data) {
      const idxs = cart.filter((v) => "id" in v && v.id == data.id) as Pizza[];
      if (idxs.length > 0) {
        for (const item of idxs) {
          let isSame = true;
          if (item.crust !== data.crust) isSame = false;
          if (item.size !== data.size) isSame = false;
          if (
            !deepEqual(
              item.toppings.sort((a, b) => a.name.localeCompare(b.name)),
              data.toppings.sort((a, b) => a.name.localeCompare(b.name))
            )
          )
            isSame = false;
          if (isSame)
            return changeAmount(
              item.quantity + data.quantity,
              cart.findIndex((v) => v == item)
            );
        }
      }
      setCart((v) => [...v, data]);
    } else {
      const comps = cart.filter((v) => "sauce" in v) as Composition[];
      if (comps.length > 0) {
        for (const item of comps) {
          let isSame = true;
          if (item.crust !== data.crust) isSame = false;
          if (item.size !== data.size) isSame = false;
          if (item.sauce && data.sauce && !deepEqual(item.sauce, data.sauce)) isSame = false;
          if (
            !deepEqual(
              item.toppings.sort((a, b) => a.name.localeCompare(b.name)),
              data.toppings.sort((a, b) => a.name.localeCompare(b.name))
            )
          )
            isSame = false;
          if (isSame)
            return changeAmount(
              item.quantity + data.quantity,
              cart.findIndex((v) => v == item)
            );
        }
      }
      setCart((v) => [...v, data]);
    }
  };

  const remove: ICartContext["remove"] = (idx) => {
    setCart((v) => v.filter((v, i) => i !== idx));
  };

  const changeAmount: ICartContext["changeAmount"] = (newValue, idx) => {
    if (newValue <= 0) return remove(idx);
    setCart((v) =>
      v.map((item, idxItem) => {
        if (idxItem !== idx) return item;
        item.quantity = newValue;
        return item;
      })
    );
  };

  const clear = () => setCart([]);

  return (
    <context.Provider
      value={{
        cart,
        totalPrice,
        deliveryIncluded: totalPrice > deliveryTreshhold,
        isLocalStorageUpdated,
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

function deepEqual(obj1: { [x: string]: any } | null, obj2: { [x: string]: any } | null) {
  if (obj1 === obj2) {
    return true;
  }

  if (obj1 == null || typeof obj1 !== "object" || obj2 == null || typeof obj2 !== "object") {
    return false;
  }

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
