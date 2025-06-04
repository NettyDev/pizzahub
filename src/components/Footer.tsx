import { Twitter, Instagram, Facebook } from "lucide-react";

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
              <p className="text-sm">
                Witaj w PizzaHub! Jesteśmy pasjonatami doskonałego smaku i świeżych składników.
                <br />
                Każda nasza pizza to historia opowiedziana na chrupiącym cieście, z miłością do tradycji i odrobiną
                nowoczesnej fantazji. Zapraszamy do odkrywania naszych specjałów!
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-base font-bold tracking-wide">Kontakt</p>
            <div className="flex">
              <p className="mr-1">Telefon:</p>
              <p>+48 213 769 735</p>
            </div>
            <div className="flex">
              <p className="mr-1">E-mail:</p>
              <p>kontakt@pizzahub.pl</p>
            </div>
            <div className="flex">
              <p className="mr-1">Adres:</p>
              <p>
                Aleja Armii Krajowej 13/15, <br /> 42-200 Częstochowa
              </p>
            </div>
          </div>
          <div>
            <span className="font-bold tracking-wide">Media społecznościowe</span>
            <div className="flex items-center mt-1 space-x-3">
              <Twitter className="h-5 text-red-700"></Twitter>
              <Instagram className="h-5 text-red-700"></Instagram>
              <Facebook className="h-5 text-red-700"></Facebook>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-gray-600">© Copyright 2025 PizzaHub s.a. Wszelkie prawa zastrzeżone.</p>
          <p className="text-sm text-gray-600">F.A.Q</p>
          <p className="text-sm text-gray-600">Polityka Prywatności</p>
          <p className="text-sm text-gray-600">Terms</p>
        </div>
      </div>
    </div>
  );
}
