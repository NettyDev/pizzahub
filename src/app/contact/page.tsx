import { MapPin, Clock, Phone } from "lucide-react"

export default function Home() {
  return (
    <>
      <div className="w-full bg-[url(/pizza-pattern.png)] flex justify-center">
        <div className="bg-white w-full max-w-5xl shadow-2xl">
          <Contact />
        </div>
      </div>
    </>
  );
}


function Contact() {
  return (
    <>
      <div className="bg-red-700 text-white text-center py-12 sm:py-16 px-4 sm:px-6 shadow-lg">
        <h2 className="font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
          Odwiedź nas lub skontaktuj się!
        </h2>
        <p className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto">
          Czekamy na Ciebie z gorącą pizzą i przyjazną atmosferą.
        </p>
      </div>

      <div className="bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch">

            {/* Mapa po lewej stronie */}
            <div className="w-full lg:w-3/5 rounded-xl overflow-hidden shadow-xl border border-stone-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1390.3786128978595!2d18.80596650436638!3d54.59908214011829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd0429b0408aab%3A0x66e584a9f09d68ea!2sHel!5e1!3m2!1spl!2spl!4v1747153803630!5m2!1spl!2spl"
                className="w-full h-96 md:h-[520px]"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokalizacja naszej pizzerii na mapie Google"
              ></iframe>
            </div>

            <div className="w-full lg:w-2/5 flex flex-col gap-8">
              <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
                <div className="flex items-center mb-3">
                  <MapPin className="h-6 w-6 text-red-700 mr-3"></MapPin>
                  <h3 className="text-xl font-bold">Nasz adres</h3>
                </div>
                <p className="text-base pl-9">
                  Ćwiartki 3/4<br />
                  Polska
                </p>
              </div>

              <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
                <div className="flex items-center mb-3">
                  <Clock className="h-6 w-6 text-red-700 mr-3"></Clock>
                  <h3 className="text-xl font-bold">Godziny otwarcia</h3>
                </div>
                <div className="text-base pl-9">
                  <p>Poniedziałek - Piątek: <strong>12:00 - 22:00</strong></p>
                  <p className="mt-1">Sobota - Niedziela: <strong>12:00 - 02:00</strong></p>
                </div>
              </div>

              <div className="bg-stone-50 rounded-xl shadow-lg p-6 border border-stone-200">
                <div className="flex items-center mb-3">
                  <Phone className="h-6 w-6 text-red-700 mr-3"></Phone>
                  <h3 className="text-xl font-bold">Skontaktuj się</h3>
                </div>
                <div className="text-base pl-9">
                  <p>
                    Telefon: <a href="tel:111222333" className="text-red-600 hover:text-red-700 font-semibold">111-222-333</a>
                  </p>
                  <p className="mt-1">
                    Email: <a href="mailto:grzegorz@pizzahub.com" className="text-red-600 hover:text-red-700 font-semibold break-all">grzegorz@pizzahub.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}