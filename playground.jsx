import React, { Fragment } from "react"
import Playground from "component-playground"
import ReactDOM from "react-dom"
import styled, { injectGlobal } from "styled-components"
import { normalize, lighten, complement } from "polished"

import { Button } from "./src"

injectGlobal`
  ${normalize()}

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

  body {
    background: #efefef;
  }

  #root {
    padding: 40px 20px;
  }
`;

const examples = [
  {
    name: "Button",
    src: require("raw-loader!./examples/button"),
    scope: { React, Button }
  }
]

class Index extends React.Component {
  render() {
    return (
      <Fragment>
        {examples.map(makePlayground)}
      </Fragment>
    );
  }
}

ReactDOM.render(<Index/>, document.getElementById("root"));

if (module.hot) module.hot.accept();

function makePlayground({ src, scope, name }, idx) {
  const Wrapper = styled.div`
  
  .playground {
      display: flex;
      flex-direction: column;
      margin: 10px auto;
      border-radius: 5px;
      overflow: hidden;
    }
    
    .CodeMirror {
      padding: 10px;
    }

    .playgroundCode {
    }
    
    .playgroundPreview {
      margin: 1rem auto auto auto;
      box-shadow: 0px 0px 5px rgba(0,0,0,0.25);
    }
  `;

  return (
    <Wrapper>
      <h1>{name}</h1>
      <Playground
        key={`example_${idx}`}
        codeText={src}
        scope={scope}
      />
      <hr/>
    </Wrapper>
  );
}