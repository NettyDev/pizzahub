export interface CartItem {
  id: string | number;
  name: string;
  quantity: number;
  pricePerUnit: number;
  description?: string;
  toppings?: { id: number; name: string; price: number }[];
}

export interface CartSummaryData {
  deliveryCost: number;
  total: number;
  deliveryInfo?: string;
}

export interface ContactFormData {
  name: string;
  surname: string;
  phone: string | undefined;
}

export interface DeliveryFormData {
  street: string;
  suite: string;
  zipcode: string;
  city: string;
}

export interface CompanyFormData {
  nip: string;
  name: string;
  street: string;
  suite: string;
  zipcode: string;
  city: string;
}
