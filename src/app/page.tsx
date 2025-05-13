import Menu from "@/components/Menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { start } from "repl";

export default function Home() {
  return (
    <>
      <Menu />
      <div className="flex flex-row w-full">

        <div className="flex flex-col w-320 px-32 py-15">
          
          <div className="flex w-1/2">
            <h1 className="font-poppins-bold font-bold text-shadow-xs text-[48px] text-transparent bg-gradient-to-r from-red-700 to-stone-950 bg-clip-text">
              twoja pizza czeka,
              <br /> zamów ją <i><span>natychmiast</span></i>!
            </h1>
          </div>

          <div className="flex w-1/2 flex-wrap mt-2">
            <p className="font-poppins-bold text-base font-bold text-[18px] text-shadow-xs">
            Gorąca, pachnąca, gotowa do schrupania – nie każ jej czekać, zamów już teraz!
            </p>
          </div>

          <div className="flex w-1/2 mt-4 space-x-2">
            <Button>zamów</Button>
            <Button>zobacz menu</Button>
          </div>
        </div>

        <div className="flex w-auto justify-right items-center">
        <img src="/pizza_time.png" />
        </div>
      </div>

    <div className="flex w-full justify-center items-center h-10 bg-[url(/label_background.png)] bg-cover shadow-sm">
      <p className="font-poppins-bold font-bold text-shadow-xs text-[30px] text-white">ranking</p>
    </div>


    <div className="flex w-full flex-row bg-[url(/top.png)] bg-repeat-round">

      <div className="flex flex-col items-center w-full px-5 py-4">
          <h2 className="font-poppins-bold font-bold text-shadow-xs text-3xl text-red-700 text-center mb-4">TOP DNIA</h2>

          <Carousel opts={{align: start, loop: true,}}>
            <CarouselContent>
              <CarouselItem>
                <div>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">1</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">2</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
                            <CarouselItem>
                <div>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">3</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>


        <div className="flex flex-col items-center w-full px-5 py-4">
          <h2 className="font-poppins-bold font-bold text-shadow-xs text-3xl text-red-700 text-center mb-4">TOP MIESIĄCA</h2>

          <Carousel opts={{align: start, loop: true,}}>
            <CarouselContent>
              <CarouselItem>
                <div>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">1</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">2</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
                            <CarouselItem>
                <div>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">3</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <div className="flex flex-col w-full items-center justify-center">
        <div className="font-poppins-bold font-bold text-shadow-xs text-3xl text-red-700 text-center">
          <h1>STWÓRZ SWOJĄ ULUBIONĄ PIZZĘ</h1>
        </div>

        <div>
          <p className="font-poppins-bold font-bold text-shadow-xs text-base pb-10">Wybierz ciasto, składniki i sosy, takie jakie kochasz.</p>
        </div>

      </div>

      <div className="relative w-full h-100 flex items-center justify-center">
        <img src="/compose_background.png" className="w-full h-auto" />
        <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Miksuj, komponuj, smakuj!
        </Button>
      </div>

      <div className="flex flex-row w-full items-center justify-center">
        <div className="w-1/2"> 
          <div>
            <h1 className="font-poppins-bold font-bold text-shadow-xs text-[48px] text-transparent bg-gradient-to-r from-red-700 to-stone-950 bg-clip-text">Piekielnie dobra, niebiańsko pyszna!</h1>
          </div>
          <div>
            <p className="font-poppins-bold text-shadow-xs text-lg text-stone-950">Nasza pizza powstaje w ogniu prawdziwej pasji - dosłownie i w przenośni! W piecu rozgrzanym do 
              piekelnych temperatur ciasto nabiera idealnej chrupkości, a ser topi się w perfekcyjnej harmonii.
              Nie uznajemy kompromisów - każdy składnik jest wyselekcjonowany z najwyższą troską, tak aby efekt był niebiańsko pyszny.
              <br/><br/>
              Każdy etap to sztuka: od ręcznie wyrabianego ciasta, przez świeże aromatyczne dodatki, aż po idealnie wypieczony placek, który
              trafia do Twojego pudełka. A gdy pizza jest gotowa, nasi dostawcy działają niczym anielskie posłańcy - szybko, sprawnie i z troską
              by każda dostawa była jak błogosławieństwo dla Twojego apetytu.
              <br/><br/>
              Nie ważne, czy jesteś miłośnikiem klasycznych smaków, czy lubisz eksperymentować - u nas każdy znajdzie coś dla siebie. Bo dobra pizza
              powinna rozpalać smakowe zmysły, ale jednocześnie otulać podniebienie jak kulinarny raj.
              <br/><br/>
              Niebo i piekło łączą się tu w perfekcyjnej harmonii. Zamów i przekonaj się sam!
            </p>
          </div>
        </div>

        <div>
          <div className="w-1/2">
            <img src="/pizza_time.png"/>
          </div>
        </div>
      </div>

      <div className="py-24 sm:py-32">
        <div className="text-center">
          <h2 className="font-poppins-bold font-bold text-shadow-xs text-3xl text-red-700">nasze osiągnięcia w liczbach!</h2>
          <p className="mt-4 text-lg leading-8 text-stone-950 text-shadow-xs">
            Jesteśmy dumni z każdej pizzy, którą przygotowaliśmy, każdego zadowolonego klienta, i całego zespołu, który dba o perfekcyjny smak i obsługę!
          </p>
        </div>
        <dl className="mt-16 flex flex-wrap justify-center gap-0.5 overflow-hidden rounded-2xl text-center">
          <div className="flex flex-col bg-stone-50 p-8">
          <dt className="text-sm font-poppins-bold leading-6 text-stone-950 text-shadow-xs">Pizz wyciągniętych prosto z pieca</dt>
          <dd className="text-3xl font-poppins-bold font-bold text-red-700 text-shadow-xs">1000</dd>
          </div>

          <div className="flex flex-col bg-stone-50 p-8">
          <dt className="text-sm font-poppins-bold leading-6 text-stone-950 text-shadow-xs">Zadowolonych klientów</dt>
          <dd className="text-3xl font-poppins-bold font-bold text-red-700 text-shadow-xs">100%</dd>
          </div>

          <div className="flex flex-col bg-stone-50 p-8">
          <dt className="text-sm font-poppins-bold leading-6 text-stone-950 text-shadow-xs">Ekspertów czuwających nad smakiem</dt>
          <dd className="text-3xl font-poppins-bold font-bold text-red-700 text-shadow-xs">2</dd>
          </div>
        </dl>
        <p className="font-poppins-bold text-lg text-shadow-xs text-center py-3">Każda liczba to dowód na nasze zaangażowanie i pasję! Zamów i bądź częścią tej wyjątkowej historii!</p>
        <div className="flex justify-center items-center py-3">
          <Button>Zamów już teraz</Button>
        </div>

      </div>


    </>
  );
}
