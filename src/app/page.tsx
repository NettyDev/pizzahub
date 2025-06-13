"use client";
import MenuStats from "@/components/MenuStats";
import Ranking from "@/components/Ranking";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Home() {
  const [resetToken, setResetToken] = useState<string>();
  const [resetPassword, setResetPassword] = useState(false);
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      setResetToken(token);
      setResetPassword(true);
    }
  }, []);

  return (
    <>
      <div className="w-full bg-[url(/pizza-pattern.png)] flex justify-center">
        <div className="bg-white w-full max-w-5xl shadow-2xl">
          <MainPage />
        </div>
      </div>
      <ResetPassword open={resetPassword} onOpenChange={setResetPassword} token={resetToken} />
    </>
  );
}

function ResetPassword({
  open,
  onOpenChange,
  token
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: string | undefined;
}) {
  const schema = z
    .object({
      newPassword: z.string().min(8, "Hasło musi mieć co najmniej 8 znaków"),
      confirmPassword: z.string()
    })
    .superRefine(({ newPassword, confirmPassword }, ctx) => {
      if (newPassword !== confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Hasła nie są identyczne"
        });
      }
    });

  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: "",
      confirmPassword: ""
    }
  });
  return (
    <Dialog {...{ open, onOpenChange }}>
      <DialogContent className="max-w-70 w-auto">
        <DialogHeader>
          <DialogTitle>Resetowanie hasła</DialogTitle>
          <DialogDescription>Wprowadź nowe hasło, aby zresetować swoje hasło.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => <Input placeholder="Nowe hasło" type="password" {...field} />}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => <Input placeholder="Potwierdź nowe hasło" type="password" {...field} />}
          />
          <Button
            onClick={handleSubmit(
              async ({ newPassword }) => {
                const { data, error } = await authClient.resetPassword({
                  newPassword,
                  token
                });
                if (error) {
                  toast.error("Wystąpił błąd podczas resetowania hasła. Spróbuj ponownie.");
                }
                if (data) {
                  toast.success("Hasło zostało zresetowane pomyślnie. Możesz się teraz zalogować.");
                  onOpenChange(false);
                  redirect("/");
                }
              },
              (errors) => {
                console.log("Form errors:", errors);
                if (Object.keys(errors).length > 0) {
                  toast.error(
                    <ul>
                      {Object.values(errors).map((error, idx) => {
                        return <li>{error.message}</li>;
                      })}
                    </ul>
                  );
                }
              }
            )}
          >
            Zmień hasło
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function MainPage() {
  return (
    <>
      <section className="flex flex-col md:flex-row w-full items-center px-6 lg:px-10 pt-10 pb-8 sm:pt-16 sm:pb-12">
        <div className="flex flex-col w-full md:w-3/5 md:pr-10 lg:pr-16 gap-5 text-center md:text-left">
          <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-transparent bg-gradient-to-r from-red-700 to-neutral-950 bg-clip-text leading-tight lg:leading-snug drop-shadow-sm">
            Twoja pizza czeka,
            <br /> zamów ją <i>natychmiast</i>!
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
            Gorąca, pachnąca, gotowa do schrupania - nie każ jej czekać, zamów już teraz!
          </p>

          <div className="mt-6 flex justify-center md:justify-start">
            <Link href="/menu" passHref>
              <Button
                size="lg"
                className="px-10 py-3 bg-red-600 text-white text-base sm:text-lg rounded-lg shadow-lg hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Zobacz menu i zamów
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex w-full md:w-2/5 justify-center items-center mt-10 md:mt-0">
          <img
            src="/pizza_time.png"
            alt="Pyszna pizza gotowa do zamówienia"
            className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
          />
        </div>
      </section>

      <div className="flex w-full justify-center items-center h-14 sm:h-16 bg-red-700 text-white shadow-md my-8 sm:my-12">
        <p className="font-extrabold text-2xl sm:text-3xl tracking-wider">RANKING PIZZ</p>
      </div>

      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-3xl sm:text-4xl text-red-700 text-center mb-8 sm:mb-10">TOP MIESIĄCA</h2>
          <div className="p-2 sm:p-5 w-full">
            <Ranking />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 text-center">
        <h2 className="font-extrabold text-3xl sm:text-4xl text-red-700 mb-3">STWÓRZ SWOJĄ WYMARZONĄ PIZZĘ</h2>
        <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
          Wybierz ciasto, ulubione składniki i sosy - ogranicza Cię tylko wyobraźnia!
        </p>

        <div className="relative w-full max-w-2xl mx-auto aspect-[16/9] sm:aspect-[2/1] group">
          <img
            src="/composer_background.png"
            alt="Stwórz własną kompozycję pizzy"
            className="w-full h-full object-cover rounded-xl shadow-xl"
          />
          <div className="absolute inset-0 bg-black/30 rounded-xl flex items-center justify-center">
            <Link href="/composer" passHref>
              <Button
                size="lg"
                className="px-8 py-3 bg-red-600 text-white text-base sm:text-lg rounded-lg shadow-lg hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200 transform group-hover:scale-110"
              >
                Miksuj, komponuj, smakuj!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="h-3 sm:h-4 bg-red-700 shadow-sm my-8 sm:my-12"></div>

      <section className="flex flex-col lg:flex-row w-full items-center justify-center px-6 lg:px-10 py-10 sm:py-16 bg-stone-50">
        {" "}
        {/* Lekkie tło */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-10 lg:mb-0 lg:pr-10 xl:pr-16">
          <img
            src="/angel_pizza.png"
            alt="Piekielnie dobra pizza"
            className="w-full max-w-sm sm:max-w-md md:max-w-lg transform transition-transform duration-500 hover:rotate-[-3deg] hover:scale-105"
          />
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h2 className="font-extrabold text-4xl sm:text-5xl text-transparent bg-gradient-to-r from-red-700 to-neutral-950 bg-clip-text pb-6 sm:pb-8 drop-shadow-sm">
            Piekielnie dobra, niebiańsko pyszna!
          </h2>
          <div className="flex flex-col gap-5 text-base sm:text-lg leading-relaxed sm:leading-loose">
            <p>
              Nasza pizza powstaje w ogniu prawdziwej pasji - dosłownie i w przenośni! W piecu rozgrzanym do piekielnych
              temperatur ciasto nabiera idealnej chrupkości, a ser topi się w perfekcyjnej harmonii. Nie uznajemy
              kompromisów - każdy składnik jest wyselekcjonowany z najwyższą troską, tak aby efekt był niebiańsko
              pyszny.
            </p>
            <p>
              Nie ważne, czy jesteś miłośnikiem klasycznych smaków, czy lubisz eksperymentować - u nas każdy znajdzie
              coś dla siebie. Bo dobra pizza powinna rozpalać smakowe zmysły, ale jednocześnie otulać podniebienie jak
              kulinarny raj.
            </p>
            <p className="font-semibold text-red-700">
              Niebo i piekło łączą się tu w perfekcyjnej harmonii. Zamów i przekonaj się sam!
            </p>
          </div>
        </div>
      </section>

      <div className="h-3 sm:h-4 bg-red-700 shadow-sm my-8 sm:my-12"></div>

      <section className="px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-3xl sm:text-4xl text-red-700 mb-4">Nasze osiągnięcia w liczbach!</h2>
          <p className="mt-2 text-lg sm:text-xl leading-relaxed mb-10">
            Jesteśmy dumni z każdej pizzy, którą przygotowaliśmy, każdego zadowolonego klienta, i całego zespołu, który
            dba o perfekcyjny smak i obsługę!
          </p>
          <MenuStats />
          <p className="text-lg sm:text-xl mt-10 mb-8">
            Każda liczba to dowód na nasze zaangażowanie i pasję! Zamów i bądź częścią tej wyjątkowej historii!
          </p>
          <div className="flex justify-center items-center">
            <Link href="/menu" passHref>
              <Button
                size="lg"
                className="px-10 py-3 bg-red-600 text-white text-base sm:text-lg rounded-lg shadow-lg hover:bg-red-700 focus:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Zamów już teraz
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
