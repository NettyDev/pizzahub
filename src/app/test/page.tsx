import SpinnerCircle4 from "@/components/ui/spinner";

export default function Test() {
  return (
    <div className="h-50 w-full flex flex-col gap-2 justify-center items-center">
      <SpinnerCircle4 />
      <p className="text-xl">Ładowanie zawartości</p>
    </div>
  );
}
