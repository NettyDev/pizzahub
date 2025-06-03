import AnimatedCounter from "./AnimatedCounter";


interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}

const statsData: StatItem[] = [
  {
    id: "pizzas-baked",
    label: "Pizz wyciągniętych prosto z pieca",
    value: 1000,
  },
  {
    id: "happy-clients",
    label: "Zadowolonych klientów",
    value: 99,
    suffix: "%",
  },
  {
    id: "experts",
    label: "Ekspertów czuwających nad smakiem",
    value: 2,
  },
];

export default function MenuStats() {
  return (
    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3">
      {statsData.map((stat) => (
        <div key={stat.id} className="flex flex-col bg-stone-50 p-6 sm:p-8">
          <dt className="text-sm font-semibold leading-6 text-stone-950 text-shadow-xs sm:text-base">
            {stat.label}
          </dt>
          <dd className="order-first text-3xl font-bold tracking-tight text-red-700 text-shadow-xs sm:text-4xl">
            <AnimatedCounter targetValue={stat.value} duration={2500} startOnVisible={true} />
            { <span>{stat.suffix}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}