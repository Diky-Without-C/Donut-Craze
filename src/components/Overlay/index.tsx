import { ComponentProps } from "react";

interface OverlayProps extends ComponentProps<"img"> {}

export default function Overlay({ className, ...props }: OverlayProps) {
  return (
    <img
      {...props}
      className={`${className} pointer-events-none absolute select-none`}
    />
  );
}
