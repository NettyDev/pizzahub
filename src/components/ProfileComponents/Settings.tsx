"use client";

import FormInput from "@/components/CartComponents/FormInput";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, Disc, LoaderCircle, MinusIcon, Save } from "lucide-react";
import * as React from "react";
import { useDebounce } from "use-debounce";
import { z } from "zod";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { deepEqual } from "../CartContext";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { CompanyFormData, ContactFormData, DeliveryFormData } from "../CartComponents/types";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "group peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=indeterminate]:bg-primary data-[state=checked]:text-primary-foreground data-[state=indeterminate]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <MinusIcon className="h-4 w-4 hidden group-data-[state=indeterminate]:block" />
      <CheckIcon className="h-4 w-4 hidden group-data-[state=checked]:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export default function Settings() {
  const handleSelectAllChange = (checked: CheckboxPrimitive.CheckedState) => {
    const newCheckedState = checked === true;
    setValue("agreements.newsletter", newCheckedState);
    setValue("agreements.ai", newCheckedState);
    setValue("agreements.ereceipt", newCheckedState);
  };

  const [isLoading, setIsLoading] = React.useState(true);
  const [address, setAddress] = React.useState<undefined | DeliveryFormData>(undefined);
  const [company, setCompany] = React.useState<undefined | CompanyFormData>(undefined);

  React.useEffect(() => {
    Promise.all([
      fetch("/api/profile/address").then((res) => res.json()),
      fetch("/api/profile/company").then((res) => res.json())
    ]).then(([addressData, companyData]) => {
      if (addressData.status === "OK") {
        setAddress(addressData.address);
      }
      if (companyData.status === "OK") {
        setCompany(companyData.company);
      }
      setIsLoading(false);
    });
  }, []);

  const { data: session, isPending, refetch } = authClient.useSession();

  const { control, watch, setValue, getValues } = useForm({
    values: {
      contact: session?.user
        ? (() => {
            const { name, surname, phone } = session.user;
            return { name, surname, phone: phone ?? undefined };
          })()
        : undefined,
      company,
      address,
      agreements: {
        newsletter: session?.user.agreement1,
        ai: session?.user.agreement2,
        ereceipt: session?.user.agreement3
      }
    },
    defaultValues: {
      contact: {
        name: "",
        surname: "",
        phone: ""
      },
      address: {
        street: "",
        suite: "",
        zipcode: "",
        city: ""
      },
      hasCompany: false,
      company: {
        nip: "",
        name: "",
        street: "",
        suite: "",
        zipcode: "",
        city: ""
      },
      agreements: {
        newsletter: false,
        ai: false,
        ereceipt: false
      }
    }
  });

  const [hasCompany, agreements] = watch(["hasCompany", "agreements"]);

  const consentKeys = agreements ? (Object.keys(agreements) as (keyof typeof agreements)[]) : [];
  const allTrue = agreements ? consentKeys.every((key) => agreements[key] === true) : false;
  const allFalse = agreements ? consentKeys.every((key) => agreements[key] === false) : true;

  let selectAllState: CheckboxPrimitive.CheckedState;
  if (allTrue) {
    selectAllState = true;
  } else if (allFalse) {
    selectAllState = false;
  } else {
    selectAllState = "indeterminate";
  }

  if (isLoading) {
    return (
      <div className="p-6 sm:p-8 md:p-10 text-center min-h-[300px] flex flex-col justify-center items-center">
        <LoaderCircle className="h-16 w-16 text-red-400 mx-auto mb-4 animate-spin" />
        <p className="font-semibold text-lg">Ładowanie Twoich danych...</p>
      </div>
    );
  }

  const saveCompany = () => {
    const company = getValues("company");
    if (!company) return;
    const schema = z
      .object({
        nip: z.union([z.string().regex(/^\d{10}$/, "NIP musi mieć 10 cyfr"), z.literal("")]),
        name: z.string().optional(),
        street: z.string().optional(),
        suite: z.string().optional(),
        zipcode: z.union([z.string().regex(/^\d{2}-\d{3}$/, "Kod pocztowy musi być w formacie XX-XXX"), z.literal("")]),
        city: z.string().optional()
      })
      .safeParse(company);
    if (!schema.success) {
      toast.error(
        <ul>
          {schema.error.errors.map((e) => (
            <li key={e.path.join(".")}>{e.message}</li>
          ))}
        </ul>
      );
      return;
    }
    fetch("/api/profile/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ company })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "OK") {
          toast.success("Dane firmy zostały zaktualizowane.");
        } else {
          toast.error("Wystąpił błąd podczas aktualizacji danych firmy.");
        }
      })
      .catch((err) => {
        console.error("Błąd podczas aktualizacji danych firmy:", err);
        toast.error("Wystąpił błąd podczas aktualizacji danych firmy.");
      });
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex flex-col items-start w-full">
          <h2 className="text-3xl font-semibold mb-4 text-shadow-xs">Ustawienia</h2>
          <p className="text-stone-600 text-sm mb-8">Zarządzaj swoimi ustawieniami konta.</p>

          <div className="w-full mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-shadow-xs">Dane konta</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <Controller
                name="contact.name"
                control={control}
                render={({ field }) => <FormInput label="Imię" id="name" placeholder="Tomasz" required {...field} />}
              />

              <Controller
                name="contact.surname"
                control={control}
                render={({ field }) => (
                  <FormInput label="Nazwisko" id="lastName" placeholder="Kowalski" required {...field} />
                )}
              />

              <Controller
                name="contact.phone"
                control={control}
                render={({ field }) => (
                  <FormInput label="Telefon" id="phone" placeholder="123-456-789" type="tel" {...field} />
                )}
              />
              <Tooltip>
                <TooltipTrigger>
                  <FormInput
                    label="E-mail"
                    id="email"
                    placeholder="mail@example.com"
                    type="mail"
                    value={session?.user.email || ""}
                    required
                    disabled
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Nie możesz zmienić swojego adresu e-mail.</p>
                </TooltipContent>
              </Tooltip>
              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between">
                <Button className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200">
                  Zmień hasło
                </Button>
                <Button
                  onClick={() => {
                    const contact = getValues("contact");
                    if (!contact) return;
                    const schema = z
                      .object({
                        name: z.string().min(1, "Imię jest wymagane"),
                        surname: z.string().min(1, "Nazwisko jest wymagane"),
                        phone: z.union([
                          z
                            .string()
                            .regex(
                              /^(\+48\s?)?\d{3}[\s-]?\d{3}[\s-]?\d{3}$/,
                              "Telefon musi być w poprawnym formacie polskim"
                            ),
                          z.literal("")
                        ])
                      })
                      .safeParse(contact);
                    if (!schema.success) {
                      toast.error(
                        <ul>
                          {schema.error.errors.map((e) => (
                            <li key={e.path.join(".")}>{e.message}</li>
                          ))}
                        </ul>
                      );
                      return;
                    }
                    authClient
                      .updateUser({
                        ...contact
                      })
                      .then(() => {
                        toast.success("Dane konta zostały zaktualizowane.");
                        refetch();
                      })
                      .catch((err) => {
                        console.error("Błąd podczas aktualizacji danych konta:", err);
                        toast.error("Wystąpił błąd podczas aktualizacji danych konta.");
                      });
                  }}
                  className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200"
                >
                  <Save />
                  Zapisz
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-shadow-xs">Adres dostawy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <Controller
                name="address.street"
                control={control}
                render={({ field }) => <FormInput label="Ulica" id="street" placeholder="Malinowa" {...field} />}
              />
              <Controller
                name="address.suite"
                control={control}
                render={({ field }) => (
                  <FormInput label="Numer domu / mieszkania" id="suite" placeholder="10A / 2" {...field} />
                )}
              />
              <Controller
                name="address.zipcode"
                control={control}
                render={({ field }) => <FormInput label="Kod pocztowy" id="zipcode" placeholder="00-001" {...field} />}
              />
              <Controller
                name="address.city"
                control={control}
                render={({ field }) => <FormInput label="Miasto" id="city" placeholder="Radomsko" {...field} />}
              />
              <div className="sm:col-span-2 flex justify-end">
                <Button
                  onClick={() => {
                    const address = getValues("address");
                    if (!address) return;
                    console.log("Zapisuję adres:", address);
                    const schema = z
                      .object({
                        street: z.string().optional(),
                        suite: z.string().optional(),
                        zipcode: z.union([
                          z.string().regex(/^\d{2}-\d{3}$/, "Kod pocztowy musi być w formacie XX-XXX"),
                          z.literal("")
                        ]),
                        city: z.string().optional()
                      })
                      .safeParse(address);
                    if (!schema.success) {
                      toast.error(
                        <ul>
                          {schema.error.errors.map((e) => (
                            <li key={e.path.join(".")}>{e.message}</li>
                          ))}
                        </ul>
                      );
                      return;
                    }
                    fetch("/api/profile/address", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({ address })
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        if (data.status === "OK") {
                          toast.success("Adres dostawy został zaktualizowany.");
                        } else {
                          toast.error("Wystąpił błąd podczas aktualizacji adresu dostawy.");
                        }
                      })
                      .catch((err) => {
                        console.error("Błąd podczas aktualizacji adresu dostawy:", err);
                        toast.error("Wystąpił błąd podczas aktualizacji adresu dostawy.");
                      });
                  }}
                  className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200"
                >
                  <Save />
                  Zapisz
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-shadow-xs">Dane do faktury</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {hasCompany ? (
                <>
                  <Controller
                    name="company.nip"
                    control={control}
                    render={({ field }) => <FormInput label="NIP" id="nip" placeholder="1234567890" {...field} />}
                  />
                  <Controller
                    name="company.name"
                    control={control}
                    render={({ field }) => (
                      <FormInput
                        label="Nazwa firmy"
                        id="companyName"
                        placeholder="Januszex sp. z o.o."
                        required
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="company.street"
                    control={control}
                    render={({ field }) => <FormInput label="Ulica" id="street" placeholder="Malinowa" {...field} />}
                  />
                  <Controller
                    name="company.suite"
                    control={control}
                    render={({ field }) => (
                      <FormInput label="Numer domu / lokalu" id="suite" placeholder="10A / 2" {...field} />
                    )}
                  />
                  <Controller
                    name="company.zipcode"
                    control={control}
                    render={({ field }) => (
                      <FormInput label="Kod pocztowy" id="zipcode" placeholder="00-001" {...field} />
                    )}
                  />
                  <Controller
                    name="company.city"
                    control={control}
                    render={({ field }) => <FormInput label="Miasto" id="city" placeholder="Radomsko" {...field} />}
                  />
                  <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between">
                    <Button
                      onClick={() => {
                        setValue("hasCompany", false);
                        setValue("company", {
                          nip: "",
                          name: "",
                          street: "",
                          suite: "",
                          zipcode: "",
                          city: ""
                        });
                      }}
                      className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200"
                    >
                      Usuń dane
                    </Button>
                    <Button
                      onClick={saveCompany}
                      className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200"
                    >
                      <Save />
                      Zapisz
                    </Button>
                  </div>
                </>
              ) : (
                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between">
                  <Button
                    onClick={() => setValue("hasCompany", true)}
                    className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200"
                  >
                    Dodaj dane
                  </Button>
                  <Button
                    onClick={saveCompany}
                    className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200"
                  >
                    <Save />
                    Zapisz
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-2xl font-semibold mb-4 text-shadow-xs">Twoje zgody i ustawienia powiadomień</h3>
            <p className="text-stone-600 text-sm mb-6">Zaznaczając pola, akceptujesz Politykę Prywatności.</p>

            <div className="space-y-4">
              <div className="flex items-center">
                <Checkbox
                  id="selectAllConsents"
                  checked={selectAllState}
                  onCheckedChange={handleSelectAllChange}
                  aria-label="Zaznacz wszystkie zgody"
                />
                <label
                  htmlFor="selectAllConsents"
                  className="ml-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Zaznacz wszystkie
                </label>
              </div>

              <div className="pl-7 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Controller
                      name="agreements.newsletter"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox id="newsletter" checked={value} onCheckedChange={onChange} />
                      )}
                    />
                    <label
                      htmlFor="newsletter"
                      className="ml-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Chcę otrzymywać newsletter z informacjami o promocjach i nowościach.
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Controller
                      name="agreements.ai"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox id="ai" checked={value} onCheckedChange={onChange} />
                      )}
                    />
                    <label
                      htmlFor="ai"
                      className="ml-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Chcę, aby moje dane były wykorzystywane do ulepszania usług i personalizacji oferty.
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Controller
                      name="agreements.ereceipt"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <Checkbox id="ereceipt" checked={value} onCheckedChange={onChange} />
                      )}
                    />
                    <label
                      htmlFor="ereceipt"
                      className="ml-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Chcę otrzymywać e-paragon w formie elektronicznej na mój adres e-mail.
                    </label>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  const agreements = getValues("agreements");
                  if (!agreements) return;
                  const schema = z
                    .object({
                      newsletter: z.boolean(),
                      ai: z.boolean(),
                      ereceipt: z.boolean()
                    })
                    .safeParse(agreements);
                  if (!schema.success) {
                    toast.error(
                      <ul>
                        {schema.error.errors.map((e) => (
                          <li key={e.path.join(".")}>{e.message}</li>
                        ))}
                      </ul>
                    );
                    return;
                  }
                  authClient
                    .updateUser({
                      agreement1: agreements.newsletter,
                      agreement2: agreements.ai,
                      agreement3: agreements.ereceipt
                    })
                    .then(() => {
                      toast.success("Ustawienia zgód zostały zaktualizowane.");
                      refetch();
                    })
                    .catch((err) => {
                      console.error("Błąd podczas aktualizacji ustawień zgód:", err);
                      toast.error("Wystąpił błąd podczas aktualizacji ustawień zgód.");
                    });
                }}
                className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200 mt-6"
              >
                <Save />
                Zapisz
              </Button>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-shadow-xs">Usuwanie konta</h3>
      <p className="text-stone-600 text-sm mb-6">
        Jeśli zdecydujesz się usunąć swoje konto, wszystkie Twoje dane zostaną trwale usunięte. Upewnij się, że na pewno
        chcesz to zrobić - Twojego konta nie będziemy mogli przywrócić. Usunięcie konta spowoduje utratę wszystkich
        danych i historii zamówień.
      </p>
      <Button
        className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200"
        onClick={() =>
          authClient.deleteUser().then(() => {
            toast.success("Twoje konto zostało usunięte.");
            redirect("/");
          })
        }
      >
        Usuń konto
      </Button>
    </div>
  );
}
