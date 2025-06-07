export interface CartItem {
  id: string | number;
  name: string;
  quantity: number;
  pricePerUnit: number;
  description?: string;
  toppings?: { id: number; name: string; price: number }[];
}

export interface CartSummaryData {
  items: CartItem[];
  subTotal: number;
  deliveryCost: number;
  total: number;
  deliveryInfo?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface DeliveryFormData {
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  floor?: string;
  company?: string;
}
