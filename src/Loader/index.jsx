import React from "react";
import styled from "styled-components";
import { oneOfType, string, shape, number } from "prop-types";

import { getBgColor } from "../util";
import SVG from "./SVG";

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

const Loader = ({ fullscreen, ...rest }) => {
  if (fullscreen) {
    const background =
      typeof fullscreen === "string" ? fullscreen : fullscreen.bg;

    return (
      <Wrapper bg={background}>
        <SVG size={rest.size || "xl"} {...rest} />
      </Wrapper>
    );
  }

  return <SVG {...rest} />;
};

Loader.propTypes = {
  fullscreen: oneOfType([
    string,
    shape({ bg: oneOfType([string, shape({ color: string, tint: number })]) }),
  ]),
};
Loader.displayName = "Loader";
export default Loader;
