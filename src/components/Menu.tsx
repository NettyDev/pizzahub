import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function Menu() {
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
                <Link href="/profile" passHref>
                  <NavigationMenuLink>
                    <User />
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>
      <div className="h-36"></div>
    </>
  );
}
