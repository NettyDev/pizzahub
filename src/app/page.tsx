import Menu from "@/components/Menu";

export default function Home() {
  return (
    <>
      <Menu />
      <div className="flex w-full h-70 px-5 py-4">
        <div className="flex w-3/4">
          <h1>
            twoja pizza czeka,
            <br /> zamów ją natychmiast!
          </h1>
        </div>
        <div className="flex w-1/4"></div>
      </div>
    </>
  );
}
