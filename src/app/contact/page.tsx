import Menu from "@/components/Menu";

export default function Contact() {
  return (
    <>
      <Menu />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
          <h2 className="font-poppins bold font-extrabold text-3xl text-red-700 text-shadow-xs">Odwiedź nas</h2>
          <p className="mt-4 text-lg text-stone-950">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="mt-16 lg:mt-20 flex flex-col lg:flex-row gap-8 items-center">
          <div className="rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1390.3786128978595!2d18.80596650436638!3d54.59908214011829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd0429b0408aab%3A0x66e584a9f09d68ea!2sHel!5e1!3m2!1spl!2spl!4v1747153803630!5m2!1spl!2spl"
              width="450"
              height="480"
              loading="lazy"
            ></iframe>
          </div>
          <div>
            <div className="max-w-full mx-auto rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <h3 className="font-poppins-bold text-lg font-bold text-stone-950">Nasz adres</h3>
                <p className="font-poppins-bold mt-1">Ćwiartki 3/4</p>
              </div>
              <div className="border-t border-red-700 px-6 py-4">
                <h3 className="font-poppins-bold text-lg font-bold text-stone-950">Godziny otwarcia</h3>
                <p className="font-poppins-bold mt-1">Poniedziałek - Piątek: 12:00 - 22:00</p>
                <p className="font-poppins-bold mt-1">Sobota - Niedziela: 12:00 - 02:00</p>
              </div>
              <div className="border-t border-red-700 px-6 py-4">
                <h3 className="font-poppins-bold text-lg font-bold text-stone-950">Kontakt</h3>
                <p className="font-poppins-bold mt-1">Numer telefonu: 111-222-333</p>
                <p className="font-poppins-bold mt-1">Adres email: grzegorz@pizzahub.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
