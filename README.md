```js
import { Button, Loader } from "@doruk/components"

const aButton = () => (
  <Button accent="success">
    Hello world!
  </Button>
);

const aLoader = () => (
  <Loader size="md" fill="rebeccapurple" />
);

const overlayedLoader = () => (
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

const yetAnotherLoader = () => (
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

## rest

Ul Li Main P Span Nav Div Section H1 H2 H3 H4 H5 H6 A Article Aside Audio B Br Caption Code Footer Header Hr I Iframe Img Input Li Main Ol Option P Picture Pre Progress Select Source Table Tbody Td Textarea Tfoot Th Thead Tr U Ul Video

## CSS reset & normalize

```js
import { Normalize, Reset } from "@doruk/components"

const App = () => (
  <Main>
    <Reset />
    <Normalize />
  </Main>
);
```

or

```js
import { normalize, reset } from "@doruk/components"

const GlobalStyle = styled.createGlobalStyle`
  ${reset}
  ${normalize}
`;

const App = () => (
  <Section>
    <GlobalStyle />
  </Section>
);
```

### When loaded via \<script\> tag, the library is available as *_components*; i.e. *window._components.Button*

```html
<script src="https://unpkg.com/@doruk/components"></script>
```
