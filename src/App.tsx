import { useEffect } from "react";
import Home from "@layouts/Home";
import Scene from "@layouts/Scenes";
import useGameStore from "@services/stores/gameStore";
import useInitialize from "@core/classes/Game/initialize";

export default function App() {
  const { game } = useGameStore();
  const { init } = useInitialize();

  useEffect(() => {
    if (game.isStart) {
      init();
    }
  }, [game.isStart]);

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <main className="flex h-[39.5rem] max-h-[39.5rem] min-h-[39.5rem] w-[85rem] min-w-[85rem] max-w-[85rem] flex-col items-center justify-center bg-slate-200">
        {!game.isStart ? (
          <Home />
        ) : (
          <>
            <nav className="h-16 w-full border-b-4 border-b-red-800 bg-orange-950"></nav>
            <Scene />
          </>
        )}
      </main>
    </main>
  );
}
