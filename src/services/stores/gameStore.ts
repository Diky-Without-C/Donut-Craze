import Game from "@core/classes/Game";
import { create } from "zustand";

type GameState = {
  game: Game;
  updateGame: () => void;
};

const useGameStore = create<GameState>((set) => {
  const game = new Game();

  const proxiedGame = new Proxy(game, {
    set(target, prop, value) {
      target[prop as keyof Game] = value;
      set({ game: target });
      return true;
    },
  });

  return {
    game: proxiedGame,
    updateGame: () => set({ game: proxiedGame }),
  };
});

export default useGameStore;
