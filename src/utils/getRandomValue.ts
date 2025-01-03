export default function getRandomValue<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}
