import { useEffect, useState } from "react";
import Customer from "@core/classes/Customers";

interface DialogProps {
  dialog: Customer["dialog"];
}

export default function Dialog({ dialog }: DialogProps) {
  const [text, setText] = useState("");

  useEffect(() => {
    setText("");

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setText((prev) => {
          const nextText = dialog.slice(0, prev.length + 1);
          if (nextText === dialog) {
            clearInterval(interval);
          }
          return nextText;
        });
      }, 50);

      return () => clearInterval(interval);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [dialog]);

  return (
    text !== "" && (
      <main className="absolute top-[15%] min-w-24 max-w-2xl translate-x-64">
        <section className="relative flex h-full w-full flex-col rounded-3xl bg-slate-100 p-6 font-mono drop-shadow-lg">
          <p className="text-justify text-xl">{text}</p>
          <div className="absolute bottom-0 left-8 h-0 w-0 translate-y-full border-b-[2.5rem] border-l-[2rem] border-b-transparent border-l-slate-100"></div>
        </section>
      </main>
    )
  );
}
