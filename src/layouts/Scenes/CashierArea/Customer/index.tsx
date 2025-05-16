import { useEffect, useState } from "react";
import useCustomersStore from "@services/stores/customersStore";
import { CharacterImages } from "@assets/Character/config";
import Character from "./Character";
import Dialog from "./Character/Dialog";

export default function Customer() {
  const { customers } = useCustomersStore();
  const [image, setImage] = useState("");
  const [isPoppingUp, setIsPoppingUp] = useState(true);

  const character = customers[0];
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
