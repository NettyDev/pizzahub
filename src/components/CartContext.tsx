import { useContext, createContext, useState, type PropsWithChildren } from "react";

interface PizzaToppings {
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
  toppings: PizzaToppings[];
}

interface CompositionTappings {
  id: number;
  name: string;
  price: number;
}

interface CompositionSauce {
  id: number;
  name: string;
  price: number;
}

interface Composition {
  name: string;
  sauce: CompositionSauce | undefined;
  toppings: CompositionTappings[];
  size: string;
  crust: string;
  price: number;
  quantity: number;
}

interface ICartContext {
  pizzas: Pizza[];
  compositions: Composition[];
  totalPrice: number;
}
