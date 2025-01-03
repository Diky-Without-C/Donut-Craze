export default function suffle<T>(list: T[]) {
  return list.sort(() => Math.random() - 0.5);
}
