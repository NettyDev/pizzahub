"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Settings as Sts, ShoppingCart, Sparkles, UserCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Settings from "@/components/ProfileComponents/Settings";
import Orders from "@/components/ProfileComponents/Orders";
import UserAvatar from "@/components/UserAvatar";
import StatsComponent from "@/components/ProfileComponents/StatsComponent";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import SpinnerCircle4 from "@/components/ui/spinner";
import { cache } from "react";

const tabs = [
  {
    name: "Ustawienia",
    value: "settings",
    icon: Sts,
    content: Settings
  },
  {
    name: "Zamówienia",
    value: "orders",
    icon: ShoppingCart,
    content: Orders
  },
  {
    name: "Statystyki",
    value: "stats",
    icon: Sparkles,
    content: StatsComponent
  }
];

export default function Home() {
  const { data: session, isPending, refetch } = cache(() => authClient.useSession())();
  if (!isPending) {
    if (!session) {
      redirect("/");
    } else {
      return (
        <div className="w-full bg-[url(/pizza-pattern.png)] flex justify-center">
          <div className="bg-white w-full max-w-5xl shadow-2xl">
            <Profile />
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="w-full bg-[url(/pizza-pattern.png)] flex justify-center">
        <div className="bg-white w-full max-w-5xl shadow-2xl">
          <div className="h-50 w-full flex flex-col gap-2 justify-center items-center">
            <SpinnerCircle4 />
            <p className="text-xl">Ładowanie zawartości</p>
          </div>
        </div>
      </div>
    );
  }
}

function Profile() {
  const { data: session, isPending, refetch } = authClient.useSession();

  const imie = !isPending && session ? `${session?.user.name} ${session?.user.surname}` : "";

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <Tabs defaultValue={tabs[0].value} className="w-full">
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8 lg:gap-10">
          <div className="w-full md:w-auto md:min-w-[260px] lg:min-w-[300px] flex flex-col gap-6 md:gap-8 mb-6 md:mb-0">
            <div className="flex items-center gap-4 p-2 md:p-0">
              <UserAvatar user={{ name: imie, image: null }} className="h-14 w-14 sm:h-16 sm:w-16" />
              <div className="flex flex-col min-w-0">
                <span className="text-sm text-shadow-xs">Cześć,</span>
                <span className="text-lg sm:text-xl font-semibold text-red-700 leading-tight truncate">{imie}</span>
              </div>
            </div>

            <div className="pt-1" />
            <TabsList className="flex flex-col items-stretch w-full p-0 bg-transparent mt-2 md:mt-0 ">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "flex items-center justify-start text-left w-full group",
                    "gap-2.5 px-3 py-2.5 text-sm font-medium",
                    "hover:bg-stone-100",
                    "data-[state=active]:bg-red-100 data-[state=active]:text-red-700 data-[state=active]:font-semibold data-[state=active]:shadow-sm",
                    "rounded-md transition-colors duration-150",
                    "border-l-2 border-transparent",
                    "data-[state=active]:border-l-red-600",
                    "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  )}
                  disabled={!tab.content}
                >
                  <tab.icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">{tab.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="flex-1 min-w-0 ">
            {tabs.map((tab) =>
              tab.content ? (
                <TabsContent
                  key={tab.value}
                  value={tab.value}
                  className="mt-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                >
                  {typeof tab.content === "function" ? <tab.content /> : <div className="p-6">{tab.content}</div>}
                </TabsContent>
              ) : null
            )}
          </div>
        </div>
      </Tabs>
    </div>
  );
}
