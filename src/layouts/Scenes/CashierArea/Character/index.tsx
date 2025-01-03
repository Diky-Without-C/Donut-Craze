import Droppable from "@components/Droppable";
import Customer from "@core/classes/Customers";

interface CharacerProps {
  character: Customer;
}

export default function Character({ character }: CharacerProps) {
  return (
    <div className="relative flex h-full w-10/12 items-center justify-center">
      <Droppable
        id="customer"
        className="absolute bottom-0 left-0 flex h-3/4 w-3/12 shrink-0 translate-y-12 items-end justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-72"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
      </Droppable>
      <main className="absolute flex max-w-2xl translate-x-10 items-end rounded-lg border-2 bg-white">
        <section className="relative flex h-full w-full flex-col p-5 font-mono">
          <p className="text-center text-xl">{character?.dialog}</p>
        </section>
      </main>
    </div>
  );
}
