export default function setTransparency(color: string, opacity: number) {
  const rawColor = color.split(/[()]/)[1];
  return `rgba(${rawColor}, ${opacity})`;
}
