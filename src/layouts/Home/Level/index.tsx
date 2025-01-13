import useLocalStorage from "@hooks/useLocalStorage";

export default function Level() {
  const [level] = useLocalStorage("donut-craze-level", 1);
  return (
    <h2 className="text-2xl font-semibold text-gray-800">Hari ke {level}</h2>
  );
}
