import { BellImages } from "@assets/PackingArea/config";
import Overlay from "@components/Overlay";

interface SubmitButtonProps {
  onClick?: () => void;
}

export default function SubmitButton({ onClick }: SubmitButtonProps) {
  return (
    <div
      onClick={onClick}
      className="relative m-2 flex size-24 shrink-0 cursor-pointer items-center justify-center rounded-full"
    >
      <Overlay src={BellImages} />
    </div>
  );
}
