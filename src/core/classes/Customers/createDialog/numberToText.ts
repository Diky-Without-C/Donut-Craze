export default function numberToText(num: number) {
  const numberList = ["satu", "dua", "tiga", "empat", "lima", "enam"];

  return numberList[num - 1];
}
