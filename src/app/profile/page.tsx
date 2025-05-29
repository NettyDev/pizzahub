import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Settings, BookUser, ShoppingCart, Link } from "lucide-react"
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  {
    name: "Ustawienia",
    value: "settings",
    icon: Settings,
  },
  {
    name: "Informacje o zamówieniach",
    value: "order-information",
    icon: BookUser,
  },
  {
    name: "Zamówienia",
    value: "orders",
    icon: ShoppingCart,
  }
];

export default function Home() {
  return (
    <>
      <div className="w-full bg-[url(/pizza-pattern.png)] flex justify-center">
        <div className="bg-white w-5xl shadow-2xl">
          <Profile />
        </div>
      </div>
    </>
  );
}

function Profile() {
  return (
    <>
      <div className="p-4 md:p-8">
            <div className="flex gap-3 items-center">
              <Avatar>
                <AvatarImage src="/avatar.svg" alt="avatar"/>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-sm tracking-tight">Cześć,</span>
                <span className="leading none text-semibold text-muted-foreground">
                  username
                </span>
              </div>

            </div>
            <Tabs
              orientation="vertical"
              defaultValue={tabs[0].value}
              className="max-w-md w-full flex items-start gap-4 justify-center"
            >
              <TabsList className="shrink-0 grid grid-cols-1 min-w-28 p-0 bg-background">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="border-l-2 border-transparent justify-start rounded-none data-[state=active]:shadow-none data-[state=active]:border-primary data-[state=active]:bg-primary/5 py-1.5"
                  >
                    <tab.icon className="h-5 w-5 me-2" /> {tab.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="h-40 flex items-center justify-center max-w-xs w-full border rounded-md font-medium text-muted-foreground">
                {tabs.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value}>
                    {tab.name} Content
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </div>

    </>
  );
}
