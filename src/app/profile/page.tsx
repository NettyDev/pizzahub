import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Settings, Info, ShoppingCart, UserCircle, MapPinned } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";


function SettingsContent() {
  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex flex-col items-left">
          <h2 className="text-3xl font-semibold mb-4 text-shadow-xs">Ustawienia</h2>
          <p className="text-stone-600 text-sm">Zarządzaj swoimi ustawieniami konta.</p>
        <div className="flex flex-col items-left pt-3">
          <h3 className="text-2xl font-semibold mb-4 text-shadow-xs">Dane konta</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
function DeliveryDataContent() {
  return <div>Dane do dostawy treść</div>;
}
function OrderInformationContent() {
  return <div>Informacje o zamówieniach treść</div>;
}
function OrdersContent() {
  return <div>Zamówienia treść</div>;
}

const tabs = [
  {
    name: "Ustawienia",
    value: "settings",
    icon: Settings,
    content: SettingsContent,
  },
  {
    name: "Dane do dostawy",
    value: "delivery-data",
    icon: MapPinned,
    content: DeliveryDataContent,
  },
  {
    name: "Informacje o zamówieniach",
    value: "order-information",
    icon: Info,
    content: OrderInformationContent,
  },
  {
    name: "Zamówienia",
    value: "orders",
    icon: ShoppingCart,
    content: OrdersContent,
  }
];

export default function Home() {
  return (
    <div className="w-full bg-[url(/pizza-pattern.png)] flex justify-center min-h-screen">
      <div className="bg-white w-full max-w-5xl shadow-2xl">
        <Profile />
      </div>
    </div>
  );
}

function Profile() {
  const imie = "BardzoDługaImionaKtóreMogąByćBardzoDługie";

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <Tabs defaultValue={tabs[0].value} className="w-full">
        <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8 lg:gap-10">

          <div className="w-full md:w-auto md:min-w-[260px] lg:min-w-[300px] flex flex-col gap-6 md:gap-8 mb-6 md:mb-0">

            <div className="flex items-center gap-4 p-2 md:p-0">
              <Avatar className="h-14 w-14 sm:h-16 sm:w-16 shrink-0">
                <AvatarImage src="/avatar.svg" alt={imie} />
                <AvatarFallback>
                  <UserCircle className="h-full w-full text-stone-400" />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0">
                <span className="text-sm text-stone-600 text-shadow-xs font-poppins-bold">Cześć,</span>
                <span className="text-lg sm:text-xl font-semibold text-stone-800 text-shadow-xs font-poppins-bold leading-tight truncate">
                  {imie}
                </span>
              </div>
            </div>

            <div className="pt-2"/>
            <TabsList className="flex flex-col items-stretch w-full p-0 bg-transparent">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "flex items-center justify-start text-left w-full group", // Wyrównanie do lewej
                    "gap-2.5 px-3 py-2.5 text-sm font-medium", // Padding i rozmiar tekstu
                    "text-stone-600 hover:bg-stone-100 hover:text-red-700",
                    "data-[state=active]:bg-red-100 data-[state=active]:text-red-700 data-[state=active]:font-semibold data-[state=active]:shadow-sm",
                    "rounded-md transition-colors duration-150", // Zaokrąglenie dla każdego triggera
                    "border-l-2 border-transparent", // Domyślny lewy border
                    "data-[state=active]:border-l-red-600", // Aktywny lewy border (kolor)
                    "focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  )}
                >
                  <tab.icon className="h-5 w-5 shrink-0" />
                  <span className="truncate">
                      {tab.name}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="w-full">
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="mt-0 p-1">
                {typeof tab.content === 'function' ? <tab.content /> : tab.content || <div className="p-6">Domyślna zawartość dla {tab.name}</div>}
              </TabsContent>
            ))}
          </div>

        </div>
      </Tabs>
    </div>
  );
}