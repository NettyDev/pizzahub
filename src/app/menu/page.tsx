import { Switch } from "@/components/ui/switch";
import MenuComp from "@/components/Menu";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Menu() {
  return (
    <>
      <MenuComp />
      <div className="w-auto flex justify-center h-50 items-center bg-[url(/menu.jpg)] bg-cover">
        <h1 className="flex text-6xl text-white ">Menu</h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-200 flex flex-wrap">
          {[
            "Onuris",
            "El-naga",
            "Al-marcianoo",
            "Ell-tafir",
            "Egipcjanka",
            "Sphinks",
            "Faraon",
            "Kleopatra",
            "Tutenchamon"
          ].map((v) => (
            <div className="w-1/3">
              <Card className="m-4">
                <CardHeader>
                  <CardTitle>{v}</CardTitle>
                  {/* <CardDescription>test</CardDescription> */}
                </CardHeader>
                <CardContent>
                  <img src="/pizza-placeholder.png" width="100%" alt="" />
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="sm">
                    Dodaj do koszyka
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
