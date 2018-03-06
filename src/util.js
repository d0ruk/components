import { modularScale, parseToRgb, transparentize } from "polished";

const sizes = ["xs", "sm", "md", "lg", "xl"];

export const getScale = (size="sm") => {
  const BASE = "1px";
  if (!sizes.includes(size)) return BASE;

  const idx = sizes.indexOf(size);
  const step = idx === -1 ? 1 : idx*1.6 + 1;
  return modularScale(step, BASE);
}

export const getRGB = (color="mistyrose") => {
  const { red, green, blue, alpha } = parseToRgb(color);

  if (alpha) {
    return `rgba(${red}, ${green}, ${blue},  ${alpha})`;
  } else {
    return `rgb(${red}, ${green}, ${blue})`;
  }
}

export const getBgColor = (bg={}) => {
  const color = typeof bg === "string" ? bg : bg.color;
  const tint = bg.tint
    ? 10 - Math.min(Math.abs(bg.tint), 10)
    : 3;

  return transparentize(.1 * tint, getRGB(color));
}