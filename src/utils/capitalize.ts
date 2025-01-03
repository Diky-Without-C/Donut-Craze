export default function capitalize(word: string) {
  return word.charAt(0).toLocaleUpperCase() + word.slice(1);
}
