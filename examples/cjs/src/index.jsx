import React from "react";
import { render } from "react-dom";

const { Button, Loader } = require("../../../dist/index.js");

class App extends React.Component {
  render() {
    return (
      <div>
        <Button accent="success" onClick={({ target }) => console.log(target)}>
          <h1>yay!</h1>
        </Button>
        <Button
          accent="warning"
          className="some-class"
          style={{ paddingLeft: 0 }}
        >
          <Loader size="xs" />
          Loading...
        </Button>
        <Button accent="error" disabled>
          <h1>doh!!</h1>
        </Button>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
