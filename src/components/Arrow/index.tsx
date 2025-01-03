import { ComponentProps } from "react";

interface ArrowProps extends ComponentProps<"button"> {
  direction: "top" | "bottom";
}

export default function Arrow({ direction, className, ...props }: ArrowProps) {
  const directions = {
    top: "rotate-0",
    bottom: "rotate-180",
  };

  return (
    <button
      {...props}
      className={`${className} absolute bottom-0 right-0 z-[9999] flex size-12 -translate-x-1/2 -translate-y-2/3 items-center justify-center rounded-full bg-green-600 transition-all duration-500`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${directions[direction]} size-6 text-white transition-all duration-500`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
        />
      </svg>
    </button>
  );
}
