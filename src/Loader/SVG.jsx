import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { oneOf, string } from "prop-types";

import { SIZES, getScale } from "../util.js";

const VARIANTS = [
  {
    name: "spin1",
    viewBox: "0 0 40 40",
  },
  {
    name: "spin2",
    viewBox: "0 0 50 50",
  },
  {
    name: "spin3",
    viewBox: "0 0 50 50",
  },
  {
    name: "rect1",
    viewBox: "0 0 24 24",
  },
  {
    name: "rect2",
    viewBox: "0 0 24 30",
  },
  {
    name: "rect3",
    viewBox: "0 0 24 30",
  },
  {
    name: "rect4",
    viewBox: "0 0 24 30",
  },
  {
    name: "rect5",
    viewBox: "0 0 24 30",
  },
];

const Component = styled.svg.attrs({
  version: "1.1",
  xmlns: "http://www.w3.org/2000/svg",
  xmlnsXlink: "http://www.w3.org/1999/xlink",
})`
  width: ${({ size }) => getScale(size)};
  height: ${({ size }) => getScale(size)};

  path,
  rect {
    stroke: ${({ stroke = "none" }) => `${stroke}`};
    fill: ${({ fill = "#00a1f1" }) => `${fill}`};
  }
`;

// https://codepen.io/aurer/pen/jEGbA
const SVG = ({ fill, stroke, size, variant: v }) => {
  const [__html, setHtml] = useState(null);

  let variant = VARIANTS.find(({ name }) => name === v);
  if (!variant) variant = VARIANTS.find(({ name }) => name === "spin1");

  useEffect(() => {
    import(`./${variant.name}.svg`).then(({ default: contents }) => {
      setHtml(contents);
    });
  }, [variant.name]);

  return (
    <Component
      viewBox={variant.viewBox}
      fill={fill}
      stroke={stroke}
      size={size}
      dangerouslySetInnerHTML={{ __html }}
    />
  );
};

SVG.displayName = "SVG";
SVG.propTypes = {
  fill: string,
  stroke: string,
  size: oneOf(SIZES),
  variant: oneOf(VARIANTS.map(({ name }) => name)),
};

export default SVG;
