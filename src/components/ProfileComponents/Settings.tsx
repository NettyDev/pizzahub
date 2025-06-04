"use client";

import FormInput from "@/components/CartComponents/FormInput";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import * as React from "react";

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
  const [consents, setConsents] = React.useState<Record<string, CheckboxPrimitive.CheckedState>>({
    sms: false,
    phone: false,
    offers: false
  });

  const handleConsentChange = (consentName: string, checked: CheckboxPrimitive.CheckedState) => {
    setConsents((prev) => ({
      ...prev,
      [consentName]: checked
    }));
  };

  const handleSingleConsentChange = (consentName: string, newCheckedState: CheckboxPrimitive.CheckedState) => {
    setConsents((prev) => ({
      ...prev,
      [consentName]: newCheckedState
    }));
  };

  const handleSelectAllChange = (checked: CheckboxPrimitive.CheckedState) => {
    const newCheckedState = checked === true;
    setConsents({
      sms: newCheckedState,
      phone: newCheckedState,
      offers: newCheckedState
    });
  };

  const consentKeys = Object.keys(consents);
  const allTrue = consentKeys.every((key) => consents[key] === true);
  const allFalse = consentKeys.every((key) => consents[key] === false || consents[key] === "indeterminate");

  let selectAllState: CheckboxPrimitive.CheckedState;
  if (allTrue) {
    selectAllState = true;
  } else if (allFalse) {
    selectAllState = false;
  } else {
    selectAllState = "indeterminate";
  }

  const [company, setCompany] = React.useState(false);
  const { data: session, isPending, refetch } = authClient.useSession();

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex flex-col items-start w-full">
          <h2 className="text-3xl font-semibold mb-4 text-shadow-xs">Ustawienia</h2>
          <p className="text-stone-600 text-sm mb-8">Zarządzaj swoimi ustawieniami konta.</p>

          <div className="w-full mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-shadow-xs">Dane konta</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <FormInput label="Imię" id="firstName" placeholder="Tomasz" required />
              <FormInput label="Nazwisko" id="lastName" placeholder="Kowalski" required />
              <FormInput label="Telefon" id="phone" placeholder="123-456-789" type="tel" />
              <FormInput label="E-mail" id="email" placeholder="mail@example.com" type="mail" required />
              <div className="sm:col-span-2">
                <Button className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200">
                  Zmień hasło
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-shadow-xs">Adres dostawy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              <FormInput label="Ulica" id="street" placeholder="Malinowa" />
              <FormInput label="Numer domu / mieszkania" id="houseNumber" placeholder="10A / 2" />
              <FormInput label="Kod pocztowy" id="zipCode" placeholder="00-001" />
              <FormInput label="Miasto" id="city" placeholder="Radomsko" />
            </div>
          </div>

          <div className="w-full mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-shadow-xs">Dane do faktury</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {company ? (
                <>
                  <FormInput label="NIP" id="nip" placeholder="1234567890" />
                  <FormInput label="Nazwa firmy" id="company" placeholder="Januszex sp. z o.o." />
                  <FormInput label="Ulica" id="street" placeholder="Malinowa" />
                  <FormInput label="Numer domu / lokalu" id="houseNumber" placeholder="10A / 2" />
                  <FormInput label="Kod pocztowy" id="zipCode" placeholder="00-001" />
                  <FormInput label="Miasto" id="city" placeholder="Radomsko" />
                  <div className="sm:col-span-2">
                    <Button
                      onClick={() => setCompany(false)}
                      className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200"
                    >
                      Usuń dane
                    </Button>
                  </div>
                </>
              ) : (
                <div className="sm:col-span-2">
                  <Button
                    onClick={() => setCompany(true)}
                    className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200"
                  >
                    Dodaj dane
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
                    <Checkbox
                      id="smsConsent"
                      checked={consents.sms}
                      onCheckedChange={(checked) => handleSingleConsentChange("sms", checked)}
                    />
                    <label
                      htmlFor="smsConsent"
                      className="ml-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Chcę otrzymywać wiadomości SMS.
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      id="phoneConsent"
                      checked={consents.phone}
                      onCheckedChange={(checked) => handleSingleConsentChange("phone", checked)}
                    />
                    <label
                      htmlFor="phoneConsent"
                      className="ml-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Chcę otrzymywać informacje telefonicznie.
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox
                      id="offersConsent"
                      checked={consents.offers}
                      onCheckedChange={(checked) => handleSingleConsentChange("offers", checked)}
                    />
                    <label
                      htmlFor="offersConsent"
                      className="ml-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Chcę otrzymywać ofertę dopasowaną do moich potrzeb.
                    </label>
                  </div>
                </div>
              </div>

              <Button className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200 mt-6">
                Zapisz zgody
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
        onClick={() => alert("Twoje konto zostało usunięte.")}
      >
        Usuń konto
      </Button>
    </div>
  );
}
