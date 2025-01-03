import { useState, useRef, useEffect } from "react";
import useCustomersStore from "@services/stores/customersStore";

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
          ? "absolute right-1/2 top-10 h-4/5 w-5/12 translate-x-1/2 rounded-md"
          : "relative h-5/6 w-4/5 cursor-pointer"
      } z-10 bg-white shadow-lg`}
    >
      {isActive && (
        <main className="flex h-full w-full flex-col items-end">
          <section className="relative flex h-full w-full flex-col p-8 font-mono">
            <span
              onClick={(e) => {
                e.stopPropagation();
                setIsActive(false);
              }}
              className="absolute right-0 top-0 m-1 flex size-8 shrink-0 cursor-pointer select-none items-center justify-center rounded-md bg-gray-300 font-bold"
            >
              ×
            </span>
            <span className="-mt-4 mb-8 text-lg font-semibold">
              Pesanan #1 ({customers[0].name})
            </span>
            <p className="text-center text-xl">{customers?.[0]?.dialog}</p>
          </section>
        </main>
      )}
    </div>
  );
}
