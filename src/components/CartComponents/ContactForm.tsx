import { FormValues } from "@/app/cart/page";
import FormInput from "@/components/CartComponents/FormInput";
import { Controller, useFormContext } from "react-hook-form";

export default function ContactForm() {
  const {
    control,
    formState: { errors }
  } = useFormContext<FormValues>();
  return (
    <>
      <h2 className="font-poppins-bold text-xl sm:text-2xl mb-6 text-shadow-xs">Dane kontaktowe</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <Controller
          name="contact.firstName"
          control={control}
          rules={{ required: "Imię jest wymagane" }}
          render={({ field }) => (
            <FormInput
              error={!!errors.contact?.firstName}
              label="Imię"
              id="firstName"
              placeholder="Tomasz"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="contact.lastName"
          control={control}
          rules={{ required: "Nazwisko jest wymagane" }}
          render={({ field }) => (
            <FormInput
              error={!!errors.contact?.lastName}
              label="Nazwisko"
              id="lastName"
              placeholder="Kowalski"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="contact.phone"
          control={control}
          rules={{ required: "Telefon jest wymagany" }}
          render={({ field }) => (
            <FormInput
              error={!!errors.contact?.phone}
              label="Telefon"
              id="phone"
              placeholder="123-456-789"
              type="tel"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="contact.email"
          control={control}
          rules={{ required: "Email jest wymagany" }}
          render={({ field }) => (
            <FormInput
              error={!!errors.contact?.email}
              label="E-mail"
              id="email"
              placeholder="mail@example.com"
              type="email"
              required
              {...field}
            />
          )}
        />
      </div>
    </>
  );
}
