import useGameStore from "@services/stores/gameStore";

export default function Buttons() {
  const { game } = useGameStore();

  return (
    <div className="mt-6 flex h-1/3 w-2/5 flex-col items-center justify-center gap-4">
      <button
        onClick={() => game.start()}
        className="flex h-16 w-60 cursor-pointer items-center justify-center rounded-full border-4 border-red-200 bg-red-400 px-4 py-3 text-2xl font-bold uppercase tracking-wide text-white hover:bg-red-500"
      >
        Mulai
      </button>
      <button className="flex h-16 w-60 cursor-pointer items-center justify-center rounded-full border-4 border-red-200 bg-red-400 px-4 py-3 text-2xl font-bold uppercase tracking-wide text-white hover:bg-red-500">
        Cara bermain
      </button>
    </div>
  );
}
