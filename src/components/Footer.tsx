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
              <p className="text-sm text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
                Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
                integer nunc posuere.
              </p>
              <p className="mt-4 text-sm text-gray-800">
                Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos
                himenaeos.
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-base font-bold tracking-wide text-gray-900">Kontakt</p>
            <div className="flex">
              <p className="mr-1 text-gray-800">Telefon:</p>
              <p className="transition-colors duration-300 text-deep-red-accent-400 hover:text-deep-red-800">
                111-222-333
              </p>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-800">E-mail:</p>
              <p className="transition-colors duration-300 text-deep-red-accent-400 hover:text-deep-red-800">
                pizzahub@pizzahub.com
              </p>
            </div>
            <div className="flex">
              <p className="mr-1 text-gray-800">Adres:</p>
              <p className="transition-colors duration-300 text-deep-red-accent-400 hover:text-deep-red-800">
                Ćwiartki 3/4
              </p>
            </div>
          </div>
          <div>
            <span className="text-base font-bold tracking-wide text-gray-900">Media społecznościowe</span>
            <div className="flex items-center mt-1 space-x-3">
              <a href="/" className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">
                <Twitter className="h-5"></Twitter>
              </a>
              <a href="/" className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">
                <Instagram className="h-5"></Instagram>
              </a>
              <a href="/" className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400">
                <Facebook className="h-5"></Facebook>
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse justify-between pt-5 pb-10 border-t lg:flex-row">
          <p className="text-sm text-gray-600">© Copyright 2020 Lorem Inc. All rights reserved.</p>
          <p className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
            F.A.Q
          </p>
          <p className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
            Polityka Prywatności
          </p>
          <p className="text-sm text-gray-600 transition-colors duration-300 hover:text-deep-purple-accent-400">
            Terms
          </p>
        </div>
      </div>
    </div>
  );
}
