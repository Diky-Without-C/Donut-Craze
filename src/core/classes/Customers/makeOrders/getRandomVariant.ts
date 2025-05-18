import getRandomValue from "@utils/getRandomValue";

export default function getRandomVariant(
  allowed: boolean,
  variants: { name: string; price: number }[],
) {
  return allowed ? getRandomValue(variants)?.name : undefined;
}
