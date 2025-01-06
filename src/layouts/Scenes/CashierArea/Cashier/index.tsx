import Overlay from "@components/Overlay";
import { CashierImage } from "@assets/CashierArea/config";

export default function Cashier() {
  return (
    <div className="relative -bottom-16 h-40 w-48">
      <Overlay src={CashierImage} className="h-full w-full" />
    </div>
  );
}
