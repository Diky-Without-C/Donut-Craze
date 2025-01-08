import Customer from "@core/classes/Customers";

interface DialogProps {
  character: Customer;
}

export default function Dialog({ character }: DialogProps) {
  return (
    <main className="absolute top-[15%] max-w-2xl translate-x-64">
      <section className="relative flex h-full w-full flex-col rounded-3xl bg-slate-100 p-5 font-mono drop-shadow-lg">
        <p className="text-center text-xl">{character.dialog}</p>

        <div className="absolute bottom-0 left-8 h-0 w-0 translate-y-full border-b-[2.5rem] border-l-[2rem] border-b-transparent border-l-slate-100"></div>
      </section>
    </main>
  );
}
