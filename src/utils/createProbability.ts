export default function chance(probability: number) {
  const random = Math.random();
  return probability > random;
}
