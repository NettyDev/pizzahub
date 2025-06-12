"use client";

import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import PaymentMethod from "@/components/CartComponents/Payment";
import DeliveryMethod, { available_hours } from "@/components/CartComponents/Delivery";
import Summary from "@/components/CartComponents/Summary";
import DeliveryForm from "@/components/CartComponents/DeliveryForm";
import ContactForm from "@/components/CartComponents/ContactForm";
import FormInput from "@/components/CartComponents/FormInput";
import { Banknote, CreditCard, Nfc, Plus, ShoppingBag } from "lucide-react";
import { Composition, Pizza, useCartState } from "@/components/CartContext";
import SpinnerCircle4 from "@/components/ui/spinner";
import { toast } from "sonner";

import { Controller, FormProvider, useForm } from "react-hook-form";
import clsx from "clsx";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const pay_options = [
  { value: "payu", icon: Nfc, label: "PayU", description: "Szybka płatność online" },
  { value: "card", icon: CreditCard, label: "Karta kredytowa", description: "Płatność kartą kredytową" },
  { value: "cash", icon: Banknote, label: "Gotówka", description: "Płatność przy odbiorze" }
];

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

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
interface DeliveryFormData {
  street: string;
  suite: string;
  zipcode: string;
  city: string;
}
interface CompanyFormData {
  nip: string;
  name: string;
  street: string;
  suite: string;
  zipcode: string;
  city: string;
}

export interface FormValues {
  paymentMethod: string;
  deliveryMethod: string;
  deliveryTime: string;
  deliveryDate: Date;
  deliveryHour: string;
  termsAccepted: boolean;
  newsLetterAccepted: boolean;
  invoice: boolean;
  contact: ContactFormData;
  delivery: DeliveryFormData;
  company: CompanyFormData;
  comment: string;
}

const FormSchema = z
  .object({
    paymentMethod: z.string().min(1, "Wybierz metodę płatności"),
    deliveryMethod: z.string().min(1, "Wybierz metodę dostawy"),
    deliveryTime: z.string().min(1, "Wybierz czas dostawy"),
    deliveryDate: z.date(),
    deliveryHour: z.string().min(1, "Wybierz godzinę dostawy"),
    termsAccepted: z.boolean().refine((val) => val, {
      message: "Musisz zaakceptować regulamin"
    }),
    newsLetterAccepted: z.boolean(),
    invoice: z.boolean(),
    contact: z.object({
      firstName: z.string().min(1, "Imię jest wymagane"),
      lastName: z.string().min(1, "Nazwisko jest wymagane"),
      email: z.string().email("Nieprawidłowy adres email").min(1, "Email jest wymagany"),
      phone: z
        .string()
        .min(1, "Numer telefonu jest wymagany")
        .regex(/^(\+48\s?)?\d{3}[\s-]?\d{3}[\s-]?\d{3}$/, "Telefon musi być w poprawnym formacie polskim")
    }),
    delivery: z.object({
      street: z.string().optional(),
      suite: z.string().optional(),
      zipcode: z.union([z.literal(""), z.string().regex(/^\d{2}-\d{3}$/, "Nieprawidłowy format kodu pocztowego")]),
      city: z.string().optional()
    }),
    company: z.object({
      nip: z.string().optional(),
      name: z.string().optional(),
      street: z.string().optional(),
      suite: z.string().optional(),
      zipcode: z.union([z.literal(""), z.string().regex(/^\d{2}-\d{3}$/, "Nieprawidłowy format kodu pocztowego")]),
      city: z.string().optional()
    }),
    comment: z.string().optional()
  })
  .refine(
    (data) => {
      if (data.deliveryMethod === "delivery") {
        return data.delivery.street && data.delivery.suite && data.delivery.zipcode && data.delivery.city;
      }
      return true;
    },
    {
      message: "Wypełnij wszystkie wymagane pola dostawy"
    }
  )
  .refine(
    (data) => {
      if (data.invoice) {
        return (
          data.company.nip &&
          data.company.name &&
          data.company.street &&
          data.company.suite &&
          data.company.zipcode &&
          data.company.city
        );
      }
      return true;
    },
    {
      message: "Wypełnij wszystkie wymagane pola firmy"
    }
  );
function Cart() {
  const { isLocalStorageUpdated } = useCartState();
  const methods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      paymentMethod: pay_options[0].value,
      deliveryMethod: delivery_options_cart[0].value,
      deliveryTime: delivery_time_options_cart[0].value,
      deliveryDate: new Date(),
      deliveryHour: available_hours[0],
      termsAccepted: false,
      newsLetterAccepted: false,
      invoice: false,
      contact: {
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
      },
      delivery: {
        street: "",
        suite: "",
        zipcode: "",
        city: ""
      },
      company: {
        nip: "",
        name: "",
        street: "",
        suite: "",
        zipcode: "",
        city: ""
      },
      comment: ""
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset
  } = methods;

  const [isInvoice, selectedDeliveryMethod] = watch(["invoice", "deliveryMethod"]);

  const handlePurchase = (
    cart: (Pizza | Composition)[],
    totalPrice: number,
    deliveryPrice: number,
    clear: () => void
  ) =>
    handleSubmit(
      (value) => {
        const summmary = {
          ...value,
          cart,
          totalPrice,
          deliveryPrice
        };
        console.log("Zamówienie do przetworzenia:", summmary);

        fetch("/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(summmary)
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Błąd podczas składania zamówienia");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Zamówienie złożone pomyślnie:", data);
            toast.success("Zamówienie zostało złożone pomyślnie! Dziękujemy za zakupy.");
            reset();
            clear();
          })
          .catch((error) => {
            console.error("Błąd podczas składania zamówienia:", error);
            toast.error("Wystąpił błąd podczas składania zamówienia. Spróbuj ponownie później.");
          });
      },
      (errors) => {
        console.log("Form errors:", errors);
        const formatKey = (key: string) => {
          switch (key) {
            case "contact":
              return "Dane kontaktowe";
            case "delivery":
              return "Dane dostawy";
            case "company":
              return "Dane firmy";
            default:
              return key;
          }
        };
        if (Object.keys(errors).length > 0) {
          toast.error(
            <ul>
              {Object.values(errors).map((error, idx) => {
                if (!("message" in error)) {
                  return (
                    <li>
                      <p>{formatKey(Object.keys(errors)[idx])}</p>
                      <ul className="pl-4 list-disc">
                        {Object.values(error).map((subError) => (
                          <li key={subError.message}>{subError.message}</li>
                        ))}
                      </ul>
                    </li>
                  );
                } else return <li>{error.message}</li>;
              })}
            </ul>
          );
        }
      }
    )();

  return (
    <FormProvider {...methods}>
      <div className="bg-red-700 text-white text-center py-8 sm:py-10 px-4 sm:px-6 shadow-md">
        <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">Twój koszyk</h2>
      </div>
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 xl:gap-16">
          <div className="w-full lg:w-[60%] xl:w-2/3 flex flex-col gap-8">
            <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-stone-200">
              <h2 className="text-xl sm:text-2xl mb-6 text-shadow-xs">Płatność</h2>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <PaymentMethod payOptions={pay_options} onChange={onChange} selectedValue={value} />
                )}
              />
            </section>

            <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-stone-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <DeliveryMethod />
              </div>
            </section>

            {selectedDeliveryMethod === "delivery" && <DeliveryForm />}

            <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-stone-200">
              <ContactForm />

              <div className="mt-8 pt-6 border-t border-stone-200">
                <h3 className="text-lg mb-4 text-shadow-xs">Dokument sprzedaży</h3>
                <Controller
                  name="invoice"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <RadioGroup
                      defaultValue="paragon"
                      onValueChange={(value) => onChange(value === "faktura")}
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
                  )}
                />
              </div>

              {isInvoice && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  <Controller
                    name="company.nip"
                    control={control}
                    rules={{ required: "NIP jest wymagany" }}
                    render={({ field }) => (
                      <FormInput label="NIP" id="nip" placeholder="1234567890" required {...field} />
                    )}
                  />
                  <Controller
                    name="company.name"
                    control={control}
                    rules={{ required: "Nazwa firmy jest wymagana" }}
                    render={({ field }) => (
                      <FormInput
                        label="Nazwa firmy"
                        id="company"
                        placeholder="Januszex sp. z o.o."
                        required
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="company.street"
                    control={control}
                    rules={{ required: "Ulica jest wymagana" }}
                    render={({ field }) => (
                      <FormInput label="Ulica" id="street" placeholder="Malinowa" required {...field} />
                    )}
                  />
                  <Controller
                    name="company.suite"
                    control={control}
                    rules={{ required: "Numer lokalu jest wymagany" }}
                    render={({ field }) => (
                      <FormInput label="Numer domu / lokalu" id="suite" placeholder="10A / 2" required {...field} />
                    )}
                  />
                  <Controller
                    name="company.zipcode"
                    control={control}
                    rules={{ required: "Kod pocztowy jest wymagany" }}
                    render={({ field }) => (
                      <FormInput label="Kod pocztowy" id="zipcode" placeholder="00-001" required {...field} />
                    )}
                  />
                  <Controller
                    name="company.city"
                    control={control}
                    rules={{ required: "Miasto jest wymagane" }}
                    render={({ field }) => (
                      <FormInput label="Miasto" id="city" placeholder="Radomsko" required {...field} />
                    )}
                  />
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
                        {...register("comment")}
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200 space-y-5">
                <div className="flex items-start space-x-3">
                  <Controller
                    name="termsAccepted"
                    control={control}
                    rules={{ required: "Musisz zaakceptować regulamin" }}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        id="terms"
                        className="mt-0.5 border-stone-400 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 focus:ring-offset-0 focus:ring-2 focus:ring-red-500"
                        checked={value}
                        onCheckedChange={onChange}
                      />
                    )}
                  />

                  <Label
                    htmlFor="terms"
                    className={clsx(
                      "text-xs sm:text-sm leading-snug cursor-pointer",
                      errors.termsAccepted && "text-red-600"
                    )}
                  >
                    Akceptuję postanowienia Regulaminu i Polityki Prywatności (wymagane)
                  </Label>
                </div>
                <div className="flex items-start space-x-3">
                  <Controller
                    name="newsLetterAccepted"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        id="terms2"
                        checked={value}
                        onCheckedChange={onChange}
                        className="mt-0.5 border-stone-400 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600 focus:ring-offset-0 focus:ring-2 focus:ring-red-500"
                      />
                    )}
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
    </FormProvider>
  );
}
