"use client";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import {
  ShoppingCart,
  LogOut,
  UserPlus,
  LogIn,
  Home as HomeIcon,
  Pizza,
  Rocket,
  Phone as PhoneIcon,
  User as UserProfileIcon,
  Menu as MenuIcon
} from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";

type NavLinkItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const mainNavLinks: NavLinkItem[] = [
  { href: "/", label: "Strona główna", icon: HomeIcon },
  { href: "/menu", label: "Menu", icon: Pizza },
  { href: "/composer", label: "Kompozytor", icon: Rocket },
  { href: "/contact", label: "Kontakt", icon: PhoneIcon }
];

export default function Header() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    if (!loginOpen && !registerOpen) {
      refetch();
    }
  }, [loginOpen, registerOpen, refetch]);

  const logoSectionHeight = 110;
  const navSectionHeight = 52;
  const totalHeaderHeight = logoSectionHeight + navSectionHeight;

  return (
    <>
      <div style={{ height: `${totalHeaderHeight}px` }} />

      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div
          className="flex justify-center items-center border-b border-stone-200"
          style={{ height: `${logoSectionHeight}px` }}
        >
          <Link href="/" passHref>
            <img src="/logo.svg" className="h-25" alt="logo" />
          </Link>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ height: `${navSectionHeight}px` }}>
          <div className="flex items-center justify-center h-full relative">
            <div className="md:hidden flex items-center absolute left-0">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-red-50 text-stone-700 hover:text-red-700 transition-colors"
                  >
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0">
                  <SheetHeader className="p-4 border-b bg-red-600">
                    <SheetTitle className="text-white text-lg">Nawigacja</SheetTitle>
                  </SheetHeader>
                  <nav className="flex flex-col py-4">
                    {mainNavLinks.map((link) => (
                      <SheetClose asChild key={`mobile-${link.href}`}>
                        <Link
                          href={link.href}
                          className="flex items-center px-4 py-3 text-base font-medium text-stone-700 hover:bg-red-50 hover:text-red-700 transition-colors"
                        >
                          <link.icon className="h-5 w-5 mr-3 text-red-600" />
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {mainNavLinks.map((link, idx) => (
                    <NavigationMenuItem key={link.href}>
                      <Link href={link.href} passHref>
                        <div className="hover:bg-red-50 hover:text-red-700 p-2 transition-colors text-sm flex flex-row items-center gap-1 rounded-sm">
                          <link.icon className="h-4 w-4 mr-1" /> {link.label}
                        </div>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center gap-x-2 sm:gap-x-3 absolute right-0">
              <Link href="/cart" passHref>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:cursor-pointer rounded-full hover:bg-red-50 text-stone-700 hover:text-red-700 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Koszyk</span>
                </Button>
              </Link>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:cursor-pointer rounded-full hover:bg-red-50 text-stone-700 hover:text-red-700 transition-colors"
                  >
                    <UserAvatar user={session?.user} className="h-7 w-7" />
                    <span className="sr-only">Profil użytkownika</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-60 p-0 mr-2 sm:mr-0" align="end">
                  {isPending ? (
                    <div className="p-4 text-center text-sm text-stone-500">Ładowanie...</div>
                  ) : session?.user ? (
                    <div className="flex flex-col">
                      <div className="p-3 text-center border-b">
                        <UserAvatar user={session.user} className="h-12 w-12 mx-auto mb-2" />
                        <p className="text-sm font-medium text-stone-800 truncate">
                          {session.user.name && session.user.surname
                            ? `${session.user.name} ${session.user.surname}`
                            : "Użytkownik"}
                        </p>
                        {session.user.email && <p className="text-xs text-stone-500 truncate">{session.user.email}</p>}
                      </div>
                      <Link href="/profile" passHref>
                        <Button
                          variant="ghost"
                          className="hover:cursor-pointer w-full justify-start px-3 py-2 text-sm text-stone-700 hover:bg-stone-100 rounded-none"
                        >
                          <UserProfileIcon className="mr-2 h-4 w-4" /> Mój profil
                        </Button>
                      </Link>
                      <Separator />
                      <Button
                        variant="ghost"
                        className="hover:cursor-pointer w-full justify-start px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-none"
                        onClick={() =>
                          authClient.signOut(
                            {},
                            {
                              onSuccess: () => {
                                toast.success("Wylogowano pomyślnie");
                                refetch();
                              },
                              onError: () => {
                                toast.error("Wystąpił błąd.");
                              }
                            }
                          )
                        }
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Wyloguj
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 flex flex-col gap-3">
                      <Button
                        onClick={() => {
                          setLoginOpen(true);
                          setIsSheetOpen(false);
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                      >
                        <LogIn className="mr-2 h-4 w-4" /> Zaloguj się
                      </Button>
                      <div className="flex items-center text-xs text-stone-500 before:flex-1 before:border-t before:border-stone-200 before:mr-2 after:flex-1 after:border-t after:border-stone-200 after:ml-2">
                        lub
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setRegisterOpen(true);
                          setIsSheetOpen(false);
                        }}
                        className="w-full hover:border-red-500 hover:text-red-600"
                      >
                        <UserPlus className="mr-2 h-4 w-4" /> Zarejestruj się
                      </Button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </header>

      <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <RegisterDialog open={registerOpen} onOpenChange={setRegisterOpen} />
    </>
  );
}
