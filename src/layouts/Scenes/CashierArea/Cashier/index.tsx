import Overlay from "@components/Overlay";
import { CashierImage } from "@assets/CashierArea/config";

export default function Cashier() {
  return (
    <div className="relative -bottom-24 size-64">
      <Overlay src={CashierImage} className="h-full w-full" />
    </div>
  );
}
