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
      <main className="flex h-[641px] max-h-[641px] min-h-[641px] w-[1366px] min-w-[1366px] max-w-[1366px] flex-col items-center justify-center bg-slate-200">
        {!game.isStart ? (
          <Home />
        ) : (
          <>
            <nav className="h-16 w-full bg-red-600"></nav>
            <Scene />
          </>
        )}
      </main>
    </main>
  );
}
