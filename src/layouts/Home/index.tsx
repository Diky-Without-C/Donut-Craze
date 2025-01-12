import useGameStore from "@services/stores/gameStore";

export default function Home() {
  const { game } = useGameStore();

  return (
    <main className="flex h-full w-full items-center justify-center">
      <button
        onClick={() => game.start()}
        className="flex h-16 w-36 cursor-pointer items-center justify-center rounded-full border-4 border-red-400 bg-white px-4 py-3 font-mono text-2xl font-bold text-red-400"
      >
        Start
      </button>
    </main>
  );
}
