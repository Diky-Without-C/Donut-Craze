import Overlay from "@components/Overlay";
import { useImageStore } from "@services/stores/assetsStore";

interface SubmitButtonProps {
  onClick?: () => void;
}

export default function SubmitButton({ onClick }: SubmitButtonProps) {
  const { images } = useImageStore();
  const { BellImages } = images as { BellImages: string };

  return (
    <div
      onClick={onClick}
      className="relative m-2 flex size-24 shrink-0 cursor-pointer items-center justify-center rounded-full"
    >
      <Overlay src={BellImages} />
    </div>
  );
}
