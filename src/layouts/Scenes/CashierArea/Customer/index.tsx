import { useEffect, useState } from "react";
import Character from "./Character";
import Dialog from "./Character/Dialog";
import useGameStore from "@services/stores/gameStore";
import { useImageStore } from "@services/stores/assetsStore";

export default function Customer() {
  const [image, setImage] = useState("");
  const [isPoppingUp, setIsPoppingUp] = useState(true);
  const { game } = useGameStore();
  const { images } = useImageStore();
  const { CharacterImages } = images as {
    CharacterImages: Record<string, string>;
  };

  const character = game.customers[0];
  const currentImage =
    CharacterImages[character?.name as keyof typeof CharacterImages];

  useEffect(() => {
    if (image !== currentImage) {
      setIsPoppingUp(false);

      const timeout = setTimeout(() => {
        setImage(currentImage);
      }, 1000);

      return () => clearTimeout(timeout);
    }

    if (image === currentImage) {
      setIsPoppingUp(true);
    }
  }, [currentImage, image]);

  if (!character) return null;

  return (
    <>
      <Character
        image={image}
        className={`${isPoppingUp ? "translate-y-0" : "translate-y-[200%]"} transition-all`}
      />
      <Dialog name={character.name} dialog={character.dialog} />
    </>
  );
}
