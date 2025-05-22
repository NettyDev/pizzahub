"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import { toast } from "sonner";

export default function Menu() {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  useEffect(() => {
    console.log(session);
  }, [isPending]);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-20 bg-white">
        <div className="flex justify-center shadow-2xs pt-1">
          <img src="/logo.svg" className="h-25" alt="" />
        </div>
        <div className="w-full h-11 py-1 px-4 shadow-md  flex justify-center relative">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" passHref>
                  <NavigationMenuLink>Strona główna</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/menu" passHref>
                  <NavigationMenuLink>Menu</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/contact" passHref>
                  <NavigationMenuLink>Kontakt</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu className="absolute right-4 top-2">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/cart" passHref>
                  <NavigationMenuLink>
                    <ShoppingCart />
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                {/* <Link href="/profile" passHref> */}
                <Popover>
                  <PopoverTrigger>
                    <NavigationMenuLink>
                      <User />
                    </NavigationMenuLink>
                  </PopoverTrigger>
                  {session ? (
                    <PopoverContent className="flex flex-col gap-4 m-4">
                      <h2>{session.user.name}</h2>
                      <Button
                        onClick={() =>
                          authClient.signOut(
                            {},
                            {
                              onSuccess: (ctx) => {
                                toast.success("Wylogowano pomyślnie");
                              }
                            }
                          )
                        }
                      >
                        Wyloguj
                      </Button>
                    </PopoverContent>
                  ) : (
                    <PopoverContent className="flex flex-col gap-4 m-4">
                      <Button onClick={() => setLogin(true)}>Zaloguj się</Button>
                      <div className="flex items-center text-sm text-gray-800 before:flex-1 before:border-t before:border-gray-200 before:me-2 after:flex-1 after:border-t after:border-gray-200 after:ms-2 dark:text-white dark:before:border-neutral-600 dark:after:border-neutral-600">
                        Nie masz konta?
                      </div>
                      <Button variant="outline" onClick={() => setRegister(true)}>
                        Zarejestruj się
                      </Button>
                    </PopoverContent>
                  )}
                </Popover>
                {/* </Link> */}
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
      <LoginDialog open={login} onOpenChange={setLogin} />
      <RegisterDialog open={register} onOpenChange={setRegister} />
      <div className="h-36"></div>
    </>
  );
}
