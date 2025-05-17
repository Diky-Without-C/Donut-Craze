import Overlay from "@components/Overlay";
import { useImageStore } from "@services/stores/assetsStore";

export default function Cashier() {
  const { images } = useImageStore();
  const { CashierImage } = images as {
    CashierImage: string;
  };

  return (
    <div className="relative -bottom-24 size-64">
      <Overlay src={CashierImage} className="h-full w-full" />
    </div>
  );
}
