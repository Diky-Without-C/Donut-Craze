import Buttons from "./Buttons";
import Header from "./Header";
import Level from "./Level";

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center">
      <Header />
      <Level />
      <Buttons />
    </main>
  );
}
