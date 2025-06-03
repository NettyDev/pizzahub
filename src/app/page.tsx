import MenuStats from "@/components/MenuStats";
import Ranking from "@/components/Ranking";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="w-full bg-[url(/pizza-pattern.png)] flex justify-center">
        <div className="bg-white w-full max-w-5xl shadow-2xl">
          <MainPage />
        </div>
      </div>
    </>
  );
}

function MainPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full items-center px-4 pt-8 pb-4 sm:pt-12 sm:pb-6">
        <div className="flex flex-col w-full md:w-2/3 md:pr-8 gap-4 text-center md:text-left">
          <div className="flex justify-center md:justify-start">
            <h1 className="font-[poppins] font-bold text-shadow-xs text-3xl sm:text-4xl lg:text-5xl text-transparent bg-gradient-to-r from-red-700 to-stone-950 bg-clip-text leading-tight lg:leading-normal">
              Twoja pizza czeka,
              <br /> zamów ją <i>natychmiast</i>!
            </h1>
          </div>
          <div>
            <p className="font-[poppins] text-base font-bold sm:text-lg lg:text-xl text-shadow-xs">
              Gorąca, pachnąca, gotowa do schrupania - nie każ jej czekać, zamów już teraz!
            </p>
          </div>
          <div className="mt-4 flex justify-center md:justify-start">
            <Link href="/menu">
              <Button className="w-full sm:w-auto bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200">
                Zamów
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex w-full md:w-1/3 justify-center items-center mt-8 md:mt-0">
          <img src="/pizza_time.png" alt="Pyszna pizza gotowa do zamówienia" className="w-3/4 sm:w-2/3 md:w-full max-w-xs sm:max-w-sm md:max-w-md" />
        </div>
      </div>

      <div className="flex w-full justify-center items-center h-10 sm:h-12 bg-[url(/label_background.png)] bg-cover shadow-sm my-6 sm:my-8">
        <p className="font-[poppins] text-shadow-xs text-2xl sm:text-3xl text-white font-extrabold">RANKING</p>
      </div>

      <div className="flex w-full flex-row bg-[url(/bg.png)] bg-repeat bg-size-[64px]">
        <div className="flex flex-col items-center w-full px-2 sm:px-5 py-6 sm:py-8">
          <h2 className="font-[poppins] font-bold text-shadow-xs text-2xl sm:text-3xl text-red-700 text-center mb-4 sm:mb-6">
            TOP MIESIĄCA
          </h2>
          <div className="p-2 sm:p-5 w-full">
            <Ranking />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full items-center justify-center mt-8 sm:mt-12 px-4 text-center">
        <div className="font-[poppins] font-bold text-shadow-xs text-2xl sm:text-3xl text-red-700">
          <h1>STWÓRZ SWOJĄ ULUBIONĄ PIZZĘ</h1>
        </div>
        <div>
          <p className="font-[poppins] font-bold text-shadow-xs text-base sm:text-lg pb-6 sm:pb-10 pt-2">
            Wybierz ciasto, składniki i sosy, takie jakie kochasz.
          </p>
        </div>
      </div>

      <div className="relative w-full flex items-center justify-center px-4 my-6 sm:my-8">
        <img src="/compose_background.png" alt="Stwórz własną kompozycję pizzy" className="w-full max-w-xl h-auto" />
        <Button size="lg" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[5%] sm:mt-[3%] md:mt-[2%] px-6 py-3">
          Miksuj, komponuj, smakuj!
        </Button>
      </div>

      <div className="h-5 bg-[url(/label_background.png)] bg-cover shadow-sm my-6 sm:my-8"></div>

      <div className="flex flex-col lg:flex-row w-full items-center justify-center px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0 lg:pr-8">
          <img src="/angel_pizza.png" alt="Piekielnie dobra pizza" className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-full max-w-xs sm:max-w-sm md:max-w-md" />
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-right">
          <h1 className="font-[poppins] font-bold text-shadow-xs text-3xl sm:text-4xl lg:text-5xl text-transparent bg-gradient-to-r from-red-700 to-stone-950 bg-clip-text pb-4 sm:pb-6">
            Piekielnie dobra, niebiańsko pyszna!
          </h1>
          <div className="flex flex-col gap-4 sm:gap-6 font-[poppins] text-shadow-xs text-sm sm:text-base lg:text-lg text-stone-950">
            <p>
              Nasza pizza powstaje w ogniu prawdziwej pasji - dosłownie i w przenośni! W piecu rozgrzanym do piekelnych
              temperatur ciasto nabiera idealnej chrupkości, a ser topi się w perfekcyjnej harmonii. Nie uznajemy
              kompromisów - każdy składnik jest wyselekcjonowany z najwyższą troską, tak aby efekt był niebiańsko
              pyszny.
            </p>
            <p>
              Każdy etap to sztuka: od ręcznie wyrabianego ciasta, przez świeże aromatyczne dodatki, aż po idealnie
              wypieczony placek, który trafia do Twojego pudełka. A gdy pizza jest gotowa, nasi dostawcy działają niczym
              anielskie posłańcy - szybko, sprawnie i z troską by każda dostawa była jak błogosławieństwo dla Twojego
              apetytu.
            </p>
            <p>
              Nie ważne, czy jesteś miłośnikiem klasycznych smaków, czy lubisz eksperymentować - u nas każdy znajdzie coś
              dla siebie. Bo dobra pizza powinna rozpalać smakowe zmysły, ale jednocześnie otulać podniebienie jak
              kulinarny raj.
            </p>
            <p>Niebo i piekło łączą się tu w perfekcyjnej harmonii. Zamów i przekonaj się sam!</p>
          </div>
        </div>
      </div>

      <div className="h-5 bg-[url(/label_background.png)] bg-cover shadow-sm my-6 sm:my-8"></div>

      <div className="px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="text-center">
          <h2 className="font-[poppins] font-bold text-shadow-xs text-2xl sm:text-3xl text-red-700">
            Nasze osiągnięcia w liczbach!
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed sm:leading-8 text-stone-950 text-shadow-xs">
            Jesteśmy dumni z każdej pizzy, którą przygotowaliśmy, każdego zadowolonego klienta, i całego zespołu, który
            dba o perfekcyjny smak i obsługę!
          </p>
        </div>
        <MenuStats/>
        <p className="font-[poppins] text-base sm:text-lg text-shadow-xs text-center py-4 sm:py-6">
          Każda liczba to dowód na nasze zaangażowanie i pasję! Zamów i bądź częścią tej wyjątkowej historii!
        </p>
        <div className="flex justify-center items-center py-3">
          <Link href="/menu">
            <Button className="w-full sm:w-auto size-lg bg-red-600 text-white hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-colors duration-200">
              Zamów już teraz
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}