import { useEffect, useState } from "react";
import useCustomersStore from "@services/stores/customersStore";
import Cashier from "./Cashier";
import Character from "./Character";
import Table from "./Table";
import Dialog from "./Character/Dialog";
import { CharacterImages } from "@assets/CashierArea/config";

export default function CashierArea() {
  const [isStart, setIsStart] = useState(false);

  return (
    <section className="flex h-full min-w-full snap-start flex-col justify-end">
      <div className="flex h-4/6 w-full items-end">
        <div className="relative flex h-full w-3/12 items-end justify-end">
          <Cashier />
        </div>
        <div className="relative flex h-full w-9/12 items-end overflow-hidden">
          {!isStart ? (
            <div className="flex h-full w-full items-center justify-center bg-slate-200">
              <button
                onClick={() => setIsStart(true)}
                className="flex h-16 w-36 -translate-x-full cursor-pointer items-center justify-center rounded-full border-4 border-red-400 bg-white px-4 py-3 font-mono text-2xl font-bold text-red-400"
              >
                Start
              </button>
            </div>
          ) : (
            <Customer />
          )}
        </div>
      </div>
      <Table />
    </section>
  );
}

function Customer() {
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
