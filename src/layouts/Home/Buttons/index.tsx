import useGameStore from "@services/stores/gameStore";

export default function Buttons() {
  const { game } = useGameStore();

  return (
    <div className="mt-16 flex h-1/3 w-2/5 flex-col items-center justify-center gap-4">
      <button
        onClick={() => game.start()}
        className="flex h-16 w-36 cursor-pointer items-center justify-center rounded-full border-4 border-red-400 bg-white px-4 py-3 font-mono text-2xl font-bold text-red-400"
      >
        Play
      </button>
      <button className="flex h-16 w-36 cursor-pointer items-center justify-center rounded-full border-4 border-red-400 bg-white px-4 py-3 font-mono text-2xl font-bold text-red-400">
        About
      </button>
    </div>
  );
}
