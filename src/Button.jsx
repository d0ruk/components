import React from "react"
import styled from "styled-components"

import { string, bool, node } from "prop-types"

const Component = styled.button`
  width: max-content;
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  border-radius: 7px;
  color: ${({ accent="primary" }) => `var(--${accent}-font_color)`};
  padding: .3rem 1rem;
  margin: .3rem;
  line-height: 2rem;
  height: auto;
  background: ${({ accent="primary" }) => `var(--${accent})`};

  >* {
    margin: 0 .3em;
  }

  &:disabled {
    opacity: .2;
  }

  &:hover {
    color: ${({ accent="primary" }) => `var(--${accent})`};
    background: rgb(239, 245, 255);
  }
`;

const Button = ({ htmlType, children, ...rest }) => {
  return (
    <Component
      {...rest}
      type={htmlType || "button"}
    >
      {children}
    </Component>
  );
};

Button.displayName = "Button";
Button.propTypes = {
  htmlType: string,
  disabled: bool,
  children: node
};

export default Button;