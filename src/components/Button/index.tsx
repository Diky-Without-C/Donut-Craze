import { ComponentProps } from "react";
import Overlay from "@components/Overlay";
import { useImageStore } from "@services/stores/assetsStore";

interface ButtonProps extends ComponentProps<"button"> {}

export default function Button({ className, ...props }: ButtonProps) {
  const { images } = useImageStore();
  const { MolderImage } = images as { MolderImage: string };

  return (
    <button
      {...props}
      className={`${className} absolute bottom-0 right-0 z-[9999] flex size-20 -translate-x-12 -translate-y-16 items-center justify-center rounded-full border-2 border-gray-900 bg-emerald-400/80 px-2`}
    >
      <Overlay src={MolderImage} className="p-2"></Overlay>
    </button>
  );
}
