import { useEffect, useState } from "react";
import { CharacterImages } from "@assets/Character/config";
import Character from "./Character";
import Dialog from "./Character/Dialog";
import useGameStore from "@services/stores/gameStore";

export default function Customer() {
  const [image, setImage] = useState("");
  const [isPoppingUp, setIsPoppingUp] = useState(true);
  const { game } = useGameStore();

  const character = game.customers[0];
  const currentImage =
    CharacterImages[character?.name as keyof typeof CharacterImages];

  useEffect(() => {
    if (image !== currentImage) {
      setIsPoppingUp(false);

      const timeout = setTimeout(() => {
        setImage(currentImage);
        setIsPoppingUp(true);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentImage]);

  if (!character) return null;

  return (
    <>
      <Character
        image={image}
        name={character.name}
        className={`${isPoppingUp ? "translate-y-0" : "translate-y-[200%]"} transition-all`}
      />
      <Dialog dialog={character.dialog} />
    </>
  );
}
