import { FormValues } from "@/app/cart/page";
import FormInput from "@/components/CartComponents/FormInput";
import { Controller, useFormContext } from "react-hook-form";

export default function DeliveryForm() {
  const {
    control,
    formState: { errors }
  } = useFormContext<FormValues>();
  return (
    <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-stone-200">
      <h2 className="text-xl sm:text-2xl mb-6 text-shadow-xs">Adres dostawy</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <Controller
          name="delivery.street"
          rules={{ required: "Ulica jest wymagana" }}
          control={control}
          render={({ field }) => (
            <FormInput
              error={!!errors.delivery?.street}
              label="Ulica"
              id="street"
              placeholder="Malinowa"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="delivery.suite"
          rules={{ required: "Numer domu jest wymagany" }}
          control={control}
          render={({ field }) => (
            <FormInput
              error={!!errors.delivery?.suite}
              label="Numer domu / mieszkania"
              id="suite"
              placeholder="10A / 2"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="delivery.zipcode"
          rules={{ required: "Kod pocztowy jest wymagany" }}
          control={control}
          render={({ field }) => (
            <FormInput
              error={!!errors.delivery?.zipcode}
              label="Kod pocztowy"
              id="zipcode"
              placeholder="00-001"
              required
              {...field}
            />
          )}
        />
        <Controller
          name="delivery.city"
          rules={{ required: "Miasto jest wymagane" }}
          control={control}
          render={({ field }) => (
            <FormInput
              error={!!errors.delivery?.city}
              label="Miasto"
              id="city"
              placeholder="Radomsko"
              required
              {...field}
            />
          )}
        />
      </div>
    </section>
  );
}
