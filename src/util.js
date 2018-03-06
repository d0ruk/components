import { modularScale, parseToRgb, transparentize } from "polished";

const sizes = ["xs", "sm", "md", "lg", "xl"];

export const getScale = (size="sm") => {
  const BASE = "3px";
  if (!sizes.includes(size)) return BASE;

  const idx = sizes.indexOf(size);
  const step = idx === -1 ? 1 : idx+1;
  return modularScale(step, BASE);
}

export const getRGB = color => {
  const { red, green, blue } = parseToRgb(color);
  return `rgb(${red}, ${green}, ${blue})`;
}

export const getBgColor = bg => {
  let color = bg;
  let tint = 3;

  if (bg.color) color = bg.color;
  if (bg.tint) tint = 10 - Math.min(Math.abs(bg.tint), 10);

  return transparentize(.1 * tint, getRGB(color));
}