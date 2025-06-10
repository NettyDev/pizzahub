"use client";

import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import PaymentMethod from "@/components/CartComponents/Payment";
import DeliveryMethod from "@/components/CartComponents/Delivery";
import Summary from "@/components/CartComponents/Summary";
import DeliveryForm from "@/components/CartComponents/DeliveryForm";
import ContactForm from "@/components/CartComponents/ContactForm";
import FormInput from "@/components/CartComponents/FormInput";
import type { CartSummaryData, CartItem, ContactFormData, DeliveryFormData } from "@/components/CartComponents/types";
import { Plus, ShoppingBag } from "lucide-react";
import { Composition, Pizza, useCartState } from "@/components/CartContext";
import SpinnerCircle4 from "@/components/ui/spinner";

const delivery_options_cart = [
  { value: "delivery", label: "Dostawa" },
  { value: "pickup", label: "Odbiór osobisty" },
  { value: "restaurant", label: "Zjem na miejscu" }
];

const delivery_time_options_cart = [
  { value: "now", label: "Jak najszybciej" },
  { value: "later", label: "Wybierz termin" }
];

export default function CartPage() {
  return (
    <>
      <div className="w-full bg-[url(/pizza-pattern.png)] flex justify-center">
        <div className="bg-white w-full max-w-5xl shadow-2xl">
          <Cart />
        </div>
      </div>
    </>
  );
}

function Cart() {
  const { isLocalStorageUpdated } = useCartState();
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(delivery_options_cart[0].value);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(delivery_time_options_cart[0].value);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedHour, setSelectedHour] = useState<string | undefined>(undefined);

  const [showInvoiceFields, setShowInvoiceFields] = useState(false);

  const [contactData, setContactData] = useState<Partial<ContactFormData>>({});
  const [deliveryAddressData, setDeliveryAddressData] = useState<Partial<DeliveryFormData>>({});

  const [termsAccepted, setTermsAccepted] = useState(false);
  // const [newsletterAccepted, setNewsletterAccepted] = useState(false); // Dla drugiego checkboxa, jeśli chcesz śledzić jego stan

  const handlePurchase = (
    cart: (Pizza | Composition)[],
    totalPrice: number,
    deliveryPrice: number,
    clear: () => void
  ) => {
    const summmary = {
      cart,
      totalPrice,
      deliveryPrice,
      selectedDeliveryMethod,
      selectedDeliveryTime,
      selectedDate,
      selectedHour
    };

    console.log("Zamówienie do przetworzenia:", summmary);
  };

  return (
    <>
      <div className="bg-red-700 text-white text-center py-8 sm:py-10 px-4 sm:px-6 shadow-md">
        <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">Twój koszyk</h2>
      </div>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-16">
          <div className="w-full lg:w-[60%] xl:w-2/3 flex flex-col gap-8">
            <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-stone-200">
              <h2 className="text-xl sm:text-2xl mb-6 text-shadow-xs">Płatność</h2>
              <PaymentMethod onChange={console.log} />
            </section>

            <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-stone-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <DeliveryMethod
                  selectedDeliveryMethod={selectedDeliveryMethod}
                  setSelectedDeliveryMethod={setSelectedDeliveryMethod}
                  selectedDeliveryTime={selectedDeliveryTime}
                  setSelectedDeliveryTime={setSelectedDeliveryTime}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  selectedHour={selectedHour}
                  setSelectedHour={setSelectedHour}
                />
              </div>
            </section>

            {selectedDeliveryMethod === "delivery" && <DeliveryForm />}

            <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-stone-200">
              <ContactForm />

              <div className="mt-8 pt-6 border-t border-stone-200">
                <h3 className="text-lg mb-4 text-shadow-xs">Dokument sprzedaży</h3>
                <RadioGroup
                  defaultValue="paragon"
                  onValueChange={(value) => setShowInvoiceFields(value === "faktura")}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="paragon"
                      id="paragon"
                      className="[&_svg]:fill-white h-4 w-4 border-stone-400 rounded-sm text-red-600 focus:ring-offset-0 focus:ring-2 focus:ring-red-500 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                    />
                    <Label htmlFor="paragon" className="text-sm cursor-pointer">
                      Paragon
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="faktura"
                      id="faktura"
                      className="[&_svg]:fill-white h-4 w-4 border-stone-400 rounded-sm text-red-600 focus:ring-offset-0 focus:ring-2 focus:ring-red-500 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                    />
                    <Label htmlFor="faktura" className="text-sm cursor-pointer">
                      Faktura VAT
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {showInvoiceFields && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <FormInput label="NIP" id="nip" placeholder="1234567890" required />
                  <FormInput label="Nazwa firmy" id="company" placeholder="Januszex sp. z o.o." required />
                  <FormInput label="Ulica" id="street" placeholder="Malinowa" required />
                  <FormInput label="Numer domu / lokalu" id="houseNumber" placeholder="10A / 2" required />
                  <FormInput label="Kod pocztowy" id="zipCode" placeholder="00-001" required />
                  <FormInput label="Miasto" id="city" placeholder="Radomsko" required />
                </div>
              )}
              <div className="mt-8 pt-6 border-t border-stone-200">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="comment" className="border-b-0">
                    <AccordionTrigger className="hover:no-underline text-base py-3 group">
                      Dodaj komentarz do zamówienia (opcjonalnie)
                      <Plus className="h-5 w-5 ml-auto transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </AccordionTrigger>
                    <AccordionContent className="pt-1">
                      <Textarea
                        placeholder="Twoje uwagi dotyczące zamówienia, np. informacje dla dostawcy, preferencje..."
                        className="mt-2 border-stone-300 focus:ring-red-500 focus:border-red-500 min-h-[100px]"
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200 space-y-5">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    className="mt-0.5 border-stone-400 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 focus:ring-offset-0 focus:ring-2 focus:ring-red-500"
                  />
                  <Label htmlFor="terms" className="text-xs sm:text-sm leading-snug cursor-pointer">
                    Akceptuję postanowienia Regulaminu i Polityki Prywatności (wymagane)
                  </Label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms2"
                    // checked={newsletterAccepted}
                    // onCheckedChange={(checked) => setNewsletterAccepted(checked as boolean)}
                    className="mt-0.5 border-stone-400 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 focus:ring-offset-0 focus:ring-2 focus:ring-red-500"
                  />
                  <Label htmlFor="terms2" className="text-xs sm:text-sm leading-snug cursor-pointer">
                    Chcę otrzymywać informacje o promocjach i nowościach na email (opcjonalne)
                  </Label>
                </div>
              </div>
            </section>
          </div>

          <div className="w-full lg:w-[50%] xl:w-3/7">
            <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 border-2 border-red-600 lg:sticky lg:top-46">
              {isLocalStorageUpdated ? (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold text-red-700 tracking-wide mb-6 text-center">
                    Twoje zamówienie
                  </h2>
                  <Summary isDelivery={selectedDeliveryMethod == "delivery"} handlePurchase={handlePurchase} />
                </>
              ) : (
                <div className="h-50 w-full flex flex-col gap-2 justify-center items-center">
                  <SpinnerCircle4 />
                  <p className="text-xl flex gap-2">
                    Ładowanie koszyka <ShoppingBag />
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
