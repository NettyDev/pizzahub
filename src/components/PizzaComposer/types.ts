export interface PizzaSize {
  id: "small" | "medium" | "large";
  name: string;
  basePrice: number;
  imageSrc: string;
  zIndex?: number;
}

export interface PizzaSauce {
  id: number;
  name: string;
  price: number;
  image: string;
  zIndex?: number;
}

export interface PizzaTopping {
  id: number;
  name: string;
  price: number;
  image: string;
  icon?: string;
  category: "meat" | "cheese" | "vegetable" | "other";
  zIndex?: number;
}

export const pizzaSizes: PizzaSize[] = [
  { id: "small", name: "Mała", basePrice: 25, imageSrc: "/composer/crust.png", zIndex: 0 },
  { id: "medium", name: "Średnia", basePrice: 30, imageSrc: "/composer/crust.png", zIndex: 0 },
  { id: "large", name: "Duża", basePrice: 35, imageSrc: "/composer/crust.png", zIndex: 0 }
];

// export const pizzaSauces: PizzaSauce[] = [
//   { id: "tomato", name: "Pomidorowy", price: 0, imageSrc: "/composer/toppings/sauce-tomato.png", zIndex: 10 },
//   { id: "cream", name: "Biały", price: 0, imageSrc: "/composer/toppings/sauce-cream.png", zIndex: 10 },
//   { id: "bbq", name: "BBQ", price: 2, imageSrc: "/composer/toppings/sauce-bbq.png", zIndex: 10 },
//   { id: "sriracha", name: "Sriracha", price: 2, imageSrc: "/composer/toppings/sauce-sriracha.png", zIndex: 10 },
// ];

// export const pizzaToppings: PizzaTopping[] = [
//   // WARZYWA I ZIOŁA
//   { id: "cebula", name: "Cebula", price: 2, imageSrc: "/composer/toppings/cebula.png", iconSrc: "/composer/icons/cebula.png", category: "vegetable", zIndex: 25 },
//   { id: "kukurydza", name: "Kukurydza", price: 2, imageSrc: "/composer/toppings/kukurydza.png", iconSrc: "/composer/icons/kukurydza.png", category: "vegetable", zIndex: 25 },
//   { id: "papryka", name: "Papryka", price: 3, imageSrc: "/composer/toppings/papryka.png", iconSrc: "/composer/icons/papryka.png", category: "vegetable", zIndex: 25 },
//   { id: "pieczarki", name: "Pieczarki", price: 3, imageSrc: "/composer/toppings/pieczarki.png", iconSrc: "/composer/icons/pieczarki.png", category: "vegetable", zIndex: 25 },
//   { id: "pomidorki_koktajlowe", name: "Pomidorki Koktajlowe", price: 4, imageSrc: "/composer/toppings/pomidorki.png", iconSrc: "/composer/icons/pomidorki.png", category: "vegetable", zIndex: 45 },
//   { id: "oliwki", name: "Oliwki", price: 4, imageSrc: "/composer/toppings/oliwki.png", iconSrc: "/composer/icons/oliwki.png", category: "vegetable", zIndex: 40 },
//   { id: "jalapeno", name: "Jalapeno", price: 4, imageSrc: "/composer/toppings/jalapeno.png", iconSrc: "/composer/icons/jalapeno.png", category: "vegetable", zIndex: 40 },
//   { id: "bazylia", name: "Świeża Bazylia", price: 3, imageSrc: "/composer/toppings/bazylia.png", iconSrc: "/composer/icons/bazylia.png", category: "vegetable", zIndex: 60 },
//   { id: "rukola", name: "Rukola", price: 4, imageSrc: "/composer/toppings/rukola.png", iconSrc: "/composer/icons/rukola.png", category: "vegetable", zIndex: 60 },
//   { id: "ananas", name: "Ananas", price: 3, imageSrc: "/composer/toppings/ananas.png", iconSrc: "/composer/icons/ananas.png", category: "vegetable", zIndex: 30 },

//   // SERY
//   { id: "mozzarella", name: "Mozzarella", price: 5, imageSrc: "/composer/toppings/mozzarella.png", iconSrc: "/composer/icons/mozzarella.png", category: "cheese", zIndex: 20 },
//   { id: "feta", name: "Feta", price: 5, imageSrc: "/composer/toppings/feta.png", iconSrc: "/composer/icons/feta.png", category: "cheese", zIndex: 50 },
//   { id: "gorgonzola", name: "Gorgonzola", price: 6, imageSrc: "/composer/toppings/gorgonzola.png", iconSrc: "/composer/icons/gorgonzola.png", category: "cheese", zIndex: 50 },
//   { id: "parmezan", name: "Parmezan", price: 5, imageSrc: "/composer/toppings/parmezan.png", iconSrc: "/composer/icons/parmezan.png", category: "cheese", zIndex: 55 },

//   // MIĘSA
//   { id: "szynka", name: "Szynka", price: 5, imageSrc: "/composer/toppings/szynka.png", iconSrc: "/composer/icons/szynka.png", category: "meat", zIndex: 30 },
//   { id: "salami", name: "Salami Pepperoni", price: 6, imageSrc: "/composer/toppings/salami.png", iconSrc: "/composer/icons/salami.png", category: "meat", zIndex: 30 },
//   { id: "kurczak", name: "Kurczak Grillowany", price: 6, imageSrc: "/composer/toppings/kurczak.png", iconSrc: "/composer/icons/kurczak.png", category: "meat", zIndex: 30 },
// ];
