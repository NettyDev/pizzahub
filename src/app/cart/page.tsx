"use client";

import Menu from "@/components/MenuAtTop";
import { Popover, PopoverContent, PopoverTrigger, PopoverArrow } from "@radix-ui/react-popover";
import { RadioGroupItem, RadioGroup } from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleDollarSign, Truck, Calendar1, Plus, Check } from "lucide-react";
import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Label } from "@/components/ui/label"
import { Accordion } from "@radix-ui/react-accordion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Footer from "@/components/Footer";

  const pay_options = [
    { 
      value: "payu",
      label: "PayU",
      description: "Szybka płatność online",
    },
    { 
      value: "card",
      label: "Karta kredytowa",
      description: "Płatność kartą kredytową",
    },
    { 
      value: "cash",
      label: "Gotówka",
      description: "Płatność przy odbiorze",
    }
  ];

  const delivery_options = [
    {
      value: "delivery",
      label: "Dostawa"
    },
    {
      value: "pickup",
      label: "Odbiór osobisty"
    },
    {
      value: "restaurant",
      label: "Zjem na miejscu"
    }
  ];

  const delivery_time_options = [
    {
      value: "now",
      label: "Jak najszybciej"
    },
    {
      value: "later",
      label: "Wybierz termin"
    }
  ];
export default function Home() {
  return (
    <>
      <Menu />
      <div className="w-full bg-[url(/pizza-pattern.png)] flex justify-center">
        <div className="bg-white w-5xl shadow-2xl">
          <Cart />
        </div>
      </div>
      <Footer />
    </>
  );
}

function Cart() {
  const [selectedDeliveryTime, setDeliveryTime] = useState(delivery_time_options[0].value);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedHour, setSelectedHour] = useState<string | undefined>(undefined);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(delivery_options[0].value);

  return (
    <>
    <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold text-center font-poppins-bold mb-12">Twój koszyk</h1>
        
        {/* Sekcja płatności */}
        <div className="items-center justify-center gap-8 py-5 px-6 w-full">
          <div className="flex flex-col items-center justify-center w-full shadow-lg  p-6">
              <div className="items-left justify-start w-full px-4">
                <h2 className="font-poppins-bold text-xl p-2">Płatność</h2>

              <RadioGroup defaultValue={pay_options[0].value} 
              className="w-full grid grid-row gap-4">
                {pay_options.map((option) => (
                  <RadioGroupItem
                    key={option.value}
                    value={option.value}
                    className={cn(
                      "relative group ring-[1px] ring-border py-2 px-3 text-start",
                      "data-[state=checked]:ring-2 rounded-sm shadow-lg data-[state=checked]:ring-red-700",
                    )}
                    >
                      <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-red-700 stroke-red group-data-[state=unchecked]:hidden" />
                      <CircleDollarSign className="mb-2.5 text-muted-foreground" />
                      <span className="font-poppins-bold text-semibold tracking-tight">{option.label}</span>
                      <p className="text-xs">{option.description}</p>
                    </RadioGroupItem>
                ))}
                </RadioGroup>

              </div>
              <div className="items-left justify-start w-full mt-2">
                <div className="flex flex-row items-start justify-between p-1 w-full">

                  {/* Sposób dostarczenia */}
                  <div className="w-1/2 p-3">
                    <h2 className="font-poppins-bold text-xl p-2">Sposób dostarczenia</h2>
                      <RadioGroup
                        value={selectedDeliveryMethod}
                        onValueChange={(value) => {
                          setSelectedDeliveryMethod(value);
                        }}
                        className="w-full grid grid-row gap-4"
                        >
                      {delivery_options.map((option) => (
                        <RadioGroupItem
                          key={option.value}
                          value={option.value}
                          className={cn(
                            "relative group ring-[1px] ring-border py-2 px-3 text-start",
                            "data-[state=checked]:ring-2 rounded-sm shadow-lg data-[state=checked]:ring-red-700",
                          )}
                          >
                            <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-red-700 stroke-red group-data-[state=unchecked]:hidden" />
                            <Truck className="mb-2.5 text-muted-foreground" />
                            <span className="font-poppins-bold text-semibold tracking-tight">{option.label}</span>
                          </RadioGroupItem>
                      ))}
                      </RadioGroup>
                  </div>

                  {/* Termin realizacji */}
                  <div className="w-1/2 p-3">
                    <h2 className="font-poppins-bold text-xl p-2">Termin realizacji</h2>
                      <RadioGroup 
                        value={selectedDeliveryTime}
                        onValueChange={(value) => {
                          setDeliveryTime(value);
                          if (value === "later") {
                            setSelectedDate(new Date());
                          } else {
                            setSelectedDate(undefined);
                          }
                        }}
                        className="w-full grid grid-row gap-4"
                        >
                      {delivery_time_options.map((option) => (
                        <RadioGroupItem
                          key={option.value}
                          value={option.value}
                          className={cn(
                            "relative group ring-[1px] ring-border py-2 px-3 text-start",
                            "data-[state=checked]:ring-2 rounded-sm shadow-lg data-[state=checked]:ring-red-700",
                          )}
                          >
                            <CircleCheck className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 h-6 w-6 text-primary fill-red-700 stroke-red group-data-[state=unchecked]:hidden" />
                            <Calendar1 className="mb-2.5 text-muted-foreground" />
                            <span className="font-poppins-bold text-semibold tracking-tight">{option.label}</span>
                          </RadioGroupItem>
                      ))}
                      </RadioGroup>

                      {selectedDeliveryTime === "later" && (
                        <Popover>
                          <PopoverTrigger asChild className="w-full">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-poppins-bold",
                                !selectedDate && "text-muted-foreground",
                              )}
                              >
                                <CalendarIcon />
                                 {selectedDate ? format(selectedDate, "PPP", { locale: pl }) : <span>Wybierz datę</span>}
                              </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            side="bottom"
                            sideOffset={5}
                            align="start"
                            className="flex w-auto flex-col space-y-2 p-2"
                            >
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Wybierz godzinę" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="12:00">12:00</SelectItem>
                                  <SelectItem value="13:00">13:00</SelectItem>
                                  <SelectItem value="14:00">14:00</SelectItem>
                                  <SelectItem value="15:00">15:00</SelectItem>
                                  <SelectItem value="16:00">16:00</SelectItem>
                                  <SelectItem value="17:00">17:00</SelectItem>
                                  <SelectItem value="18:00">18:00</SelectItem>
                                  <SelectItem value="19:00">19:00</SelectItem>
                                </SelectContent>
                              </Select>
                              <div className="rounded-md border">
                                <Calendar
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={setSelectedDate}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </div>
                            </PopoverContent>
                        </Popover>
                      )}
                  </div>
                </div>
              </div>

          {/*Sekcja adres dostawy - jeśli wybrano dostawę*/}
            {selectedDeliveryMethod === "delivery" && (
              <div className="w-full p-6 rounded-md">
                <h2 className="font-poppins-bold text-xl p-2">Adres dostawy</h2>
                <div className="flex flex-row items-start justify-between w-full gap-4 p-2">
                    
                    <div className="flex flex-col w-1/2">
                        <p className="font-poppins-bold">Ulica *</p>
                        <input
                          type="text"
                          placeholder="Ulica"
                          className="border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <div className="flex flex-col w-1/2">
                        <p className="font-poppins-bold">Numer domu *</p>
                        <input
                          type="text"
                          placeholder="Numer domu"
                          className="border border-gray-300 rounded-md p-2"
                        />
                    </div>

                </div>
                <p className="font-poppins-bold">Miasto *</p>
                <input
                  type="text"
                  placeholder="Miasto"
                  className="border border-gray-300 rounded-md p-2 w-full mt-2"
                />
                <p className="font-poppins-bold">Numer lokalu</p>
                <input
                  type="text"
                  placeholder="Numer lokalu"
                  className="border border-gray-300 rounded-md p-2 w-full mt-2"
                />
                <p className="font-poppins-bold">Piętro</p>
                <input
                  type="text"
                  placeholder="Piętro"
                  className="border border-gray-300 rounded-md p-2 w-full mt-2"
                />
                <p className="font-poppins-bold">Firma</p>
                <input
                  type="text"
                  placeholder="Firma"
                  className="border border-gray-300 rounded-md p-2 w-full mt-2"
                />
              </div>
                )}

          { /* Dane kontaktowe */}
              <div className="items-left justify-start w-full mt-2">
                <h2 className="font-poppins-bold text-xl p-2">Dane kontaktowe</h2>
                <div className="flex flex-row items-start justify-between gap-4 p-2 w-full">


                  {/* 1 */}
                  <div className="w-1/2 p-3">
                    <p className="font-poppins-bold">Imię i nazwisko *</p>
                    <input
                      type="text"
                      placeholder="Imię i nazwisko"
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    <p className="font-poppins-bold">Telefon *</p>
                      <input
                        type="text"
                        placeholder="Telefon"
                        className="border border-gray-300 rounded-md p-2 w-full"
                      />
                  </div>

                  {/* 2 */}
                  <div className="w-1/2 p-3">
                  <p className="font-poppins-bold">Nazwisko *</p>
                    <input
                      type="text"
                      placeholder="Nazwisko"
                      className="border border-gray-300 rounded-md p-2 w-full"
                    />
                  <p className="font-poppins-bold">E-mail *</p>
                   <input
                      type="text"
                      placeholder="adres email"
                      className="border border-gray-300 rounded-md p-2 w-full"
                      />
                  </div>
                

                </div>

                <RadioGroup defaultValue="paragon" className="flex items-center gap-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value="paragon" 
                      id="paragon"
                      className="text-red-700 border-red-700 [&_svg]:fill-red-700"
                    />
                    <Label htmlFor="paragon">Paragon</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="faktura" id="faktura" />
                    <Label htmlFor="faktura">Faktura</Label>
                  </div>
                </RadioGroup>


              <div className="mt-3">
                <Accordion type="single" collapsible className="w-full my-4">
                  <AccordionItem value="comment">
                    <AccordionTrigger>
                      <img src="/plus.svg"  className="w-4 h-4 inline mr-2" />
                      <p className="font-poppins-bold">Dodaj komentarz do zamówienia</p>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Textarea placeholder="Wpisz tutaj swoją wiadomość."/>
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
              </div>

              <div className="mt-3 justify-start">
                <div className="flex items-start space-x-2">
                  <Checkbox id="terms"/>
                  <label htmlFor="terms" className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Akceptuję postanowienia Regulaminu i Polityki Prywatności (wymagane)
                  </label>
                  <Checkbox id="terms2"/>
                  <label htmlFor="terms2" className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Chcę otrzymywać rabaty i inne wiadomości na email
                  </label>
                  <Checkbox id="terms3"/>
                  <label htmlFor="terms3" className="text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Chcę otrzymywać rabaty i inne wiadomości na telefon
                  </label>
                </div>
              </div>



              </div>




          </div>

        {/* Sekcja zamówienia */}
        <div className="flex flex-col items-center justify-center w-full shadow-md shadow-red-700/10 rounded-xs p-6">
          <h2 className="text-xl font-bold font-poppins-bold text-red-600 tracking-wide">Twoje zamówienie</h2>

            <div className="w-full border-t border-red-500 mt-3 py-2">
              <div className="flex flex-row items-center justify-between p-2">
                <span className="text-lg font-bold font-poppins-bold flex items-center gap-2">
                  Pizza Hawajska
                </span>
                <span className="text-lg font-bold">20 zł</span>
              </div>
            </div>
            <div className="w-full border-t border-red-500 mt-3">
              <div className="flex flex-row items-center justify-between p-2">
                <span className="text-md font-poppins-bold text-gray-700 flex items-center gap-2">
                  Suma częściowa
                </span>
                <span className="text-md font-bold text-gray-800">20 zł</span>
              </div>
              
              <div className="flex flex-row items-center justify-between p-2">
                <span className="text-md font-poppins-bold text-gray-700 flex items-center gap-2">
                  Koszty dodatkowe
                </span>
                <span className="text-md font-bold text-gray-800">10 zł</span>
              </div>

              <div className="flex flex-row items-center justify-between p-3 bg-red-100 rounded-xs">
                <span className="text-lg font-extrabold font-poppins-bold text-red-700 tracking-wide flex items-center gap-2">
                  RAZEM
                </span>
                <span className="text-lg font-extrabold text-red-700">30 zł</span>
              </div>
              <div className="justify-center items-center text-center mt-4">        
                  <Popover>
                    <PopoverTrigger className="text-sm font-poppins-bold text-red-700 underline">
                      <img src="/info.svg"  className="w-4 h-4 inline mr-2" />
                      Więcej informacji
                    </PopoverTrigger>
                    <PopoverContent className="bg-white shadow-lg p-4 rounded-md">
                      <p className="text-sm font-poppins-bold text-gray-700">
                        Koszt dostawy wynosi 10 zł. Minimalne zamówienie to 30 zł.
                      </p>
                      <PopoverArrow className="fill-white" />
                    </PopoverContent>
                  </Popover>

              </div>
            </div>

              
          </div>
          
        </div>
        </div>
    </>
  );
}
