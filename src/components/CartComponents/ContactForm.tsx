import FormInput from "@/components/CartComponents/FormInput";

export default function ContactForm() {
    return (
        <>
            <h2 className="font-poppins-bold text-xl sm:text-2xl mb-6 text-stone-700 text-shadow-xs">Dane kontaktowe</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <FormInput label="Imię" id="firstName" placeholder="Tomasz" required />
                <FormInput label="Nazwisko" id="lastName" placeholder="Kowalski" required />
                <FormInput label="Telefon" id="phone" placeholder="123-456-789" type="tel" required />
                <FormInput label="E-mail" id="email" placeholder="mail@example.com" type="email" required />
            </div>
        </>
    )
}
