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
