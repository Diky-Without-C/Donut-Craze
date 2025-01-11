import { useState, useRef, useEffect } from "react";
import useCustomersStore from "@services/stores/customersStore";
import Overlay from "@components/Overlay";
import { TicketImage } from "@assets/toppingArea/config";

export default function Ticket() {
  const [isActive, setIsActive] = useState(false);
  const { customers } = useCustomersStore();

  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        ticketRef.current &&
        !ticketRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ticketRef}
      onClick={() => setIsActive(true)}
      className={`${
        isActive
          ? "absolute right-1/2 top-10 h-4/5 w-5/12 translate-x-1/2"
          : "relative h-5/6 w-4/5 cursor-pointer"
      } z-10`}
    >
      <Overlay src={TicketImage} className="h-full w-full" />

      {isActive && (
        <main className="flex h-full w-full flex-col items-end">
          <section className="relative flex h-full w-full flex-col p-8 font-mono">
            <CloseButton onClose={() => setIsActive(false)} />
            <span className="-mt-4 mb-8 text-lg font-semibold">
              Pesanan #1 ({customers[0].name})
            </span>
            <p className="text-justify text-xl">{customers?.[0]?.dialog}</p>
          </section>
        </main>
      )}
    </div>
  );
}

interface CloseButtonProps {
  onClose: () => void;
}

function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      className="absolute right-0 top-0 m-2 flex size-8 shrink-0 cursor-pointer select-none items-center justify-center rounded-md bg-slate-50 font-bold"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-6 text-gray-900"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </span>
  );
}
