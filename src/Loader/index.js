import React from "react";
import styled from "styled-components";
import { oneOfType, string, shape, number } from "prop-types";

import { getScale, getBgColor } from "~/util";

const Wrapper = styled.div`
  position: fixed;
  z-index: 999;
  background-color: white;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:before {
    content: "";
    position: fixed;
    background-color: ${({ bg }) => `${getBgColor(bg)}`};
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const SVG = styled.svg`
  width: ${({ size }) => getScale(size)};
  height: ${({ size }) => getScale(size)};

  path,
  rect {
    stroke: ${({ stroke = "none" }) => `${stroke}`};
    fill: ${({ fill = "#00a1f1" }) => `${fill}`};
  }
`;

// https://codepen.io/aurer/pen/jEGbA
const Loader = ({ fullscreen, ...rest }) => {

  const getLoader = props => (
    <SVG viewBox="0 0 40 40" {...props}>
      <path
        opacity="0.2"
        d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
      />
      <path
        d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.5s"
          repeatCount="indefinite"
        />
      </path>
    </SVG>
  );

  if (fullscreen) {
    const background = typeof fullscreen === "string"
      ? fullscreen
      : fullscreen.bg;

    return (
      <Wrapper bg={background}>
        {getLoader({ ...rest, size: rest.size || "xl" })}
      </Wrapper>
    );
  }

  return getLoader({ ...rest });
};

Loader.propTypes = {
  fill: string,
  stroke: string,
  size: string,
  fullscreen : oneOfType([
    string,
    shape({ bg: shape({ color: string, tint: number })})
  ]),
}
Loader.displayName = "Loader";
export default Loader;
