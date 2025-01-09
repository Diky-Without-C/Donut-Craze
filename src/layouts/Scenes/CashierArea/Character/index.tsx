import Droppable from "@components/Droppable";
import Customer from "@core/classes/Customers";
import Overlay from "@components/Overlay";
import { CharacterImages } from "@assets/CashierArea/config";

interface CharacterProps {
  character: Customer;
}

export default function Character({ character }: CharacterProps) {
  return (
    <Droppable
      id="customer"
      className="relative flex h-3/4 w-3/12 items-end justify-center"
    >
      <Overlay
        src={CharacterImages[character.name as keyof typeof CharacterImages]}
        className="min-w-[150%]"
      />
    </Droppable>
  );
}
