```js
import { Button, Loader } from "@doruk/components"

export const aButton = () => (
  <Button accent="success">
    Hello world!
  </Button>
);

export const aLoader = () => (
  <Loader size="md" fill="rebeccapurple" />
);

export const overlayedLoader = () => (
  React.createPortal(
    <Loader
      variant="rect5"
      fullscreen={{
        bg: { color: "rgba(0,0,0,.5)", tint: 9 }
      }}
    />,
    document.getElementById("loader")
  )
);

export const yetAnotherLoader = () => (
  <Loader
    size="xs"
    fullscreen="rgba(0,0,0,.6)"
  />
);
```

## Button

prop | type | description | default
---|---|:-:|---|
accent | string | one of; primary, secondary, success, error, warning | primary

## Loader

prop | type | description | default
---|---|:-:|--:|
fullscreen | string\|{color,tint} | overlay loader over \<body\>| {color:"mistyrose",tint:3}
fill|string|fill of the SVG elements| -
stroke|string|stroke of the SVG elements| -
size|string|one of; xs, sm, md, lg, xl|sm
variant|string|one of: spin1, spin2, spin3, rect1, rect2, rect3, rect4, rect5|spin1

### When loaded via \<script\> tag, lib is available as *_components*; i.e. *window._components.Button*
