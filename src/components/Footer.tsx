import { Twitter, Instagram, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <div className="border-t">
      <div className="px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 bg-white z-10 relative">
        <div className="grid gap-10 row-gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <a href="/" title="wróć do strony głównej" className="inline-flex items center">
              <img src="/logo.svg" width={150} alt="" />
            </a>
            <div className="mt-6 lg:max-w-sm">
              <p className="text-sm font-poppins-bold">
                Witaj w PizzaHub! Jesteśmy pasjonatami doskonałego smaku i świeżych składników.<br/>
                Każda nasza pizza to historia opowiedziana na chrupiącym cieście, z miłością do tradycji i odrobiną nowoczesnej fantazji. Zapraszamy do odkrywania naszych specjałów!
              </p>

            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-base font-bold font-poppins-bold tracking-wide">Kontakt</p>
            <div className="flex">
              <p className="mr-1 font-poppins-bold">Telefon:</p>
              <p>
                111-222-333
              </p>
            </div>
            <div className="flex">
              <p className="mr-1 font-poppins-bold">E-mail:</p>
              <p>
                pizzahub@pizzahub.com
              </p>
            </div>
            <div className="flex">
              <p className="mr-1 font-poppins-bold">Adres:</p>
              <p>
                Ćwiartki 3/4
              </p>
            </div>
          </div>
          <div>
            <span className="font-bold tracking-wide font-poppins-bold">Media społecznościowe</span>
            <div className="flex items-center mt-1 space-x-3">
                <Twitter className="h-5 text-red-700"></Twitter>
                <Instagram className="h-5 text-red-700"></Instagram>
                <Facebook className="h-5 text-red-700"></Facebook>

            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-gray-600">© Copyright 2025 Lorem Inc. All rights reserved.</p>
          <p className="text-sm text-gray-600">
            F.A.Q
          </p>
          <p className="text-sm text-gray-600">
            Polityka Prywatności
          </p>
          <p className="text-sm text-gray-600">
            Terms
          </p>
        </div>
      </div>
    </div>
  );
}
