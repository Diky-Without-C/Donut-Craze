import { useEffect, useState } from "react";
import useCustomersStore from "@services/stores/customersStore";
import { CharacterImages } from "@assets/CashierArea/config";
import Character from "./Character";
import Dialog from "./Character/Dialog";

export default function Customer() {
  const { customers } = useCustomersStore();
  const [image, setImage] = useState("");
  const [isPoppingUp, setIsPoppingUp] = useState(true);

  const currentImage =
    CharacterImages[customers[0]?.name as keyof typeof CharacterImages];

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

  if (!customers[0]) return null;

  return (
    <>
      <Character
        image={image}
        className={isPoppingUp ? "pop-up" : "pop-down"}
      />
      <Dialog character={customers[0]} />
    </>
  );
}
