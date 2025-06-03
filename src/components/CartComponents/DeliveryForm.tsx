import FormInput from "@/components/CartComponents/FormInput";

export default function DeliveryForm() {
    return (
    <section className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-stone-200">
    <h2 className="text-xl sm:text-2xl mb-6 text-shadow-xs">Adres dostawy</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <FormInput label="Ulica" id="street" placeholder="Malinowa" required />
        <FormInput label="Numer domu / mieszkania" id="houseNumber" placeholder="10A / 2" required />
        <FormInput label="Kod pocztowy" id="zipCode" placeholder="00-001" required />
        <FormInput label="Miasto" id="city" placeholder="Radomsko" required />
        <FormInput label="Piętro" id="floor" placeholder="1 (opcjonalnie)" />
        <FormInput label="Firma (opcjonalnie)" id="company" placeholder="Nazwa firmy" className="sm:col-span-2" />
    </div>
    </section>
    )
}