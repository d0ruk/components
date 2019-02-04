import { modularScale, parseToRgb, transparentize } from "polished";

export const SIZES = ["xs", "sm", "md", "lg", "xl"];

export const getScale = (size = "sm") => {
  const BASE = "1px";
  if (!SIZES.includes(size)) size = "sm";

  const idx = SIZES.indexOf(size);
  const step = idx === -1 ? 1 : idx * 1.6 + 1;
  return modularScale(step, BASE);
};

export const getRGB = (color = "mistyrose") => {
  try {
    const { red, green, blue, alpha } = parseToRgb(color);

    if (alpha) return `rgba(${red}, ${green}, ${blue},  ${alpha})`;

    return `rgb(${red}, ${green}, ${blue})`;
  } catch (_) {
    return "rgb(255,228,225)";
  }
};

export const getBgColor = (bg = {}) => {
  const color = typeof bg === "string" ? bg : bg.color;
  const tint = bg.tint ? 10 - Math.min(Math.abs(bg.tint), 10) : 3;

  return transparentize(0.1 * tint, getRGB(color));
};
