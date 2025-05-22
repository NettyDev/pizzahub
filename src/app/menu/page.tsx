"use client";

import { Switch } from "@/components/ui/switch";
import MenuComp from "@/components/MenuAtTop";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CircleSlash, CircleSlash2, Flame, Info, Pizza, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { Select } from "@/components/ui/select";
import clsx from "clsx";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";

const menuItemsData = [
  {
    name: "Onuris",
    spice: 1,
    ingredients: ["szynka", "salami", "kurczak", "ser"],
    price: {
      small: 41,
      medium: 52,
      large: 64
    }
  },
  {
    name: "El-naga",
    spice: 1,
    ingredients: ["salami", "ser"],
    price: {
      small: 41,
      medium: 52,
      large: 64
    }
  },
  {
    name: "Al-marcianoo",
    spice: 2,
    ingredients: ["szynka", "papryka", "cebula", "pomidory", "pieczarki", "kukurydza", "ser"],
    price: {
      small: 41,
      medium: 52,
      large: 64
    }
  },
  {
    name: "Al-amarle",
    spice: 4,
    ingredients: ["salami", "oliwki", "jalapeno", "ser"],
    price: {
      small: 41,
      medium: 52,
      large: 64
    }
  },
  {
    name: "Ozyrys",
    spice: 1,
    ingredients: ["szynka", "pomidorki koktajlowe", "rukola", "ser mozarella", "ser"],
    price: {
      small: 41,
      medium: 52,
      large: 64
    }
  },
  {
    name: "Horus",
    spice: 1,
    ingredients: ["boczek", "jajko sadzone", "ogórek", "ser"],
    price: {
      small: 41,
      medium: 52,
      large: 64
    }
  },
  {
    name: "El-qum",
    spice: 1,
    ingredients: ["salami", "pieczarki", "ser"],
    price: {
      small: 41,
      medium: 52,
      large: 64
    }
  },
  {
    name: "Al-arisz",
    spice: 3,
    ingredients: ["kiełbasa", "szynka", "ogórek", "pomidor", "ser"],
    price: {
      small: 41,
      medium: 52,
      large: 64
    }
  },
  {
    name: "Kleopatra",
    spice: 3,
    ingredients: ["boczek", "szynka", "pieczarki", "papryka", "cebula", "ser"],
    price: {
      small: 41,
      medium: 52,
      large: 64
    }
  }
];



export default function Menu() {
  const [isHover, setHover] = useState<boolean>(false);
  const [spiceHover, setSpiceHover] = useState<number>(0);
  const [spiceLevel, setSpiceLevel] = useState<number>(0);
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [spice, setSpice] = useState<string[]>([]);
  const allIngredients = () => {
    const ingredients: string[] = [];
    menuItemsData.forEach((v) => {
      v.ingredients.forEach((ing) => {
        if (ingredients.find((f) => f == ing)) return;
        ingredients.push(ing);
      });
    });
    return ingredients;
  };
  const ingredientsForm = useForm({
    defaultValues: allIngredients()
      .map((v) => ({ [v]: false }))
      .reduce((p, c) => ({ ...c, ...p }), {})
  });

  ingredientsForm.watch((value) => {
    setIngredientsList(
      Object.keys(value)
        .map((v) => value[v] && v)
        .filter((v) => v !== false && v !== undefined)
    );
  });
  return (
    <>
      <MenuComp />
      <div className="w-full bg-[url(/pizza-pattern.png)] flex justify-center">
        <div className="bg-white w-5xl shadow-2xl">
          <div className="w-auto flex justify-end px-10 text-shadow-accent h-50 items-center bg-[url(/menu.jpg)] bg-cover">
            <h1 className="flex text-8xl text-white ">Menu</h1>
          </div>
          {/* <div className="w-full flex justify-end">
            <select
              multiple
              value={spice}
              onChange={(event) => {
                const options = [...event.target.selectedOptions];
                const values = options.map((option) => option.value);
                setSpice(values);
              }}
            >
              {allIngredients().map((v, i) => (
                <option key={i}>{v}</option>
              ))}
            </select>
          </div> */}
          <div className="w-full flex">
            <div className="w-1/4">
              <div className="w-full border rounded-2xl shadow-xl m-4 flex flex-col p-4">
                <h2 className="text-2xl w-full pb-4">Filtry</h2>
                <hr />
                <h3 className="text-xl pb-2 pt-4">Poziom ostrości</h3>
                <div className="flex">
                  <CircleSlash
                    size={28}
                    className="cursor-pointer"
                    onClick={() => setSpiceLevel(0)}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  />
                  <Flame
                    size={28}
                    onClick={() => setSpiceLevel(1)}
                    className={clsx(
                      "cursor-pointer",
                      ((spiceLevel >= 1 && !isHover) || spiceHover >= 1) && "fill-green-300"
                    )}
                    onMouseEnter={() => [setSpiceHover(1), setHover(true)]}
                    onMouseLeave={() => [setSpiceHover(0), setHover(false)]}
                  />
                  <Flame
                    size={28}
                    onClick={() => setSpiceLevel(2)}
                    className={clsx(
                      "cursor-pointer",
                      ((spiceLevel >= 2 && !isHover) || spiceHover >= 2) && "fill-yellow-400"
                    )}
                    onMouseEnter={() => [setSpiceHover(2), setHover(true)]}
                    onMouseLeave={() => [setSpiceHover(0), setHover(false)]}
                  />
                  <Flame
                    size={28}
                    onClick={() => setSpiceLevel(3)}
                    className={clsx(
                      "cursor-pointer",
                      ((spiceLevel >= 3 && !isHover) || spiceHover >= 3) && "fill-orange-500"
                    )}
                    onMouseEnter={() => [setSpiceHover(3), setHover(true)]}
                    onMouseLeave={() => [setSpiceHover(0), setHover(false)]}
                  />
                  <Flame
                    size={28}
                    onClick={() => setSpiceLevel(4)}
                    className={clsx(
                      "cursor-pointer",
                      ((spiceLevel >= 4 && !isHover) || spiceHover >= 4) && "fill-red-600"
                    )}
                    onMouseEnter={() => [setSpiceHover(4), setHover(true)]}
                    onMouseLeave={() => [setSpiceHover(0), setHover(false)]}
                  />
                </div>
                <h3 className="text-xl pb-2 pt-4">Składniki</h3>
                <div className="flex flex-col gap-2">
                  <Form {...ingredientsForm}>
                    {allIngredients().map((v, i) => (
                      <FormField
                        control={ingredientsForm.control}
                        name={v}
                        key={i}
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={v}
                              value={field.value}
                              onCheckedChange={(checked) => field.onChange(checked)}
                            />
                            <label htmlFor={v}>{v[0].toUpperCase() + v.slice(1)}</label>
                          </div>
                        )}
                      />
                    ))}
                  </Form>
                </div>
              </div>
            </div>
            <div className="w-3/4">
              <div className="w-full flex justify-center">
                <div className="w-full px-8 flex flex-wrap">
                  {menu
                    .filter((v) => {
                      if (ingredientsList.length) {
                        let isAll = true;
                        ingredientsList.forEach((s) => {
                          if (!v.ingredients.includes(s)) isAll = false;
                        });
                        return isAll;
                      } else return true;
                    })
                    .filter((v) => {
                      if (spiceLevel > 0) {
                        return v.spice == spiceLevel;
                      } else return true;
                    })
                    .map((v, i) => (
                      <div className="w-1/3" key={i}>
                        <Card className="m-4">
                          <CardHeader>
                            <CardTitle>{v.name}</CardTitle>
                            {/* <CardDescription>test</CardDescription> */}
                          </CardHeader>
                          <CardContent>
                            <img src="/pizza-placeholder.png" width="100%" alt="" />
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2 w-auto">
                            <h3 className="justify-self-start">Od {v.price.small} zł</h3>
                            <div className="flex-1"></div>
                            <Button size="icon">
                              <Plus />
                            </Button>
                            <Popover>
                              <PopoverTrigger>
                                <Button size="icon">
                                  <Info />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-end gap-1 leading-3">
                                    <p>Ostrość:</p> <SpiceMeter level={v.spice} />
                                  </div>
                                  <div>
                                    <p>Składniki:</p>
                                    <ul className="list-['-'] pl-4">
                                      {v.ingredients.map((v) => (
                                        <li className="pl-1">{v}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </CardFooter>
                        </Card>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
function SpiceMeter({ level }: { level: number }) {
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState("bg-primary");
  useEffect(() => {
    switch (level) {
      case 1:
        setProgress(25);
        setColor("bg-green-500");
        break;
      case 2:
        setProgress(50);
        setColor("bg-yellow-500");
        break;
      case 3:
        setProgress(75);
        setColor("bg-orange-500");
        break;
      case 4:
        setProgress(100);
        setColor("bg-red-600");
        break;
      default:
        setProgress(0);
        setColor("bg-primary");
    }
  }, [level]);
  return <Progress value={progress} className="w-full" color={color} />;
}
