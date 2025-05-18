import { useEffect, useState } from "react";

export default function Transition() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    const closeTimeout = setTimeout(() => {
      setIsOpen(false);
    }, 600);
    return () => clearTimeout(closeTimeout);
  }, []);

  return (
    <section
      className={`${isOpen ? "translate-x-0" : "translate-x-full"} absolute z-[99999] h-full w-full bg-black transition-all duration-300`}
    ></section>
  );
}
