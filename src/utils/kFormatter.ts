export default function kFormatter(num: number) {
  return Math.abs(num) > 9999
    ? (Math.abs(num) / 1000).toFixed(0) + "K"
    : Math.abs(num);
}
