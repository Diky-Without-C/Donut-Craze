interface SubmitButtonProps {
  onClick?: () => void;
}

export default function SubmitButton({ onClick }: SubmitButtonProps) {
  return (
    <div
      onClick={onClick}
      className="m-2 flex size-16 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-black bg-yellow-400"
    ></div>
  );
}
