/* eslint-disable react/prop-types */

import React, { Fragment } from "react";
import Playground from "component-playground";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import { lighten, complement } from "polished";

import * as components from "./src";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: rgb(23, 121, 186);
    --secondary: rgb(118, 118, 118);
    --success: rgb(58, 219, 118);
    --error: rgb(204, 75, 55);
    --warning: rgb(255, 174, 0);
    --primary-font_color: ${lighten(0.5, complement("rgb(23, 121, 186)"))};
    --secondary-font_color: ${lighten(0.5, complement("rgb(118, 118, 118)"))};
    --success-font_color: ${lighten(0.5, complement("rgb(58, 219, 118)"))};
    --error-font_color: ${lighten(0.5, complement("rgb(204, 75, 55)"))};
    --warning-font_color: ${lighten(0.5, complement("rgb(255, 174, 0)"))};
  }

  body, html {
    width: 100%;
    height: 100%;
  }

  #root {
    padding: 40px 20px;
  }
`;

const Wrapper = styled.div`
  display: ${p => (p.flex ? "flex" : "initial")};

  > * {
    margin: 1rem;
  }
`;

const scope = { React, ...components, Wrapper };
const examples = Object.entries(components)
  .map(([name, module]) => {
    let src;

    try {
      src = require(`./examples/${name}.sample`);
    } catch (e) {
      return;
    }

    return {
      name,
      docClass: module,
      src,
      scope,
    };
  })
  .filter(Boolean);

class Index extends React.Component {
  render() {
    return (
      <Fragment>
        <components.Normalize />
        <GlobalStyle />
        {examples.map(makePlayground)}
      </Fragment>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));

if (import.meta.webpackHot) import.meta.webpackHot.accept();

function makePlayground({ src, scope, name }) {
  const Wrapper = styled.div`
    .playground {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-items: space-between;
      margin: 10px auto;
      overflow: hidden;
    }

    .CodeMirror {
      padding: 10px;
    }

    .playgroundCode {
    }

    .playgroundPreview {
      margin-left: auto;
      margin-right: 1rem;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    }
  `;

  return (
    <Wrapper key={`${name}`}>
      <h1>{name}</h1>
      <Playground
        codeText={src}
        scope={scope}
        // collapsableCode
      />
      <hr />
    </Wrapper>
  );
}
